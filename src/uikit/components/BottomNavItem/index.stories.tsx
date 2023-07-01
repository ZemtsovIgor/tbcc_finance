import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Flex } from '../Box'
import BottomNavItem from './BottomNavItem'
import { BottomNavItemProps } from './types'

export default {
  title: 'Components/Menu/BottomNavItem',
  component: BottomNavItem,
}

export const Template: React.FC<BottomNavItemProps> = ({ ...args }) => {
  return (
    <BrowserRouter>
      <Flex p="10px">
        <BottomNavItem {...args} />
      </Flex>
    </BrowserRouter>
  )
}
