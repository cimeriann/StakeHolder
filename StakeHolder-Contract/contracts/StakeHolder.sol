// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract StakeHolder {
    using PriceConverter for uint256;

    address public immutable contractOwner;
    uint256 public constant StakingPeriod = 365;
    // keep track of the number of days that have passed since staking began
    uint256 public numberOfDaysSinceStakingBegan;
    uint256 public constant MINIMUM_USD = 100 * 10**18;
    // create new funder
    // struct Funder {
    //     uint256 _id;
    //     address _fundersAddress;
    //     uint256 _amountFunded;
    // }
    // Funder[] public funders;

    mapping(address => uint256) public addressToAmountFunded;
    // mapping(uint => Funder) public funders;
    address[] public funders;

    uint256 public funderCount = 0;

    // enum StakingStatus { WaitingToStake, StakingHasBegun, StakingHasEnded }
    struct StakingStatus {
        bool WaitingToStake;
        bool StakingHasBegun;
        bool StakingHasEnded;
    }
    StakingStatus public status;

    constructor() {
        contractOwner = msg.sender;
        status.WaitingToStake = true;
    }
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "UNAUTHORIZED!!");
        if (msg.sender != contractOwner) revert NotOwner();
        _;
    }

    event Withdraw(address _contractOwner, uint256 value);
    event Fund(address sender, uint256 value);


    function fund() public payable {
        // require(
        //     msg.value.getConversionRate() >= MINIMUM_USD,
        //     "You need to spend more avax"
        // );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
        emit Fund(msg.sender, msg.value);
        // addFunder(msg.sender, msg.value);
    }

    function getFunderBalance(address _funderAddress) public view returns(uint256){
        uint256 balance = addressToAmountFunded[_funderAddress];
        return balance;
    }

    // function addFunder(address _funderAddress, uint256 _amountFunded) internal returns(uint256){
    //     funderCount+=1;
    //     // funders.push(Funder(funderCount, _funderAddress, _amountFunded));
    //     return funderCount;
    // }
    
    // function activate() external onlyOwner returns (bool) {
    //     status.StakingHasBegun = true;
    //     return status.StakingHasBegun;
    // }

    // function stakingStarted() external returns (bool) {
    //     status.StakingHasBegun = true;
    //     return status.StakingHasBegun;
    // }

    // function stakingEnded() public returns(bool){
    //     function incomplete
    //     if (numberOfDaysSinceStakingBegan == StakingPeriod) {
    //         status.StakingHasEnded;
    //         return status.StakingHasEnded;
    //     } else {
    //         return false;
    //     }
    // }

    function withdraw() external onlyOwner {
        //loop through the funders array and set their amount funded to zero
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
        // funders = new address[](0);
        //transfer funds to owner
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
        emit Withdraw(msg.sender, address(this).balance);
    }

    //contract recieves avax
    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

    //function to check contract's balance
    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
