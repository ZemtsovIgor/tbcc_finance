import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Box, Text, useMatchBreakpoints, useModal, AutoRenewIcon} from "../../../../uikit";
import StarshipGameMain from "../../images/StarshipGameMain";
import {StyledBtn} from "../../../Swap/styles";
import ApproveConfirmButtons, {ButtonArrangement} from "../../../../components/ApproveConfirmButtons";
import useApproveConfirmTransaction from "../../../../hooks/useApproveConfirmTransaction";
import {ethersToBigNumber} from "../../../../utils/bigNumber";
import {ToastDescriptionWithTx} from "../../../../components/Toast";
import {useBUSD, useGameContract} from "../../../../hooks/useContract";
import {useCallWithGasPrice} from "../../../../hooks/useCallWithGasPrice";
import useToast from "../../../../hooks/useToast";
import {useAppDispatch} from "../../../../state";
import {fetchGame} from "../../../../state/game";
import ConnectModal from "../../../../uikit/widgets/WalletModal/ConnectModal";
import useAuth from "../../../../hooks/useAuth";
import useRunBNBTransaction from "../../../../hooks/useRunBNBTransaction";

const Container = styled(Flex)`
  width: 100%;
  height: 140px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  margin-top: 50px;
  padding: 0 35px;
  justify-content: space-between;
  
  @media (max-width: 968px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    padding: 35px;
  }
`
const WhiteText = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  color: #FFF;
  line-height: 28px;
  max-width: 280px;
  overflow: hidden;
`
const SecondaryText = styled(WhiteText)`
  color: rgba(255, 255, 255, 0.45);
`
const LinkContainer = styled(Flex)`
  width: 380px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 18px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  margin-left: 20px;
  
  @media (max-width: 968px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`
const CopyBtn = styled(StyledBtn)`
  width: 60px;
  height: 36px;
  padding: 0;
`
const GreenCircle = styled(Box)`
  width: 8px;
  height: 8px;
  background: #56BCA0;
  border-radius: 50%;
  margin-right: 8px;
`
const RedCircle = styled(GreenCircle)`
  background: #FF4FAE;
`

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

interface HeaderProps {
  userId?: string,
  invitedById?: number,
  refferalLink?: string,
  totalHit?: string,
  totalMissed?: number
  verified: boolean
  inviterAddress: string
}

const Header: React.FC<HeaderProps> = ({userId, invitedById, refferalLink, totalHit, totalMissed, verified, inviterAddress}) => {

  const {t} = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { account } = useWeb3React()
  const { login } = useAuth()
  const gameContract = useGameContract()
  const busdContract = useBUSD()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)
  const [verif, setVerif] = useState(false)

  useEffect(() => {
    if (account && verified) {
      setVerif(true)
    }
  }, [account, verified, setVerif])

  const handleCopy = () => {
    navigator.clipboard.writeText(refferalLink)
  }

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await busdContract.allowance(account, gameContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(9)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(busdContract, 'approve', [gameContract.address, "10000000000000000000"])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract enabled - you can now verify your account'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      onConfirm: () => {
        return callWithGasPrice(gameContract, 'verification')
      },
      onSuccess: async ({ receipt }) => {
        dispatch(fetchGame({ customerId: account }))
        toastSuccess(`${t('Your account was verified')}!`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
        setVerif(true)
      },
    })

  const { isConfirmingTrans, handleConfirmTrans } =
    useRunBNBTransaction({
      onConfirm: () => {
        return callWithGasPrice(gameContract, 'buy', [inviterAddress], { value: "100000000000000000" })
      },
      onSuccess: async ({ receipt }) => {
        dispatch(fetchGame({ customerId: account }))
        toastSuccess(`${t('You went to the table')}!`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  const disableMinting = !isApproved || isConfirmed

  const Connected = () => {
    if (Number(userId)) return null;

    return (
      <>
        {
          verif ? (
            <Flex width={380}>
              <ApproveConfirmButtons
                isApproveDisabled={isApproved}
                isApproving={isApproving}
                isConfirmDisabled={disableMinting}
                isConfirming={isConfirming}
                onApprove={handleApprove}
                onConfirm={handleConfirm}
                buttonArrangement={ButtonArrangement.SEQUENTIAL}
                confirmLabel={t('VERIFICATION')}
                confirmId="verificationBtn"
                width='100%'
              />
            </Flex>
          ) : (
            <StyledBtn
              onClick={handleConfirmTrans}
              disabled={!inviterAddress}
              isLoading={isConfirmingTrans}
              endIcon={isConfirmingTrans ? spinnerIcon : undefined}
            >
              {inviterAddress ? t('Go To First Table') : t('Inviter id not found')}
            </StyledBtn>
          )
        }
      </>
    )
  }

  const Unconnected = () => {
    return (
      <StyledBtn
        onClick={onPresentConnectModal}
      >
        {t('Connect Wallet')}
      </StyledBtn>
    )
  }

  return (
    <Container>
      <Flex>
      <StarshipGameMain/>
      <Flex flexDirection='column' ml='25px'>
        <SecondaryText>
          {t('ID')}:&nbsp;
          <span style={{color: '#FFF'}}>{userId}</span>
        </SecondaryText>
        <SecondaryText>
          {t('Invited by ID')}:&nbsp;
          <span style={{color: '#FFF'}}>{invitedById}</span>
        </SecondaryText>
      </Flex>
      </Flex>

      {
        Number(userId) ? (
          <>
            <SecondaryText
              ml={isSmall ? '0' :'35px'}
              mt={isSmall ? '21px' :'0px'}>
              {t('Referral')}
              {!isSmall && <br/>}
              {t('Link')}:
            </SecondaryText>
            <LinkContainer>
              <WhiteText>
                {isSmall ? `${refferalLink.slice(0, 25)}...` : refferalLink}
              </WhiteText>
              <CopyBtn onClick={handleCopy}>
                {t('Copy')}
              </CopyBtn>
            </LinkContainer>
          </>
        ) : null
      }

      {
        account ? (
          <Connected />
        ) : (
          <Unconnected />
        )
      }


      <Flex
        flexDirection='column'
        ml={isSmall ? '0' :'40px'}
        mt={isSmall ? '27px' :'0px'}
      >
        <Flex alignItems='center'>
          <GreenCircle/>
          <SecondaryText>
            {t('Total hit')}:&nbsp;
            <span style={{color: '#FFF'}}>{totalHit}</span>
          </SecondaryText>
        </Flex>
        <Flex alignItems='center'>
          <RedCircle/>
          <SecondaryText>
            {t('Total missed')}:&nbsp;
            <span style={{color: '#FFF'}}>{totalMissed}</span>
          </SecondaryText>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
