import React, { cloneElement, isValidElement } from 'react'
import { useTheme } from 'styled-components'
import Heading from '../../components/Heading/Heading'
import getThemeValue from '../../util/getThemeValue'
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from './styles'
import { ModalProps } from './types'
import { useMatchBreakpoints } from '../../hooks'

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = '28px',
  headerBackground = 'transparent',
  minWidth = '320px',
  startIcon,
  hl,
  hs,
  lightClose,
  ...props
}) => {
  const theme = useTheme()
  const { isMobile } = useMatchBreakpoints()
  return (
    <ModalContainer minWidth={minWidth} isMobile={isMobile} {...props}>
      <ModalHeader background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)} padding="17px 18px 0 18px">
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: '12px',
          })}
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack}/>}
          <Heading color="#101428" fontWeight="500" fontSize={isMobile ? '18px' : !hs ? '32px' : hs} lineHeight={isMobile ? '20px' : !hl ? '32px' : hl}>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} light={lightClose}/>}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  )
}

export default Modal
