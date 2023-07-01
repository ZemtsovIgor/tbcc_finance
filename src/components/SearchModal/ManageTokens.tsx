import React, { useRef, RefObject, useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'
import Row, { RowBetween, RowFixed } from 'components/Layout/Row'
import { useToken } from 'hooks/Tokens'
import {useRemoveUserAddedToken} from 'state/user/hooks'
import useUserAddedTokens from 'state/user/hooks/useUserAddedTokens'
import { CurrencyLogo } from 'components/Logo'
import { getBscScanLink, isAddress } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import {Text, CloseIcon, IconButton, LinkExternal, Input, Button} from '../../uikit'
import Column, { AutoColumn } from '../Layout/Column'
import ImportRow from './ImportRow'
import { CurrencyModalView } from './types'
import {Currency, Token} from "../../sdk";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 60px;
`

const SearchInput = styled(Input)`
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

const StyledLink = styled(Button)`
  color: #505050;
  font-weight: 500;
  margin-left: 10px;
  font-size: 14px;
  background: none;
  height: auto;
  padding: 0;
`

export default function ManageTokens({
  setModalView,
  setImportToken,
  handleCurrencySelect
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  handleCurrencySelect?: (currency: Currency) => void
}) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const [searchQuery, setSearchQuery] = useState<string>('')

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  // if they input an address, use it
  const searchToken = useToken(searchQuery)

  // all tokens for local list
  const userAddedTokens: Token[] = useUserAddedTokens()
  const removeToken = useRemoveUserAddedToken()

  const tokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token) => (
        <RowBetween key={token.address} width="100%">
          <RowFixed>
            <CurrencyLogo currency={token} size="20px" />
            <StyledLink
              onClick={() => {
                setImportToken(token)
                handleCurrencySelect(token)
              }}
            >
              {token.name} ({token.symbol})
            </StyledLink>
          </RowFixed>
          <RowFixed>
            <IconButton variant="text" onClick={() => removeToken(chainId, token.address)}>
              <CloseIcon />
            </IconButton>
            <LinkExternal href={getBscScanLink(token.address, 'address', chainId)} />
          </RowFixed>
        </RowBetween>
      ))
    )
  }, [userAddedTokens, chainId, removeToken, setImportToken, handleCurrencySelect])

  const isAddressValid = searchQuery === '' || isAddress(searchQuery)

  return (
    <Wrapper>
      <Column style={{ width: '100%', flex: '1 1' }}>
        <AutoColumn gap="14px">
          <Row>
            <SearchInput
              id="token-search-input"
              scale="lg"
              placeholder="0x0000"
              value={searchQuery}
              autoComplete="off"
              ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
              isWarning={!isAddressValid}
            />
          </Row>
          {!isAddressValid && <Text color="#a5a5a4">{t('Enter valid token address')}</Text>}
          {searchToken && (
            <ImportRow
              token={searchToken}
              showImportView={() => setModalView(CurrencyModalView.importToken)}
              setImportToken={setImportToken}
              style={{ height: 'fit-content' }}
            />
          )}
        </AutoColumn>
        {tokenList}
      </Column>
    </Wrapper>
  )
}
