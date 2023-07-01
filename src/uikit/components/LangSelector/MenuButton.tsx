import styled from 'styled-components'
import Button from '../Button/Button'

const MenuButton = styled(Button)<{ isActive: boolean }>`
  font-weight: normal;
  font-size: 15px;
  line-height: 16px;
  padding: 12px 67px;
  background: ${({ isActive }) => isActive ? 'rgba(219, 0, 255, 0.05)' : 'transparent'};
  color: ${({ isActive }) => isActive ? 'rgba(219, 0, 255, 0.6)' : '#505050'};
  border-radius: 4px;
  margin-bottom: 7px;

  &:last-child {
    border-bottom: 0;
  }
`

export default MenuButton
