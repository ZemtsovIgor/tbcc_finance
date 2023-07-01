import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g opacity="0.4">
        <path d="M1 1L10.5 10.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10.5 1L1 10.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </Svg>

)

export default Icon