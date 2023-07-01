import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 9 14" fill="none" {...props}>
      <path d="M8 1L2 7L8 13" strokeWidth="2"/>
    </Svg>
  )
}

export default Icon
