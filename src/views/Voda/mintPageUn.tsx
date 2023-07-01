import React from "react";
import {useWeb3React} from "@web3-react/core";
import ConnectModal from "uikit/widgets/WalletModal/ConnectModal";
import useAuth from "../../hooks/useAuth";
import {useTranslation} from "../../contexts/Localization";
import {Text, Flex, useMatchBreakpoints, Image, Box, useModal} from "../../uikit";
import Page from "../Page";
import {
  Container,
  Title,
  WalletContainer,
  Circle,
  Adress,
  DiscText,
} from "./style";
import {MainBackground} from "./components/MainBackground";
import MainNft from './images/MainNft.gif'
import {StyledBtn} from "../Burn/BurnCard/BurnCard";

const MintUn = () => {
  const {account} = useWeb3React()

  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {login, logout} = useAuth()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)

  const Wallet = () => {
    return (
      <WalletContainer>
        <Flex alignItems='center'>
          <Circle/>
          <Adress>
            {`${account.substring(0, 2)}...${account.substring(account.length - 4)}`}
          </Adress>
        </Flex>
        <DiscText onClick={logout}>
          {t('disconnect')}
        </DiscText>
      </WalletContainer>
    )
  }

  return (
    <Page>
      <MainBackground/>
      <Container>
        <Title mb={isSmall ? '35px' :'70px'}>
          {t('Mint a')}&nbsp;Fellow
        </Title>
        <Flex
          flexDirection={isSmall ? 'column' : 'row'}
          width='100%'
          alignItems='flex-start'
          justifyContent='space-between'
          position='relative'
          zIndex='2'
        >
          <Flex
            flexDirection='column'
            flexGrow='1'
            maxWidth='530px'
            height={isSmall ? 'auto' :'100%'}
          >
            { account
              ? <>
                <Wallet/>
                <Box width='100%' height='35px'/>
              </>

              : null
              }

            <Flex flexDirection='column' my='auto'>
              <Text
                fontSize={isSmall ? '20px' : '24px'}
                fontWeight='600'
                color='#FFF'
                lineHeight={isSmall ? '28px' : '32px'}
              >
                {t('We will be limiting the mint to 1 NFT per transaction. However, you can return to the mint section as many times as you want.')}
              </Text>
              <Text
                mt={isSmall ? '50px' : '67px'}
                mb='60px'
                fontSize={isSmall ? '18px' : '24px'}
                fontWeight='600'
                color='rgba(255, 255, 255, 0.4);'
                lineHeight='36px'>
                {t('Connect your wallet first.')}
              </Text>
              <StyledBtn isMobile={isMobile} width="100%" mb="4px" onClick={onPresentConnectModal}>
                {t('Connect Wallet')}
              </StyledBtn>
            </Flex>
          </Flex>
          <Flex
            borderRadius='26px'
            mt={isSmall ? '60px' : '0'}
            overflow='hidden'
            width={isSmall ? '100%' : ''}
          >
            <Image src={MainNft} width='600px' height='600px' style={{height: '100%'}}/>
          </Flex>
        </Flex>
      </Container>
    </Page>
  )
}

export default MintUn
