import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 14 14" {...props} style={{ fill: 'transparent' }}>
      <path d="M0.5 1L6.5 7L0.5 13" stroke="#505050"/>
    </Svg>
  )
}

export default Icon
