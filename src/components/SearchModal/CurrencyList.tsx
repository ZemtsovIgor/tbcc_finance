import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { LightGreyCard } from 'components/Card'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  Currency,
  CurrencyAmount,
  ETHER,
  Token
} from '../../sdk'
import { Text, useMatchBreakpoints } from '../../uikit'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useAllInactiveTokens } from '../../hooks/Tokens'
import Column from '../Layout/Column'
import { RowFixed, RowBetween } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import CircleLoader from '../Loader/CircleLoader'
import ImportRow from './ImportRow'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  color: #505050;
`

const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText className="to_blue" title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    & .to_blue {
      color: #4E89E3;
    }
  ;
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 40px);
    height: 1px;
    background-color: #E5E5E5;
    bottom: 0;
    left: 20px;
  }

  &:last-child&:after {
    display: none;
  }
`

function CurrencyRow({
  currency,
  onSelect,
  // isSelected,
  // otherSelected,
  style,
}: {
  currency: Currency
  onSelect: () => void
  // isSelected?: boolean
  // otherSelected?: boolean
  style: CSSProperties
}) {
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  // const selectedTokenList = listToTokenMap(DEFAULT_TOKEN_LIST)
  // const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  // const customAdded = useIsUserAddedToken(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)

  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (onSelect())}
      disabled={false}
      selected={false}
    >
      <CurrencyLogo currency={currency} size="32px" />
      <Column>
        <Text bold className="to_blue">{currency.symbol}</Text>
      </Column>
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <CircleLoader /> : null}
      </RowFixed>
    </MenuItem>
  )
}

export default function CurrencyList({
  height,
  currencies,
  // selectedCurrency,
  onCurrencySelect,
  // otherCurrency,
  fixedListRef,
  breakIndex,
  showImportView,
  setImportToken,

}: {
  height: number
  currencies: Currency[]
  onCurrencySelect: (currency: Currency) => void
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  breakIndex: number | undefined
  showImportView?: () => void
  setImportToken?: (token: Token) => void

}) {
  const itemData: (Currency | undefined)[] = useMemo(() => {
    let formatted: (Currency | undefined)[] = [Currency.ETHER, ...currencies]
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)]
    }
    return formatted
  }, [breakIndex, currencies])

  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const inactiveTokens: {
    [address: string]: Token
  } = useAllInactiveTokens()

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index]
      // const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
      // const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency))
      const handleSelect = () => onCurrencySelect(currency)

      const token = wrappedCurrency(currency, chainId)

      const showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address)

      if (index === breakIndex || !data) {
        return (
          <FixedContentRow style={style}>
            <LightGreyCard padding="8px 12px" borderRadius="8px">
              <RowBetween>
                <Text small>{t('Expanded results from inactive Token Lists')}</Text>
              </RowBetween>
            </LightGreyCard>
          </FixedContentRow>
        )
      }

      if (showImport && token) {
        return (
          <ImportRow style={style} token={token} showImportView={showImportView} setImportToken={setImportToken} dim />
        )
      }

      return (
        <CurrencyRow
          style={style}
          currency={currency}
          onSelect={handleSelect}
        />
      )
    },
    [
      chainId,
      inactiveTokens,
      onCurrencySelect,
      setImportToken,
      showImportView,
      breakIndex,
      t
    ],
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])
  const { isMobile } = useMatchBreakpoints()

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={isMobile ? 60 : 56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
