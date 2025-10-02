// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns(bool);
    function transferFrom(address from, address to, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
}

contract MiniSwap {
    address public owner;

    IERC20 public cUSD;
    IERC20 public cEUR;

    uint256 public celoReserve;
    uint256 public cUSDReserve;
    uint256 public cEURReserve;

    constructor(address _cUSD, address _cEUR) {
        owner = msg.sender;
        cUSD = IERC20(_cUSD);
        cEUR = IERC20(_cEUR);
    }

    // Deposit tokens to the contract
    function depositToken(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        if(token == address(cUSD)) cUSDReserve += amount;
        else if(token == address(cEUR)) cEURReserve += amount;
    }

    // Swap CELO -> Token
    function swapCELOToToken(IERC20 token) external payable {
        require(msg.value > 0, "Send CELO");
        uint256 output;
        if(address(token) == address(cUSD)) {
            output = (msg.value * cUSDReserve) / (celoReserve + msg.value);
            cUSDReserve -= output;
        } else if(address(token) == address(cEUR)) {
            output = (msg.value * cEURReserve) / (celoReserve + msg.value);
            cEURReserve -= output;
        }
        celoReserve += msg.value;
        token.transfer(msg.sender, output);
    }

    // Swap Token -> CELO
    function swapTokenToCELO(IERC20 token, uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
        uint256 output;
        if(address(token) == address(cUSD)) {
            output = (amount * celoReserve) / (cUSDReserve + amount);
            cUSDReserve += amount;
        } else if(address(token) == address(cEUR)) {
            output = (amount * celoReserve) / (cEURReserve + amount);
            cEURReserve += amount;
        }
        payable(msg.sender).transfer(output);
        celoReserve -= output;
    }

    // Owner can withdraw tokens or CELO
    function withdraw(address token, uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        if(token == address(0)) payable(owner).transfer(amount); // CELO
        else IERC20(token).transfer(owner, amount);
    }
}
