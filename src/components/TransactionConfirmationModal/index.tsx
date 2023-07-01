import React, { useCallback } from 'react'
import styled from 'styled-components'
import { registerToken } from 'utils/wallet'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { ChainId, Currency, Token } from '../../sdk'
import {
  Button,
  Text,
  ErrorIcon,
  MetamaskIcon,
  Flex,
  Box,
  Link,
  Modal,
  InjectedModalProps, useMatchBreakpoints,
} from '../../uikit'
import { RowFixed } from '../Layout/Row'
import Column, { AutoColumn } from '../Layout/Column'
import { getBscScanLink } from '../../utils'

const StyledModal = styled(Modal)`
  border-radius: 24px;
  & > div:first-child {
    margin-top: 15px;
    & > div:first-child {
    width: 100%;
    display: flex;
    justify-content: center;
    }
  }

  & h2:first-of-type {
    font-size: 36px;
    font-weight: 700;
  }

  & svg:first-of-type {
    position: absolute;
    top: -10px;
    right: 0;
  }
`

const Wrapper = styled.div`
  width: 100%;
  min-width: 329px;
`

const PendingWrapper = styled.div`
  width: 100%;
  min-width: 338px;
`

const ConfirmationWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  min-width: 338px;
  max-width: ${({ isMobile }) => (isMobile ? '342px' : '377px')};
  padding: 17px 20px 20px;
`

function ConfirmationPendingContent({
  amountA,
  symbolA,
  amountB,
  symbolB,
  onDismiss
}: {
  amountA: string
  symbolA: string
  amountB: string
  symbolB: string
  onDismiss: () => void
}) {
  const { t } = useTranslation()
  return (
    <PendingWrapper>
      <Flex flexDirection="column">
        <Text fontSize="15px" lineHeight="24px" mb="20px">
          {t('Confirm this transaction in your wallet')}
        </Text>
        <Flex flexDirection="column" mb="20px">
          <Flex justifyContent="space-between" mb="20px">
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500">{t('From')}</Text>
            </Column>
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500">{amountA} {symbolA}</Text>
            </Column>
          </Flex>
          <Flex justifyContent="space-between">
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500">{t('To')}</Text>
            </Column>
            <Column>
              <Text fontSize="15px" lineHeight="16px" fontWeight="500">{amountB} {symbolB}</Text>
            </Column>
          </Flex>
        </Flex>
        {/* {pendingText} */}
        <Button onClick={onDismiss} mt="20px" style={{ width: '100%', background: '#F9F9F9', borderRadius: '4px', padding: '12px 4px', color: '#8A8A8A', fontWeight: 500, fontSize: '15px', lineHeight: '16px', marginTop: '12px', height: 'auto' }}>
          {t('Cancel')}
        </Button>
      </Flex>
    </PendingWrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { library } = useActiveWeb3React()

  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Flex flexDirection="column">
        {chainId && hash && (
          <Link external href={getBscScanLink(hash, 'transaction', chainId)} style={{ width: '100%', background: '#F3FBFF', borderRadius: '4px', padding: '12px 4px', color: '#4E89E3', fontWeight: 500, fontSize: '15px', lineHeight: '16px', justifyContent: 'center' }}>
            {t('View on BscScan')}
          </Link>
        )}
        {currencyToAdd && library?.provider?.isMetaMask && (
          <Button
            variant="tertiary"
            mt="12px"
            width="fit-content"
            onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            style={{ width: '100%', background: '#F3FBFF', borderRadius: '4px', padding: '12px 4px', color: '#4E89E3', fontWeight: 500, fontSize: '15px', lineHeight: '16px', marginTop: '12px', height: 'auto' }}
          >
            <RowFixed>
              {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })}
              <MetamaskIcon width="16px" ml="6px" />
            </RowFixed>
          </Button>
        )}
        <Button onClick={onDismiss} mt="20px" style={{ width: '100%', background: '#F9F9F9', borderRadius: '4px', padding: '12px 4px', color: '#8A8A8A', fontWeight: 500, fontSize: '15px', lineHeight: '16px', marginTop: '12px', height: 'auto' }}>
          {t('Close')}
        </Button>
      </Flex>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  const { isMobile } = useMatchBreakpoints()
  return (
    <ConfirmationWrapper isMobile={isMobile}>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </ConfirmationWrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <ErrorIcon color="failure" width="64px" />
        <Text color="failure" style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </Text>
      </AutoColumn>

      <Flex justifyContent="center" pt="24px">
        <Button onClick={onDismiss}>{t('Dismiss')}</Button>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  currencyToAdd?: Currency | undefined
  amountA: string
  symbolA: string
  amountB: string
  symbolB: string
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  content,
  currencyToAdd,
  amountA,
  symbolA,
  amountB,
  symbolB
}) => {
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <StyledModal
      title={title}
      headerBackground="gradients.cardHeader"
      onDismiss={handleDismiss}
      style={{ maxWidth: isMobile ? 'calc(100% - 30px)' : '550px' }}
      bodyPadding={isMobile ? '17px 17px 17px 17px' : '28px'}
    >
      {attemptingTxn ? (
        <ConfirmationPendingContent
          onDismiss={onDismiss}
          amountA={amountA}
          symbolA={symbolA}
          amountB={amountB}
          symbolB={symbolB}
        />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </StyledModal>
  )
}

export default TransactionConfirmationModal
