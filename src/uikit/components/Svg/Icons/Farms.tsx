import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g >
        <circle cx="10.625" cy="10.2141" r="6" stroke="white" strokeWidth="2"/>
        <circle cx="14.375" cy="15.2141" r="6" stroke="white" strokeWidth="2"/>
        </g>
    </Svg>

)

export default Icon