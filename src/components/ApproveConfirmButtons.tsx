import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { StyledBtn } from 'views/Mint/components/MintModal'
import { ChevronRightIcon, AutoRenewIcon, ChevronDownIcon, Box, Flex } from '../uikit'

export enum ButtonArrangement {
  ROW = 'row',
  SEQUENTIAL = 'sequential',
}

interface ApproveConfirmButtonsProps {
  isApproveDisabled: boolean
  isApproving: boolean
  isConfirming: boolean
  isConfirmDisabled: boolean
  onApprove: () => void
  onConfirm: () => void
  buttonArrangement?: ButtonArrangement
  confirmLabel?: string
  confirmId?: string,
  width?: string
}

const StyledApproveConfirmButtonRow = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
`

const iconAttrs = { width: '24px', color: 'textDisabled' }

const ChevronRight = styled(ChevronRightIcon).attrs(iconAttrs)`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const ChevronBottom = styled(ChevronDownIcon).attrs(iconAttrs)`
  display: block;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const ApproveConfirmButtons: React.FC<ApproveConfirmButtonsProps> = ({
  isApproveDisabled,
  isApproving,
  isConfirming,
  isConfirmDisabled,
  onApprove,
  onConfirm,
  buttonArrangement = ButtonArrangement.ROW,
  confirmLabel,
  confirmId,
  width
}) => {
  const { t } = useTranslation()
  const confirmButtonText = confirmLabel ?? t('Confirm')

  const ApproveConfirmRow = () => {
    return (
      <StyledApproveConfirmButtonRow>
        <Box width={width}>
          <StyledBtn
            disabled={isApproveDisabled}
            onClick={onApprove}
            endIcon={isApproving ? spinnerIcon : undefined}
            isLoading={isApproving}
            width={width}
          >
            {isApproving ? t('Enabling') : t('Enable')}
          </StyledBtn>
        </Box>
        <Flex justifyContent="center">
          <ChevronRight />
          <ChevronBottom />
        </Flex>
        <Box>
          <StyledBtn
            id={confirmId}
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            isLoading={isConfirming}
            endIcon={isConfirming ? spinnerIcon : undefined}
          >
            {isConfirming ? t('Confirming') : confirmButtonText}
          </StyledBtn>
        </Box>
      </StyledApproveConfirmButtonRow>
    )
  }

  const ApproveConfirmSequential = () => {
    return (
      <>
        {isApproveDisabled ? (
          <Box width={width}>
            <StyledBtn
              id={confirmId}
              onClick={onConfirm}
              disabled={isConfirmDisabled}
              isLoading={isConfirming}
              endIcon={isConfirming ? spinnerIcon : undefined}
              width={width}
            >
              {isConfirming ? t('Confirming') : confirmButtonText}
            </StyledBtn>
          </Box>
        ) : (
          <Box width={width}>
            <StyledBtn width={width} onClick={onApprove} endIcon={isApproving ? spinnerIcon : undefined} isLoading={isApproving}>
              {isApproving ? t('Enabling') : t('Enable')}
            </StyledBtn>
          </Box>
        )}
      </>
    )
  }

  return buttonArrangement === ButtonArrangement.ROW ? ApproveConfirmRow() : ApproveConfirmSequential()
}

export default ApproveConfirmButtons
