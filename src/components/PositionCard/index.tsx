import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { JSBI, Pair, Percent } from '../../sdk'
import {
  Text,
  Card,
  CardBody,
  Flex,
  CardProps,
  ChevronRightSecondIcon,
  ChevronUpSecondIcon
} from '../../uikit'
import useTotalSupply from '../../hooks/useTotalSupply'

import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'

import { LightCard } from '../Card'
import { AutoColumn } from '../Layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from '../Logo'
import { RowBetween, RowFixed } from '../Layout/Row'
import { BIG_INT_ZERO } from '../../config/constants'
import Dots from '../Loader/Dots'

const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`
const TranspBtn = styled(Link)`
  width:100%;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  font-weight: 600;
  font-size: 15px;
  color: #FFFFFF;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  margin-bottom: 10px;
`
const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 13px;
  color: #FFFFFF;
  opacity: 0.6;
  text-decoration: underline;
`

interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
  lastItem?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false, lastItem = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const { t } = useTranslation()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (
        <Card style={{ borderBottom: lastItem ? '0' : '1px solid #E5E5E5' }}>
          <CardBody>
            <AutoColumn gap="16px">
              <FixedHeightRow>
                <RowFixed>
                  <Text color="secondary" bold>
                    {t('LP tokens in your wallet')}
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <FixedHeightRow onClick={() => setShowMore(!showMore)}>
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                  <Text small color="textSubtle">
                    {currency0.symbol}-{currency1.symbol} LP
                  </Text>
                </RowFixed>
                <RowFixed>
                  <Text>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap="4px">
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {t('Share of Pool')}:
                  </Text>
                  <Text>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {t('Pooled %asset%', { asset: currency0.symbol })}:
                  </Text>
                  {token0Deposited ? (
                    <RowFixed>
                      <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {t('Pooled %asset%', { asset: currency1.symbol })}:
                  </Text>
                  {token1Deposited ? (
                    <RowFixed>
                      <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </CardBody>
        </Card>
      ) : (
        <LightCard>
          <Text fontSize="14px" style={{ textAlign: 'center' }}>
            {t(
              "By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.",
            )}
          </Text>
        </LightCard>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, ...props }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <Card borderRadius={12} background="transparent" style={{ overflow: 'visible', padding: 0, width: '100%', background: 'transparent', borderRadius: 0, color: '#505050', marginBottom: props.lastItem ? '0' : "42px", }} {...props}>
      <Flex justifyContent="space-between" role="button" onClick={() => setShowMore(!showMore)} p="27px 25px 26px 18px">
        <Flex  justifyContent="space-between" alignItems="center" width="100%">
          <Flex alignItems="center">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={32} />
            <Text fontSize="20px" lineHeight="16px" fontWeight="medium" color="#FFF" ml="15px">
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>
          </Flex>
          <Text fontSize="20px" lineHeight="16px" fontWeight="700" color="#fff" marginLeft="auto" mr="14px">
            {userPoolBalance?.toSignificant(4)}
          </Text>
          {showMore ? <ChevronUpSecondIcon /> : <ChevronRightSecondIcon/>}
        </Flex>
      </Flex>

      {showMore && (
        <AutoColumn gap="8px" style={{ padding: '16px' }}>
          <FixedHeightRow>
            <RowFixed>
              <CurrencyLogo size="24px" currency={currency0} />
              <Text color="#FFF" ml="11px">
                Pooled {currency0.symbol}
              </Text>
            </RowFixed>
            {token0Deposited ? (
              <RowFixed>
                <Text color="#FFF" ml="6px">{token0Deposited?.toSignificant(6)}</Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <RowFixed>
              <CurrencyLogo size="24px" currency={currency1} />
              <Text color="#FFF" ml="11px">
                Pooled {currency1.symbol}
              </Text>
            </RowFixed>
            {token1Deposited ? (
              <RowFixed>
                <Text color="#FFF" ml="6px">{token1Deposited?.toSignificant(6)}</Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <Text color="#FFF">Share of pool</Text>
            <Text color="#FFF">
              {poolTokenPercentage
                ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                : '-'}
            </Text>
          </FixedHeightRow>

          {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, BIG_INT_ZERO) && (
            <Flex flexDirection="column">
              <TranspBtn
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
              >
                Remove
              </TranspBtn>
              <StyledLink
                to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
              >
                + Add liquidity instead
              </StyledLink>
            </Flex>
          )}
        </AutoColumn>
      )}
    </Card>
  )
}
