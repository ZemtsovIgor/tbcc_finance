import React from "react"
import styled from 'styled-components'
import { useTranslation } from "contexts/Localization"
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Text, Flex, Box, Image, Grid, useMatchBreakpoints } from '../../../../uikit'
import { SecondaryText } from "./FirstBlock"
import { Container, SubContainer } from '../../style'

const AdvantagesList = [
	{
		title: 'Freedom of Choice',
		description: 'The top decentralized crypto exchange offering a wide selection - trade, swap or farm.',
		img: 'images/HomePage/Choice.png',
		width: '150px'
	},
	{
		title: 'Deep Liquidity',
		description: 'Unparalleled order book liquidity. Trade efficiently with minimal slippage.',
		img: 'images/HomePage/Liquidity.png',
		width: '130px'
	},
	{
		title: 'Trustless Environment',
		description: 'No third party intermediary. Simply connect your DeFi wallet and start trading.',
		img: 'images/HomePage/Environment.png',
		width: '140px'
	},
	{
		title: 'Multi-chain Support',
		description: 'Supports BNB Chain and Ethereum Mainnet for a better platform experience.',
		img: 'images/HomePage/Multi-chain.png',
		width: '150px'
	}
]

export const WhiteText = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '24px' : '28px'};
	line-height: 48px;
	color: #FFF;
`
const Advantages = () => {

	const { t } = useTranslation()
	const { isMobile, isTablet } = useMatchBreakpoints()
	const isSmall = isMobile || isTablet

	SwiperCore.use([Pagination])

	return (
		<>
			{!isSmall
				?
				<Container>
					<SubContainer>
						<Grid
							gridTemplateColumns='1fr 1fr'
							gridGap='50px'
							width='100%'
							mt='80px'
							mr='30px'>
							{AdvantagesList.map((el, index) => {
								return (
									<Flex key={el.title} justifyContent={index % 2 === 1 ? 'flex-end' : 'flex-start'}>
										<Flex flexDirection='column' width='370px' justifyContent='flex-end'>
											<Box>
												<Image src={el.img} width={el.width} height='auto' alt='' />
											</Box>
											<WhiteText>
												{t(el.title)}
											</WhiteText>
											<SecondaryText>
												{t(el.description)}
											</SecondaryText>
										</Flex>
									</Flex>
								)
							})}
						</Grid>
					</SubContainer>
				</Container>
				: <Swiper
					effect="slide"
					centeredSlides
					slidesPerView={1}
					pagination={{
						clickable: true
					}}
					// spaceBetween={20}
					className="advantagesMobileSlider">
					{AdvantagesList.map((el) => {
						return (
							<SwiperSlide>
								<Flex flexDirection='column' width='100%' alignItems='center' key={el.title}>
									<Box>
										<Image src={el.img} width={el.width} height='auto' alt='' />
									</Box>
									<WhiteText style={{ textAlign: 'center' }}>
										{t(el.title)}
									</WhiteText>
									<SecondaryText style={{ textAlign: 'center' }}>
										{t(el.description)}
									</SecondaryText>
								</Flex>
							</SwiperSlide>
						)
					})}
				</Swiper>
			}
		</>
	)
}

export default Advantages