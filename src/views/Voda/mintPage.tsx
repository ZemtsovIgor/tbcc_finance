import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom'
import {ethers} from "ethers";
import {useWeb3React} from "@web3-react/core";
import ConnectModal from "uikit/widgets/WalletModal/ConnectModal";
import {usePriceBNBBusd} from 'state/farms/hooks'
import useAuth from "../../hooks/useAuth";
import {useTranslation} from "../../contexts/Localization";
import {Text, Flex, useMatchBreakpoints, Image, Button, Box} from "../../uikit";
import Page from "../Page";
import {
  Container,
  Title,
  WalletContainer,
  Circle,
  Adress,
  DiscText,
  ContentContainer,
  SecondaryText,
  StyledInput,
  Line, StyledColorBtn, StyledColorWrap, StyledColorSpan
} from "./style";
import {MainBackground} from "./components/MainBackground";
import MainNft from './images/MainNft.gif'
import {useVODA} from "../../state/voda/hooks";
import ApproveConfirmButtons, {ButtonArrangement} from "../../components/ApproveConfirmButtons";
import useApproveConfirmTransaction from "../../hooks/useApproveConfirmTransaction";
import {ethersToBigNumber} from "../../utils/bigNumber";
import {ToastDescriptionWithTx} from "../../components/Toast";
import {fetchNFTVODA} from "../../state/voda";
import {useAppDispatch} from "../../state";
import useToast from "../../hooks/useToast";
import {useCallWithGasPrice} from "../../hooks/useCallWithGasPrice";
import {useTBCC, useNftTDAContract} from "../../hooks/useContract";
import {CurrencySelector} from "./components/CurrencySelector";
import {MintRefTabs} from "./components/MintRefTabs";
import { Referral } from "./components/Referral";
import CustomInput from "./components/CustomInput";
import {NFTVODAReferral} from "../../state/types";
import {testColorsData} from "./testColorsData";

