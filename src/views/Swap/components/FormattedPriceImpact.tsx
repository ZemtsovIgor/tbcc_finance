import React from 'react'
import { Percent } from '../../../sdk'
import { ONE_BIPS } from '../../../config/constants'
import { Text } from '../../../uikit'
/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <Text fontSize="14px" color="#FFF" fontWeight="500" textAlign="right">
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </Text>
  )
}
