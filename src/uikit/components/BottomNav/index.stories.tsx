import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Box } from '../Box'
import BottomNav from './BottomNav'
import { BottomNavProps } from './types'

export default {
  title: 'Components/Menu/BottomNav',
  component: BottomNav,
  argTypes: {
    activeItem: {
      options: ['/swap', '/earn', '/win', '/nft'],
      control: { type: 'select' },
    },
  },
}

export const Template: React.FC<BottomNavProps> = (args) => {
  return (
    <BrowserRouter>
      <Box height="100vh">
        <BottomNav {...args} />
      </Box>
    </BrowserRouter>
  )
}
