import React from 'react'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { Trade, TradeType } from '../../../sdk'
import { Text } from '../../../uikit'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import TradePrice from './TradePrice'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn gap="md" style={{ padding: '0 16px' }}>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="#FFF">
            {t('Slippage Tolerance')}
          </Text>
        </RowFixed>
        <RowFixed>
          <Text fontSize="14px" color="#FFF" fontWeight="500" textAlign="right">
            {allowedSlippage / 100}%
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="#FFF">
            {t('Price')}
          </Text>
        </RowFixed>
        <RowFixed>
          <TradePrice price={trade?.executionPrice} />
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="#FFF">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </Text>
        </RowFixed>
        <RowFixed>
          <Text fontSize="14px" color="#FFF" fontWeight="500" textAlign="right">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="#FFF">
            {t('Price Impact')}
          </Text>
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="#FFF">
            {t('Liquidity Provider Fee')}
          </Text>
        </RowFixed>
        <Text fontSize="14px" color="#FFF" fontWeight="500" textAlign="right">
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </Text>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade,
  isExpertMode?: boolean
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="10px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween style={{ padding: '0 16px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Text fontSize="14px" color="#FFF">
                    {t('Route')}
                  </Text>
                  <QuestionHelper
                    text={t('Routing through these tokens resulted in the best price for your trade.')}
                    ml="4px"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
