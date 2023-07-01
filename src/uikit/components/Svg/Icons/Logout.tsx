import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="26" height="30"  viewBox="0 0 26 20" {...props} fill="transparent">
      <g clipPath="url(#clip0_1811_950)">
        <path d="M16.6367 5.45454V3.18182C16.6367 2.57905 16.3972 2.00097 15.971 1.57475C15.5448 1.14854 14.9667 0.909088 14.3639 0.909088H3.45486C2.85209 0.909088 2.27401 1.14854 1.8478 1.57475C1.42158 2.00097 1.18213 2.57905 1.18213 3.18182V16.8182C1.18213 17.4209 1.42158 17.999 1.8478 18.4252C2.27401 18.8515 2.85209 19.0909 3.45486 19.0909H14.3639C14.9667 19.0909 15.5448 18.8515 15.971 18.4252C16.3972 17.999 16.6367 17.4209 16.6367 16.8182V14.5455" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.2729 5.45456L24.8184 10L20.2729 14.5455" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.30713 10H24.8185" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1811_950">
          <rect width="25.4545" height="20" fill="#ffffff" transform="translate(0.272949)"/>
        </clipPath>
      </defs>
    </Svg>
  )
}

export default Icon
