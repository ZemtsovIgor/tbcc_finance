import React from 'react'
import { Text, TextProps } from '../../../../uikit'

export interface PercentProps extends TextProps {
  value: number | undefined
}

const Percent: React.FC<PercentProps> = ({ value, ...rest }) => {
  if (!value || Number.isNaN(value)) {
    return <Text {...rest}>-</Text>
  }

  const isNegative = value < 0

  return (
    <Text {...rest} color={isNegative ? '#F72F72' : '#20C997'}>
      {isNegative ? '-' : '+'}
      {Math.abs(value).toFixed(2)}%
    </Text>
  )
}

export default Percent
