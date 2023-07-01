import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g >
        <rect x="3.49997" y="3.96411" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="3.49997" y="14.9641" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="14.5" y="3.96411" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="14.5" y="14.9641" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </Svg>
)

export default Icon