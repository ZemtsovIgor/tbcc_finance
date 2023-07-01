import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g opacity="0.4">
        <path d="M1 1L13 13" stroke="#101428" strokeWidth="2"/>
        <path d="M13 1L0.999999 13" stroke="#101428" strokeWidth="2"/>
        </g>
    </Svg>

)

export default Icon