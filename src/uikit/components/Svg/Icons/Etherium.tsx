import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => (
    <Svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6.49809 0L6.35605 0.482464V14.4812L6.49809 14.6229L12.996 10.7819L6.49809 0Z" fill="white"/>
        <path d="M6.4981 0L0 10.7819L6.4981 14.6229V7.82831V0Z" fill="white"/>
        <path d="M6.4981 15.853L6.41805 15.9506V20.9372L6.4981 21.1709L13 12.014L6.4981 15.853Z" fill="white"/>
        <path d="M6.4981 21.1709V15.853L0 12.014L6.4981 21.1709Z" fill="white"/>
    </Svg>

)

export default Icon