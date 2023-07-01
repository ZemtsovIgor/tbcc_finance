import cloneDeep from 'lodash/cloneDeep'
import { useTranslation } from 'contexts/Localization'
import React, { lazy, Suspense, useState } from 'react'
import { useFetchPairPrices } from 'state/swap/hooks'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import { LineChartLoader } from '../ChartLoaders'
import { Box, ButtonMenu, ButtonMenuItem, Flex, Text } from '../../../../uikit'
import NoChartAvailable from './NoChartAvailable'
import { getTimeWindowChange } from './utils'

const SwapLineChart = lazy(() => import('./SwapLineChart'))

const BasicChart = ({ token0Address, token1Address, isMobile, currentSwapPrice, setHoverValue, hasData, setHasData }) => {
  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0)

  const { pairPrices = [], pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })

  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const { changePercentage, changeValue } = getTimeWindowChange(pairPrices)
  const isChangePositive = changeValue >= 0
  const chartHeight = isMobile ? '362px' : '622px'
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const currentDate = new Date().toLocaleString(locale, {
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  // Sometimes we might receive array full of zeros for obscure tokens while trying to derive data
  // In that case chart is not useful to users
  const isBadData =
    pairPrices &&
    pairPrices.length > 0 &&
    pairPrices.every(
      (price) => !price.value || price.value === 0 || price.value === Infinity || Number.isNaN(price.value),
    )

  if (isBadData) {
    if (hasData) {
      setHasData(false);
    }
    return (
      <NoChartAvailable
        token0Address={token0Address}
        token1Address={token1Address}
        pairAddress={pairId}
        isMobile={isMobile}
      />
    )
  }

  const newPairPrices = pairPrices.map((pair) => {
    const newPair = cloneDeep(pair)
    newPair.value = Number(pair.value.toFixed(6))
    return newPair
  })

  if (!hasData && newPairPrices.length) {
    setHasData(true);
  }

  return (
    <>
      {
        (hasData) ? (
          <Flex
            flexDirection={['column', null, null, null, null, null, 'row']}
            alignItems={['flex-start', null, null, null, null, null, 'center']}
            justifyContent="space-between"
            px={isMobile ? '18px' : '21px'}
            mb={isMobile ? '18px' : '0'}
          >
            <Flex flexDirection="row" pt="12px" mb={isMobile ? '12px' : '0'}>
              <Text color={isChangePositive ? '#2DC96C' : '#ed4b9e'} mr="12px" fontSize="15px" lineHeight="16px">
                {`${isChangePositive ? '+' : ''}${Number(changeValue) ? changeValue.toFixed(3) : 0}`}
              </Text>
              <Text color={isChangePositive ? '#2DC96C' : '#ed4b9e'} mr="12px" fontSize="15px" lineHeight="16px">
                {`${Number(changePercentage) ? changePercentage : 0}%`}
              </Text>
              <Text fontSize="15px" color="#505050" lineHeight="16px">
                {` на ${hoverDate || currentDate}`}
              </Text>
            </Flex>
            <Box>
              <ButtonMenu activeIndex={timeWindow} onItemClick={setTimeWindow} scale="sm" mt="6px">
                <ButtonMenuItem>{t('24H')}</ButtonMenuItem>
                <ButtonMenuItem>{t('1W')}</ButtonMenuItem>
                <ButtonMenuItem>{t('1M')}</ButtonMenuItem>
                <ButtonMenuItem>{t('1Y')}</ButtonMenuItem>
              </ButtonMenu>
            </Box>
          </Flex>
        ) : null
      }
      <Box height={chartHeight} p={isMobile ? '0 14px' : '16px'} width="100%">
        <Suspense fallback={<LineChartLoader />}>
          <SwapLineChart
            data={newPairPrices}
            setHoverValue={setHoverValue}
            setHoverDate={setHoverDate}
            isChangePositive={isChangePositive}
            timeWindow={timeWindow}
          />
        </Suspense>
      </Box>
    </>
  )
}

export default React.memo(BasicChart, (prev, next) => {
  return (
    prev.token0Address === next.token0Address &&
    prev.token1Address === next.token1Address &&
    prev.isMobile === next.isMobile &&
    prev.setHoverValue === next.setHoverValue &&
    prev.hasData === next.hasData &&
    prev.setHasData === next.setHasData &&
    ((prev.currentSwapPrice !== null &&
      next.currentSwapPrice !== null &&
      prev.currentSwapPrice[prev.token0Address] === next.currentSwapPrice[next.token0Address] &&
      prev.currentSwapPrice[prev.token1Address] === next.currentSwapPrice[next.token1Address]) ||
      (prev.currentSwapPrice === null && next.currentSwapPrice === null))
  )
})
