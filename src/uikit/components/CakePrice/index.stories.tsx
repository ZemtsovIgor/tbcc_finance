import React from 'react'
import { CakePrice, CakePriceProps } from '.'
import { Flex } from '../Box'

export default {
  title: 'Components/CakePrice',
  component: CakePrice,
}

export const Template: React.FC<CakePriceProps> = ({ ...args }) => {
  return (
    <Flex p="10px">
      <CakePrice {...args} />
    </Flex>
  )
}
