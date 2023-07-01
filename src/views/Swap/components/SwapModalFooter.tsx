import React, { useMemo } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  warningSeverity,
} from 'utils/prices'
import Column from 'components/Layout/Column'
import { Trade, TradeType } from '../../../sdk'
import { Button, Text, Flex } from '../../../uikit'
import { SwapCallbackError } from './styleds'
import { ONE_BIPS } from '../../../config/constants'

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <Flex flexDirection="column">
        <Flex flexDirection="column" mb="28px">
          <Flex justifyContent="space-between" mb="12px" alignItems="center">
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="normal">{trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}</Text>
            </Column>
            <Column style={{ flexDirection: "row" }}>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500">
                {trade.tradeType === TradeType.EXACT_INPUT
                  ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                  : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
              </Text>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500">
                {trade.tradeType === TradeType.EXACT_INPUT
                  ? trade.outputAmount.currency.symbol
                  : trade.inputAmount.currency.symbol}
              </Text>
            </Column>
          </Flex>
          <Flex justifyContent="space-between" mb="12px" alignItems="center">
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="normal">{t('Price Impact')}</Text>
            </Column>
            <Column style={{ flexDirection: "row" }}>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500" style={{ whiteSpace: "nowrap" }}>
                {priceImpactWithoutFee ? (priceImpactWithoutFee.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpactWithoutFee.toFixed(2)}%`) : '-'}
              </Text>
            </Column>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="normal">{t('Liquidity Provider Fee')}</Text>
            </Column>
            <Column style={{ flexDirection: "row" }}>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500" style={{ whiteSpace: "nowrap" }}>
                {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
              </Text>
            </Column>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <Button
          onClick={onConfirm}
          disabled={disabledConfirm}
          id="confirm-swap-or-send"
          width="100%"
        >
          {severity > 2 ? t('Swap Anyway') : t('Confirm')}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </Flex>
    </>
  )
}
