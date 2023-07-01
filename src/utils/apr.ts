import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, TFT_PER_YEAR } from 'config'
import lpAprs from 'config/constants/lpAprs.json'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new tft allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param tftPriceUsd TFT price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param farmAddress Farm Address
 * @returns Farm Apr
 */
export const getFarmApr = (
  poolWeight: BigNumber,
  tftPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
): { tftRewardsApr: number; lpRewardsApr: number } => {
  const yearlyTftRewardAllocation = poolWeight ? poolWeight.times(TFT_PER_YEAR) : new BigNumber(NaN)
  const tftRewardsApr = yearlyTftRewardAllocation.times(tftPriceUsd).div(poolLiquidityUsd).times(100)
  let tftRewardsAprAsNumber = null
  if (!tftRewardsApr.isNaN() && tftRewardsApr.isFinite()) {
    tftRewardsAprAsNumber = tftRewardsApr.toNumber()
  }
  const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
  return { tftRewardsApr: tftRewardsAprAsNumber, lpRewardsApr }
}

export default null
