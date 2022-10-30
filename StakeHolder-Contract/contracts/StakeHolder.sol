// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract StakeHolder {
    using PriceConverter for uint256;

    address public immutable contractOwner;
    uint256 constant public StakingPeriod = 365;
    // keep track of the number of days that have passed since staking began
    uint256 public numberOfDaysSinceStakingBegan;
    uint256 public constant MINIMUM_USD = 100 * 10 ** 18;
    // keep track of funders
    // struct Funder {
    //     uint256 _id;
    //     address _fundersAddress;
    //     uint258 _amountFunded;
    // }
    mapping (address => uint256) public addressToAmountFunded;
    // mapping(uint => Funder) public funders;
    address[] public funders;

    uint256 public funderCount = 0;

    enum StakingStatus { WaitingToStake, StakingHasBegun, StakingHasEnded};
    StakingStatus public status;

    constructor() {
        contractOwner = msg.sender;
        status = StakingStatus.WaitingToStake;
    };

    function fund() public payable{
        require(msg.value.getConversionRate() >= MINIMUM_USD, "You need to spend more avax")
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function addFunder(address memory _funderAddress, uint256 memory _amountFunded){
        //incomplete, hold on for now
        funderCount+=1;
        funders[funderCount] = Funder(funderCount, _funderAddress, _amountFunded);

    };
    function activate() public returns(bool){
        status = StakingStatus.StakingHasBegun;
        return status == StakingStatus.StakingHasBegun;
    };

    modifier onlyOwner {
        require(msg.sender == contractOwner, "UNAUTHORIZED!!");
        if (msg.sender != contractOwner) revert NotOwner();
        _;
    }

    function isActive() public returns(bool){
        return status == Status.StakingHasBegun;
    };
    function stakingEnded() public returns(bool){
        if (numberOfDaysSinceStakingBegan == StakingPeriod) {
            status = Status.StakingHasEnded;
            return status == Status.StakingHasEnded;
        } else {
            return false;
        }
    };
    function withdraw() onlyOwner{
        //hold on for now
    };
    
}