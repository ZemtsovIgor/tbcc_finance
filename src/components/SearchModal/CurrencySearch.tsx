import React, { KeyboardEvent, RefObject, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { FixedSizeList } from 'react-window'
import useDebounce from 'hooks/useDebounce'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from "styled-components";
import { Currency, ETHER, Token } from '../../sdk'
import { Text, Input, Box, useMatchBreakpoints } from '../../uikit'
import { useAllTokens, useToken, useIsUserAddedToken, useFoundOnInactiveList } from '../../hooks/Tokens'
import { isAddress } from '../../utils'
import Column, { AutoColumn } from '../Layout/Column'
import Row from '../Layout/Row'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import { filterTokens, useSortedTokensByQuery } from './filtering'
import useTokenComparator from './sorting'
import ImportRow from './ImportRow'

interface CurrencySearchProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  showCommonBases?: boolean
  showImportView?: () => void
  setImportToken?: (token: Token) => void

}

const SelectRow = styled(Row)`
  position: relative;
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 16px;
    right: 16px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNSAxM0MyLjkgMTMgMCAxMC4xIDAgNi41QzAgMi45IDIuOSAwIDYuNSAwQzEwLjEgMCAxMyAyLjkgMTMgNi41QzEzIDEwLjEgMTAuMSAxMyA2LjUgMTNaTTYuNSAxQzMuNDUgMSAxIDMuNDUgMSA2LjVDMSA5LjU1IDMuNDUgMTIgNi41IDEyQzkuNTUgMTIgMTIgOS41NSAxMiA2LjVDMTIgMy40NSA5LjU1IDEgNi41IDFaIiBmaWxsPSIjOEE4QThBIi8+CjxwYXRoIGQ9Ik0xMS4zNDEgMTAuNjMzNUwxNS44MzEgMTUuMTIzNUwxNS4xMjQgMTUuODMwNUwxMC42MzQgMTEuMzQwNUwxMS4zNDEgMTAuNjMzNVoiIGZpbGw9IiM4QThBOEEiLz4KPC9zdmc+Cg==);
  }
`

const SelectInput = styled(Input)`
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  box-shadow: none;
  font-size: 15px;
  line-height: 16px;
  color: #505050;
  flex: 1 1 0;
  height: 47px;

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  showCommonBases,
  showImportView,
  setImportToken
}: CurrencySearchProps) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens()

  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
    },
    [onCurrencySelect],
  )

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleInput = useCallback((event) => {
    const input = event.target.value

    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'bnb') {
          handleCurrencySelect(ETHER)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    [filteredSortedTokens, handleCurrencySelect, debouncedQuery],
  )

  // if no results on main list, show option to expand into inactive
  const inactiveTokens = useFoundOnInactiveList(debouncedQuery)
  const filteredInactiveTokens: Token[] = useSortedTokensByQuery(inactiveTokens, debouncedQuery)

  return (
    <>
      <div>
        <AutoColumn gap="16px">
          <SelectRow mt="8px">
            <SelectInput
              id="token-search-input"
              placeholder={t('Search name or paste address')}
              scale="lg"
              autoComplete="off"
              value={searchQuery}
              ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
              onKeyDown={handleEnter}
            />
          </SelectRow>
          {showCommonBases && (
            <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
          )}
        </AutoColumn>
        {searchToken && !searchTokenIsAdded ? (
          <Column style={{ padding: '20px 0', height: '100%' }}>
            <ImportRow token={searchToken} showImportView={showImportView} setImportToken={setImportToken} />
          </Column>
        ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <Box margin="16px -20px">
            <CurrencyList
              height={isMobile ? 242 : 224}
              currencies={
                filteredInactiveTokens ? filteredSortedTokens.concat(filteredInactiveTokens) : filteredSortedTokens
              }
              breakIndex={inactiveTokens && filteredSortedTokens ? filteredSortedTokens.length : undefined}
              onCurrencySelect={handleCurrencySelect}
              fixedListRef={fixedList}
              showImportView={showImportView}
              setImportToken={setImportToken}
            />
          </Box>
        ) : (
          <Column style={{ padding: '20px', height: '100%' }}>
            <Text color="textSubtle" textAlign="center" mb="20px">
              {t('No results found.')}
            </Text>
          </Column>
        )}
      </div>
    </>
  )
}

export default CurrencySearch
