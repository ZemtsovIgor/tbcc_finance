import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity="1" d="M0.305027 1.78832L3.49154 5.00016L0.305027 8.21201C-0.101676 8.62195 -0.101676 9.28261 0.305027 9.69255C0.711729 10.1025 1.36718 10.1025 1.77389 9.69255L5.70616 5.729C5.90952 5.52403 6 5.25057 6 5C6 4.7267 5.90967 4.47613 5.70616 4.271L1.77388 0.307452C1.36718 -0.102484 0.711729 -0.102484 0.305026 0.307452C-0.101676 0.717714 -0.101676 1.37838 0.305027 1.78832Z" fill="white" />
    </Svg>

  )
}

export default Icon
