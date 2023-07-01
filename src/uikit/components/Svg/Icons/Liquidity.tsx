import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
        <rect x="3.49997" y="3.46411" width="18" height="18" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12.5" cy="14.1516" r="3.5" stroke="white" strokeWidth="2"/>
        </g>
    </Svg>
)

export default Icon