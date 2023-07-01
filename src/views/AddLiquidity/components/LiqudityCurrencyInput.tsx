import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Currency, Pair } from '../../../sdk'
import { Button, ChevronDownIcon, Text, Flex, Box, useMatchBreakpoints, useModal } from '../../../uikit'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import CurrencySearchModal from '../../../components/SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../../../components/Logo'

import { RowBetween } from '../../../components/Layout/Row'
import { Input as NumericalInput } from '../../../components/CurrencyInputPanel/NumericalInput'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' }) <{ isMobile?: boolean }>`
  padding: 2px;
  border-radius: 12px;
  margin-right: 0;
  height: ${({ isMobile }) => (isMobile ? '48px' : '73px')};
  width: ${({ isMobile }) => (isMobile ? '220px' : '225px')};
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.09);
`
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const StyledLabel = styled(Text) <{ isMobile?: boolean }>`
  font-size: 13px;
  line-height: 13px;
  color: #FFF;
  opacity: 0.6;
  position: relative;
  top: ${({ isMobile }) => isMobile ? '23px' : '36px'};
  z-index: 20;
  transform: translateX(-20px);
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  id: string
  showCommonBases?: boolean
}
export default function LiqudityCurrencyInput({
  value,
  onUserInput,
  onMax,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <Box>
      <Flex alignItems="center" justifyContent="flex-end" mb='3px'>
        {account && (
          <Text
            onClick={onMax}
            color="#FFFFFF"
            fontSize="14px"
            lineHeight="14px"
            style={{ display: 'inline', cursor: 'pointer', transform: 'translateX(90px)' }}
          >
            {!hideBalance && !!currency
              ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
              : ' -'}
          </Text>
        )}
        {label && (
          <StyledLabel isMobile={isMobile}>
            {label}
          </StyledLabel>
        )}
      </Flex>
      <InputPanel id={id}>
        <Container>
          <CurrencySelectButton selected={!!currency} onClick={() => onPresentCurrencyModal()} isMobile={isMobile}>

            <Flex
              alignItems="center"
              justifyContent="space-around"
              background="rgba(255, 255, 255, 0.1)"
              border='1px solid rgba(255, 255, 255, 0.09)'
              width="100%"
              height="100%"
              padding="0px"
              borderRadius='12px'
              paddingLeft='10px'
            >
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="32px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" color="#505050" fontSize="15px" bold>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" color="#FFF" fontSize="15px" fontWeight='500' lineHeight='20px'>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                    : currency?.symbol) || t('Select a Currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon fill='#FFFFFF' opacity={0.4} mr={10} />}
            </Flex>
          </CurrencySelectButton>
          <RowBetween>
            <NumericalInput
              className="token-amount-input"
              style={{ height: '46px', color: '#FFF', fontSize: '20px', top: '6px', textAlign: 'end', paddingRight: '20px' }}
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </RowBetween>

        </Container>

        {/* <InputRow selected={disableCurrencySelect}> */}
        {/*  {account && currency && showMaxButton && label !== 'To' && ( */}
        {/*    <Button onClick={onMax} scale="xs" variant="secondary"> */}
        {/*      MAX */}
        {/*    </Button> */}
        {/*  )} */}
        {/* </InputRow> */}
      </InputPanel>
    </Box>
  )
}
