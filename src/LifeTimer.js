jQuery(document).ready(
    function() {
        var typingTimer;
        var doneTypingInterval = 1000;
        var names = {"categories":[],"subcategories":[],"activities":[]};
        var values = {"categories":[],"subcategories":[],"activities":[]};
        var namesX = {"categories":[],"subcategories":[],"activities":[]};
        var valuesX = {"categories":[],"subcategories":[],"activities":[]};

        if(jQuery(document).width() < 768) {
            jQuery("#categoryChart").css("display", "none");
            jQuery("#subCategoryChart").css("display", "none");
        }

        function drawPie(chartData, chartID, chartTitle) {
            chartData.unshift(["Names","Values"]);
            console.log(chartData);

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart(chartData,chartTitle,chartID));
      
            function drawChart(chartData,chartTitle, chartID) {
      
              var data = google.visualization.arrayToDataTable(chartData);
      
              var options = {
                title: chartTitle
              };
      
              var chart = new google.visualization.PieChart(document.getElementById(chartID));
      
              chart.draw(data, options);
            }
        }

        var alertNum = 0;
        jQuery(document).on("click", "#edit", function() {
            if(jQuery("#edit").text() == "EDITING") {
                jQuery("#edit").css("border-width","1px");
                jQuery("#edit").css("background-color","#F44336");
                jQuery("#edit").text("EDIT");
                clearInterval(timeout2);
            } else {
                jQuery("#edit").css("border-width","4px");
                jQuery("#edit").text("EDITING");
                timeout2 = setInterval(function() {
                    if(alertNum % 2 > 0) {
                        jQuery("#edit").css("background-color","#E57373");
                    } else {
                        jQuery("#edit").css("background-color","#F44336");
                    }
                        alertNum = alertNum + 1;
                }, 750);
            }
            jQuery(".hiddenMenu").css("display","flex");
        });

        jQuery(document).on("click",".dropdownText",
            function() {
                var id = jQuery(this).attr("id");
                selectedCategory = jQuery("#dropdownBoxCategory").text();
                selectedSubcategory = jQuery("#dropdownBoxSubcategory").text();
                selectedActivity = jQuery("#dropdownBoxActivity").text();
                id = id.slice("dropdownBox".length);
                optionsID = "#dropdownOptions" + id;
                var options = jQuery(optionsID);
                jQuery(options).html("");
                var username = jQuery("#userid").val();
                if(jQuery("#check").attr("src") == "images/check.png") {
                    getMyData( function (data) {
                        if(data["status"] == 404) {
                            jQuery.ajax({
                                type: "POST",
                                url: 'categoryListRewrite.php',
                                data: {
                                    functionname: "createJSON",
                                    dataset: username
                                },
                                success: function(data) {
                                    console.log(data);
                                },
                                failure: function() {
                                    console.log("Error!");
                                }
                            });
                        } else {
                            if(jQuery("#edit").text() == "EDITING") {
                                addChoice = "";
                                if (id == "Category") {
                                    for (var categories in data["Categories"]) {
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + categories + "</div><img class='editChoice' id='edit" + categories.replace(/\s/g, '') + "' src='images/edit.png'></div>";
                                        currentChoices = jQuery("#dropdownOptionsCategory").html();
                                        jQuery("#dropdownOptionsCategory").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsCategory").append("<div class='dropdownSegment'><input type='text' name='new' id='editField'><img src='images/complete.png' class='doneEditing'></div>");
                                } else if (id == "Subcategory") {
                                    for (var subCategories in data["Categories"][selectedCategory]["Subcategories"]) {
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + subCategories + "</div><img class='editChoice' id='edit" + subCategories.replace(/\s/g, '') + "' src='images/edit.png'></div>";
                                        currentChoices = jQuery("#dropdownOptionsSubcategory").html();
                                        jQuery("#dropdownOptionsSubcategory").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsSubcategory").append("<div class='dropdownSegment'><input type='text' name='new' id='editField'><img src='images/complete.png' class='doneEditing'></div>");
                                } else if (id == "Activity") {
                                    for (var activity in data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"]) {
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + activity + "</div><img class='editChoice' id='edit" + activity.replace(/\s/g, '') + "' src='images/edit.png'></div>";;
                                        currentChoices = jQuery("#dropdownOptionsActivity").html();
                                        jQuery("#dropdownOptionsActivity").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsActivity").append("<div class='dropdownSegment'><input type='text' name='new' id='editField'><img src='images/complete.png' class='doneEditing'></div>");
                                } else if (id == "Variations") {
                                    for (x = 0; x < data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"].length; x++) {
                                        variation = data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"][x];
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + variation + "</div><img class='editChoice' id='edit" + variation.replace(/\s/g, '') + "' src='images/edit.png'></div>";
                                        currentChoices = jQuery("#dropdownOptionsVariations").html();
                                        jQuery("#dropdownOptionsVariations").html(addChoice + currentChoices);
                                    }
                                    jQuery("#dropdownOptionsVariations").append("<div class='dropdownSegment'><input type='text' name='new' id='editField'><img src='images/complete.png' class='doneEditing'></div>");
                                }
                            } else if (jQuery("#edit").text() == "EDIT") {
                                addChoice = "";
                                if (id == "Category") {
                                    for (var categories in data["Categories"]) {
                                        numCats = categories.length;
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + categories + "</div></div>";
                                        currentChoices = jQuery("#dropdownOptionsCategory").html();
                                        jQuery("#dropdownOptionsCategory").html(addChoice + currentChoices);
                                    }
                                } else if (id == "Subcategory") {
                                    for (var subCategories in data["Categories"][selectedCategory]["Subcategories"]) {
                                        numsubCats = subCategories.length;
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + subCategories + "</div></div>";
                                        currentChoices = jQuery("#dropdownOptionsSubcategory").html();
                                        jQuery("#dropdownOptionsSubcategory").html(addChoice + currentChoices);
                                    }
                                } else if (id == "Activity") {
                                    for (var activity in data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"]) {
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + activity + "</div></div>";
                                        currentChoices = jQuery("#dropdownOptionsActivity").html();
                                        jQuery("#dropdownOptionsActivity").html(addChoice + currentChoices);
                                    }
                                } else if (id == "Variations") {
                                    for (x = 0; x < data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"].length; x++) {
                                        variation = data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][selectedActivity]["Variations"][x];
                                        addChoice = "<div class='dropdownSegment'><div name='dropdownChoice'>" + variation + "</div></div>";
                                        currentChoices = jQuery("#dropdownOptionsVariations").html();
                                        jQuery("#dropdownOptionsVariations").html(addChoice + currentChoices);
                                    }
                                }
                            }
                        }
                    }, username);
                }

                if(options.css("display") == "block") {
                    options.css("display","none");
                } else {
                    options.css("display", "block");
                }
            }
        );
        jQuery(document).off('click',".editChoice").on('click',".editChoice", 
            function() {
                currentID = jQuery(this).attr("id");
                oldCat = jQuery(this).prev().text();
                newInput = "<input type='text' placeholder='" + oldCat + "' name='" + oldCat + "' id='editField'><img src='images/complete.png' id='" + currentID + "' class='doneEditing'>";
                console.log(newInput);
                console.log(jQuery(currentID));
                console.log(currentID);
                jQuery("#" + currentID).parent().html(newInput);
        });
        jQuery(document).off('click','.doneEditing').on('click','.doneEditing', 
            function() {
                newName = jQuery('#editField').val();
                username = jQuery('#userid').val();
                oldCat = jQuery('#editField').attr("name");
                //get document data - name of clicked choice, dropdown box, options container
                var id = jQuery(this).parent().parent().parent().attr("id");
                var id2 = jQuery(this).attr("id");
                var id = id.slice("dropdown".length);
                jQuery(this).parent().html("<div name='dropdownChoice'>" + newName + "</div><img class='editChoice' id='" + id2 + "' src='images/edit.png'>");
                if(id=='Category') {
                    var myRequest = [username, id, oldCat, newName];
                    jQuery.ajax({
                        type: "POST",
                        url: 'categoryListRewrite.php',
                        data: {
                            functionname: id,
                            dataset: JSON.stringify(myRequest)
                        },
                        success: function(data) {
                            console.log(data);
                        },
                        failure: function() {
                            console.log("Error!");
                        }
                    });
                } else if (id=='Subcategory') {
                    category = jQuery('#dropdownBoxCategory').text();
                    var myRequest = [username, id, category, oldCat, newName];
                    jQuery.ajax({
                        type: "POST",
                        url: 'categoryListRewrite.php',
                        data: {
                            functionname: id,
                            dataset: JSON.stringify(myRequest)
                        },
                        success: function(data) {
                            console.log(data);
                        },
                        failure: function() {
                            console.log("Error!");
                        }
                    });
                } else if (id=='Activity') {
                    category = jQuery('#dropdownBoxCategory').text();
                    subcategory = jQuery('#dropdownBoxSubcategory').text();
                    var myRequest = [username, id, category, subcategory, oldCat, newName];
                    console.log(myRequest);
                    jQuery.ajax({
                        type: "POST",
                        url: 'categoryListRewrite.php',
                        data: {
                            functionname: id,
                            dataset: JSON.stringify(myRequest)
                        },
                        success: function(data) {
                            console.log(data);
                        },
                        failure: function() {
                            console.log("Error!");
                        }
                    });
                } else if(id=='Variations') {
                    category = jQuery('#dropdownBoxCategory').text();
                    subcategory = jQuery('#dropdownBoxSubcategory').text();
                    activity = jQuery('#dropdownBoxActivity').text();
                    var myRequest = [username, id, category, subcategory, activity, oldCat, newName];
                    console.log(myRequest);
                    jQuery.ajax({
                        type: "POST",
                        url: 'categoryListRewrite.php',
                        data: {
                            functionname: id,
                            dataset: JSON.stringify(myRequest)
                        },
                        success: function(data) {
                            console.log(data);
                        },
                        failure: function() {
                            console.log("Error!");
                        }
                    });
                }
        });
        jQuery(document).on('click',"[name='dropdownChoice']",
            function() {
                //get document data - name of clicked choice, dropdown box, options container
                var choicetext = jQuery(this).html();
                var id = jQuery(this).parent().parent().parent().attr("id");
                var id = id.slice("dropdown".length);
                num = 3;
                if(id == "Category") {
                    num = 1;
                    jQuery("#dropdownBoxSubcategory").text("Choose a subcategory");
                    jQuery("#dropdownBoxActivity").text("Choose an activity");
                    jQuery("#dropdownBoxVariations").text("Choose a variation");
                    jQuery("#timerContainer" +  num).children(".timerDesc").text(choicetext);
                } else if(id == "Subcategory") {
                    num = 2;
                    jQuery("#dropdownBoxActivity").text("Choose an activity");
                    jQuery("#dropdownBoxVariations").text("Choose a variation");
                    jQuery("#timerContainer" +  num).children(".timerDesc").text(choicetext);
                } else if(id == "Activity") {
                    jQuery("#dropdownBoxVariations").text("Choose a variation");
                    username = jQuery('#userid').val();
                    selectedCategory = jQuery("#dropdownBoxCategory").text();
                    selectedSubcategory = jQuery("#dropdownBoxSubcategory").text();
                    getMyData( function (data) {
                        numVariations = data["Categories"][selectedCategory]["Subcategories"][selectedSubcategory]["Activities"][choicetext]["Variations"].length;
                        edit = jQuery("#edit").text();
                        if(numVariations > 0) {
                            jQuery(".hiddenMenu").css("display","flex");
                            jQuery("#dropdownBoxVariations").html('<img src="images/downarrow.png">Choose a variation');
                        } else if(edit != "EDITING") {
                            jQuery(".hiddenMenu").css("display","none");
                        } else {
                            jQuery("#dropdownBoxVariations").html('<img src="images/downarrow.png">Choose a variation');
                        }
                    }, username);
                    jQuery("#timerContainer" +  num).children(".timerDesc").text(choicetext);
                } else if(id =="Variations") {
                    selectedActivity = jQuery("#dropdownBoxActivity").text();
                    jQuery("#timerContainer" +  num).children(".timerDesc").text(selectedActivity + " " + choicetext);
                }
                
                boxID = "#dropdownBox" + id;
                var dropdownbox = jQuery(boxID);
                optionsID = "#dropdownOptions" + id;
                var options = jQuery(optionsID);
                //Change dropdownbox text to the choice and close the options container
                dropdownbox.html('<img src="images/downarrow.png">' + choicetext);
                options.css("display","none");
                jQuery(this).parent().parent().html("");
        });

        jQuery(document).off("click","#displayCharts").on('click',"#displayCharts", function() {
            buttonText = jQuery("#displayCharts").text();
            if(buttonText == "Display all charts") {
                jQuery("#displayCharts").text("Close charts");
                jQuery("#categoryChart").css("display","block");
                jQuery("#subCategoryChart").css("display","block");
            } else if(buttonText == "Close charts") {
                jQuery("#displayCharts").text("Display all charts");
                jQuery("#categoryChart").css("display","none");
                jQuery("#subCategoryChart").css("display","none");
            }
        })

        jQuery(document).on('click',"#play", function() {
            //Function is going to be called in a setInterval() which will update the time on the timer.
            function startTimer() {
                id = "#time"
                var timeNow = new Date().getTime();

                //Convert ms to s
                timeNow = timeNow/1000;

                //Calculate delta time
                var timePassed = timeNow - timeStart;

                //Calculating hours, minutes, seconds
                hours = Math.trunc(timePassed/3600);
                timePassed = timePassed%3600;
                minutes = Math.trunc(timePassed/60);
                seconds = Math.trunc(timePassed%60);

                //Logic to add leading 0s if the integer for hours/minutes/seconds is < 10
                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                currentTime = hours + ":" + minutes + ":" + seconds;

                //Sends the current time to the timer on the page
                jQuery(id).text(currentTime);
            }

            //Variable timeStart is important because this variable gets updated as we play/pause the timer to maintain the previous time
            //It is originally set here as the current time to update the time on the timer as a delta between timer start and timer end. 
            var timeStart = new Date().getTime();
            timeStart = timeStart / 1000;
            
            //Create formatted date and time stamps to send to storage
            var timerStartDate = String(new Date().getMonth() + 1) + "/" + String(new Date().getDate()) + "/" + String(new Date().getFullYear());
            var hoursStart = new Date().getHours();
            var ampmStart = "AM";
            if(new Date().getHours() > 12) {
                hoursStart = hoursStart - 12;
                ampmStart = "PM"; 
            } else if(new Date().getHours == 12) {
                ampmStart = "PM";
            }
            var timerStartTime = String(hoursStart) + ":" + String(new Date().getMinutes()) + ":" + String(new Date().getSeconds() + ampmStart);

            //Grab the time that the user pause the timer at
            timePause = jQuery("#time").text();

            //If this is a 'play' call after the pause, calculate the # of seconds the timer has run for and then change the timeStart variable
            //If it is a fresh 'play' call, start the setInterval()
            if(timePause != "00:00:00") {
                hours = timePause.substring(0,2);
                minutes = timePause.substring(3,5)
                seconds = timePause.substring(6,8);
                hours = parseInt(hours,10);
                minutes = parseInt(minutes,10);
                seconds = parseInt(seconds,10);
                timePause = seconds + (60*minutes) + (60*60*hours);
                timeStart = timeStart - timePause;
                var timerStart = setInterval(startTimer, 1000);
            } else {
                timePause = 0;
                var timerStart = setInterval(startTimer, 1000);
            }
            
            //Simple pause function, just clearInterval()
            jQuery(document).on('click', '#pause', function() {
                clearInterval(timerStart);
            });
            
            //Function to control the saving of data to storage.
            jQuery(document).off("click","#save").on('click', '#save', function() {
                //Clears the setInterval()s
                clearInterval(timerStart);

                //Picks up the values in the note fields.
                var field1Val = String(jQuery("#field1").val());
                var field2Val = String(jQuery("#field2").val());
                jQuery("#field1").val("");
                jQuery("#field2").val("");

                //Get the timer end date and time, similarly to in #play for start time.
                var timerEndDate = String(new Date().getMonth() + 1) + "/" + String(new Date().getDate()) + "/" + String(new Date().getFullYear());
                var hoursEnd = new Date().getHours();
                var ampmEnd = "AM";
                if(new Date().getHours() > 12) {
                    hoursEnd = hoursEnd - 12;
                    ampmEnd = "PM";
                } else if (new Date().getHours() == 12) {
                    ampmEnd = "PM";
                }
                var timerEndTime = String(hoursEnd) + ":" + String(new Date().getMinutes()) + ":" + String(new Date().getSeconds() + ampmEnd);

                //Starts variables for all pies and data that needs to be collected.
                var myPie1 = [];
                var myPie2 = [];
                var myPie3 = [];
                var myPie1X = [];
                var myPie2X = [];
                var myPie3X = [];

                numAppendCat = 1;
                numAppendsubCat = 1;
                numAppendActivity = 1;

                timerSaveOperations = {
                    countCategories: function(current, category, numAppend) {
                        for(x = 0; x < names[category].length; x++) {
                            if(names[category][x].search(current) != -1) {
                                dashLoc = names[category][x].search("-");
                                currentNum = names[category][x].slice(dashLoc + 2);
                                currentNum = parseInt(currentNum,10);
                                numAppendCat = numAppend + 1;
                            }
                        }
                        return numAppendCat;
                    },
                    pushNewVals: function(catName, subcatName, activityName, catVal, subcatVal, activityVal) {
                        if(catName[0] != "") {
                            names.categories.push(catName[0]);
                            values.categories.push(catVal[0]);
                        }
                        if(subcatName[0] != "") {
                            names.subcategories.push(subcatName[0]);
                            values.subcategories.push(subcatVal[0]);
                        }
                        names.activities.push(activityName[0]);
                        values.activities.push(activityVal[0]);
                        namesX.categories.push(catName[1]);
                        namesX.subcategories.push(subcatName[1]);
                        namesX.activities.push(activityName[1]);
                        valuesX.categories.push(catVal[1]);
                        valuesX.subcategories.push(subcatVal[1]);
                        valuesX.activities.push(activityVal[1]);
                    },
                    appendVariations: function() {
                        activity = jQuery("#dropdownBoxActivity").text();
                        variation = jQuery("#dropdownBoxVariations").text();
                        if(variation == "Choose a variation") {
                            newactivity = activity;
                        } else {
                            newactivity = activity + " " + variation;
                        }
                        return newactivity;
                    }
                }

                //Get the times from all the timestamps and parse them.
                var timeSave = jQuery("#time").text();
                if(timeSave != "00:00:00") {
                    hours = timeSave.substring(0,2);
                    minutes = timeSave.substring(3,5)
                    seconds = timeSave.substring(6,8);
                    hours = parseInt(hours,10);
                    minutes = parseInt(minutes,10);
                    seconds = parseInt(seconds,10);
    
                    timeSave = seconds + (60*minutes) + (60*60*hours);
                } else {
                    timeSave = 0;
                }

                currentCat = jQuery("#dropdownBoxCategory").text();
                currentsubCat = jQuery("#dropdownBoxSubcategory").text();
                currentActivity = timerSaveOperations.appendVariations();
                currentCat2 = currentCat;
                currentsubCat2 = currentsubCat;
                currentActivity2 = currentActivity;

                numAppendCat = timerSaveOperations.countCategories(currentCat,"categories", numAppendCat);
                numAppendsubCat = timerSaveOperations.countCategories(currentsubCat,"subcategories", numAppendsubCat);
                numAppendActivity = timerSaveOperations.countCategories(currentActivity,"activities", numAppendActivity);
                
                console.log(numAppendCat);
                
                if (names.categories.length == 0) {
                    currentCat = currentCat + " - 1";
                    currentsubCat = currentsubCat + " - 1";
                    currentActivity = currentActivity + " - 1";
                    timerSaveOperations.pushNewVals(
                        [currentCat,currentCat2], 
                        [currentsubCat,currentsubCat2], 
                        [currentActivity,currentActivity2],
                        [timeSave,timeSave],
                        [timeSave,timeSave],
                        [timeSave,timeSave]
                    );
                } else {
                    var lastCategory = names.categories[names.categories.length - 1];
                    console.log(lastCategory);
                    var dashLoc = lastCategory.search("-");
                    lastCategory = lastCategory.slice(0,dashLoc - 1);
                    var lastsubCategory = names.subcategories[names.subcategories.length - 1];
                    var dashLoc = lastsubCategory.search("-");
                    lastsubCategory = lastsubCategory.slice(0,dashLoc - 1);
                    //currentsubCat = currentsubCat + " - " + numAppendsubCat.toString();
                    if((currentCat == lastCategory) && (currentsubCat != lastsubCategory)) {
                        lastVal = parseInt(values.categories[values.categories.length - 1],10);
                        values.categories[values.categories.length - 1] = lastVal + timeSave;
                        currentActivity = currentActivity + " - " + numAppendActivity.toString();
                        timerSaveOperations.pushNewVals(
                            ["",currentCat2], 
                            [currentsubCat,currentsubCat2], 
                            [currentActivity,currentActivity2],
                            ["",timeSave],
                            [timeSave,timeSave],
                            [timeSave,timeSave]
                        );
                    } else if (currentsubCat == lastsubCategory && currentCat != lastCategory) {
                        lastVal = parseInt(values.subcategories[values.subcategories.length - 1],10);
                        values.subcategories[values.subcategories.length - 1] = lastVal + timeSave;
                        currentActivity = currentActivity + " - " + numAppendActivity.toString();
                        timerSaveOperations.pushNewVals(
                            [currentCat,currentCat2], 
                            ["",currentsubCat2], 
                            [currentActivity,currentActivity2],
                            [timeSave,timeSave],
                            ["",timeSave],
                            [timeSave,timeSave]
                        );
                    } else if (currentsubCat == lastsubCategory && currentCat == lastCategory) {
                        lastVal = parseInt(values.categories[values.categories.length - 1],10);
                        values.categories[values.categories.length - 1] = lastVal + timeSave;
                        lastVal = parseInt(values.subcategories[values.subcategories.length - 1],10);
                        values.subcategories[values.subcategories.length - 1] = lastVal + timeSave;
                        currentActivity = currentActivity + " - " + numAppendActivity.toString();
                        timerSaveOperations.pushNewVals(
                            ["",currentCat2], 
                            ["",currentsubCat2], 
                            [currentActivity,currentActivity2],
                            ["",timeSave],
                            ["",timeSave],
                            [timeSave,timeSave]
                        );
                    } else {
                        currentCat = currentCat + " - " + numAppendCat.toString();
                        currentsubCat =  currentsubCat + " - " + numAppendsubCat.toString();
                        currentActivity = currentActivity + " - " + numAppendActivity.toString();
                        timerSaveOperations.pushNewVals(
                            [currentCat,currentCat2], 
                            [currentsubCat,currentsubCat2], 
                            [currentActivity,currentActivity2],
                            [timeSave,timeSave],
                            [timeSave,timeSave],
                            [timeSave,timeSave]
                        );
                    }
                }

                for (y = 0; y < names.subcategories.length; y++) {
                    if(y >= namesX.subcategories.length) {
                        categoryName = names.categories[y];
                        categoryValue = values.categories[y];
                        subcategoryName = names.subcategories[y];
                        subcategoryValue = values.subcategories[y];
                        myPie1.push([
                            categoryName, categoryValue
                        ]);
                        myPie2.push([
                            subcategoryName, subcategoryValue
                        ]);
                    } else {
                        categoryName = names.categories[y];
                        categoryName2 = namesX.categories[y];
                        categoryValue = values.categories[y];
                        categoryValue2 = valuesX.categories[y];
                        myPie1.push([
                            categoryName, categoryValue
                        ]);
                        myPie1X.push([
                            categoryName2, categoryValue2
                        ]);
                        subcategoryName = names.subcategories[y];
                        subcategoryName2 = namesX.subcategories[y];
                        subcategoryValue = values.subcategories[y];
                        subcategoryValue2 = valuesX.subcategories[y];
                        myPie2.push([
                            subcategoryName, subcategoryValue
                        ]);
                        myPie2X.push([
                            subcategoryName2, subcategoryValue2
                        ]);
                    }
                }
                for (y = 0; y < names.activities.length; y++) {
                    if( y >= namesX.activities.length) {
                        activityName = names.activities[y];
                        activityValue = values.activities[y];
                        myPie3.push([
                            activityName, activityValue
                        ]);
                    } else {
                        activityName = names.activities[y];
                        activityValue = values.activities[y];
                        activityName2 = namesX.activities[y];
                        activityValue2 = valuesX.activities[y];
                        myPie3.push([
                            activityName, activityValue
                        ]);
                        myPie3X.push([
                            activityName2, activityValue2
                        ]);
                    }
                }

                jQuery("#categoryChart").html("");
                drawPie(myPie1, "categoryChart", "Category Overview");
                jQuery("#subCategoryChart").html("");
                drawPie(myPie2, "subCategoryChart", "Subcategory Overview");
                jQuery("#activityChart").html("");
                drawPie(myPie3, "activityChart", "Activities Overview");
                jQuery("#time").text("00:00:00");

                var username = jQuery("#userid").val();
                var myPies = [timerStartDate,timerStartTime,timerEndDate,timerEndTime,myPie1X[0][0],myPie1X[0][1],myPie2X[0][0],myPie2X[0][1],myPie3X[0][0],myPie3X[0][1],field1Val,field2Val,username];
                console.log(myPies);

                jQuery.ajax({
                    type: "POST",
                    url: 'csvExport.php',
                    data: {
                        functionname: "csvExport",
                        dataset: JSON.stringify(myPies)
                    },
                    success: function(data) {
                        console.log(data);
                    },
                    failure: function() {
                        console.log("Error!");
                    }
                });

            });

        });

        function getMyData(handleData, username) {
            jQuery.ajax({
                url: 'categoryLists/' + username + '_categoryList.json?nocache=' + Math.floor(Math.random()*300),
                dataType: 'json',
                success: function(data) {
                    handleData(data);
                },
                error: function(data) {
                    handleData(data);
                }
            });
        }
    }
);