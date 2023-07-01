import React from 'react'
import { Text } from '../../../uikit'
import { Price } from '../../../sdk'

interface TradePriceProps {
  price?: Price
}

export default function TradePrice({ price }: TradePriceProps) {
  const formattedPrice = price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = `${price?.baseCurrency?.symbol}/${price?.quoteCurrency?.symbol}`

  return (
    <Text
      fontSize="14px"
      color="#FFF"
      fontWeight="500"
      style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', textAlign: 'right' }}
    >
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
