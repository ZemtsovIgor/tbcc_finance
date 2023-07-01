import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
  <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
    <path d="M20.5 12.1592C20.5 8.38794 20.5 6.50233 19.3285 5.33075C18.1569 4.15918 16.2713 4.15918 12.5 4.15918V4.15918C8.72879 4.15918 6.84318 4.15918 5.6716 5.33075C4.50003 6.50233 4.50003 8.38794 4.50003 12.1592V18.1592C4.50003 19.102 4.50003 19.5734 4.79292 19.8663C5.08582 20.1592 5.55722 20.1592 6.50003 20.1592H12.5C16.2713 20.1592 18.1569 20.1592 19.3285 18.9876C20.5 17.816 20.5 15.9304 20.5 12.1592V12.1592Z" stroke="white" strokeWidth="2"/>
    <path d="M9.50003 10.1592L15.5 10.1592" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.50003 14.1592H12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </Svg>

)

export default Icon