const Mint = () => {
  const {search} = useLocation();
  const {account} = useWeb3React()

  const query = new URLSearchParams(search);
  const ref = query.get('ref');
  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {login, logout} = useAuth()
  const nftContract = useNftTDAContract()
  const tbccContract = useTBCC()
  const {callWithGasPrice} = useCallWithGasPrice()
  const {toastSuccess} = useToast()
  const [showConnectSection, setShowConnectSection] = useState(false)
  const [soldOut, setSoldOut] = useState(false)
  const dispatch = useAppDispatch()
  const [nftToBuy, setNftToBuy] = useState('1')
  const [colorNft, setColorNft] = useState('0')
  const [colorNftMax, setColorNftMax] = useState(1000)
  const [selectedCurr, setSelectedCurr] = useState('BNB')
  const [referralAddr, setReferralAddr] = useState(ref || '')
  const pricePerNft = 10;
  const [activeTab, setActiveTab] = useState(0)
  const {
    nftVODAData: {
      totalTokens,
      inviter
    },
  } = useVODA()
  const bnbPriceBusd = usePriceBNBBusd()
  const bigVal = ethers.utils.parseUnits(bnbPriceBusd.toString()).div(100000).mul(11);

  const unpaidTx = inviter.referral.filter((tx: NFTVODAReferral) => !tx.claimed).sort((a, b) => Number(b.time) - Number(a.time)).map((tx: NFTVODAReferral) => {
    return {
      time: tx.time,
      txid: tx.id,
      amount: Number(ethers.utils.formatUnits(tx.reward, 9))
    }
  });

  const historyTx = inviter.referral.filter((tx: NFTVODAReferral) => tx.claimed).sort((a, b) => Number(b.time) - Number(a.time)).map((tx: NFTVODAReferral) => {
    return {
      time: tx.time,
      txid: tx.id,
      amount: Number(ethers.utils.formatUnits(tx.reward, 9))
    }
  });

  const handleNumberButtonClick = (number: number) => {
    if (number > colorNftMax) {
      setNftToBuy(colorNftMax.toFixed())
    } else {
      setNftToBuy(number.toFixed())
    }
  }

  const handleSetColorNft = (nftColor: string, nftColorMaxCount: number) => {
    setColorNft(nftColor);
    setColorNftMax(nftColorMaxCount)

    if (Number(nftToBuy) > nftColorMaxCount) {
      setNftToBuy(nftColorMaxCount.toFixed())
    }
  }

  const {isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm} =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await tbccContract.allowance(account, nftContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice((tbccContract), 'approve', [nftContract.address, ethers.constants.MaxUint256])
      },
      onApproveSuccess: async ({receipt}) => {
        toastSuccess(
          t('Contract enabled - you can now purchase tickets'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>,
        )
      },
      onConfirm: async () => {
        if (selectedCurr === 'BNB') {
          return callWithGasPrice(nftContract, 'mintNFT', [Number(nftToBuy), referralAddr], {value: bigVal.mul(Number(nftToBuy))})
        } else {
          return callWithGasPrice(nftContract, 'mintNFTByTBCC', [Number(nftToBuy), referralAddr])
        }
      },
      onSuccess: async ({receipt}) => {
        dispatch(fetchNFTVODA({customerId: account}))
        toastSuccess(`${t('VODA TBCC was minted')}!`, <ToastDescriptionWithTx txHash={receipt.transactionHash}/>)
      },
    })

  useEffect(() => {
    if (Number(totalTokens) >= 40000) {
      setSoldOut(true)
    }
  }, [totalTokens])

  const disableMinting = !isApproved || isConfirmed || soldOut || bnbPriceBusd.toNumber() < 10

  const Unconnected = () => {
    return (
      <Flex flexDirection='column' my='auto'>
        {showConnectSection
          ? <ConnectModal login={login} t={t} onDismiss={() => setShowConnectSection(false)}/>
          : <ContentContainer>
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
            <Button
              variant='primary'
              style={{height: '60px', textTransform: 'uppercase'}}
              onClick={() => setShowConnectSection(true)}
            >
              {t('connect wallet')}
            </Button>
          </ContentContainer>
        }
      </Flex>
    )
  }

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

  const Connected = () => {
    return (
      <ContentContainer>
        {
          soldOut
            ? <>
              <Text
                fontSize={isSmall ? '20px' : '24px'}
                fontWeight='600'
                color='#FFF'
                lineHeight={isSmall ? '28px' : '32px'}
                mt={isSmall ? '0px' : '40px'}
                mb='30px'
              >
                {t('We will be limiting the mint to 1 NFT per transaction. However, you can return to the mint section as many times as you want.')}
              </Text>
              <Line
                mb={isSmall ? '10px' : '16px'}
                mt={isSmall ? "30px" : '45px'}/>
              <Flex
                width='100%'
                alignItems='center'
                justifyContent='space-between'
                mb={isSmall ? '32px' : '20px'}
              >
                <SecondaryText>
                  {t('Emission')}
                </SecondaryText>
                <SecondaryText style={{color: '#FFF'}}>
                  {totalTokens} / 40 000
                </SecondaryText>
              </Flex>
              <Button
                variant='primary'
                style={{height: '60px'}}
                disabled={soldOut}
              >
                {t('SOLD OUT')}
              </Button>
            </>
            :
                <>
                  <Text
                    fontSize={isSmall ? '20px' : '24px'}
                    fontWeight='600'
                    color='#FFF'
                    lineHeight={isSmall ? '28px' : '32px'}
                    mt={isSmall ? '35px' : '30px'}
                    mb='30px'
                  >
                    {t('We will be limiting the mint to 1 NFT per transaction. However, you can return to the mint section as many times as you want.')}
                  </Text>
                  <SecondaryText mb='6px'>
                    {t('Quantity')}
                  </SecondaryText>
                  <CustomInput
                    value={Number(nftToBuy)}
                    onChange={(e) => handleNumberButtonClick(e)}
                    onPlus={() => {
                      if (Number(nftToBuy) < 100) {
                        handleNumberButtonClick(Number(nftToBuy) + 1)
                      } else {
                        handleNumberButtonClick(100)
                      }
                    }}
                    onMinus={() => {
                      if (Number(nftToBuy) > 1) {
                        handleNumberButtonClick(Number(nftToBuy) - 1)
                      } else {
                        handleNumberButtonClick(1)
                      }
                    }}
                  />
                  <SecondaryText mb='6px' mt="30px">
                    {t('Color')}
                  </SecondaryText>
                  <StyledColorWrap>
                    {
                      testColorsData.length ? testColorsData.map((color) => (
                        <StyledColorBtn
                          key={`fellow-${color.id}`}
                          backgroundImage={color.id}
                          active={color.id === colorNft}
                          disabled={Number(color.count) < 1}
                          onClick={() => handleSetColorNft(color.id, Number(color.count))}
                        >
                          <StyledColorSpan>{color.count}</StyledColorSpan>
                        </StyledColorBtn>
                      )) : null
                    }
                  </StyledColorWrap>
                  <SecondaryText
                    mt={isSmall ? '28px' : '20px'}
                    mb='10px'>
                    {t('Pay with')}
                  </SecondaryText>
                  <CurrencySelector
                    selectedCurr={selectedCurr}
                    setSelectedCurr={(curr) => setSelectedCurr(curr)}
                  />
                  <Box width='100%' height={isSmall ? '37px' : '30px'}/>
                  <SecondaryText mb='7px' textTransform='capitalize'>
                    {t('referral')}
                  </SecondaryText>
                  <StyledInput
                    value={referralAddr}
                    onChange={(e) => setReferralAddr(e.target.value)}
                    placeholder={`${t('Referral address')}*`}
                    disabled
                  />
                  <Text
                    fontWeight='600'
                    fontSize='13px'
                    lineHeight='24px'
                    letterSpacing='0.05em'
                    color='rgba(255, 255, 255, 0.4)'
                  >
                    *{t('necessary')}
                  </Text>
                  <Line mt={isSmall ? '20px' : '2px'}/>
                  <Flex
                    width='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    mt={isSmall ? '40px' : '35px'}
                    mb='10px'
                  >
                    <SecondaryText>
                      {t('Price per NFT')}
                    </SecondaryText>
                    <SecondaryText style={{color: '#FFF'}}>
                      {pricePerNft.toFixed(2)}$
                    </SecondaryText>
                  </Flex>
                  <Flex
                    width='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    mt={soldOut ? '65px' : '0px'}
                    mb={isSmall ? '32px' : '20px'}
                  >
                    <SecondaryText>
                      {t('Emission')}
                    </SecondaryText>
                    <SecondaryText style={{color: '#FFF'}}>
                      {totalTokens} / 40 000
                    </SecondaryText>
                  </Flex>
                  <ApproveConfirmButtons
                    isApproveDisabled={isApproved || soldOut || !referralAddr || bnbPriceBusd.toNumber() < 10}
                    isApproving={isApproving}
                    isConfirmDisabled={disableMinting || bnbPriceBusd.toNumber() < 10}
                    isConfirming={isConfirming}
                    onApprove={handleApprove}
                    onConfirm={handleConfirm}
                    buttonArrangement={ButtonArrangement.SEQUENTIAL}
                    confirmLabel={t('MINT NOW')}
                    confirmId="mintBtn"
                    width='100%'
                  />
            </>
        }
      </ContentContainer>
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

            <MintRefTabs activeTab={activeTab} setActiveTab={(e) => setActiveTab(e)}/>
            {
              activeTab === 0 &&
              (
                account
                  ? <Connected/>
                  : <Unconnected/>
              )
            }
            {
              activeTab === 1 &&
              <Referral history={historyTx} unpaid={unpaidTx}/>
            }
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

export default Mint
