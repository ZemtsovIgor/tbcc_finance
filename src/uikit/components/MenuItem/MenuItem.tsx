import React from 'react'
import { Link } from 'react-router-dom'
import StyledMenuItem, { StyledMenuItemContainer } from './styles'
import { MenuItemProps } from './types'

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  isActive = false,
  variant = 'default',
  statusColor,
  target,
  ...props
}) => {
  const itemLinkProps: unknown = href
    ? {
        as: Link,
        to: target ? { pathname: href } : href,
        target,
      }
    : {
        as: 'div',
      }

  return (
    <StyledMenuItemContainer $isActive={isActive} $variant={variant}>
      <StyledMenuItem {...itemLinkProps} $isActive={isActive} $variant={variant} $statusColor={statusColor} {...props}>
        {children}
      </StyledMenuItem>
    </StyledMenuItemContainer>
  )
}

export default MenuItem
