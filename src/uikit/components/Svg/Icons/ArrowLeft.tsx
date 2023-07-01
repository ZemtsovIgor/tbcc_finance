import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.35" d="M6.8 10.1144L2.4 5.71438L6.8 1.31438" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </Svg>

)

export default Icon