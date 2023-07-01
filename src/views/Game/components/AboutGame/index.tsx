import React from 'react';
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Box, Text, useMatchBreakpoints} from "../../../../uikit";
import Decor from "./Decor";

const Container = styled(Flex)`
  width: 100%;
  max-width: 1100px;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 968px) {
    flex-direction: column;
    padding: 0 15px;
  }
`
const Title = styled(Text)`
  font-weight: 600;
  font-size: 36px;
  color: #FFFFFF;
  
  @media (max-width: 968px) {
    font-size: 24px;
  }
`

const AboutGame = () => {

  const {t} = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Container mb='100px'>
      <Box
        position='relative'
        height={isSmall ? '335px' : '400px'}
        width={isSmall ? '100%' : '400px'} >
        <Box width={isSmall ? '100%' : '400px'}/>
        <Decor/>
      </Box>
      <Flex flexDirection='column' width={isSmall ? 'calc(100% - 30px)' : 'auto'} flex={isSmall ? '0' : '0.9'}>
        <Title>
          {t('About Universe game')}
        </Title>
        <Text fontSize='16px' fontWeight='400' color='rgba(255, 255, 255, 0.45)' mt='30px'>
          {t(`The first Universe TBCC with an open smart contract. Game participants receive their payouts in TBCC directly to their own wallets.`)}
          <br/>
          <br/>
          {t(`All players have access to 10 tables, which can only be occupied in sequence.`)}
          <br/>
          <br/>
          {t(`The tables are grouped into 4 rounds, each with its own advantages.`)}
          <br/>
          <br/>
          {t(`Distribution for all 4 rounds:`)}
          <br/>
          <br/>
          <span style={{color: '#FFF'}}>* 10%</span> - {t(`charity for Universe TBCC game`)}
          <br/>
          <span style={{color: '#FFF'}}>* 25%</span> - {t(`one-level referral bonus`)}
          <br/>
          <span style={{color: '#FFF'}}>* 65%</span> - {t(`distributed to players in 4 scenarios depending on the round.`)}
          <br/>
        </Text>
      </Flex>
    </Container>
  );
};

export default AboutGame;
