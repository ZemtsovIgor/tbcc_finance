import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import { BaseButtonProps, PolymorphicComponent, variants } from '../Button/types'
import { ButtonMenuItemProps } from './types'

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps['as']
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: #505050;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 16px;
  padding: 4px 15px;
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} variant={variant} {...props} />
  }

  return <Button as={as} variant={variants.SECONDARY} {...props} />
}

export default ButtonMenuItem
