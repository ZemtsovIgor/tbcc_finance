import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
        <line x1="19" y1="16.7964" x2="5.99997" y2="16.7964" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8.58576" y1="19.7964" x2="5.75733" y2="16.968" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="1" y1="-1" x2="5" y2="-1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 9.99997 14.1318)" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="5.99997" y1="8.25684" x2="19" y2="8.25683" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16.4142" y1="5.25684" x2="19.2426" y2="8.08526" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="1" y1="-1" x2="5" y2="-1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 15 10.9214)" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </Svg>
)

export default Icon