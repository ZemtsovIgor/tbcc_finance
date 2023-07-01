import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 9L8 2L15 9" stroke="white" strokeWidth="2" />
    </Svg>
  )
}

export default Icon
