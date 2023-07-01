/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Duration } from 'date-fns'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import useCMCLink from 'views/Swap/hooks/useCMCLink'
import { formatAmount } from 'views/Swap/utils/formatInfoNumbers'
import Percent from 'views/Swap/components/Percent'
import SaveIcon from 'views/Swap/components/SaveIcon'
import TransactionTable from 'views/Analytics/components/InfoTables/TransactionsTable'
import {
  useTokenData,
  useTokenChartData,
  useTokenPriceData,
  useAllPoolData,
  useProtocolTransactions,
} from 'state/info/hooks'
import { useWatchlistTokens } from 'state/user/hooks'
import { ONE_HOUR_SECONDS } from 'config/constants/info'
import { useTranslation } from 'contexts/Localization'
import ChartCard from '../components/InfoCharts/ChartCard'
import Page from '../../Page'
import {
  Text,
  Box,
  Button,
  Card,
  Flex,
  Link as UIKitLink,
  LinkExternal,
  Spinner,
  Heading, useMatchBreakpoints,
} from '../../../uikit'
import PoolTable from "../components/InfoTables/PoolsTable";

const ContentLayout = styled.div<{ isMobile: boolean }>`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 320px 1fr;
  padding: ${({isMobile}) => isMobile ? '10px 12px 10px 10px' : '20px 10px 0px 10px'};
  grid-gap: 1em;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`

const StyledCMCLink = styled(UIKitLink)`
  width: 24px;
  height: 24px;
  margin-right: 8px;

  & :hover {
    opacity: 0.8;
  }
`
const StyledCard = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;
  padding:30px 20px 30px 35px;
`
const TableContainer = styled(Box)`
  margin-top: 30px;
`
export const StyledBtn = styled(Button)<{ isMobile: boolean }>`
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border: none;
  box-shadow: none;
  border-radius: 6px;
  color: #FFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  align-items: center;
`
export const StyledAddLiquidity = styled(Button)<{ isMobile: boolean }>`
  width: 140px;
  height: 50px;
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  box-shadow: none;
  color: #FFF;
  border-radius: 6px;
  border: none;
  position: relative;
  margin-right: 17px;
  margin-left: 17px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    border: 2px solid transparent;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%) border-box;
    mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;

  }


