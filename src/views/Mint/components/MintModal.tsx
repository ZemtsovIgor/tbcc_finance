import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from "@web3-react/core";
import {ethers} from "ethers";
import { Flex, Modal, InjectedModalProps, useMatchBreakpoints, Button, useModal } from '../../../uikit'
import useAuth from "../../../hooks/useAuth";
import ConnectModal from "../../../uikit/widgets/WalletModal/ConnectModal";
import { useNftContract, useTBCC } from "../../../hooks/useContract";
import useGetNftMaxSupply from "../hooks/useGetNftMaxSupply";
import useGetNftTotalSupply from "../hooks/useGetNftTotalSupply";
import {useCallWithGasPrice} from "../../../hooks/useCallWithGasPrice";
import useToast from "../../../hooks/useToast";
import ApproveConfirmButtons, {ButtonArrangement} from "../../../components/ApproveConfirmButtons";
import useApproveConfirmTransaction from "../../../hooks/useApproveConfirmTransaction";
import {ethersToBigNumber} from "../../../utils/bigNumber";
import {ToastDescriptionWithTx} from "../../../components/Toast";

const ScrollableContainer = styled(Flex)<{ isMobile: boolean }>`
  flex-direction: column;
  max-height: ${({ isMobile }) => isMobile ? '412px' : '400px'};
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
const StyledModal = styled(Modal)`
  border-radius: 24px;
  & > div:first-child {
    margin-top: 15px;
    & > div:first-child {
    width: 100%;
    display: flex;
    justify-content: center;
    }
  }

  & h2:first-of-type {
    font-size: 36px;
    font-weight: 700;
  }

  & svg:first-of-type {
    position: absolute;
    top: -10px;
    right: 0;
  }
`

const ContentText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #101428;
  text-align: center;
  margin-top: 10px;
`
const SubText = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: #1D1D1B;
    opacity: 0.4;
    text-align: center;
`
export const StyledBtn = styled(Button)`
    display: flex;
    justify-content: center;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    cursor: pointer;
    align-items: center;
    min-width: 130px;
    min-height: 60px;
`
const WalletContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(16, 20, 40, 0.4);
  border-radius: 6px;
  margin-top: 20px;
  height: 60px;
  padding: 0 21px;
  cursor: pointer;
  margin-bottom: 15px;
`
export const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #70CD7F;
  margin-right: 6px;
`
const Adress = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #101428;
`
const SoldOutbtn = styled(StyledBtn)`
  background: rgba(29, 29, 27, 0.4);
  margin-top: 15px;
`

const MintModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {

  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { account } = useWeb3React()
  const nftContract = useNftContract()
  const tbccContract = useTBCC()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)
  const [soldOut, setSoldOut] = useState(false)

  const maxSupply: number =
    useGetNftMaxSupply({
      onGetNftMaxSupply: async () => {
        try {
          const response = await nftContract.maxSupply();
          return response.toNumber()
        } catch (error) {
          return 0
        }
      },
    })

  let totalSupply: number =
    useGetNftTotalSupply({
      onGetNftTotalSupply: async () => {
        try {
          const response = await nftContract.totalSupply();
          return response.toNumber()
        } catch (error) {
          return 0
        }
      },
    })

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
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
        return callWithGasPrice(tbccContract, 'approve', [nftContract.address, ethers.constants.MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract enabled - you can now purchase tickets'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      onConfirm: () => {
        return callWithGasPrice(nftContract, 'mintNFT', [1])
      },
      onSuccess: async ({ receipt }) => {
        totalSupply += 1;
        toastSuccess(`${t('TBCC NFT was minted')}!`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  useEffect(() => {
    if ((maxSupply > 0) && (maxSupply <= totalSupply)) {
      setSoldOut(true)
    }
  }, [maxSupply, totalSupply])

  const disableMinting = !isApproved || isConfirmed || soldOut

  const Unconnected = () => {
    return (
      <>
        <SubText style={{ marginTop: '25px', marginBottom: '20px' }}>
          {t('Connect your wallet first.')}
        </SubText>
        <StyledBtn
          onClick={onPresentConnectModal}
          style={{marginBottom: isMobile ? '40px' : ''}}
        >
          {t('Connect Wallet')}
        </StyledBtn>
      </>
    )
  }

  const Wallet = () => {
    return (
      <WalletContainer onClick={logout} >
        <Flex alignItems='center'>
          <Circle/>
          <Adress>
            {`${account.substring(0, 2)}...${account.substring(account.length - 4)}`}
          </Adress>
        </Flex>
        <SubText>
          {t('Disconnect')}
        </SubText>
      </WalletContainer>
    )
  }

  const Connected = () => {
    return (
      <>
        <Wallet/>
        <SubText style={{marginTop: '40px'}}>
          { totalSupply }/{ maxSupply } {t('Minted')}
        </SubText>
        {!soldOut
          ? <Flex mt='15px'>
            <ApproveConfirmButtons
              isApproveDisabled={isApproved || soldOut}
              isApproving={isApproving}
              isConfirmDisabled={disableMinting}
              isConfirming={isConfirming}
              onApprove={handleApprove}
              onConfirm={handleConfirm}
              buttonArrangement={ButtonArrangement.SEQUENTIAL}
              confirmLabel={t('MINT')}
              confirmId="mintBtn"
            />
          </Flex>
          :
            <SoldOutbtn>
              {t('SOLD OUT')}
            </SoldOutbtn>
        }
      </>
    )
  }

  return (
    <StyledModal
      title={`${t('Mint Now')}!`}
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{ maxWidth: isMobile ? 'calc(100% - 30px)' : '550px' }}
      bodyPadding={isMobile ? '17px 17px 17px 17px' : '28px'}
    >
      <ScrollableContainer isMobile={isMobile}>
        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb="24px">
          <ContentText style={{marginBottom: '20px'}}>
            {t('We will be limiting the mint to 100 TBCC per transaction. However, you can return to the mint section as many times as you want.')}
          </ContentText>
          {
            account ? (
              <Connected />
            ) : (
              <Unconnected />
            )
          }
        </Flex>
      </ScrollableContainer>
    </StyledModal>
  )
}

export default MintModal;
