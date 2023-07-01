import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity="1" d="M5.69497 8.21168L2.50846 4.99984L5.69497 1.78799C6.10168 1.37805 6.10168 0.717389 5.69497 0.307452C5.28827 -0.102484 4.63282 -0.102484 4.22611 0.307452L0.293836 4.271C0.0904806 4.47597 3.68684e-08 4.74943 2.59158e-08 5C1.39696e-08 5.2733 0.0903272 5.52387 0.293836 5.729L4.22611 9.69255C4.63282 10.1025 5.28827 10.1025 5.69497 9.69255C6.10168 9.28229 6.10168 8.62162 5.69497 8.21168V8.21168Z" fill="white"/>
    </Svg>
  )
}

export default Icon
