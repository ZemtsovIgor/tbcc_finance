import React from 'react'
import { useFetchPairPrices } from 'state/swap/hooks'
import { Currency } from '../../../../sdk'
import BnbWbnbNotice from './BnbWbnbNotice'
import { BNB_ADDRESS } from './constants'
import NoChartAvailable from './NoChartAvailable'
import PriceChart from './PriceChart'
import { getTokenAddress } from './utils'

type PriceChartContainerProps = {
  inputCurrencyId: string
  inputCurrency: Currency
  outputCurrencyId: string
  outputCurrency: Currency
  currentSwapPrice: {
    [key: string]: number
  }
  isMobile?: boolean
  isChartDisplayed?: boolean
}

const PriceChartContainer: React.FC<PriceChartContainerProps> = ({
  inputCurrencyId,
  inputCurrency,
  outputCurrency,
  outputCurrencyId,
  currentSwapPrice,
  isMobile,
  isChartDisplayed,
}) => {

  const token0Address = getTokenAddress(inputCurrencyId)
  const token1Address = getTokenAddress(outputCurrencyId)

  const { pairPrices, pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow: 0,
    currentSwapPrice,
  })

  if (!isChartDisplayed) {
    return null
  }

  const isBnbWbnb = token0Address === BNB_ADDRESS && token1Address === BNB_ADDRESS

  if (isBnbWbnb) {
    return <BnbWbnbNotice />
  }

  // Sometimes we might receive array full of zeros for obscure tokens while trying to derive data
  // In that case chart is not useful to users
  const isBadData =
    pairPrices &&
    pairPrices.length > 0 &&
    pairPrices.every(
      (price) => !price.value || price.value === 0 || price.value === Infinity || Number.isNaN(price.value),
    )

  // If results did came back but as empty array - there is no data to display
  if ((!!pairPrices && pairPrices.length === 0) || isBadData || !pairId) {
    return (
      <NoChartAvailable
        token0Address={token0Address}
        token1Address={token1Address}
        pairAddress={pairId}
        isMobile={isMobile}
      />
    )
  }

  return (
    <PriceChart
      token0Address={token0Address}
      token1Address={token1Address}
      inputCurrency={inputCurrency}
      outputCurrency={outputCurrency}
      isMobile={isMobile}
      currentSwapPrice={currentSwapPrice}
    />
  )
}

export default React.memo(PriceChartContainer)
