// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./PriceConverter.sol";

error NotOwner();
error InsufficientStake(uint256 _minAVAX);
error StakingPeriodElapsed();
error StakeBeingUsed();
error ZeroStakeBalance();

/// @title StakeHolder
/// @author Shootfish XYZ
contract StakeHolder is Ownable, ReentrancyGuard {
    /// @todo add natspec comments to functions in this contract
    using PriceConverter for uint256;

    uint8 private constant DECIMALS = 18;
    uint256 private constant STAKING_PERIOD = 365 days;
    uint256 private constant MINIMUM_USD = 100 * (10**DECIMALS);

    uint256 public totalStake;
    address[] private stakers;
    mapping(address => uint256) private amountStaked;

    enum Action {
        FUND,
        WITHDRAW
    }
    enum StakingStatus {
        PENDING,
        IN_STAKE,
        ENDED
    }
    StakingStatus public stakingStatus;

    constructor() {
        stakingStatus = StakingStatus.PENDING;
    }

    /* View Functions */
    function getTotalStake() external view returns (uint256 balance) {
        balance = totalStake;
    }

    /* Public & External Functions */
    function fund() public payable nonReentrant {
        if (stakingStatus != StakingStatus.PENDING) {
            revert StakingPeriodElapsed();
        }
        if (msg.value.getUsdAmount() < MINIMUM_USD) {
            revert InsufficientStake(MINIMUM_USD.getAvaxAmount());
        }

        amountStaked[msg.sender] += msg.value;
        totalStake += msg.value;
        _sync(msg.sender, Action.FUND);
    }

    function withdraw() external nonReentrant {
        if (stakingStatus == StakingStatus.IN_STAKE) {
            revert StakeBeingUsed();
        }
        if (amountStaked[msg.sender] == 0) {
            revert ZeroStakeBalance();
        }

        // cache staked amount
        uint256 stake = amountStaked[msg.sender];
        amountStaked[msg.sender] = 0;
        totalStake -= stake;
        (bool success, ) = payable(msg.sender).call{value: stake}("");
        require(success, "Call failed");
        _sync(msg.sender, Action.WITHDRAW);
    }

    /* Owner Functions */
    function modifyStatus(StakingStatus _status)
        external
        onlyOwner
        returns (StakingStatus currentStatus)
    {
        stakingStatus = _status;
        currentStatus = stakingStatus;
    }

    /* Private Functions */
    function _sync(address _account, Action _action) private {
        uint256 lastIndex = stakers.length - 1;

        if (_action == Action.FUND) {
            for (uint256 i = 0; i < stakers.length; ) {
                if (stakers[i] == _account) {
                    break;
                } else if (i == lastIndex) {
                    stakers.push(_account);
                }

                unchecked {
                    ++i;
                }
            }
        } else if (_action == Action.WITHDRAW) {
            for (uint256 i = 0; i < stakers.length; ) {
                if (stakers[i] == _account) {
                    if (i != lastIndex) {
                        stakers[i] = stakers[lastIndex];
                    }
                    stakers.pop();
                    break;
                }

                unchecked {
                    ++i;
                }
            }
        }
    }

    //contract recieves avax
    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}
