import React, { useMemo, useState } from 'react'
import LineChart from 'views/Swap/components/InfoCharts/LineChart'
import BarChart from 'views/Swap/components/InfoCharts/BarChart'
import CandleChart from 'views/Swap/components/InfoCharts/CandleChart'
import { TabToggleGroup, TabToggle } from 'components/TabToggle'
import { useTranslation } from 'contexts/Localization'
import { formatAmount } from 'views/Swap/utils/formatInfoNumbers'
import { ChartEntry, TokenData, PriceChartEntry } from 'state/info/types'
import { fromUnixTime } from 'date-fns'
import { Text, Box, Card, Flex, Skeleton } from '../../../../../uikit'



enum ChartView {
  LIQUIDITY,
  VOLUME,
  PRICE,
}

interface ChartCardProps {
  variant: 'pool' | 'token'
  chartData: ChartEntry[]
  tokenData?: TokenData
  tokenPriceData?: PriceChartEntry[]
}


const ChartCard: React.FC<ChartCardProps> = ({ variant, chartData, tokenData, tokenPriceData }) => {
  const [view, setView] = useState(ChartView.VOLUME)
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const currentDate = new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' })

  const formattedTvlData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.liquidityUSD,
        }
      })
    }
    return []
  }, [chartData])
  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [chartData])

  const getLatestValueDisplay = () => {
    let valueToDisplay = null
    if (hoverValue) {
      valueToDisplay = formatAmount(hoverValue)
    } else if (view === ChartView.VOLUME && formattedVolumeData.length > 0) {
      valueToDisplay = formatAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value)
    } else if (view === ChartView.LIQUIDITY && formattedTvlData.length > 0) {
      valueToDisplay = formatAmount(formattedTvlData[formattedTvlData.length - 1]?.value)
    } else if (view === ChartView.PRICE && tokenData?.priceUSD) {
      valueToDisplay = formatAmount(tokenData.priceUSD)
    }

    return valueToDisplay ? (
      <Text fontSize="24px" bold>
        ${valueToDisplay}
      </Text>
    ) : (
      <Skeleton height="36px" width="128px" />
    )
  }
  return (
    <Card>
      <TabToggleGroup>
        <TabToggle isActive={view === ChartView.VOLUME} onClick={() => setView(ChartView.VOLUME)}>
          <Text color="rgba(255, 255, 255, 0.6)" >{t('Volume')}</Text>
        </TabToggle>
        <TabToggle isActive={view === ChartView.LIQUIDITY} onClick={() => setView(ChartView.LIQUIDITY)}>
          <Text color="rgba(255, 255, 255, 0.6)">{t('Liquidity')}</Text>
        </TabToggle>
        {variant === 'token' && (
          <TabToggle isActive={view === ChartView.PRICE} onClick={() => setView(ChartView.PRICE)}>
            <Text color="rgba(255, 255, 255, 0.6)">{t('Price')}</Text>
          </TabToggle>
        )}
      </TabToggleGroup>

      <Flex flexDirection="column" px="24px" pt="24px">
        {getLatestValueDisplay()}
        <Text small color="secondary">
          {hoverDate || currentDate}
        </Text>
      </Flex>

      <Box px="24px" height={variant === 'token' ? '250px' : '335px'}>
        {view === ChartView.LIQUIDITY ? (
          <LineChart data={formattedTvlData} setHoverValue={setHoverValue} setHoverDate={setHoverDate} />
        ) : view === ChartView.VOLUME ? (
          <BarChart data={formattedVolumeData} setHoverValue={setHoverValue} setHoverDate={setHoverDate} />
        ) : view === ChartView.PRICE ? (
          <CandleChart data={tokenPriceData} setValue={setHoverValue} setLabel={setHoverDate} />
        ) : null}
      </Box>
    </Card>
  )
}

export default ChartCard
