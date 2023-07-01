import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = ({ width }) => {
  return (
    <Svg viewBox="0 0 22 22" fill="transparent" width={width}>
      <path d="M1.375 11C1.375 16.523 5.852 21 11.375 21C16.898 21 21.375 16.523 21.375 11C21.375 5.477 16.898 1 11.375 1C5.852 1 1.375 5.477 1.375 11Z" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.375 1.04999C12.375 1.04999 15.375 4.99999 15.375 11C15.375 17 12.375 20.95 12.375 20.95" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.375 20.95C10.375 20.95 7.375 17 7.375 11C7.375 4.99999 10.375 1.04999 10.375 1.04999" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.00488 14.5H20.7449" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.00488 7.5H20.7449" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon
