// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//OpenZeppelin ERC20 token standard implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract dappTest is ERC20 {
  uint x;

  //When this contract is first deployed, send the deployer of the contract 10,000,000 DATT
  //Deployer of the contract is Paul D'Antonio, the owner of Life Timer
  constructor () ERC20("dappTestToken", "DATT") {
    _mint(msg.sender, 10000000);
  }

  //Set the decimals of the token to 0 i.e. do not allow there to be fractions of tokens
  //Uses OpenZeppelin
  function decimals() public view virtual override returns (uint8) {
      return 0;
  }

  //get() takes the value of x and returns it
  function get() public view returns (uint) {
    return x;
  }
  //set() changes the value of x with an input of y
  function set(uint y) public {
    x = y;
  }


}
