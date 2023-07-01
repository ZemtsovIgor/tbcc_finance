import React from 'react'
import styled from 'styled-components'
import { AutoRow } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import { CurrencyLogo } from 'components/Logo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBscScanLink } from 'utils'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { Currency, Token } from '../sdk'
import { Button, Text, Modal, useModal, InjectedModalProps, Link } from '../uikit'
import { useUnsupportedTokens } from '../hooks/Tokens'

interface Props extends InjectedModalProps {
  currencies: (Currency | undefined)[]
}

const DetailsFooter = styled.div`
  padding: 20px 40;
  width: 100%;
  border-radius: 24px;
  color: #FFF;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 24px;
  text-align: center;
  margin-top: 20px;
`

const UnsupportedModal: React.FC<Props> = ({ currencies, onDismiss }) => {
  const { chainId } = useActiveWeb3React()
  const tokens =
    chainId && currencies
      ? currencies.map((currency) => {
          return wrappedCurrency(currency, chainId)
        })
      : []

  const unsupportedTokens: { [address: string]: Token } = useUnsupportedTokens()

  return (
    <Modal title="Unsupported Assets" maxWidth="420px" onDismiss={onDismiss}>
      <AutoColumn gap="lg">
        {tokens.map((token) => {
          return (
            token &&
            unsupportedTokens &&
            Object.keys(unsupportedTokens).includes(token.address) && (
              <AutoColumn key={token.address?.concat('not-supported')} gap="10px">
                <AutoRow gap="5px" align="center">
                  <CurrencyLogo currency={token} size="24px" />
                  <Text>{token.symbol}</Text>
                </AutoRow>
                {chainId && (
                  <Link external small color="#FFF" href={getBscScanLink(token.address, 'address', chainId)}>
                    {token.address}
                  </Link>
                )}
              </AutoColumn>
            )
          )
        })}
        <AutoColumn gap="lg">
          <Text>
            Some assets are not available through this interface because they may not work well with our smart contract
            or we are unable to allow trading for legal reasons.
          </Text>
        </AutoColumn>
      </AutoColumn>
    </Modal>
  )
}

export default function UnsupportedCurrencyFooter({ currencies }: { currencies: (Currency | undefined)[] }) {
  const [onPresentModal] = useModal(<UnsupportedModal currencies={currencies} />)

  return (
    <DetailsFooter>
      <Button variant="text" onClick={onPresentModal} style={{color: '#FFF'}}>
        Read more about unsupported assets
      </Button>
    </DetailsFooter>
  )
}
