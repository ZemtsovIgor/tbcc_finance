import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useAuth from 'hooks/useAuth'
import ConnectModal from 'uikit/widgets/WalletModal/ConnectModal'
import { Flex, Text, Button, Box, useModal } from '../../../uikit'
import WalletImg from './WalletImg'

export const SmallContainer = styled(Flex)`
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.1);
	margin-bottom: 18px;
`
const StyledTransparentBtn = styled(Button)`
	border-radius: 6px;
	border: 1px solid rgba(255, 255, 255, 0.09);
	background: transparent;
	box-shadow: none;
	font-size: 15px;
	font-weight: 600;
	color: #FFF;
	padding: 15px 25px;
	margin-bottom: 40px;
`

const NoWalletConnected = () => {

	const { t } = useTranslation()
	const { login } = useAuth()
	const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)

	return (
		<SmallContainer>
			<Box mt='30px' mb='11px'>
				<WalletImg/>
			</Box>
			<Text fontSize='16px' fontWeight='400' color='rgba(255, 255, 255, 0.6)' mb='28px'>
				{t('Connect to a wallet to view your liquidity.')}
			</Text>
			<StyledTransparentBtn
				onClick={onPresentConnectModal}
				>
				{t('Connect Wallet')}
			</StyledTransparentBtn>
		</SmallContainer>
	)
}

export default NoWalletConnected
