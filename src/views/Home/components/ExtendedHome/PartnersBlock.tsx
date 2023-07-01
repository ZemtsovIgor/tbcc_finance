import React from "react";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { Flex, Grid, useMatchBreakpoints, CoinmarketTextIcon, CoinGekoTextIcon, BinanceTextIcon, TBCClabsTextIcon, CoinGeckoColorTextIcon, BinanceColorTextIcon, TBCClabsColorTextIcon } from '../../../../uikit'
import { Title } from "./FirstBlock";

const PartnersList = [
	{
		name: 'CoinmarletCap',
		disicon: <CoinmarketTextIcon />,
		enicon: <CoinmarketTextIcon opacity={1} />,
		href: 'https://coinmarketcap.com/'
	},
	{
		name: 'CoinGecko',
		disicon: <CoinGekoTextIcon opacity={0.4} />,
		enicon: <CoinGeckoColorTextIcon />,
		href: 'https://www.coingecko.com/'
	},
	{
		name: 'Binance',
		disicon: <BinanceTextIcon opacity={0.4} />,
		enicon: <BinanceColorTextIcon />,
		href: 'https://www.binance.com/'
	},
	{
		name: 'TBCC',
		disicon: <TBCClabsTextIcon opacity={0.4} />,
		enicon: <TBCClabsColorTextIcon />,
		href: 'https://tbcclabs.com/'
	}
]

const PartnerCard = styled.a <{ isMobile?: boolean }>`
	display: flex;
	width: 100%;
	height: ${({ isMobile }) => isMobile ? '90px' : '130px'};
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border-radius: 24px;
`
const Container = styled(Flex)<{ isMobile?: boolean }>`
	padding-left: ${({ isMobile }) => isMobile ? '0px' : '270px'};
	padding-right: ${({ isMobile }) => isMobile ? '0px' : '30px'};
	width: 100%;
	max-width: 1640px;
	margin: 0 auto;
	justify-content: center;
	@media (min-width: 1640px) {
		padding: 0;
	}
`

const PartnersBlock = () => {

	const { t } = useTranslation()
	const { isMobile, isTablet } = useMatchBreakpoints()
	const [hover, setHover] = React.useState(null)
	const isSmall = isMobile || isTablet

	return (
		<Container isMobile={isSmall}>
			<Flex flexDirection='column' mt={isMobile ? '45px' : '170px'} width='100%' alignItems='center'>
				<Flex maxWidth='1100px' width='100%' justifyContent='center'>
					<Title width='100%' textAlign='center'>
						{t('Partners')}
					</Title>
				</Flex>
				<Grid
					maxWidth='1100px'
					width='100%'
					m={isMobile ? '25px 0 70px 0' : '50px 0 49px 0'}
					gridTemplateColumns={isMobile ? '1fr' : 'repeat(2, 1fr)'}
					gridGap='30px'>
					{PartnersList.map((el, index) => {
						return (
							<PartnerCard
								onMouseEnter={() => setHover(index)}
								onMouseLeave={() => setHover(null)}
								onTouchStart={() => setHover(index)}
								onTouchEnd={() => setHover(null)}
								key={el.name}
								isMobile={isMobile}
								href={el.href}
								target='_blank'>
								{hover === index ? el.enicon : el.disicon}
							</PartnerCard>
						)
					})}
				</Grid>
			</Flex>
		</Container>
	)
}

export default PartnersBlock
