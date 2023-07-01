import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { StarFillIcon, StarLineIcon } from '../../../../uikit'

const HoverIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const SaveIcon: React.FC<{ fill: boolean } & HTMLAttributes<HTMLDivElement>> = ({ fill = false, ...rest }) => {
  return (
    <HoverIcon {...rest}>
      {fill ? (
        <StarFillIcon  color="orange" />
      ) : (
        <StarLineIcon color="#ffff" />
      )}
    </HoverIcon>
  )
}

export default SaveIcon
