import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { TokenData } from 'state/info/types'
// import { Link } from 'react-router-dom'
import { CurrencyLogo } from 'components/Logo'
import { formatAmount } from 'views/Swap/utils/formatInfoNumbers'
import { useTranslation } from 'contexts/Localization'
import Percent from '../Percent'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, Card } from '../../../../uikit'
import { ClickableColumnHeader, TableWrapper, Break } from './shared'
import PageSwitcher from "../PageSwitcher";
import {Token} from "../../../../sdk";
import {useToken} from "../../../../hooks/Tokens";

/**
 *  Columns on different layouts
 *  6 = | # | Name | Price | Price Change | Volume 24H | TVL |
 *  5 = | # | Name | Price |              | Volume 24H | TVL |
 *  4 = | # | Name | Price |              | Volume 24H |     |
 *  2 = |   | Name |       |              | Volume 24H |     |
 *  On smallest screen Name is reduced to just symbol
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

  grid-template-columns: 20px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    width: 770px;
    grid-template-columns: 1.5fr repeat(4, 1fr);
    > *:first-child {
      display: none;
    }
  }
`
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  
  grid-template-columns: 20px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    width: 770px;
    grid-template-columns: 1.5fr repeat(4, 1fr);
    > *:first-child {
      display: none;
    }
  }
`

// const LinkWrapper = styled(Link)`
//   text-decoration: none;
//   :hover {
//     cursor: pointer;
//     opacity: 0.7;
//   }
// `

const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 16px;
    height: 16px;
  }
`

const TableLoader: React.FC = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<{ tokenData: TokenData; index: number }> = ({ tokenData, index }) => {
  const { isMobile } = useMatchBreakpoints()
  const tokenLogoData: Token = useToken(tokenData.address)

  return (
    // <LinkWrapper to={`/info/token/${tokenData.address}`}>
      <ResponsiveGrid>
        <Flex ml='10px'>
          <Text fontSize='16px' color='#FFF'>{index + 1}</Text>
        </Flex>
        <Flex alignItems="center" ml={isMobile ? '0' : '14px'}>
          <ResponsiveLogo currency={tokenLogoData} />
          <Flex marginLeft="10px">
            <Text fontSize='14px' fontWeight='400' color='#FFF'>{tokenData.name}</Text>
            <Text ml="8px" fontSize='14px' fontWeight='400' color='#a9aab2'>({tokenData.symbol})</Text>
          </Flex>
        </Flex>
        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(tokenData.priceUSD, { notation: 'standard' })}</Text>
        <Text fontSize='14px' fontWeight='400' color='#FFF'>
          <Percent value={tokenData.priceUSDChange} fontSize='14px' fontWeight='400' color='#959595' />
        </Text>
        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(tokenData.volumeUSD)}</Text>
        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(tokenData.liquidityUSD)}</Text>
      </ResponsiveGrid>
    // </LinkWrapper>
  )
}

const SORT_FIELD = {
  name: 'name',
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  priceUSD: 'priceUSD',
  priceUSDChange: 'priceUSDChange',
  priceUSDChangeWeek: 'priceUSDChangeWeek',
}

const MAX_ITEMS = 5

const TokenTable: React.FC<{
  tokenDatas: TokenData[] | undefined
  maxItems?: number
}> = ({ tokenDatas, maxItems = MAX_ITEMS }) => {
  const { isMobile } = useMatchBreakpoints()
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (tokenDatas) {
      if (tokenDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(tokenDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, tokenDatas])

  const sortedTokens = useMemo(() => {
    return tokenDatas
      ? tokenDatas
        .sort((a, b) => {
          if (a && b) {
            return a[sortField as keyof TokenData] > b[sortField as keyof TokenData]
              ? (sortDirection ? -1 : 1) * 1
              : (sortDirection ? -1 : 1) * -1
          }
          return -1
        })
        .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [tokenDatas, maxItems, page, sortDirection, sortField])

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

  if (!tokenDatas) {
    return <Skeleton />
  }

  return (
    <Card p={isMobile ? '0 12px' : '0px'} mb={isMobile ? '15px' : '20px'}>
      <Text fontSize='20px' fontWeight='600' color='#FFF' m={isMobile ? '28px 22px 0 22px' : '25px 30px 0 35px'}>
        {t('Top Tokens')}
      </Text>
      <TableWrapper style={{margin: isMobile ? '0px 22px 24px' : '10px 30px 30px 35px', width: isMobile ? 'calc(100% - 44px)' : 'calc(100% - 65px)'}}>

        <ResponsiveHeaderGrid style={{marginTop: '15px'}}>
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="13px">
            #
          </Text>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.name)}
          >
            {t('Name')} {arrow(SORT_FIELD.name)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.priceUSD)}
          >
            {t('Price')} {arrow(SORT_FIELD.priceUSD)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.priceUSDChange)}
          >
            {t('Change')} {arrow(SORT_FIELD.priceUSDChange)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.volumeUSD)}
          >
            {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.liquidityUSD)}
          >
            {t('Liquidity')} {arrow(SORT_FIELD.liquidityUSD)}
          </ClickableColumnHeader>
        </ResponsiveHeaderGrid>


        {sortedTokens.length > 0 ? (
          <>
            {sortedTokens.map((data, i) => {
              if (data) {
                return (
                  <React.Fragment key={`${data.address}${i + 1}`}>
                    <DataRow index={(page - 1) * MAX_ITEMS + i} tokenData={data} />
                    {
                      (i < sortedTokens.length - 1) ? <Break style={{marginBottom: '10px'}}/> : null
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

export default TokenTable
