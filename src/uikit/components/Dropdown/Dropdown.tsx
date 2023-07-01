import React from 'react'
import styled from 'styled-components'
import { DropdownProps, PositionProps, Position } from './types'

const getLeft = ({ position }: PositionProps) => {
  if (position === 'top-right') {
    return '100%'
  }
  return '50%'
}

const getBottom = ({ position }: PositionProps) => {
  if (position === 'top' || position === 'top-right') {
    return '100%'
  }
  return 'auto'
}

const DropdownContent = styled.div<{ position: Position }>`
  width: max-content;
  display: none;
  flex-direction: column;
  position: absolute;
  transform: translate(-50%, 0);
  left: ${getLeft};
  bottom: ${getBottom};
  max-height: 400px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
`

const DropdownBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 6px;
  padding: 8px;
`

const Container = styled.div`
  position: relative;
  &:hover ${DropdownContent}, &:focus-within ${DropdownContent} {
    display: flex;
  }
`

const Dropdown: React.FC<DropdownProps> = ({ target, position = 'bottom', children }) => {
  return (
    <Container>
      {target}
      <DropdownContent position={position}>
        <DropdownBody>{children}</DropdownBody>
      </DropdownContent>
    </Container>
  )
}
Dropdown.defaultProps = {
  position: 'bottom',
}

export default Dropdown
