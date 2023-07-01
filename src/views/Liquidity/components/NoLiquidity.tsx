import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { SmallContainer } from './NoWalletConnected'
import { Box, DollarIcon, Text } from '../../../uikit'
import { DarkCircle } from '../style'

const WhiteCircle = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #FFF;
	transform: translateY(10px);
`

const NoLiquidity = () => {

	const { t } = useTranslation()

	return (
		<SmallContainer>
			<Box mt='41px' mb='11px'>
				<DarkCircle>
					<WhiteCircle/>
					<Box position='absolute'>
						<DollarIcon/>
					</Box>
				</DarkCircle>
			</Box>
			<Text fontSize='16px' fontWeight='400' color='rgba(255, 255, 255, 0.6)' mb='28px'>
				{t('No liquidity found.')}
			</Text>
		</SmallContainer>
	)
}

export default NoLiquidity