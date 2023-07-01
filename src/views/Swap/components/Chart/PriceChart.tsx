import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import React, { useState } from 'react'
import { Flex, Text } from '../../../../uikit'
import BasicChart from './BasicChart'
import { StyledPriceChart } from './styles'
import { useFetchPairPrices } from '../../../../state/swap/hooks'
import { PairDataTimeWindowEnum } from '../../../../state/swap/types'
import { formatAmount, formatAmountNotation } from '../../utils/formatInfoNumbers'

const PriceChart = ({ inputCurrency, outputCurrency, isMobile, token0Address, token1Address, currentSwapPrice }) => {
  const [timeWindow] = useState<PairDataTimeWindowEnum>(0)
  const { pairPrices = [] } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })
  const [hasData, setHasData] = useState<boolean>(false)
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const valueToDisplay = hoverValue || pairPrices[pairPrices.length - 1]?.value
  const formatOptions = {
    notation: 'standard' as formatAmountNotation,
    displayThreshold: 0.00001,
    tokenPrecision: true,
  }

  return (
    <StyledPriceChart
      height="70%"
      overflow="unset"
      isMobile={isMobile}
    >
      <Flex justifyContent="space-between" px={isMobile ? '18px' : '21px'} mb={isMobile ? '2px' : '0'}>
        <Flex alignItems="center">

          {outputCurrency ? (
            <DoubleCurrencyLogo currency0={inputCurrency} currency1={outputCurrency} size={32} margin />
          ) : (
            inputCurrency && <CurrencyLogo currency={inputCurrency} size="24px" style={{ marginRight: '8px' }} />
          )}

          {
            (hasData) ? (
              <Text fontSize="32px" mr="11px" color="#505050" fontWeight="500" lineHeight="32px">
                {formatAmount(valueToDisplay, formatOptions)}
              </Text>
            ) : null
          }

          {
            (inputCurrency) ? (
              <Text fontSize="20px" color="#505050" fontWeight="500" lineHeight="20px">
                {outputCurrency ? `${inputCurrency.symbol}/${outputCurrency.symbol}` : inputCurrency.symbol}
              </Text>
            ) : null
          }
        </Flex>
      </Flex>
      {/* {chartView === ChartViewMode.BASIC && ( */}
        <BasicChart
          token0Address={token0Address}
          token1Address={token1Address}
          isMobile={isMobile}
          currentSwapPrice={currentSwapPrice}
          setHoverValue={setHoverValue}
          setHasData={setHasData}
          hasData={hasData}
        />
      {/* )} */}
      {/* {chartView === ChartViewMode.TRADING_VIEW && ( */}
      {/*  <Fle */}
      {/*    flexDirection="column" */}
      {/*    justifyContent="space-between" */}
      {/*    height={isMobile ? '100%' : '650px'} */}
      {/*    pt="12px" */}
      {/*  > */}
      {/*    <TradingViewChart */}
      {/*      // unmount the whole component when symbols is changed */}
      {/*      key={`${inputCurrency?.symbol}-${outputCurrency?.symbol}`} */}
      {/*      inputSymbol={inputCurrency?.symbol} */}
      {/*      outputSymbol={outputCurrency?.symbol} */}
      {/*      onTwChartSymbol={handleTwChartSymbol} */}
      {/*      onTwChartError={handleTwChartError} */}
      {/*    /> */}
      {/*  </Flex> */}
      {/* )} */}
    </StyledPriceChart>
  )
}

export default PriceChart
