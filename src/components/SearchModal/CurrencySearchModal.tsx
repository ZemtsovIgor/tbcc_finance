import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Currency, Token } from '../../sdk'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBody,
  InjectedModalProps,
  Heading, Button, useMatchBreakpoints,
} from '../../uikit'
import CurrencySearch from './CurrencySearch'
import ImportToken from './ImportToken'
import { CurrencyModalView } from './types'
import ManageTokens from "./ManageTokens";

const StyledModalContainer = styled(ModalContainer)<{ isMobile?: boolean }>`
  max-width: ${({ isMobile }) => isMobile ? 'calc(100% - 30px' : '320px'};
  width: 100%;
`

const StyledModalBody = styled(ModalBody)<{ padding?: string }>`
  padding: ${({ padding }) => padding || '24px'};
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledCanselBtn = styled(Button)`
  background: #F9F9F9;
  border-radius: 4px;
  padding: 12px 4px;
  color: #8A8A8A;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  height: 40px;
`

const StyledAddBtn = styled(Button)`
  background: linear-gradient(77.9deg,#DB00FF -3.83%,#2C5EE0 110.36%);
  border-radius: 4px;
  padding: 12px 4px;
  color: #ffffff;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  height: 40px;
`

interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  showCommonBases?: boolean
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss()
      onCurrencySelect(currency)
    },
    [onDismiss, onCurrencySelect],
  )

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>()

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <StyledModalContainer isMobile={isMobile} minWidth={isMobile ? 'calc(100% - 30px)' : '384px'}>
      <ModalHeader padding={isMobile ? '17px 18px 0 18px' : '20px 20px 0 20px'}>
        <ModalTitle>
          <Heading color="#505050" fontWeight="500" fontSize={isMobile ? '18px' : '20px'} lineHeight="20px">{t('Select a Token')}</Heading>
        </ModalTitle>
      </ModalHeader>
      <StyledModalBody padding={isMobile ? '17px' : '20px'}>
        {
          modalView === CurrencyModalView.search ? (
            <CurrencySearch
              onCurrencySelect={handleCurrencySelect}
              selectedCurrency={selectedCurrency}
              showCommonBases={showCommonBases}
              showImportView={() => setModalView(CurrencyModalView.importToken)}
              setImportToken={setImportToken}
            />
          ) : modalView === CurrencyModalView.importToken && importToken ? (
            <ImportToken tokens={[importToken]} handleCurrencySelect={handleCurrencySelect}/>
          ) : modalView === CurrencyModalView.manage ? (
            <ManageTokens
              setModalView={setModalView}
              setImportToken={setImportToken}
              handleCurrencySelect={handleCurrencySelect}
            />
          ) : (
            ''
          )}
        {modalView === CurrencyModalView.search && (
          <StyledAddBtn
            width="100%"
            mb="20px"
            onClick={() => setModalView(CurrencyModalView.manage)}
          >
            {t('Add Token')}
          </StyledAddBtn>
        )}
        <StyledCanselBtn width="100%" onClick={onDismiss}>
          {t('Cancel')}
        </StyledCanselBtn>
      </StyledModalBody>
    </StyledModalContainer>
  )
}
