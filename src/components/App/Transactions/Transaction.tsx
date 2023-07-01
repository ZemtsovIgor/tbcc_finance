import React from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { TransactionDetails } from 'state/transactions/reducer'
import { useTranslation } from '../../../contexts/Localization'
import { CurrencyLogo } from '../../Logo'
import { Text, Flex, useMatchBreakpoints } from '../../../uikit'
import tokens from '../../../config/constants/tokens'

const TransactionState = styled.div<{ pending?: boolean; success?: boolean; isMobile?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  background: #FFFFFF;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: ${({ isMobile }) => (isMobile ? '19px' : '14px 20px')};
  margin-bottom: 20px;
`

const Time = styled.span`
  font-size: 15px;
  line-height: 16px;
  color: #505050;
`

const Status = styled.span<{ pending?: boolean; success?: boolean }>`
  font-size: 15px;
  line-height: 16px;
  text-align: right;
  color: ${({ pending, success }) => (pending ? '#2DC96C' : success ? '#8A8A8A' : '#f00')};
`

const MenuItem = styled.div<{ mr?: string }>`
  padding: 0;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${({ mr }) => mr || '0'};
`

export default function Transaction({ tx }: { tx: TransactionDetails }) {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()

  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  const txDate = new Date(tx.addedTime).toLocaleString(locale, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const summaryArr = summary.split(' ')

  let fromCurrency: string
  let toCurrency: string
  let fromCurrencyObj: any
  let toCurrencyObj: any
  let fromCurrencyAmount: string
  let toCurrencyAmount: string

  switch (summaryArr[0]) {
    case 'Swap':
      fromCurrency = Object.keys(tokens).filter((token) => tokens[token].symbol === summaryArr[2])[0]
      toCurrency = Object.keys(tokens).filter((token) => tokens[token].symbol === summaryArr[5])[0]
      fromCurrencyObj = tokens[fromCurrency]
      toCurrencyObj = tokens[toCurrency]
      fromCurrencyAmount = summaryArr[1]
      toCurrencyAmount = summaryArr[4]
      break
    case 'Add':
      fromCurrency = Object.keys(tokens).filter((token) => tokens[token].symbol === summaryArr[2])[0]
      toCurrency = Object.keys(tokens).filter((token) => tokens[token].symbol === summaryArr[5])[0]
      fromCurrencyObj = tokens[fromCurrency]
      toCurrencyObj = tokens[toCurrency]
      fromCurrencyAmount = summaryArr[1]
      toCurrencyAmount = summaryArr[4]
      break
    case 'Approve':
      fromCurrency = Object.keys(tokens).filter((token) => tokens[token].symbol === summaryArr[1])[0]
      toCurrency = ''
      fromCurrencyObj = tokens[fromCurrency]
      toCurrencyObj = null
      fromCurrencyAmount = null
      toCurrencyAmount = null
      break
    default:
      fromCurrency = 'BNB'
      toCurrency = 'USDT'
      break
  }

  if (!chainId) return null

  return (
    <TransactionState pending={pending} success={success} isMobile={isMobile}>
      <Time>{txDate}</Time>
      { isMobile ? (
        <Flex mt="2px" mb="2px">
          <MenuItem mr="12px">
            <CurrencyLogo currency={fromCurrencyObj} size="16px" />
            <Flex mr="4px" ml="4px">
              <Text fontSize="15px" lineHeight="16px" color="#505050" fontWeight="500">{fromCurrencyAmount}</Text>
            </Flex>
            <Flex>
              <Text fontSize="15px" lineHeight="16px" color="#505050" fontWeight="500">{fromCurrencyObj?.symbol}</Text>
            </Flex>
          </MenuItem>
          {
            (toCurrencyObj) ? (
              <MenuItem>
                <CurrencyLogo currency={toCurrencyObj} size="16px" />
                <Flex mr="4px" ml="4px">
                  <Text fontSize="15px" lineHeight="16px" color="#505050" fontWeight="500">{toCurrencyAmount}</Text>
                </Flex>
                <Flex>
                  <Text fontSize="15px" lineHeight="16px" color="#505050" fontWeight="500">{toCurrencyObj?.symbol}</Text>
                </Flex>
              </MenuItem>
            ) : null
          }
        </Flex>
      ) : (
        <MenuItem>
          <CurrencyLogo currency={fromCurrencyObj} size="32px" />
          <Flex mr="6px" ml="6px">
            <Text fontSize="15px" lineHeight="16px" color="#505050">{fromCurrencyAmount}</Text>
          </Flex>
          <Flex>
            <Text fontSize="15px" lineHeight="16px" color="#505050">{fromCurrencyObj?.symbol}</Text>
          </Flex>
        </MenuItem>
      )}
      { !isMobile && toCurrencyObj ? (
        <MenuItem>
          <CurrencyLogo currency={toCurrencyObj} size="32px" />
          <Flex mr="6px" ml="6px">
            <Text fontSize="15px" lineHeight="16px" color="#505050">{toCurrencyAmount}</Text>
          </Flex>
          <Flex>
            <Text fontSize="15px" lineHeight="16px" color="#505050">{toCurrencyObj?.symbol}</Text>
          </Flex>
        </MenuItem>
      ) : null}

      <Status pending={pending} success={success}>{pending ? t('In Progress') : success ? t('Done') : t('Rejected')}</Status>
    </TransactionState>
  )
}
