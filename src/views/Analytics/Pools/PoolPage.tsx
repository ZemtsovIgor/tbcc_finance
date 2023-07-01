/* eslint-disable no-nested-ternary */
import React, {useEffect, useMemo, useState} from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import styled from 'styled-components'
import Page from 'views/Page'
import { CurrencyLogo } from 'components/Logo'
import { formatAmount } from 'views/Swap/utils/formatInfoNumbers'
import {usePoolDatas, usePoolChartData, useTokenData, useProtocolTransactions} from 'state/info/hooks'
import { useTranslation } from 'contexts/Localization'
import { fromUnixTime } from 'date-fns'
import {
  Text,
  Skeleton,
  Flex,
  Heading,
  Card, Box, useMatchBreakpoints
} from '../../../uikit'
import { PATHS } from '../../../config/paths'
import { PoolUpdater, TokenUpdater } from '../../../state/info/updaters'
import LineChart from "../components/InfoCharts/LineChart";
import BarChart from "../components/InfoCharts/BarChart";
import TransactionTable from "../components/InfoTables/TransactionsTable";

const ValueFlex = styled(Flex)<{isMobile?: boolean}>`
  justify-content: space-between;
  align-items: center;
  background: rgba(228, 228, 245, 0.3);
  border-radius: 6px;
  margin-bottom: 14px;
  width: 100%;
  height: ${({isMobile}) => isMobile ? '50px' : '90px'};
  padding: ${({isMobile}) => isMobile ? '0 20px' : '20px'};
`