`
const Container = styled(Flex)<{ isMobile?: boolean }>`
  padding-left: ${({ isMobile }) => isMobile ? '0px' : '100px'};
  padding-right: ${({ isMobile }) => isMobile ? '0px' : '50px'};
  width: 100%;
  max-width: 1640px;
  margin: 0 auto;
  justify-content: center;
  @media (min-width: 375px) {
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
const HeaderContainer = styled(Flex)<{isMobile?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: ${({isMobile}) => isMobile ? '10px' : '0'};
`
const StyledHeading = styled(Heading)<{isMobile?: boolean}>`
  display: flex;
  flex-direction: ${({isMobile}) => isMobile ? 'column' : 'row'};
  align-items: ${({isMobile}) => isMobile ? 'flex-start' : 'center'};
  justify-content: space-between;
  color: #FFF;
  padding: ${({isMobile}) => isMobile ? '0 7px' : '0'};
  margin-right: 20px;
  line-height: 1em;
  margin-bottom: 0;
 
`
const TxtContainer = styled(Flex)<{ isMobile: boolean }>`
  background: transparent;
  justify-content: space-between;
  font-size:20px;
  margin-left: ${({isMobile}) => isMobile ? '10px' : '0'};
`
const PercentBackground = styled(Flex)<{value: number}>`
  background: ${({value}) => value < 0 ? 'rgba(247,47,114,0.2)' : 'rgba(32,201,151,0.2)'};
  border-radius: 6px;
  padding:4px 5px 4px 5px;
`

const DEFAULT_TIME_WINDOW: Duration = { weeks: 1 }

const TokenPage: React.FC<RouteComponentProps<{ address: string }>> = ({
  match: {
    params: { address: routeAddress },
  },
}) => {
  const { t } = useTranslation()

  // Needed to scroll up if user comes to this page by clicking on entry in the table
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // In case somebody pastes checksummed address into url (since GraphQL expects lowercase address)
  const address = routeAddress.toLowerCase()

  const cmcLink = useCMCLink(address)

  const tokenData = useTokenData(address)

  const [transactions] = useProtocolTransactions()
  const chartData = useTokenChartData(address)

  // pricing data
  const priceData = useTokenPriceData(address, ONE_HOUR_SECONDS, DEFAULT_TIME_WINDOW)
  const adjustedPriceData = useMemo(() => {
    // Include latest available price
    if (priceData && tokenData && priceData.length > 0) {
      return [
        ...priceData,
        {
          time: new Date().getTime() / 1000,
          open: priceData[priceData.length - 1].close,
          close: tokenData?.priceUSD,
          high: tokenData?.priceUSD,
          low: priceData[priceData.length - 1].close,
        },
      ]
    }
    return undefined
  }, [priceData, tokenData])

  const allPoolData = useAllPoolData()
  const { isMobile } = useMatchBreakpoints()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter((pool) => pool)
  }, [allPoolData])
  const somePoolsAreLoading = useMemo(() => {
    return Object.values(poolDatas).some((pool) => !pool)
  }, [poolDatas])

  const [watchlistTokens, addWatchlistToken] = useWatchlistTokens()
  return (
    <Page>
      <Container>
        <PageContainer>
          {tokenData ? (
            !tokenData.exists ? (
              <Card>
                <Box p="16px">
                  <Text>
                    {t('No pool has been created with this token yet. Create one')}
                    <Link style={{ display: 'inline', marginLeft: '6px' }} to={`/add/${address}`}>
                      {t('here.')}
                    </Link>
                  </Text>
                </Box>
              </Card>
            ) : (
              <>

                <Flex justifyContent="space-between" flexDirection={isMobile ? "column" :"row"}>
                  <Flex flexDirection={['column', 'column', 'column','column']}>
                    <HeaderContainer isMobile={isMobile}>
                      <StyledHeading
                        lineHeight="0.7"
                        fontSize="36px"
                        fontWeight='600'
                        id="info-token-name-title"
                        color="#FFFFFF"
                      >
                        {tokenData.name}
                      </StyledHeading>
                      <Flex mt="8px" alignItems="center" >
                        <Text fontSize="23px" color="rgba(255, 255, 255, 0.6)" >
                          ({tokenData.symbol})
                        </Text>
                      </Flex>
                    </HeaderContainer>

                    <Flex mt="8px" alignItems="center" >
                      <TxtContainer mr="16px" color="#fff" isMobile={isMobile}>
                        ${formatAmount(tokenData.priceUSD, { notation: 'standard' })}
                      </TxtContainer>
                      <PercentBackground value={tokenData.priceUSDChange}>
                      <Percent value={tokenData.priceUSDChange} fontWeight={400} />
                      </PercentBackground>
                    </Flex>
                  </Flex>
                  <Flex alignItems={isMobile ? "flex-start":"center"} flexDirection={isMobile ? "column" :"row"}>
                    <Flex  mt={isMobile ? "25px":"0"}  mb={isMobile ? "16px":"0"} ml={isMobile ? "12px":"0"}>
                    <SaveIcon fill={watchlistTokens.includes(address)} onClick={() => addWatchlistToken(address)} />
                    <LinkExternal color="rgba(255, 255, 255, 0.6)" ml="12px" href={getBscScanLink(address, 'address')}>
                      {t('View on BscScan')}
                    </LinkExternal>
                    {cmcLink && (
                      <StyledCMCLink href={cmcLink} rel="noopener noreferrer nofollow" target="_blank">
                        {/* <Image src="/images/CMC-logo.svg" height={22} width={22} alt={t('View token on CoinMarketCap')} /> */}
                      </StyledCMCLink>
                    )}
                    </Flex>
                    <Flex>
                    <Link to={`/add/${address}`}>
                      <StyledAddLiquidity  variant="secondary">
                        {t('Add Liquidity')}
                      </StyledAddLiquidity>
                    </Link>
                    <Link to={`/swap?inputCurrency=${address}`}>
                      <StyledBtn>{t('Trade')}</StyledBtn>
                    </Link>
                    </Flex>
                  </Flex>
                </Flex>

                {/* data on the right side of chart */}
                <ContentLayout isMobile={isMobile}>
                  <StyledCard >
                    <Flex justifyContent="space-between" flexDirection={['column']}>
                      <Flex>
                      <Text color="rgba(255, 255, 255, 0.6)" fontWeight="400" fontSize="16px" mr="16px" >
                        {t('Liquidity')}
                      </Text>
                        <PercentBackground value={tokenData.liquidityUSDChange}>
                        <Percent value={tokenData.liquidityUSDChange} />
                        </PercentBackground>
                      </Flex>
                      <Text bold fontSize="24px" color="rgba(255, 255, 255)">
                        ${formatAmount(tokenData.liquidityUSD)}
                      </Text>
                      <Flex alignItems="center" mt="24px">
                      <Text  color="rgba(255, 255, 255, 0.6)" fontWeight="400" fontSize="16px" mr="16px" >
                        {t('Volume 24H')}
                      </Text>
                          <PercentBackground value={tokenData.liquidityUSDChange}>
                      <Percent value={tokenData.volumeUSDChange} />
                        </PercentBackground>
                        </Flex>
                      <Text bold fontSize="24px" color="rgba(255, 255, 255)">
                        ${formatAmount(tokenData.volumeUSD)}
                      </Text>
                      <Text mt="24px" color="rgba(255, 255, 255, 0.6)" fontWeight="400" fontSize="16px">
                        {t('Volume 7D')}
                      </Text>
                      <Text bold fontSize="24px" color="rgba(255, 255, 255)">
                        ${formatAmount(tokenData.volumeUSDWeek)}
                      </Text>

                      <Text mt="24px" color="rgba(255, 255, 255, 0.6)" fontWeight="400" fontSize="16px">
                        {t('Transactions 24H')}
                      </Text>
                      <Text bold fontSize="24px" color="rgba(255, 255, 255)">
                        {formatAmount(tokenData.txCount, { isInteger: true })}
                      </Text>
                    </Flex>
                  </StyledCard>
                  {/* charts card */}
                  <ChartCard
                    variant="token"
                    chartData={chartData}
                    tokenData={tokenData}
                    tokenPriceData={adjustedPriceData}
                  />
                </ContentLayout>

                <TableContainer>
                  <PoolTable poolDatas={poolDatas} maxItems={5} loading={somePoolsAreLoading} />
                  <TransactionTable transactions={transactions} />
                </TableContainer>
              </>
            )
          ) : (
            <Flex mt="80px" justifyContent="center">
              <Spinner />
            </Flex>
          )}
        </PageContainer>
      </Container>
    </Page>
  )
}


export default TokenPage
