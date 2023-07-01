import React from 'react'
import { Flex } from '../Box'
import { ThemeSwitcher, ThemeSwitcherProps } from '.'

export default {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
}

export const Template: React.FC<ThemeSwitcherProps> = ({ ...args }) => {
  return (
    <Flex p="10px">
      <ThemeSwitcher {...args} />
    </Flex>
  )
}
