import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.78832 5.69497L5.00016 2.50846L8.21201 5.69497C8.62195 6.10168 9.28261 6.10168 9.69255 5.69497C10.1025 5.28827 10.1025 4.63282 9.69255 4.22611L5.729 0.293836C5.52403 0.0904812 5.25057 8.92046e-07 5 9.13951e-07C4.7267 9.37843e-07 4.47613 0.0903277 4.271 0.293837L0.307452 4.22612C-0.102484 4.63282 -0.102484 5.28827 0.307452 5.69497C0.717714 6.10168 1.37838 6.10168 1.78832 5.69497Z" fill="white" />
    </Svg>

  )
}

export default Icon
