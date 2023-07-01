import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper} from './shared'
import {
  Text,
  Flex,
  useMatchBreakpoints,
  Card, Skeleton, Box, LinkExternal
} from "../../../../uikit";
import PageSwitcher from "../PageSwitcher";
import {BurnTransaction} from "../../../../state/info/types";
import {formatAmount} from "../../../Swap/utils/formatInfoNumbers";
import {Break} from "../../../Analytics/components/InfoTables/shared";
import {getBscScanLink} from "../../../../utils";

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

  grid-template-columns: 20px 3fr repeat(2, 1.5fr);

  @media screen and (max-width: 900px) {
    width: 770px;
    grid-template-columns: 20px 3fr repeat(2, 1.5fr);
  }
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  
  grid-template-columns: 20px 3fr repeat(2, 1.5fr);

  @media screen and (max-width: 900px) {
    width: 770px;
    grid-template-columns: 3.5fr repeat(2, 1.5fr);
    > *:first-child {
      display: none;
    }
  }
`

const TableLoader: React.FC = () => {
  const loadingRow = (
    <ResponsiveGrid>
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

const DataRow: React.FC<{ burnTransaction: BurnTransaction; index: number }> = ({ burnTransaction, index }) => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <ResponsiveGrid>
      <Flex ml='10px'>
        <Text fontSize='16px' color='#FFF'>{index + 1}</Text>
      </Flex>
      <Flex alignItems="center" ml={isMobile ? '0' : '14px'}>
        <Flex marginLeft="10px">
          <LinkExternal
            href={getBscScanLink(burnTransaction.sender, 'address')}
            fontSize='14px'
            fontWeight='400'
            color='#FFF'
          >
            {burnTransaction.sender}
          </LinkExternal>
        </Flex>
      </Flex>
        <Text fontSize='14px' fontWeight='400' color='#FFF' >{formatAmount(burnTransaction.amount)} TBCC</Text>
        <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(burnTransaction.amountUSD)}</Text>
    </ResponsiveGrid>
  )
}

const SORT_FIELD = {
  amount: 'amount',
  amountUSD: 'amountUSD',
}

const MAX_ITEMS = 5

const Rating: React.FC<{
  burnTransactions: BurnTransaction[] | undefined
  maxItems?: number
}> = ({ burnTransactions, maxItems = MAX_ITEMS }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [sortField, setSortField] = useState(SORT_FIELD.amount)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    let extraPages = 1
    if (burnTransactions) {
      if (burnTransactions.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(burnTransactions.length / maxItems) + extraPages)
    }
  }, [maxItems, burnTransactions])

  const sortedBurnTransactions = useMemo(() => {
    return burnTransactions
      ? burnTransactions
        .sort((a, b) => {
          if (a && b) {
            return a[sortField as keyof BurnTransaction] > b[sortField as keyof BurnTransaction]
              ? (sortDirection ? -1 : 1) * 1
              : (sortDirection ? -1 : 1) * -1
          }
          return -1
        })
        .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [burnTransactions, maxItems, page, sortDirection, sortField])

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

  if (!burnTransactions) {
    return <Skeleton />
  }

  return (
    <Card p={isMobile ? '0 12px' : '0px'} mb={isMobile ? '15px' : '20px'}>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        flexDirection={isMobile ? 'column' : 'row'}
        m={isMobile ? '28px 22px 0 22px' : '25px 30px 0 35px'}
      >
        <Text fontSize='20px' fontWeight='600' color='#FFF' width="100%">
          {t('Rating')}
        </Text>

      </Flex>

      <TableWrapper style={{margin: isMobile ? '0px 22px 24px' : '10px 30px 30px 35px', width: isMobile ? 'calc(100% - 44px)' : 'calc(100% - 65px)'}}>

        <ResponsiveHeaderGrid style={{marginTop: '15px'}}>
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="13px">
            #
          </Text>

          <ClickableColumnHeader color="rgba(255, 255, 255, 0.6)" fontSize="13px">
            {t('Address')}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.amount)}
          >
            {t('Tokens burned')} {arrow(SORT_FIELD.amount)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.amountUSD)}
          >
            {t('Est. Amount USD')} {arrow(SORT_FIELD.amountUSD)}
          </ClickableColumnHeader>
        </ResponsiveHeaderGrid>

        {sortedBurnTransactions.length > 0 ? (
          <>
            {sortedBurnTransactions.map((data, i) => {
              if (data) {
                return (
                  <React.Fragment key={`${data.sender}${i + 1}`}>
                    <DataRow index={(page - 1) * MAX_ITEMS + i} burnTransaction={data} />
                    {
                      (i < sortedBurnTransactions.length - 1) ? <Break style={{marginBottom: '10px'}}/> : null
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
            <TableLoader/>
            <Box />
          </>
        )}
      </TableWrapper>

    </Card>
  )
}


export default Rating
