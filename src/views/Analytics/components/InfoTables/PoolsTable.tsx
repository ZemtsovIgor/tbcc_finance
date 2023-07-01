import React, {useCallback, useState, useMemo, useEffect} from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import {formatAmount} from 'views/Swap/utils/formatInfoNumbers'
import { PoolData } from 'state/info/types'
import { CurrencyLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, Card } from '../../../../uikit'
import {Break, ClickableColumnHeader, TableWrapper} from './shared'
import PageSwitcher from "../PageSwitcher";
import {Token} from "../../../../sdk";
import {useToken} from "../../../../hooks/Tokens";

/**
 *  Columns on different layouts
 *  5 = | # | Pool | TVL | Volume 24H | Volume 7D |
 *  4 = | # | Pool |     | Volume 24H | Volume 7D |
 *  3 = | # | Pool |     | Volume 24H |           |
 *  2 = |   | Pool |     | Volume 24H |           |
 */
const ResponsiveHeaderGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.09);

  padding: 0 10px;
  margin-bottom: 10px;

  grid-template-columns: 20px 3fr repeat(5, 1.5fr);

  @media screen and (max-width: 900px) {
    width: 900px;
    grid-template-columns: 1.5fr repeat(5, 1fr);
    > *:first-child {
      display: none;
    }
  }
`

const ResponsiveGrid = styled.div<{ activeTab?: number }>`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 20px 3fr repeat(5, 1.5fr);

  @media screen and (max-width: 900px) {
    width: 900px;
    grid-template-columns: 1.5fr repeat(5, 1fr);
    > *:first-child {
      display: none;
    }
  }
`

const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 16px;
    height: 16px;
  }
`

const SORT_FIELD = {
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  volumeUSDWeek: 'volumeUSDWeek',
  lpFees24h: 'lpFees24h',
  lpApr7d: 'lpApr7d',
  token1Price: 'token1Price'
}

const LoadingRow: React.FC = () => (
  <ResponsiveGrid>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </ResponsiveGrid>
)

const TableLoader: React.FC = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)

const DataRow = ({ poolData, activeTab, index }: { poolData: PoolData; activeTab?: number, index: number }) => {
  const { isMobile } = useMatchBreakpoints()

  const tokenLogoData1: Token = useToken(poolData?.token0?.address)
  const tokenLogoData2: Token = useToken(poolData?.token1?.address)

  return (
    // <LinkWrapper key={index} to={`/pools/${poolData.address}`}>
      <ResponsiveGrid activeTab={activeTab}>
        <Flex ml='10px'>
          <Text fontSize='16px' color='#FFF'>{index + 1}</Text>
        </Flex>

        <Flex alignItems="center" ml={isMobile ? '0' : '14px'}>
          <ResponsiveLogo currency={tokenLogoData1} />
          <ResponsiveLogo currency={tokenLogoData2} />
          <Flex marginLeft="10px">
            <Text fontSize='14px' fontWeight='400' color='#FFF'>{poolData?.token0?.symbol}/{poolData?.token1?.symbol}</Text>
          </Flex>
        </Flex>

        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(poolData.volumeUSD, { notation: 'standard' })}</Text>

        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(poolData.volumeUSDWeek, { notation: 'standard' })}</Text>

        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(poolData.lpFees24h, { notation: 'standard' })}</Text>

        <Text fontSize='14px' fontWeight='400' color='#FFF'>{formatAmount(poolData.lpApr7d, { notation: 'standard' })}%</Text>

        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(poolData.liquidityUSD, { notation: 'standard' })}</Text>
      </ResponsiveGrid>
    // </LinkWrapper>
  )
}

interface PoolTableProps {
  poolDatas: PoolData[]
  maxItems?: number
  loading?: boolean // If true shows indication that SOME pools are loading, but the ones already fetched will be shown
}

const PoolTable: React.FC<PoolTableProps> = ({ poolDatas, loading, maxItems}) => {
  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [activeTab, setActiveTab] = useState(1)

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (poolDatas) {
      if (poolDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(poolDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, poolDatas])

  const sortedPools = useMemo(() => {
    return poolDatas
      ? poolDatas
        .sort((a, b) => {
          if (a && b) {
            return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
              ? (sortDirection ? -1 : 1) * 1
              : (sortDirection ? -1 : 1) * -1
          }
          return -1
        })
        .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [poolDatas, maxItems, page, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  if (loading) {
    return <Skeleton />
  }

  return (
    <Card p={isMobile ? '0 12px' : '0px'} mb={isMobile ? '15px' : '20px'}>
      <Text fontSize='20px' fontWeight='600' color='#FFF' m={isMobile ? '28px 22px 0 22px' : '25px 30px 0 35px'}>
        {t('Top Pools')}
      </Text>
      <TableWrapper style={{margin: isMobile ? '0px 22px 24px' : '10px 30px 30px 35px', width: isMobile ? 'calc(100% - 44px)' : 'calc(100% - 65px)'}}>
        <ResponsiveHeaderGrid style={{marginTop: '15px'}}>
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="13px">
            {t('#')}
          </Text>
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="13px">
            {t('Name')}
          </Text>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.volumeUSD)}
          >
            {t('Volume')} {t('24h')} {arrow(SORT_FIELD.volumeUSD)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={isMobile ? () => setActiveTab(1) : () => handleSort(SORT_FIELD.volumeUSDWeek)}
          >
            {t('Volume')} {t('7d')} {arrow(SORT_FIELD.volumeUSDWeek)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={isMobile ? (() => setActiveTab(2)) : (() => handleSort(SORT_FIELD.lpFees24h))}
          >
            {t('LP reward fees')} {t('24h')} {arrow(SORT_FIELD.lpFees24h)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.lpApr7d)}
          >
            {t('LP reward APR')} {arrow(SORT_FIELD.lpApr7d)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.liquidityUSD)}
          >
            {t('Liquidity')} {arrow(SORT_FIELD.liquidityUSD)}
          </ClickableColumnHeader>
        </ResponsiveHeaderGrid>
        {sortedPools.length > 0 ? (
          <>
            {sortedPools.map((poolData, i) => {
              if (poolData) {
                return (
                  <React.Fragment key={poolData.address}>
                    <DataRow poolData={poolData} activeTab={activeTab} index={(page - 1) * maxItems + i} />
                    {
                      (i < sortedPools.length - 1) ? <Break style={{marginBottom: '10px'}}/> : null
                    }
                  </React.Fragment>
                )
              }
              return null
            })}
            <Flex
              width='100%'
              alignItems='center'
              justifyContent='center'
            >
              <PageSwitcher activePage={page} maxPages={maxPage} setPage={(index) => setPage(index)}/>
            </Flex>
          </>
        ) : (
          <>
            <TableLoader />
            <Box />
          </>
        )}
      </TableWrapper>
    </Card>
  )
}

export default PoolTable
