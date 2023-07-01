import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import {Text, TextProps, useMatchBreakpoints} from '../uikit'

interface BalanceProps extends TextProps {
  value: number
  decimals?: number
  unit?: string
  isDisabled?: boolean
  prefix?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const Balance: React.FC<BalanceProps> = ({
  value,
  color = '#4E89E3',
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  ...props
}) => {
  const previousValue = useRef(0)
  const { isMobile } = useMatchBreakpoints()

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <Text
      color={isDisabled ? '#c6c6c6' : color}
      fontSize={isMobile ? '13px' : '16px'}
      lineHeight={isMobile ? '13px' : '16px'}
      fontWeight="500"
      onClick={onClick} {...props}
    >
      <CountUp
        start={previousValue.current}
        end={value}
        prefix={prefix}
        suffix={unit}
        decimals={decimals}
        duration={1}
        separator=","
      />
    </Text>
  )
}

export default Balance
