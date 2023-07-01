import React, { useState } from 'react'
import { AutoColumn } from 'components/Layout/Column'
import { useAddUserToken } from 'state/user/hooks'
import { getBscScanLink } from 'utils'
import styled from "styled-components";
import truncateHash from 'utils/truncateHash'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import { useTranslation } from 'contexts/Localization'
import { Button, Text, Flex, Message, Toggle, Link, Grid } from '../../uikit'
import { Token, Currency } from '../../sdk'

interface ImportProps {
  tokens: Token[]
  handleCurrencySelect?: (currency: Currency) => void
}

const StyledImportBtn = styled(Button)`
  background: linear-gradient(77.9deg,#DB00FF -3.83%,#2C5EE0 110.36%);
  border-radius: 4px;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  height: 40px;
`

function ImportToken({ tokens, handleCurrencySelect }: ImportProps) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  return (
    <AutoColumn gap="lg">
      <Message variant="warning">
        <Text>
          {t(
            'Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.',
          )}
          <br />
          <br />
          {t('If you purchase an arbitrary token, you may be unable to sell it back.')}
        </Text>
      </Message>

      {tokens.map((token) => {
        const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
        const address = token.address ? `${truncateHash(token.address)}` : null
        return (
          <Grid key={token.address} gridTemplateRows="1fr 1fr 1fr" gridGap="4px">
            {list !== undefined ? (
              <Text color="#a5a5a4">{t('via')} {list.name}</Text>
            ) : (
              <Text color="#a5a5a4">{t('Unknown Source')}</Text>
            )}
            <Flex alignItems="center">
              <Text fontSize='14px' fontWeight='600' color='#505050'>{token.name}</Text>
              <Text ml="8px" fontSize='14px' fontWeight='600' color='#505050'>({token.symbol})</Text>
            </Flex>
            {chainId && (
              <Flex justifyContent="space-between" width="100%">
                <Text mr="4px">{address}</Text>
                <Link href={getBscScanLink(token.address, 'address', chainId)} external>
                  ({t('View on BscScan')})
                </Link>
              </Flex>
            )}
          </Grid>
        )
      })}

      <Flex justifyContent="space-between" alignItems="center" mb="15px">
        <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
          <Toggle
            scale="md"
            name="confirmed"
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            className="token-dismiss-toogle"
          />
          <Text fontSize="14px" lineHeight="16px" color="#505050">{t('I understand')}</Text>
        </Flex>
        <StyledImportBtn
          variant="danger"
          disabled={!confirmed}
          onClick={() => {
            tokens.map((token) => addToken(token))
            if (handleCurrencySelect) {
              handleCurrencySelect(tokens[0])
            }
          }}
          className=".token-dismiss-button"
        >
          {t('Import')}
        </StyledImportBtn>
      </Flex>
    </AutoColumn>
  )
}

export default ImportToken
