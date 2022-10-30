// SPDX-License-Identifier: MIT
pragma solidity  >=0.6.6;

contract StakeHolder {
    address public immutable contractOwner;
    uint256 constant public StakingPeriod = 365;
    // keep track of the number of days that have passed since staking began
    uint256 public numberOfDaysSinceStakingBegan;
    // keep track of funders
    struct Funder {
        address fundersAddress;
        uint258 amountFunded;
    }
    Funder [] public funders;
    enum StakingStatus { WaitingToStake, StakingHasBegun, StakingHasEnded};
    StakingStatus public status;
    constructor() {
        contractOwner = msg.sender;
        status = StakingStatus.WaitingToStake;
    };

    function activate() public {
        status = StakingStatus.StakingHasBegun;
    };

    function isActive() public returns(bool){
        return status == Status.StakingHasBegun;
    }
    function stakingEnded() public returns(bool){
        if (numberOfDaysSinceStakingBegan == StakingPeriod) {
            status = Status.StakingHasEnded;
            return status == Status.StakingHasEnded;
        } else {
            return false;
        }
    }
}