import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "contexts/Localization";
import { PATHS } from "config/paths";
import { Box, Flex, Grid, Image, TelegramIcon, Text, useMatchBreakpoints, TwitterIcon } from "../../../../uikit";
import { Title, SecondaryText } from "./FirstBlock";
import { WhiteText } from "./Advantages";
import { StyledBtn, TransparentBtn } from '../../style'

const ResponsiveGrid = styled(Grid) <{ isMobile?: boolean }>`
	grid-template-areas: ${({ isMobile }) => isMobile ? `"a""b""c"` : `"a b" "a c"`};
	grid-gap: 30px;
	grid-template-columns: ${({ isMobile }) => isMobile ? '1fr' : '1fr 2fr'} ;
`
const Container = styled(Flex)`
	border-radius: 24px;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.09);
	position: relative;
`
const StyledLink = styled.a`
	display: flex;
	cursor: pointer;
	font-weight: 500;
	font-size: 16px;
	color: rgba(255, 255, 255, 0.6);
`

const Ecosystem = () => {

	const { t } = useTranslation()
	const { isMobile } = useMatchBreakpoints()

	return (
		<Flex flexDirection='column' mr={!isMobile && '200px'} mt={isMobile ? '70px' : '150px'} ml={!isMobile && '270px'}>
			<Title mb='50px'>
				{t('Be part of Ecosystem')}
			</Title>
			<ResponsiveGrid isMobile={isMobile}>
				<Container
					style={{ gridArea: 'a' }}
					flexDirection='column'
					p={isMobile ? '0' : '0 0 40px 0'}
					width={isMobile ? '100%' : 'auto'}
				>
					<Flex width='100%' justifyContent='center' mt='40px' flexDirection='column' alignItems='center'>
						<Image src="images/HomePage/ecosystem.png" width={isMobile ? '120px' : '200px'} height='auto' />
						<Image src='images/HomePage/shadow.png' width='150px' height='auto' mt='10px' />
					</Flex>
					<Flex flexDirection='column' m={isMobile ? '0 15px 35px 20px' : '25px 25px 0 40px'} justifyContent='space-between' height='100%'>
						<WhiteText>
							{t('TBCC Token')}
						</WhiteText>
						<SecondaryText>
							{t('The native token of the TBCC ecosystem. Save on trading fees, earn staking rewards and vote in governance proposals.')}
						</SecondaryText>
						<Box width='160px' mt={isMobile && '29px'}>
							<Link to={PATHS.MINT}>
								<StyledBtn>
									{t('Buy & Lock')}
								</StyledBtn>
							</Link>
						</Box>
					</Flex>
				</Container>
				<Container
					style={{ gridArea: 'b' }}
					overflow='hidden'
					pt='32px'
					pl='48px'>
					<Flex flexDirection='column' justifyContent='center' mr='60px' position='relative' zIndex={isMobile && '15'}>
						<WhiteText style={{ lineHeight: '38px', fontWeight: '600' }} mb='11px'>
							{t('TBCC Exchange')}
						</WhiteText>
						<SecondaryText mb='34px'>
							{t('Trade cryptocurrency easily and safely.')}
						</SecondaryText>
						<Box width='180px' mb='45px'>
							<Link to={PATHS.SWAP}>
								<TransparentBtn>
									{t('Start trading')}
								</TransparentBtn>
							</Link>
						</Box>
					</Flex>
					<Image
						src="images/HomePage/sratistic.png"
						width={isMobile ? '200px' : '400px'}
						height='auto'
						style={{
							position: isMobile ? 'absolute' : 'static', bottom: isMobile && '0', right: isMobile && '0',
							filter: isMobile && 'opacity(0.4)'
						}} />
				</Container>
				<Container flexDirection='column' style={{ gridArea: 'c' }} p='46px 0 50px 48px'>
					<WhiteText mb='30px'>
						{t('TBCC Community')}
					</WhiteText>
					<Flex flexDirection={isMobile ? 'column' : 'row'}>
						<StyledLink href="https://web.telegram.org/z/" style={{ marginRight: '30px', marginBottom: isMobile && '20px' }}>
							<TelegramIcon fill="#FFF" width='22px' height='19px' mr='15px' />
							<Text fontSize='15px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
								{t('Telegram channel')}
							</Text>
						</StyledLink>
						<StyledLink href="https://web.telegram.org/z/" style={{ marginRight: '30px', marginBottom: isMobile && '20px' }}>
							<TelegramIcon fill="#FFF" width='22px' height='19px' mr='15px' />
							<Text fontSize='15px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
								{t('Telegram chat')}
							</Text>
						</StyledLink>
						<StyledLink href="https://web.telegram.org/z/">
							<TwitterIcon fill="#FFF" width='22px' height='19px' mr='15px' />
							<Text fontSize='15px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
								{t('Twitter')}
							</Text>
						</StyledLink>
					</Flex>
				</Container>
			</ResponsiveGrid>
		</Flex>
	)
}

export default Ecosystem
