import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.35" d="M1.69995 1.31433L6.09995 5.71433L1.69995 10.1143" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </Svg>
)

export default Icon