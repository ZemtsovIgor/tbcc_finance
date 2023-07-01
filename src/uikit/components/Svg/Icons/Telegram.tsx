import * as React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = ({...props}) => {
  return (
    <Svg width={props.width || "16"} height={props.height || "14"} viewBox="0 0 16 14" fill="none" {...props}>
      <path d="M6.27812 8.78711L6.01345 12.5098C6.39212 12.5098 6.55612 12.3471 6.75278 12.1518L8.52812 10.4551L12.2068 13.1491C12.8815 13.5251 13.3568 13.3271 13.5388 12.5284L15.9535 1.21378L15.9541 1.21312C16.1681 0.215782 15.5935 -0.174218 14.9361 0.0704487L0.742785 5.50445C-0.225881 5.88045 -0.211215 6.42045 0.578119 6.66511L4.20678 7.79378L12.6355 2.51978C13.0321 2.25712 13.3928 2.40245 13.0961 2.66512L6.27812 8.78711Z" fill={props.fill || "#757591"}/>
    </Svg>
  )
}

export default Icon
