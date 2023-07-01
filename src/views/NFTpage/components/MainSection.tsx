import React from "react";
import styled from "styled-components";

import {Flex, Box, Text, Heading, useMatchBreakpoints, useModal} from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import {BackgroundCircle, GradientText, Container} from "../style";
import Monkey from "../images/Monkey";
import CircleBorderBack from "../images/CircleBorder.svg";
import CircleBorder from "../images/CircleBorder";
import {StyledBtn} from "../../Swap/styles";
import {DecorNumbers} from "./DecorNumbers";
import MintModal from "./MintModal";
import {useNFT} from "../../../state/nft/hooks";


interface MainSectionProps {
  nextPrice: number
}

const MainSection: React.FC<MainSectionProps> = ({nextPrice}) => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {
    nftTDAData: {
      totalTokens,
    },
  } = useNFT()

  const [onPresentMintModal] = useModal(<MintModal />)

  return (
    <Container>
      <MainTitle>
        {t('TBCC Decentralized finance')}
      </MainTitle>
      <Flex
        flexDirection={isSmall ? 'column' : 'row'}
        mt={isSmall ? '0' : '70px'}
        justifyContent='space-between'>
        <WithMonkey>
          <BackgroundContainer>
            <BackgroundCircle/>
          </BackgroundContainer>
          <Monkey
            width={isSmall ? '170px' : '287px'}
            height={isSmall ? '235px' : '385px'}
            style={{position: 'relative', zIndex: '10',
              transform: isSmall ? 'translate(-5px, 32px)' : 'translate(0px, 43px)'}}/>
          <CardWithPrice>
            <Text color='#FFF' fontWeight='600' fontSize='24px'>
              {t('Price')}&nbsp;1.5&nbsp;BUSD
            </Text>
            <Text color='#FFF' fontWeight='400' fontSize='16px'>
              {t('You can Buy')} NFT TBCC DEFI APES
            </Text>
          </CardWithPrice>
        </WithMonkey>
        <TokenInfoContainer>
          <GradientText mt={isSmall && '40px'}>
            {totalTokens}
          </GradientText>
          <WhiteText mt='7px'>
            {t('Tokens Sold')}
          </WhiteText>
          <Flex justifyContent='space-around' width='100%'  mt={isSmall ? '8px' : '29px'}>
            <Flex flexDirection='column' alignItems='center'>
              <PirpleText>
                1.5
              </PirpleText>
              <WhiteText>
                {t('Current price')}
              </WhiteText>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
              <GreenText>
                {nextPrice.toLocaleString('en-EN', {minimumFractionDigits: 2})}
              </GreenText>
              <WhiteText>
                {t('Next price')}
              </WhiteText>
            </Flex>
          </Flex>
          <Box width='176px' mt='38px'>
            <StyledBtn
              onClick={onPresentMintModal}
              style={{width: '100%'}}
            >
              {t('Buy')}&nbsp;TDA NFT
            </StyledBtn>
          </Box>
          <FirstCircle>
            <CircleBorder width='43px' height='43px' opacity='0.2'/>
          </FirstCircle>
          <SecondCircle>
            <CircleBorder width='79px' height='79px' opacity='0.42'/>
          </SecondCircle>
          <ThirdCircle>
            <CircleBorder width='95px' height='95px' opacity='0.14'/>
          </ThirdCircle>
          {!isSmall && <DecorNumbers/>}
        </TokenInfoContainer>
      </Flex>
    </Container>
  )
}

export default MainSection

const MainTitle = styled(Heading)`
  font-size: 48px;
  font-weight: 600;
  color: #FFF;
  text-align: center;
  width: 100%;
  margin-top: 155px;
  
  @media (max-width: 968px) {
    font-size: 32px;
    line-height: 44px;
    margin-top: 65px;
  }
`
const BackgroundContainer = styled(Box)`
  position: absolute;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 430px;

  @media (max-width: 968px) {
    width: 263px;
    height: 263px;
  }
`

const WithMonkey = styled(Flex)`
  position: relative;
  width: 430px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    width: 100%;
  }
`
const CardWithPrice = styled(Flex)`
  width: 314px;
  height: 112px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(11px);
  border: 2px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;
  position: relative;
  z-index: 11;
  transform: translateY(-35px);

  @media (max-width: 968px) {
    width: 284px;
  }
`
const TokenInfoContainer = styled(Flex)`
  width: 430px;
  height: 430px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${CircleBorderBack});
  background-position: center;
  background-size: contain;
  padding-top: 15px;
  position: relative;

  @media (max-width: 968px) {
    transform: translateY(-130px);
  }
`
const WhiteText = styled(Text)`
  color: #FFF;
  font-weight: 500;
  font-size: 14px;
`
const PirpleText = styled(Text)`
  font-weight: 600;
  font-size: 42px;
  color: #DB00FF;
  line-height: 1;

  @media (max-width: 968px) {
    font-size: 32px;
  }
`
const GreenText = styled(Text)`
  font-weight: 600;
  font-size: 42px;
  color: #56BCA0;
  line-height: 1;

  @media (max-width: 968px) {
    font-size: 32px;
  }
`
const FirstCircle = styled(Box)`
  position: absolute;
  top: 24%;
  left: 0;
`
const SecondCircle = styled(Box)`
  position: absolute;
  top: 19%;
  right: -3%;
`
const ThirdCircle = styled(Box)`
  position: absolute;
  top: 84%;
  left: 55%;
`