const PoolInfoCard = styled.div<{isMobile?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FFF;
  border-radius: 12px;
  padding: ${({isMobile}) => isMobile ? '12px 16px' : '36px 40px'};
  min-width: ${({isMobile}) => isMobile ? '100%' : '420px'};`

const ChartCardsContainer = styled.div<{isMobile?: boolean}>`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
`

const ChartCardTabs = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #E4E4F5;
`
const ChartCardTabItem = styled.div<{isActive?: boolean}>`
  font-size: 14px;
  font-weight: ${({isActive}) => isActive ? '600' : '400'};
  line-height: 49px;
  color: ${({isActive}) => isActive ? '#292929' : '#525263'};
  border-bottom: ${({isActive}) => isActive ? '2px solid #4E89E3' : ''};
  padding: 10px 30px;
  cursor: pointer;
`

const NotFilledLink = styled.div<{isMobile?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({isMobile}) => isMobile ? '95%' : '100%'};
  height: 45px;
  border-radius: 25px;
  border: 2px solid #4E89E3;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #4E89E3;
  cursor: pointer;
  text-transform: uppercase;
`

const FilledLink = styled(NotFilledLink)<{isMobile?: boolean}>`
  border: none;
  background-color: #4E89E3;
  color: #fff;
  margin-right: 0;
`

const PoolPage: React.FC<RouteComponentProps<{ address: string }>> = ({
  match: {
    params: { address: routeAddress },
  },
}) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const { isMobile } = useMatchBreakpoints()

  // Needed to scroll up if user comes to this page by clicking on entry in the table
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // In case somebody pastes checksummed address into url (since GraphQL expects lowercase address)
  const address = routeAddress.toLowerCase()

  const poolData = usePoolDatas([address])[0]
  const USDTData = usePoolDatas(['0x6fc06dd1d630acbbdd1b035e1b790af924a7850d'])[0]
  const chartData = usePoolChartData(address)
  const priceUSDTBCC = USDTData?.token0?.address === '0x55d398326f99059ff775485246999027b3197955' ? USDTData?.token1Price : USDTData?.token0Price
  const [transactions] = useProtocolTransactions()

  const currencyTBCC: any = useTokenData('0xf29480344d8e21efeab7fde39f8d8299056a7fea')
  const currentDate = new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' })

  const poolCurrency:any = {
    currency: poolData?.token0?.address === currencyTBCC?.address ? poolData?.token1 : poolData?.token0,
    price: poolData?.token0?.address === currencyTBCC?.address ? poolData?.token0Price : poolData?.token1Price,
  };

  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [volumeDateHover, setVolumeDateHover] = useState<string | undefined>()
  const [activeTab, setActiveTab] = useState(1)

  poolCurrency.currencyAddress = useTokenData(poolCurrency?.currency?.address)

  // Getting latest liquidity and volumeUSD to display on top of chart when not hovered
  useEffect(() => {
    if (volumeHover == null && poolData) {
      setVolumeHover(poolData.volumeUSD)
    }
  }, [poolData, volumeHover])
  useEffect(() => {
    if (liquidityHover == null && poolData) {
      setLiquidityHover(poolData.liquidityUSD)
    }
  }, [liquidityHover, poolData])

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

  return (
    <>
      <PoolUpdater />
      <TokenUpdater />
      <Box style={{backgroundColor: '#F0F3FE'}}>
        <Page style={{padding: isMobile ? '18px 20px' : '54px 26px 42px 26px', display: 'flex', flexDirection: 'column'}}>
          {poolData ? (
            <>
              <Flex
                alignItems="center"
                mb={isMobile ? '34px' : ''}
                alignSelf='flex-start'
                mt={isMobile ? '10px' : ''}>
                <Heading fontSize='28px' display="flex" lineHeight="32px" color="#505050" >
                  {`${poolCurrency.currencyAddress?.symbol} pool`}
                </Heading>
              </Flex>
              <Flex
                display='inline-flex'
                alignSelf={isMobile ? '' : 'flex-end'}
                width={isMobile ? '100%' : ''}
                position={isMobile ? 'sticky' : 'relative'}
                top={isMobile ? '0' : '-40px'}
                mb={isMobile ? '21px' : ''}>
                <Link to={`${PATHS.LIQUIDITY}`} style={{width: isMobile ? '100%' : '140px', marginRight: isMobile ? '' : '15px'}} >
                  <NotFilledLink isMobile={isMobile}>
                    {t('Add liquditi')}
                  </NotFilledLink>
                </Link>
                <Link to={`${PATHS.SWAP}`} style={{width: isMobile ? '100%' : '90px'}}>
                  <FilledLink isMobile={isMobile}>
                    {t('TRADE')}
                  </FilledLink>
                </Link>
              </Flex>

              <Flex
                flexDirection={isMobile ? 'column' : 'row'}
                width="100%"
                mb="40px"
                style={{ gap: isMobile ? '23px' : '15px' }}>
                <PoolInfoCard isMobile={isMobile}>
                  <Text
                    fontSize={isMobile ? '22px' : '24px'}
                    lineHeight={isMobile ? '22px' : ''}
                    fontWeight='500'
                    display='flex'
                    style={{alignItems: 'center'}}
                    mb={isMobile ? '8px' : '44px'}>
                     < CurrencyLogo currency={poolCurrency.currencyAddress} size="32px" />
                     &nbsp;
                     1&nbsp;{`${poolCurrency.currencyAddress?.symbol}`}&nbsp;=
                     &nbsp;
                     <CurrencyLogo currency={currencyTBCC} size="32px" />
                     &nbsp;
                     {`${formatAmount(poolCurrency.price)}`}&nbsp;TBCC
                  </Text>

                  <ValueFlex isMobile={isMobile}>
                    <Text fontSize='18px' color='rgba(82, 82, 99, 0.6)'>
                      {t('Dynamics 7 days')}
                    </Text>
                    <Text fontSize='18px' color='#0ECB81'>
                      +{formatAmount(poolData.lpApr7d)}
                    </Text>
                  </ValueFlex >
                  <ValueFlex isMobile={isMobile}>
                    <Text fontSize='18px' color='rgba(82, 82, 99, 0.6)'>
                      {t('Volume in 24 hours')}
                    </Text>
                    <Text fontSize='18px' color='#525263'>
                      {formatAmount(poolData.volumeUSD * priceUSDTBCC)}
                    </Text>
                  </ValueFlex>
                  <ValueFlex isMobile={isMobile}>
                    <Text fontSize='18px' color='rgba(82, 82, 99, 0.6)'>
                      {t('Volume in 7 days')}
                    </Text>
                    <Text fontSize='18px' color='#525263'>
                      {formatAmount(poolData.volumeUSDWeek * priceUSDTBCC)}
                    </Text>
                  </ValueFlex>
                </PoolInfoCard>

                <ChartCardsContainer isMobile={isMobile}>
                  <ChartCardTabs>
                    <ChartCardTabItem isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
                      {t('VOLUME')}
                    </ChartCardTabItem>
                    <ChartCardTabItem isActive={activeTab === 2} onClick={() => setActiveTab(2)}>
                      {t('LIQUIDITY')}
                    </ChartCardTabItem>
                  </ChartCardTabs>
                  {activeTab === 1
                    ? <Card background='#fff' style={{height: '100%'}}>
                      <Box p={isMobile ? '29px 15px 8px 29px' : '45px'}>
                        <Text bold color="rgba(82, 82, 99, 0.6)">
                          {t('Volume 24H')}
                        </Text>
                        {volumeHover > 0 ? (
                          <Text bold fontSize="32px" color='#4E89E3'>
                            ${formatAmount(volumeHover)}
                          </Text>
                        ) : (
                          <Skeleton width="128px" height="36px" />
                        )}
                        <Text color="rgba(82, 82, 99, 0.6)">{volumeDateHover ?? currentDate}</Text>
                        <Box height={isMobile ? '185px' : '250px'}>
                          <BarChart data={formattedVolumeData} setHoverValue={setVolumeHover} setHoverDate={setVolumeDateHover} />
                        </Box>
                      </Box>
                    </Card>
                    :   <Card background='#fff'>
                      <Box p={isMobile ? '29px 15px 8px 29px' : '45px'}>
                        <Text bold color="rgba(82, 82, 99, 0.6)">
                          {t('Liquidity')}
                        </Text>
                        {liquidityHover > 0 ? (
                          <Text bold fontSize="32px" color='#4E89E3'>
                            ${formatAmount(liquidityHover)}
                          </Text>
                        ) : (
                          <Skeleton width="128px" height="36px" />
                        )}
                        <Text color="rgba(82, 82, 99, 0.6)">{liquidityDateHover ?? currentDate}</Text>
                        <Box height={isMobile ? '185px' : '250px'}>
                          <LineChart
                            data={formattedTvlData}
                            setHoverValue={setLiquidityHover}
                            setHoverDate={setLiquidityDateHover}
                          />
                        </Box>
                      </Box>
                    </Card>
                  }

                </ChartCardsContainer>
               </Flex>
            </>
          ) : null}
          <Heading fontSize='28px' mt={isMobile ? '7px' : '26px'} mb={isMobile ? '8px' : '26px'} mr='auto'>
            {t('Transactions')}
          </Heading>
          <TransactionTable transactions={transactions} />
        </Page>
      </Box>
    </>
  )
}

export default PoolPage
