import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
  <Svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 3L3.64645 5.64645C3.84171 5.84171 4.15829 5.84171 4.35355 5.64645L9 1" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>

)

export default Icon