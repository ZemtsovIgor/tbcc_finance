import React from 'react'
import BigNumber from 'bignumber.js'
import { Skeleton } from '../../../../uikit'
import {WhiteText} from "./TableRow";

export interface LiquidityProps {
  liquidity: BigNumber
}

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const displayLiquidity =
    liquidity && liquidity.gt(0) ? (
      `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    ) : (
      <Skeleton width={60} />
    )

  return (
    <WhiteText>
      {displayLiquidity}
    </WhiteText>
  )
}

export default Liquidity
