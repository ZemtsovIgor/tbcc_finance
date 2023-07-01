import styled from 'styled-components'
import { TabProps } from './types'

const Tab = styled.button<TabProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  border: 0;
  outline: 0;
  flex-grow: 1;
  padding: ${({ hasBorder }) => !hasBorder ? '15px' : '14px'};
  border-radius: 4px;
  font-size: 15px;
  line-height: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-grow: 0;
  }

  color: ${({ isActive }) => (isActive ? '#4E89E3' : '#505050')};
  background-color: ${({ isActive }) => (isActive ? '#E7F7FF' : '#FFFFFF')};
`

Tab.defaultProps = {
  scale: 'md',
}

export default Tab
