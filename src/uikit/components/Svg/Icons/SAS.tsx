import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 100 100" {...props}>
      <circle cx="50" cy="50" r="50" fill="#f0b90b"/>
      <path d="M50,16.26019l8.33453,8.53537-20.987,20.987L29.013,37.448Z" fill="#fff" stroke="#fff" strokeWidth="0.20083219057122959px"/>
      <path d="M62.65243,28.91262,70.987,37.448,37.34757,71.08738,29.013,62.75284Z" fill="#fff" stroke="#fff" strokeWidth="0.20083219057122959px"/>
      <path d="M24.69514,41.56505l8.33454,8.53537L24.69514,58.435l-8.33453-8.33453Z" fill="#fff" stroke="#fff" strokeWidth="0.20083219057122959px"/>
      <path d="M75.30486,41.56505l8.33453,8.53537L50,83.73981l-8.33454-8.33454Z" fill="#fff" stroke="#fff" strokeWidth="0.20083219057122959px"/>
    </Svg>
  )
}

export default Icon
