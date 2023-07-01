import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import SubMenuItems from './SubMenuItems'
import SubMenuItemsMock from './mock'
import { SubMenuItemsProps } from './types'

export default {
  title: 'Components/Menu/SubMenuItems',
  component: SubMenuItems,
}

export const Template: React.FC<SubMenuItemsProps> = (args) => {
  return (
    <BrowserRouter>
      <SubMenuItems {...args} />
    </BrowserRouter>
  )
}
