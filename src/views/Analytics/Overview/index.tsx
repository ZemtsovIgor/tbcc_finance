import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { fromUnixTime } from 'date-fns'
import { useTranslation } from 'contexts/Localization'
import LineChart from 'views/Analytics/components/InfoCharts/LineChart'
import PoolTable from 'views/Analytics/components/InfoTables/PoolsTable'
import { formatAmount } from 'views/Analytics/utils/formatInfoNumbers'
import BarChart from 'views/Analytics/components/InfoCharts/BarChart'
import {
  useAllTokenData, useAllPoolData,
  useProtocolChartData, useProtocolTransactions,
} from 'state/info/hooks'
import TransactionTable from 'views/Analytics/components/InfoTables/TransactionsTable'
import { Flex, Box, Text, Heading, Card, Skeleton, useMatchBreakpoints } from '../../../uikit'
import Page from '../../Page'
import TokenTable from '../components/InfoTables/TokensTable'

export const ChartCardsContainer = styled(Flex)<{ isMobile?: boolean }>`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: ${({ isMobile }) => isMobile ? '0 12px' : '0'};
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`
const Container = styled(Flex)<{ isMobile?: boolean }>`
	padding-left: ${({ isMobile }) => isMobile ? '0px' : '270px'};
	padding-right: ${({ isMobile }) => isMobile ? '0px' : '30px'};
	width: 100%;
	max-width: 1640px;
	margin: 0 auto;
	justify-content: center;
	@media (min-width: 1640px) {
		padding: 0;
	}
`

const PageContainer = styled.div<{isMobile?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  margin: ${({isMobile}) => isMobile ? '0 auto' : '80px auto'};
  padding: ${({isMobile}) => isMobile ? '20px 23px' : '0'};
  padding-bottom:  ${({isMobile}) => isMobile ? '0' : '40px '};
  position: relative;
  z-index: 10;
  `

const StyledHeading = styled(Heading)<{isMobile?: boolean}>`
  display: flex;
  flex-direction: ${({isMobile}) => isMobile ? 'column' : 'row'};
  align-items: ${({isMobile}) => isMobile ? 'flex-start' : 'center'};
  justify-content: space-between;
  color: #FFF;
  padding: ${({isMobile}) => isMobile ? '0 12px' : '0'};
  width: 100%;
  `

const Overview: React.FC = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [volumeDateHover, setVolumeDateHover] = useState<string | undefined>()
  const [transactions] = useProtocolTransactions()
  const [tokenChartData] = useProtocolChartData()

  const currentDate = new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' })

  // Getting latest liquidity and volumeUSD to display on top of chart when not hovered
  const formattedLiquidityData = useMemo(() => {
    if (tokenChartData) {
      return tokenChartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.liquidityUSD,
        }
      })
    }
    return []
  }, [tokenChartData])

  const getLatestLiquiditValueDisplay = () => {
    let valueToDisplay = null
    if (liquidityHover) {
      valueToDisplay = formatAmount(liquidityHover)
    } else if (formattedLiquidityData.length > 0) {
      valueToDisplay = formatAmount(formattedLiquidityData[formattedLiquidityData.length - 1]?.value)
    }

    return valueToDisplay ? (
      <Text bold fontSize="32px" color='#FFF'>
        ${valueToDisplay}
      </Text>
    ) : (
      <Skeleton width="128px" height="36px" />
    )
  }

  const formattedVolumeData = useMemo(() => {
    if (tokenChartData) {
      return tokenChartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [tokenChartData])

  const getLatestVolumeValueDisplay = () => {
    let valueToDisplay = null
    if (volumeHover) {
      valueToDisplay = formatAmount(volumeHover)
    } else if (formattedVolumeData.length > 0) {
      valueToDisplay = formatAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value)
    }

    return valueToDisplay ? (
      <Text bold fontSize="32px" color='#FFF'>
        ${valueToDisplay}
      </Text>
    ) : (
      <Skeleton width="128px" height="36px" />
    )
  }

  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token)
  }, [allTokens])

  const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter((pool) => pool)
  }, [allPoolData])

  const somePoolsAreLoading = useMemo(() => {
    return Object.values(poolDatas).some((pool) => !pool)
  }, [poolDatas])

  return (
    <Page>
      <Container isMobile>
        <PageContainer>

          <StyledHeading fontSize='36px' mb="16px" fontWeight='600' id="info-overview-title" isMobile={isMobile}>
            {t('Analytics')}
          </StyledHeading>
          <ChartCardsContainer mt={isMobile ? '12px' : '18px'} mb="20px" isMobile={isMobile}>
            <Card>
              <Box p={isMobile ? '21px 5px 0 21px' : '16px 16px 24px'}>
                <Text fontSize='18px' fontWeight='400' color="rgba(255, 255, 255, 0.6)">
                  {t('Liquidity')}
                </Text>
                <Flex width='100%' alignItems='flex-start' justifyContent='space-between'>
                  {getLatestLiquiditValueDisplay()}
                  <Text fontSize='16px' fontWeight='600' color="#FFF">{liquidityDateHover ?? currentDate}</Text>
                </Flex>
                <Box height={isMobile ? '200px' : '250px'}>
                  <LineChart
                    data={formattedLiquidityData}
                    setHoverValue={setLiquidityHover}
                    setHoverDate={setLiquidityDateHover}
                  />
                </Box>
              </Box>
            </Card>
            <Card>
              <Box p={isMobile ? '21px 5px 0 21px' : '16px 16px 24px'}>
                <Text fontSize='18px' fontWeight='400' color="rgba(255, 255, 255, 0.6)">
                  {t('Volume')}
                </Text>
                <Flex width='100%' alignItems='flex-start' justifyContent='space-between'>
                  {getLatestVolumeValueDisplay()}
                  <Text fontSize='16px' fontWeight='600' color="#FFF">{volumeDateHover ?? currentDate}</Text>
                </Flex>
                <Box height={isMobile ? '200px' : '250px'}>
                  <BarChart data={formattedVolumeData} setHoverValue={setVolumeHover} setHoverDate={setVolumeDateHover} />
                </Box>
              </Box>
            </Card>
          </ChartCardsContainer>

          <TokenTable tokenDatas={formattedTokens} />

          <PoolTable poolDatas={poolDatas} maxItems={5} loading={somePoolsAreLoading} />

          <TransactionTable transactions={transactions} />

        </PageContainer>
      </Container>
    </Page>
  )
}

export default Overview
