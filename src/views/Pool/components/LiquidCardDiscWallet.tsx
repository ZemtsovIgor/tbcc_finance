import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import LiquidityIcon from "../icons/LiquidityIcon"
import { Text, Flex, Button, useMatchBreakpoints } from '../../../uikit'

const LightCard = styled(Flex)<{isMobile?: boolean}>`
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  border-radius: 12px;
  margin-top: ${({isMobile}) => isMobile ? '0' : '50px'};
  margin-bottom: ${({isMobile}) => isMobile ? '50px' : ''};
  width: ${({isMobile}) => isMobile ? '100%' : '600px'};
`
const OrangeCard = styled(Flex)<{isMobile?: boolean}>`
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 155, 15, 0.1);
  border-radius: 6px;
  padding:${({isMobile}) => isMobile ? '10px 15px' : '15px 56px'} ;
  margin-top: ${({isMobile}) => isMobile ? '40px' : '32px'};
  width: ${({isMobile}) => isMobile ? '90%' : ''};
`
const StyledBtn = styled(Button)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '90%' : '410px'} ;
  height: 67px;
  background-color: #4E89E3;
  color: #FFF;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 500;
  margin-top: ${({isMobile}) => isMobile ? '17px' : '29px'};
  margin-bottom: 47px;
`

const LiquidCardDiscWallet = () => {

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <LightCard isMobile={isMobile}>
      <LiquidityIcon mt={isMobile ? '50px' : '70px'}/>
      <Text
        fontSize={isMobile ? '24px' : '34px'}
        color='#414141'
        mt='40px'>
        {t('Your Liquidity')}
      </Text>
      {isMobile
        ? <Flex
          width='90%'
          mt='15px'>
          <Text
            fontSize = '14px'
            color='#78809C'
            textAlign='center'>
            {t('By adding liquidity, you will receive 0.17% of all trades on this pair in proportion to your share in the pool. Commissions are added to the pool, accumulated in real time and can be earned by withdrawing your liquidity.')}
          </Text>
        </Flex>
        :null}
      <OrangeCard isMobile={isMobile}>
        <Text
          fontSize='16px'
          color='#F59B0F'
          style={{textAlign: 'center'}}>
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      </OrangeCard>
      <StyledBtn isMobile={isMobile}>
        {t('Connect Wallet')}
      </StyledBtn>
    </LightCard>
  )
}

export default LiquidCardDiscWallet