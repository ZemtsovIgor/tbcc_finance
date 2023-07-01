import React from 'react'
import styled from 'styled-components'
import { Flex } from '../../uikit'

const Wrapper = styled(Flex)`
  overflow-x: scroll;
  padding: 0;
  border-radius: 24px 24px 0 0;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
`
interface TabProps {
  isActive?: boolean
  onClick?: () => void
}

export const TabToggle = styled.button<TabProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  border: 0;
  outline: 0;
  padding: 16px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  background-color: ${({isActive }) => (isActive ? 'rgba(255, 255, 255,0.2)':'rgba(255, 255, 255,0.01)')};

`

interface TabToggleGroupProps {
  children: React.ReactElement[]
}

export const TabToggleGroup: React.FC<TabToggleGroupProps> = ({ children }) => {
  return (
    <Wrapper p={['0 4px', '0 16px']}>
     {children}
    </Wrapper>
  )
}
