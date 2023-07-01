import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.4" d="M15 1L8 8L1 0.999999" stroke="white" strokeWidth="2" />
    </Svg>
)

export default Icon