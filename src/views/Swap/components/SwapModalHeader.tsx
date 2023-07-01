import React, { useMemo } from 'react'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import {
  computeSlippageAdjustedAmounts,
  formatExecutionPrice,
} from 'utils/prices'
import Column, { AutoColumn } from 'components/Layout/Column'
import truncateHash from 'utils/truncateHash'
import { Trade, TradeType } from '../../../sdk'
import { Button, Text, Flex } from '../../../uikit'

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const { t } = useTranslation()
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage],
  )

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? t('Output is estimated. You will receive at least %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })
      : t('Input is estimated. You will sell at most %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })

  const [estimatedText, transactionRevertText] = tradeInfoText.split(`${amount} ${symbol}`)

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = t('Output will be sent to %recipient%', {
    recipient: truncatedRecipient,
  })

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <Flex flexDirection="column" mb="12px">
      <Flex flexDirection="column" mb="20px">
        <Flex justifyContent="space-between" mb="20px">
          <Column>
            <Text fontSize="15px" lineHeight="16px" fontWeight="500">{t('From')}</Text>
          </Column>
          <Column>
            <Text fontSize="15px" lineHeight="16px" fontWeight="500">{trade.inputAmount.toSignificant(6)} {trade.inputAmount.currency.symbol}</Text>
          </Column>
        </Flex>
        <Flex justifyContent="space-between">
          <Column>
            <Text fontSize="15px" lineHeight="16px" fontWeight="500">{t('To')}</Text>
          </Column>
          <Column>
            <Text fontSize="15px" lineHeight="16px" fontWeight="500">{trade.outputAmount.toSignificant(6)} {trade.outputAmount.currency.symbol}</Text>
          </Column>
        </Flex>
      </Flex>
      <Flex justifyContent="center" mb="7px">
        <Flex mb="20px" background="#E7F7FF" padding="4px 13px" width="337px">
          <Text fontSize="15px" lineHeight="24px">
            <Text color="#505050" textAlign="left" fontSize="15px" lineHeight="24px">
              {estimatedText}
              {amount} {symbol}
              {transactionRevertText}
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Flex mb="13px" justifyContent="space-between">
        <Column>
          <Text fontSize="15px" lineHeight="16px" fontWeight="normal">{t('Price')}</Text>
        </Column>
        <Column>
          <Text fontSize="15px" lineHeight="16px" fontWeight="500">{formatExecutionPrice(trade, false)}</Text>
        </Column>
      </Flex>
      {showAcceptChanges ? (
        <Button onClick={onAcceptChanges} style={{background: '#A9F9C9', color: '#2DC96C', fontSize: '15px', lineHeight: '1', padding: '8px 0', height: 'auto', borderRadius: 0, fontWeight: 'normal' }}>{t('Price Updated')}</Button>
      ) : null}

     {recipient !== null ? (
      <AutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
        <Text color="textSubtle">
          {recipientSentToText}
          <b title={recipient}>{truncatedRecipient}</b>
          {postSentToText}
        </Text>
      </AutoColumn>
     ) : null}
    </Flex>
  )
}
