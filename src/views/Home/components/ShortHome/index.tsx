import React from "react"
import styled from 'styled-components'
import { useTranslation } from "contexts/Localization"
import { useScrollTo } from 'react-use-window-scroll';
import { Flex, Text, Box, Image, useMatchBreakpoints } from '../../../../uikit'
import { StyledBtn } from '../../style'

const Container = styled(Flex) <{ isMobile?: boolean }>`
	width: 100%;
	height: ${({ isMobile }) => isMobile ? '' : '100vh'};
	flex-direction: ${({ isMobile }) => isMobile ? 'column-reverse' : 'row'};
	align-items: center;
	position: relative;
	overflow-y: auto;
`
const Title = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 600;
	font-size: ${({ isMobile }) => isMobile ? '32px' : '56px'};
	line-height: ${({ isMobile }) => isMobile ? '42px' : '72px'};
	color: #FFF;
	text-align: ${({ isMobile }) => isMobile ? 'center' : 'left'};
`
const SubTitle = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '16px' : '18px'};
	line-height: ${({ isMobile }) => isMobile ? '24px' : '26px'};
	color: rgba(255, 255, 255, 0.6);
	text-align: ${({ isMobile }) => isMobile ? 'center' : 'left'};
`

const ShortHome = ({ setExtended }) => {

	const { t } = useTranslation()
	const { isMobile } = useMatchBreakpoints()
	const scrollTo = useScrollTo()

	const extension = () => {
		setExtended(true)
		scrollTo({ top: 700, left: 0, behavior: 'smooth' })
	}

	return (
		<Container isMobile={isMobile}>
			<Flex
				flexDirection='column'
				ml={!isMobile && '270px'}
				width={!isMobile && '500px'}
				alignItems={isMobile && 'center'}>
				<Title mb='20px' isMobile={isMobile}>
					{t('Trade, farm, swap on DEX universe')}
				</Title>
				<SubTitle isMobile={isMobile}>
					{t('Enjoy the highest farming/trading rewards from unlimited referral levels!')}
				</SubTitle>
				<Box width='180px' mt='36px' mb={isMobile && '50px'}>
					<StyledBtn
						onClick={extension}>
						{t('Discover More')}
					</StyledBtn>
				</Box>
				{isMobile && <Box height={65}/>}
			</Flex>
			<Box mt={isMobile && '30px'}>
				<Image src="images/HomePage/home-page_main-pic.png" width={isMobile ? '100%' : '1000px'} height='auto' />
			</Box>
		</Container>
	)
}

export default ShortHome
