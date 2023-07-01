import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Box/Flex'
import { Box } from '../../components/Box'
import { ArrowBackIcon, CloseIcon, CloseLightIcon } from '../../components/Svg'
import { IconButton } from '../../components/Button'
import { ModalProps } from './types'

export const ModalHeader = styled.div<{ background?: string, padding?: string }>`
  align-items: center;
  background: transparent;
  display: flex;
  padding: ${({ padding }) => padding || '35px 28px 0 28px'};
`

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps['onDismiss'], light?: boolean  }> = ({ onDismiss, light }) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{transform: 'translateX(-5px)'}} >
      {light 
      ? <CloseLightIcon/>
      : <CloseIcon color="primary" />
      }
    </IconButton>
  )
}

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back">
      <ArrowBackIcon color="primary" />
    </IconButton>
  )
}

export const ModalContainer = styled(Box)<{ minWidth: string, isMobile?: boolean }>`
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`
