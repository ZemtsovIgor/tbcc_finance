import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="22" height="3" rx="1.5" fill="white"/>
        <rect y="9" width="22" height="3" rx="1.5" fill="white"/>
    </Svg>
)

export default Icon