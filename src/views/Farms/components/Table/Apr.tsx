import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import ApyButton from '../Cards/ApyButton'
import { Skeleton } from '../../../../uikit'
import {PATHS} from "../../../../config/paths";
import {ViewMode} from "../../../../state/user/actions";

export interface AprProps {
  value: string
  multiplier: string
  pid: number
  lpLabel: string
  lpSymbol: string
  tokenAddress?: string
  quoteTokenAddress?: string
  tftPrice: BigNumber
  originalValue: number
  hideButton?: boolean
  viewMode: ViewMode
}

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  pid,
  lpLabel,
  lpSymbol,
  multiplier,
  tokenAddress,
  quoteTokenAddress,
  tftPrice,
  originalValue,
  viewMode,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${PATHS.ADD_LIQUIDITY}/${liquidityUrlPathParts}`

  return originalValue !== 0 ? (
    <>
      {originalValue ? (
        <ApyButton
          pid={pid}
          lpSymbol={lpSymbol}
          lpLabel={lpLabel}
          multiplier={multiplier}
          tftPrice={tftPrice}
          apr={originalValue}
          displayApr={value}
          addLiquidityUrl={addLiquidityUrl}
          viewMode={viewMode}
        />
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </>
  ) : (
      <AprWrapper>{originalValue}%</AprWrapper>
  )
}

export default Apr
