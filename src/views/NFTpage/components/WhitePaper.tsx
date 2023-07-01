import React from "react";
import styled from "styled-components";
import {Flex, Text, useMatchBreakpoints, LinkExternal } from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import {SubTitle, Container, DecorCircle} from "../style";
import {getBscScanLink} from "../../../utils";

const WhitePaper = () => {

  const { t } = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Container mt={isSmall && '30px'}>
      <DecorCircle size='big' top={-21} left={83}/>
      <DecorCircle size='middle' top={39} left={4}/>
      <DecorCircle size='small' blur={9} top={82} left={94}/>
      <SubTitle mb='18px'>
        {t('Whitepaper')}
      </SubTitle>
      <SecondaryText>
        {t('TBCС is a token of a share in the total assets of the TBC FINANCE project')}
        <br/>
        {t('TBCC Finance Treasury consists of 0.17 percent of all TBCC FInance protocol transaction fees')}
      </SecondaryText>
      <SecondaryText mt='26px'>
        {t('Treasury check finds on wallet - TBCC admin free wallet')}
      </SecondaryText>
      <Flex width='100%' justifyContent='center'>
        <LinkExternal
          href={getBscScanLink('0xA0642fE81A00565E7e7A3a27932745e57a34a6c3', 'address')}
          color='#DB00FF'
          textAlign='center'
        >
          0xA0642fE81A00565E7e7A3a27{isSmall && <br/>}932745e57a34a6c3
        </LinkExternal>
      </Flex>
      <StyledCard>
        <Text fontSize='20px' color='#FFF' textAlign='center' lineHeight='48px'>
          {t('aTBCC token')}
        </Text>
        <SecondaryText style={{lineHeight: '48px'}}>
          {t('The total issue of the token is')}&nbsp;
          <span style={{color: "#FFF"}}>1,000,000</span>
          <br/>
          {t('Additional release prohibited')}
          <br/>
          {t('Price market')}&nbsp;=&nbsp;
          <span style={{color: '#FFF'}}>{t('Sum of all assets')}&nbsp;/&nbsp;1,000,000</span>
          <br/>
          {t('Price OTC market')}&nbsp;=&nbsp;
          {t('out of market valuation of the asset on the DEX')}
        </SecondaryText>
      </StyledCard>
    </Container>
  )
}

export default WhitePaper

const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 38px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`
const StyledCard = styled(Flex)`
  flex-direction: column;
  max-width: 650px;
  width: 100%;
  margin: 50px auto 0 auto;
  padding: 26px 0 36px 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;
  
  @media (max-width: 968px) {
    padding: 21px 15px 19px 15px;
    margin-bottom: 100px;
  }
`
