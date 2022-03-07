App = {
    web3Provider: null,
    contracts: {},
    web3js: null,

    bindEvents: function() {
        jQuery(document).on('click', '#transferButton', App.handleTransfer);
        jQuery(document).on('click', '#balanceAlertButton', App.getTrueBalance);
        jQuery(document).on('click', '#get', App.getterSetter);
        jQuery(document).on('click', '#set', App.getterSetter);
    },

    init: function() {
      return App.initWeb3();
    },
    initWeb3: async function() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error("User denied account access");
            } 
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:3000');
        }
        App.web3js = new Web3(App.web3Provider);
      return App.initContract();
    },
    initContract: function() {
      jQuery.getJSON('../build/contracts/dappTest.json', function(data) {
        var dappTestArtifact = data;
        App.contracts.dappTest = TruffleContract(dappTestArtifact);
        App.contracts.dappTest.setProvider(App.web3Provider);
        return App.getBalances();
      });
  
      return App.bindEvents();
    },
    handleTransfer: function(event) {
        event.preventDefault();
        var dappTestInstance;

        var amount = parseInt(jQuery('#TTTransferAmount').val());
        var toAddress = jQuery('#TTTransferAddress').val();

        console.log('Transfer ' + amount + ' TT to ' + toAddress);

        App.web3js.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
        }

        var account = accounts[0];

        App.contracts.dappTest.deployed().then(function(instance) {
            dappTestInstance = instance;
            return dappTestInstance.transfer(toAddress, amount, {from: account, gas: 100000});
        }).then(function(result) {
            alert('Transfer Successful!');
            return App.getBalances();
        }).catch(function(err) {
            console.log(err.message);
        });
        });
    },
    getTrueBalance: function(event) {
        console.log("Refreshing balance...");
        var dappTestInstance;
        App.web3js.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
        }
        var account = accounts[0];
        App.contracts.dappTest.deployed().then(
            function(instance) {
                dappTestInstance = instance;
                console.log(dappTestInstance.balanceOf(account))
                return dappTestInstance.balanceOf(account);
            }
        ).then(
            function(result) {
                console.log(result);
                balance = result.words[0];
                console.log(balance);
                alert("True balance of account currently active: " + account + ". Value: " + balance + ".")
                jQuery('#dattBalance').text(balance);
                if (balance < 5) {
                    jQuery("#balanceChecker").css("display","none");
                } else {
                    jQuery("#balanceChecker").css("display","block");
                    jQuery("#balanceChecker").html("You should only be able to see this if you have at least 5 DATT. " + "(CONFIRMED)");
                }
            }
        ).catch(
            function(err) {
                console.log(err.message);
            }
        )});
    },
    getterSetter: function(event, getset) {
        getset = event.target.id;
        var dappTestInstance;

        App.web3js.eth.getAccounts(function(error, accounts) {
            if (error) {
              console.log(error);
            }
            var account = accounts[0];
            App.contracts.dappTest.deployed().then(
                function(instance) {
                    dappTestInstance = instance;
                    if(getset == "get") {
                        return dappTestInstance.get();
                    }
                    else if(getset == "set") {
                        set = jQuery("#setValue").val();
                        return dappTestInstance.set(set, {from: account, gas: 100000});
                    }
            }).then(
                function(result) {
                    console.log(result);
                    if(getset == "set") {
                        jQuery('#setResult').text(result.tx);
                    }
                    if(getset == "get") {
                        jQuery('#getResult').text(result);
                    }
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },
    getBalances: function() {
        //console.log('Getting balances...');
        var dappTestInstance;
        App.web3js.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
        }
        //console.log(accounts);
        var account = accounts[0];
        jQuery("#web3ID").text(account);
        jQuery.ajax({
            type: "POST",
            url: 'login.php',
            data: {
                functionname: "signupMeta",
                metaID: account
            },
            success: function(data) {
                if(data == "BAD") {
                    console.log("BAD SIGNUP");
                    jQuery("#web3ID").css("font-weight","800");
                } else {
                    console.log(data);
                    jQuery("#web3").css("border","4px solid green");
                    jQuery("#web3ID").css("font-weight","800");
                }
            },
            failure: function() {
                console.log("Error!");
            }
        });
        jQuery.ajax({
            type: "POST",
            url: 'login.php',
            data: {
                functionname: "loginMeta",
                metaID: account
            },
            success: function(data) {
                if(data == "BAD") {
                    console.log("BAD LOGIN");
                    jQuery("#web3").css("background-color","#F44336");
                    jQuery("#check").attr("src","images/defense.png");
                } else {
                    console.log(data);
                    jQuery("#check").attr("src","images/check.png");
                    jQuery("#userid").val(data);
                }
            },
            failure: function() {
                console.log("Error!");
            }
        });

        //console.log(account);
        App.contracts.dappTest.deployed().then(
            function(instance) {
                dappTestInstance = instance;
                //console.log(dappTestInstance.balanceOf(account))
                return dappTestInstance.balanceOf(account);
        }).then(
            function(result) {
                //console.log(result);
                balance = result.words[0];
                //console.log(balance);
                jQuery('#web3Balance').text(balance);
        }).catch(function(err) {
            console.log(err.message);
        });
      });
    }
  
  };
  
jQuery(document).ready(
    function() {
        App.init();
});
  