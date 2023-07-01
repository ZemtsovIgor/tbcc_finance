import React from "react";
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Text, Grid, Box, useModal, LinkExternal, useMatchBreakpoints} from "../../../../uikit";
import {StyledBtn} from "../../../Swap/styles";
import {CalculatorIcon, ContractIcon, InfoIcon} from "../../icons";
import useAuth from "../../../../hooks/useAuth";
import ConnectModal from "../../../../uikit/widgets/WalletModal/ConnectModal";
import {FarmData} from "../../types";

interface ExpandedRowProps {
  earned: number,
  farmData?: FarmData
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({earned, farmData}) => {

  const {t} = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {account} = useWeb3React()
  const {login} = useAuth()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t}/>)

  return (
    <Container>
      <CardsGrid>
        <Card style={{flexDirection: isSmall ? 'row' : 'column', justifyContent: isSmall ? 'space-between' : 'flex-start'}}>
          <Flex flexDirection='column' ml={isSmall ? '20px' : '0'}>
            <CardTitle>
              {t('TBCC EARNED')}
            </CardTitle>
            {isSmall && <WhiteText>
              {earned.toLocaleString('ru-RU', {minimumFractionDigits: 4})}
            </WhiteText>}
          </Flex>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            px={isSmall ? '0' :'30px'}
            mt={isSmall ? '0' :'5px'}
            mr={isSmall ? '20px' : '0'}>
            {!isSmall && <WhiteText>
              {earned.toLocaleString('ru-RU', {minimumFractionDigits: 7})}
            </WhiteText>}
            <Box width='100px'>
              <CustomBtn disabled>
                {t('Harvest')}
              </CustomBtn>
            </Box>
          </Flex>
        </Card>
        <Card style={{height: isSmall ? '120px' : '140px'}}>
          {!isSmall &&
          <CardTitle>
            {t('YIELD BOOSTER')}
          </CardTitle>
          }
          <Flex
            alignItems='center'
            justifyContent='space-between'
            width={isSmall ? '100%' : 'auto'}
            px={isSmall ? '20px' :'30px'}
            mt={isSmall ? '22px' :'5px'}>
            <Flex flexDirection='column'>
              {isSmall &&
                <CardTitle>
                  {t('YIELD BOOSTER')}
                </CardTitle>
              }
              <WhiteText>
                {t('Up to')}&nbsp;2x
              </WhiteText>
            </Flex>

            <Box width='101px'>
              <CustomBtn>
                {t('Go to Pool')}
              </CustomBtn>
            </Box>
          </Flex>
          <Disclaimer>
            <InfoIcon/>
            <SecondaryText>
              {account ? t('Lock TBCC to activate yield booster') : t('Connect wallet to activate yield booster')}
            </SecondaryText>
          </Disclaimer>
        </Card>
        <Card style={{height: isSmall ? '120px' : '140px'}}>
          <CardTitle width={isSmall ? '100%' : 'auto'} px={isSmall ? '30px' : '0'}>
            {t('START FARMING')}
          </CardTitle>
          <Box width='100%' px='30px'>
          {
            account
              ? <CustomBtn
                  mt='5px'>
                {t('Enable')}
              </CustomBtn>
              : <CustomBtn
                onClick={onPresentConnectModal}
                mt='5px'>
                {t('Connect Wallet')}
              </CustomBtn>
          }
          </Box>
        </Card>
      </CardsGrid>
      {
        isSmall &&
        <Flex width='100%' flexDirection='column' mt='23px'>
          <Row>
            <Flex>
              <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>APR</Text>
              <CalculatorIcon ml='8px'/>
            </Flex>
            <Text fontSize='16px' fontWeight='400' color='#20C997'>
              {farmData?.APR}%
            </Text>
          </Row>
          <Row>
            <Flex>
              <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>
                {t('Liquidity')}
              </Text>
              <InfoIcon ml='5px'/>
            </Flex>
            <Text fontSize='16px' fontWeight='400' color='#FFF'>
              {farmData?.liquidity.toLocaleString('ru-RU')}
            </Text>
          </Row>
          <Row>
            <Flex>
              <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>
                {t('Multiplier')}
              </Text>
              <InfoIcon ml='5px'/>
            </Flex>
            <Text fontSize='16px' fontWeight='400' color='#FFF'>
              x{farmData?.multiplier}
            </Text>
          </Row>
        </Flex>
      }
      <LinksGrid>
        <LinkContainer>
          <LinkExternal color='#FFF' fontWeight='500' fontSize='14px'>
            {t('Get TBCC-BNB LP')}
          </LinkExternal>
        </LinkContainer>
        <LinkContainer
          style={
          !isSmall
            ? {borderLeft: '1px solid rgba(255, 255, 255, 0.1)', borderRight: '1px solid rgba(255, 255, 255, 0.1)'}
            : {borderTop: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}
          }>
          <Text fontWeight='500' fontSize='14px' color='#FFF'>
            {t('View Contract')}
          </Text>
          <ContractIcon ml='5px'/>
        </LinkContainer>
        <LinkContainer>
          <LinkExternal color='#FFF' fontWeight='500' fontSize='14px'>
            {t('See Pair Info')}
          </LinkExternal>
        </LinkContainer>
      </LinksGrid>
    </Container>
  )
}

export default ExpandedRow

const Container = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding: 30px 41px 32px 37px;
  background: rgba(0, 0, 0, 0.15);

  @media (max-width: 968px) {
    padding: 25px 18px;
  }
`
const CardsGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 13px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`
const Card = styled(Flex)`
  width: 100%;
  height: 140px;
  flex-direction: column;
  padding-top: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;

  @media (max-width: 968px) {
    height: 100px;
    align-items: center;
    justify-content: center;
    padding-top: 0;
  }
`
const CardTitle = styled(Text)`
  font-weight: 600;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 30px;

  @media (max-width: 968px) {
    margin-left: 0;
  }
`
export const CustomBtn = styled(StyledBtn)`
  height: 45px;
  width: 100%;
  padding: 0;
  &:disabled {
    background: rgba(255, 255, 255, 0.25);
    color: rgba(255, 255, 255, 0.25);
  }
`
const WhiteText = styled(Text)`
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
`
export const Disclaimer = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 28px;
  margin-top: auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 0 6px 6px;
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
`
const LinksGrid = styled(Grid)`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  margin-top: 18px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`
const LinkContainer = styled(Flex)`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Row = styled(Flex)`
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: space-between;
`