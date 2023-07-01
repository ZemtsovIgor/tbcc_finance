import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 1L1 5L5 9" stroke="rgba(255, 255, 255, 0.4)"/>
    </Svg>
  )
}

export default Icon