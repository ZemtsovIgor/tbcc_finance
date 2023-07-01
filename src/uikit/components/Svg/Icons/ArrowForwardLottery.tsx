import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 9 14" fill="none" {...props}>
      <path d="M1 13L7 7L0.999999 1" strokeWidth="2"/>
    </Svg>
  )
}

export default Icon
