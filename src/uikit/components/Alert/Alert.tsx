import React from 'react'
import styled from 'styled-components'
import CheckmarkCircleIcon from '../Svg/Icons/CheckmarkCircle'
import ErrorIcon from '../Svg/Icons/Error'
import BlockIcon from '../Svg/Icons/Block'
import InfoIcon from '../Svg/Icons/Info'
import { Text } from '../Text'
import { IconButton } from '../Button'
import { CloseIcon } from '../Svg'
import Flex from '../Box/Flex'
import { AlertProps, variants } from './types'

const getIcon = (variant: AlertProps['variant'] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return BlockIcon
    case variants.WARNING:
      return ErrorIcon
    case variants.SUCCESS:
      return CheckmarkCircleIcon
    case variants.INFO:
    default:
      return InfoIcon
  }
}

const withHandlerSpacing = 32 + 12 + 8 // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  padding-bottom: 19px;
  padding-left: 12px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : '12px')};
  padding-top: 20px;
  color: #FF4E19;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`

const CloseHandler = styled.div`
  right: 24px;
  position: absolute;
  top: 19px;
`

const StyledAlert = styled(Flex)`
  position: relative;
  background-color: #FFFFFF;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding-left: 20px;
`

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  const Icon = getIcon(variant)

  return (
    <StyledAlert>
      <Icon width="28px" />
      <Details hasHandler={!!onClick}>
        {typeof children === 'string' ? <Text as="p" color="#FF4E19" fontWeight="500" fontSize="14px" lineHeight="16px">{title} {children}</Text> : children}
      </Details>
      {onClick && (
        <CloseHandler>
          <IconButton scale="sm" variant="text" onClick={onClick}>
            <CloseIcon width="16px" />
          </IconButton>
        </CloseHandler>
      )}
    </StyledAlert>
  )
}

export default Alert
