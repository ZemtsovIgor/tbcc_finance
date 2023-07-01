import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MenuItems from './MenuItems'
import MenuItemsMock from './mock'
import { MenuItemsProps } from './types'

export default {
  title: 'Components/Menu/MenuItems',
  component: MenuItems,
}

export const Template: React.FC<MenuItemsProps> = (args) => {
  return (
    <BrowserRouter>
      <MenuItems {...args} />
    </BrowserRouter>
  )
}
