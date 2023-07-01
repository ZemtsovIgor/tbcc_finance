import React from "react";
import styled from "styled-components";
import {Flex, Text, useMatchBreakpoints, Grid} from "../../../../uikit";
import {useTranslation} from "../../../../contexts/Localization";
import {Container, SubTitle, GradientText, DecorCircle} from "../../style";
import {useNFT} from "../../../../state/nft/hooks";
import {WeekCard} from "./WeekCard";

const StyledGrid = styled(Grid)`
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-gap: 24px;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const weeks = [
  {
    id: 1,
    price: 1,
  },
  {
    id: 2,
    price: 1.25,
  },
  {
    id: 3,
    price: 1.5,
  },
  {
    id: 4,
    price: 1.75,
  }
]

const TokenPriceScale: React.FC = () => {

  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {
    nftTDAData: {
      totalTokens,
      totalSupply,
    },
  } = useNFT()

  return (
    <Container mt={isSmall ? '-125px' : '168px'} mb={isSmall ? '85px' : '175px'}>
      <DecorCircle size='small' blur={9} top={-29} left={4}/>
      <DecorCircle size='big' top={-16} left={83}/>
      <DecorCircle size='middle' top={108} left={9}/>
      <SubTitle>
        $TBCC&nbsp;{t('tokens sold / allocated:')}
      </SubTitle>
      <Flex
        width='100%'
        justifyContent='center'
        alignItems='flex-end'
        mt='25px'
        mb='40px'>
        <GradientText>
          {totalTokens}&nbsp;
        </GradientText>
        <Text
          fontWeight='300'
          fontSize='22px'
          color='rgba(255, 255, 255, 0.6)'>
          / {totalSupply}
        </Text>
      </Flex>
      <StyledGrid>
        {
          weeks.map((week) => {
            return(
              <WeekCard
                key={`week-${week.id}`}
                week={week.id}
                price={week.price}
                current={week.price === 1.5}
              />
            )
          })
        }
      </StyledGrid>
      <Text fontSize='14px' fontWeight='400' color='rgba(255, 255, 255, 0.6)' textAlign='center' mt='45px'>
        {t('$TBCC price rises every week')}
      </Text>
    </Container>
  )
}

export default TokenPriceScale


