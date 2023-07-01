// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { formatDistanceToNowStrict } from 'date-fns'
import { formatAmount } from 'views/Analytics/utils/formatInfoNumbers'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import { Transaction, TransactionType } from 'state/info/types'
import { useTranslation } from 'contexts/Localization'
import {Break, ClickableColumnHeader, TableWrapper} from './shared'
import {
  Text,
  Flex,
  Box,
  Skeleton,
  LinkExternal,
  useMatchBreakpoints,
  Card,
  Button
} from "../../../../uikit";
import PageSwitcher from "../PageSwitcher";

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

  grid-template-columns: 3fr repeat(5, 1.5fr);

  @media screen and (max-width: 900px) {
    width: 920px;
    grid-template-columns: 1.5fr repeat(5, 1fr);
  }
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 3fr repeat(5, 1.5fr);

  @media screen and (max-width: 900px) {
    width: 920px;
    grid-template-columns: 1.5fr repeat(5, 1fr);
  }
`

const ButtonContainer = styled(Flex)<{ isMobile: boolean }>`
  width: ${({ isMobile }) => isMobile ? 'calc(100% - 2px)' : ''};
  margin-top: ${({ isMobile }) => isMobile ? '15px' : ''};
  background: transparent;
  border: none;
`

const SelectButton = styled(Button)<{ isActive: boolean, isMobile: boolean }>`
  font-weight: ${({ isActive }) => isActive ? '600' : 'normal'};
  font-size: 14px;
  background: ${({ isActive }) => isActive ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'};
  color: ${({ isActive }) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  border: none;
  height: 36px;
  padding: ${({ isMobile }) => isMobile ? '0 13px' : '0 18px'};
  border-radius: 6px;
  margin-right: 5px;
`

const SORT_FIELD = {
  amountUSD: 'amountUSD',
  timestamp: 'timestamp',
  sender: 'sender',
  amountToken0: 'amountToken0',
  amountToken1: 'amountToken1',
}

const ITEMS_PER_INFO_TABLE_PAGE:number = 5

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

const DataRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { t } = useTranslation()
  const abs0 = Math.abs(transaction.amountToken0)
  const abs1 = Math.abs(transaction.amountToken1)
  const outputTokenSymbol = transaction.amountToken0 < 0 ? transaction.token0Symbol : transaction.token1Symbol
  const inputTokenSymbol = transaction.amountToken1 < 0 ? transaction.token0Symbol : transaction.token1Symbol

  return (
    <ResponsiveGrid>
      <LinkExternal href={getBscScanLink(transaction.hash, 'transaction')} fontSize='14px' fontWeight='400' color='#FFF'>
        {transaction.type === TransactionType.MINT
          ? t('Add %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })
          : transaction.type === TransactionType.SWAP
            ? t('Swap %token0% for %token1%', { token0: inputTokenSymbol, token1: outputTokenSymbol })
            : t('Remove %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })}
      </LinkExternal>
      <Text fontSize='14px' fontWeight='400' color='#FFF'>${formatAmount(transaction.amountUSD)}</Text>

      <Text fontSize='14px' fontWeight='400' color='#FFF'>{`${formatAmount(abs0)} ${transaction.token0Symbol}`}</Text>

      <Text fontSize='14px' fontWeight='400' color='#FFF'>{`${formatAmount(abs1)} ${transaction.token1Symbol}`}</Text>

      <LinkExternal href={getBscScanLink(transaction.sender, 'address')} fontSize='14px' fontWeight='400' color='#FFF'>
        {truncateHash(transaction.sender)}
      </LinkExternal>
      <Text fontSize='14px' fontWeight='400' color='#FFF' >{formatDistanceToNowStrict(parseInt(transaction.timestamp, 10) * 1000)}</Text>
    </ResponsiveGrid>
  )
}

const TransactionTable: React.FC<{
  transactions: Transaction[]
}> = ({ transactions }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [txFilter, setTxFilter] = useState<TransactionType | undefined>(undefined)

  const sortedTransactions = useMemo(() => {
    return transactions
      ? transactions
        .slice()
        .sort((a, b) => {
          if (a && b) {
            return a[sortField as keyof Transaction] > b[sortField as keyof Transaction]
              ? (sortDirection ? -1 : 1) * 1
              : (sortDirection ? -1 : 1) * -1
          }
          return -1
        })
        .filter((x) => {
          return txFilter === undefined || x.type === txFilter
        })
        .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [transactions, page, sortField, sortDirection, txFilter])

  // Update maxPage based on amount of items & applied filtering
  useEffect(() => {
    if (transactions) {
      const filteredTransactions = transactions.filter((tx) => {
        return txFilter === undefined || tx.type === txFilter
      })
      if (filteredTransactions.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
        setMaxPage(Math.floor(filteredTransactions.length / ITEMS_PER_INFO_TABLE_PAGE))
      } else {
        setMaxPage(Math.floor(filteredTransactions.length / ITEMS_PER_INFO_TABLE_PAGE) + 1)
      }
    }
  }, [transactions, txFilter])

  const handleFilter = useCallback(
    (newFilter: TransactionType) => {
      if (newFilter !== txFilter) {
        setTxFilter(newFilter)
        setPage(1)
      }
    },
    [txFilter],
  )

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


  return (
    <Card p={isMobile ? '0 12px' : '0px'} mb={isMobile ? '15px' : '20px'}>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        flexDirection={isMobile ? 'column' : 'row'}
        m={isMobile ? '28px 22px 0 22px' : '25px 30px 0 35px'}
      >
        <Text fontSize='20px' fontWeight='600' color='#FFF' width="100%">
          {t('Transactions')}
        </Text>
        <ButtonContainer isMobile={isMobile}>
          <SelectButton
            onClick={() => handleFilter(undefined)}
            isActive={txFilter === undefined}
            isMobile={isMobile}
          >
            {t('All')}
          </SelectButton>

          <SelectButton
            onClick={() => handleFilter(TransactionType.SWAP)}
            isActive={txFilter === TransactionType.SWAP}
            isMobile={isMobile}
          >
            {t('Swaps')}
          </SelectButton>

          <SelectButton
            onClick={() => handleFilter(TransactionType.MINT)}
            isActive={txFilter === TransactionType.MINT}
            isMobile={isMobile}
          >
            {t('Adds')}
          </SelectButton>

          <SelectButton
            onClick={() => handleFilter(TransactionType.BURN)}
            isActive={txFilter === TransactionType.BURN}
            isMobile={isMobile}
          >
            {t('Removes')}
          </SelectButton>
        </ButtonContainer>
      </Flex>

      <TableWrapper style={{margin: isMobile ? '0px 22px 24px' : '10px 30px 30px 35px', width: isMobile ? 'calc(100% - 44px)' : 'calc(100% - 65px)'}}>

        <ResponsiveHeaderGrid style={{marginTop: '15px'}}>
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="13px">
            {t('Action')}
          </Text>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.amountUSD)}
          >
            {t('Total Value')} {arrow(SORT_FIELD.amountUSD)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.amountToken0)}
          >
            {t('Token Amount')} #1 {arrow(SORT_FIELD.amountToken0)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.amountToken1)}
          >
            {t('Token Amount')} #2 {arrow(SORT_FIELD.amountToken1)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.sender)}
          >
            {t('Account')} {arrow(SORT_FIELD.sender)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="rgba(255, 255, 255, 0.6)"
            fontSize="13px"
            onClick={() => handleSort(SORT_FIELD.timestamp)}
          >
            {t('Time')} {arrow(SORT_FIELD.timestamp)}
          </ClickableColumnHeader>
        </ResponsiveHeaderGrid>

        {transactions ? (
          <>
            {sortedTransactions.map((transaction, index) => {
              if (transaction) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    <DataRow transaction={transaction} />
                    {
                      (index < sortedTransactions.length - 1) ? <Break style={{marginBottom: '10px'}}/> : null
                    }
                  </React.Fragment>
                )
              }
              return null
            })}
            {sortedTransactions.length === 0 ? (
              <Flex justifyContent="center">
                <Text>{t('No Transactions')}</Text>
              </Flex>
            ) : undefined}
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
            {/* spacer */}
            <Box />
          </>
        )}
      </TableWrapper>
    </Card>
  )
}

export default TransactionTable
