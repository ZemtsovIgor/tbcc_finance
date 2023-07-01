import { noop } from 'lodash'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { langs, } from './config'
import Footer from './index'
import { FooterProps } from './types'

export default {
  title: 'Components/Menu/Footer',
  component: Footer,
}

export const Template: React.FC<FooterProps> = ({ ...args }) => {
  return (
    <BrowserRouter>
      <Footer {...args} />
    </BrowserRouter>
  )
}
