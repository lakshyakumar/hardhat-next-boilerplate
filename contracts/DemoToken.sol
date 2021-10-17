//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DemoToken is ERC20 {
    constructor() public ERC20("Demo Token", "DMT") {
        _mint(msg.sender, 1000000 * (10**decimals()));
    }
}
