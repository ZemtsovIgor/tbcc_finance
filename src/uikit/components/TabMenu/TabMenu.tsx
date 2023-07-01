import React, { cloneElement, Children, ReactElement } from 'react'
import styled from 'styled-components'
import Flex from '../Box/Flex'
import { TabMenuProps } from './types'

const Wrapper = styled(Flex)<{ hasBorder?: boolean }>`
  border: ${({ hasBorder }) => !hasBorder ? '0' : '2px solid #ffffff'};
  background-color: #ffffff;
  border-radius: 4px;
  overflow-x: scroll;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const Inner = styled(Flex)`
  justify-content: space-between;
  flex-grow: 1;

  & > button + button {
    margin-left: 4px;
  }

  flex: 1;
`

const ButtonMenu: React.FC<TabMenuProps> = ({ hasBorder, activeIndex = 0, onItemClick, children }) => {
  return (
    <Wrapper mb="20px" hasBorder={hasBorder}>
      <Inner>
        {Children.map(children, (child: ReactElement, index) => {
          const isActive = activeIndex === index
          return cloneElement(child, {
            isActive,
            onClick: onItemClick ? () => onItemClick(index) : undefined,
            color: isActive ? 'backgroundAlt' : 'textSubtle',
            backgroundColor: isActive ? 'textSubtle' : 'input',
          })
        })}
      </Inner>
    </Wrapper>
  )
}

export default ButtonMenu
