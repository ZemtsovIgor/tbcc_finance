import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Currency, Percent, Price } from '../../sdk'
import { Text, useMatchBreakpoints } from '../../uikit'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

export const Wrapper = styled.div<{isMobile?: boolean}>`
  margin-top: ${({isMobile}) => isMobile ? '28px' : '40px'};
  width: 100%;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.09);
`

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  return (
    <Wrapper isMobile={isMobile}>
      <AutoColumn gap="md">
        <RowBetween>
          <RowFixed>
            <Text fontSize="16px" color="rgba(255, 255, 255, 0.6)" fontWeight='500'>
              {t('Share of Pool')}
            </Text>
          </RowFixed>
          <RowFixed>
            <Text fontSize="16px" color="#FFF" fontWeight="500" textAlign="right">
              {noLiquidity && price
                ? '100'
                : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
              %
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="16px" color="rgba(255, 255, 255, 0.6)" fontWeight='500'>
              {t('Price')}
            </Text>
          </RowFixed>
          <RowFixed>
            <Text fontSize="16px" color="#FFF" fontWeight="500" textAlign="right">
              {`${price?.invert()?.toSignificant(6) ?? '-'} ${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol}`}
            </Text>
          </RowFixed>
        </RowBetween>
      </AutoColumn>
    </Wrapper>
  )
}

export default PoolPriceBar
