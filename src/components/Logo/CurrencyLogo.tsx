import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ETHER } from '../../sdk'
import {BinanceIcon, BUSDIcon, USDTIcon, TBCCIcon, ShibIcon, DogeIcon, BSWIcon, B8TIcon} from '../../uikit'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string; ml?: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  margin-left: ${({ ml }) => ml || 0};
  border-radius: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  ml,
}: {
  currency?: any
  size?: string
  style?: React.CSSProperties
  ml?: string
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []
    if (!currency) return []

    if (currency?.address) {
      if (uriLocations.length) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <BinanceIcon width={size} style={style} />
  }
  if (!currency) {
    return <BinanceIcon width={size} style={style} />
  }

  if (currency?.symbol === 'USDT') {
    return <USDTIcon width={size} style={style} />
  }

  if (currency?.symbol === 'TBCC') {
    return <TBCCIcon width={size} style={style} />
  }

  if (currency?.symbol === 'BUSD') {
    return <BUSDIcon width={size} style={style} />
  }

  if (currency?.symbol === 'WBNB') {
    return <BinanceIcon width={size} style={style} />
  }

  if (currency?.symbol === 'SHIB') {
    return <ShibIcon width={size} style={style} />
  }

  if (currency?.symbol === 'DOGE') {
    return <DogeIcon width={size} style={style} />
  }

  if (currency?.symbol === 'BSW') {
    return <BSWIcon width={size} style={style} />
  }

  if (currency?.symbol === 'B8T') {
    return <B8TIcon width={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} ml={ml} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
