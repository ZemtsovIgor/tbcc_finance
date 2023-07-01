import React, { useState } from 'react'
import styled from 'styled-components'
import Grid from '../../components/Box/Grid'
import Box from '../../components/Box/Box'
import { Modal } from '../Modal'
import WalletCard, { MoreWalletCard } from './WalletCard'
import config, { walletLocalStorageKey } from './config'
import { Config, Login } from './types'
import { useMatchBreakpoints } from '../../hooks'

interface Props {
  login: Login
  onDismiss?: () => void
  displayCount?: number
  t: (key: string) => string,
  setModalisOpen?: (e) => void
}

const WalletWrapper = styled(Box)`

`

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const preferredWalletName = localStorage.getItem(walletLocalStorageKey)
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority)

  if (!preferredWalletName) {
    return sortedConfig
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName)

  if (!preferredWallet) {
    return sortedConfig
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ]
}

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3, t , setModalisOpen}) => {
  const [showMore, setShowMore] = useState(false)
  const sortedConfig = getPreferredConfig(config)
  const displayListConfig = showMore ? sortedConfig : sortedConfig.slice(0, displayCount)
  const { isMobile } = useMatchBreakpoints()

  const onModalClose = () => {
    onDismiss()
    setModalisOpen(false)
  }

  return (
    <Modal
      title={t('Connect Wallet')}
      onDismiss={setModalisOpen ? onModalClose : onDismiss}
      minWidth={isMobile ? 'calc(100% - 30px)' : '450px' }
    >
      <WalletWrapper maxHeight="453px" overflowY="auto">
        <Grid gridTemplateColumns="1fr 1fr">
          {displayListConfig.map((wallet) => (
            <Box key={wallet.title}>
              <WalletCard walletConfig={wallet} login={login} onDismiss={setModalisOpen ? onModalClose : onDismiss} />
            </Box>
          ))}
          {!showMore && <MoreWalletCard t={t} onClick={() => setShowMore(true)} />}
        </Grid>
      </WalletWrapper>
    </Modal>
  )
}

export default ConnectModal
