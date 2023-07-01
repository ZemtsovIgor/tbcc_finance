import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "config/paths";
import { useTranslation } from "contexts/Localization";
import { Flex, Image, Box, useMatchBreakpoints } from '../../../../uikit'
import { Title, SecondaryText } from "./FirstBlock";
import { StyledBtn, Container, SubContainer } from "../../style";

const LiquidityBlock = () => {

	const { t } = useTranslation()
	const { isMobile, isTablet } = useMatchBreakpoints()
	const isSmall = isMobile || isTablet

	return (
		<Container isMobile={isSmall}>
			<SubContainer isMobile={isSmall}>
				<Flex
					mt={isSmall ? '60px' : '200px'}
					alignItems='center'
					width='100%'
					justifyContent={!isSmall && 'space-between'}
					flexDirection={isSmall ? 'column-reverse' : 'row'}>
					<Flex position='relative' mt={isSmall && '32px'}>
						<Image src='images/HomePage/liquidity-img.png' width={isSmall ? '350px' : '460px'} height='auto' />
						<Image src='images/HomePage/decor-1.png' width={isSmall ? '85px' : '108px'} height='auto'
							style={{ position: 'absolute', top: isSmall ? '80px' : '110px', left: '0' }} />
						<Image
							src='images/HomePage/decor-2.png' width={isSmall ? '60px' : '81px'} height='auto'
							style={{ position: 'absolute', top: isSmall ? '180px' : '230px', left: isSmall ? '250px' : '300px' }} />
					</Flex>
					<Flex flexDirection='column' width='400px' ml='80px'>
						<Title mb='26px'>
							{t('Trade anything, any where')}
						</Title>
						<SecondaryText mb='30px' mr={isSmall && '40px'}>
							{t('Trade any token on BNB Smart Chain in seconds, just by connecting your wallet.')}
						</SecondaryText>
						<Box width='150px'>
							<Link to={PATHS.LIQUIDITY}>
								<StyledBtn>
									{t('Trade Now')}
								</StyledBtn>
							</Link>
						</Box>
					</Flex>
				</Flex>
			</SubContainer>
		</Container>
	)
}

export default LiquidityBlock
