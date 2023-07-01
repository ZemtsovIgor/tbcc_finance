import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
        <rect x="3.49997" y="5" width="4" height="16" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="10.5" y="16" width="4" height="5" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="17.5" y="11" width="4" height="10" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </Svg>


)

export default Icon