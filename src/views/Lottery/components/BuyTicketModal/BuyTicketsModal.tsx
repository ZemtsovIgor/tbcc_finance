import React, { useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import {useWeb3React} from "@web3-react/core";
import { useLottery } from 'state/lottery/hooks';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import { ethersToBigNumber } from 'utils/bigNumber';
import { useTBCC, useLotteryV2Contract} from 'hooks/useContract';
import useToast from 'hooks/useToast'
import useTokenBalance, { FetchStatus } from 'hooks/useTokenBalance';
import tokens from 'config/constants/tokens';
import { useAppDispatch } from 'state';
import { getFullDisplayBalance } from 'utils/formatBalance';
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction';
import { ToastDescriptionWithTx } from 'components/Toast';
import { fetchUserTicketsAndLotteries } from 'state/lottery';
import ApproveConfirmButtons, { ButtonArrangement } from 'components/ApproveConfirmButtons';
import {useTranslation} from "../../../../contexts/Localization";
import {
  Heading,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Text,
  useMatchBreakpoints,
  Skeleton, useModal,
} from '../../../../uikit'
import CustomInput from "./CustomInput";
import {StyledBtn} from "../../../Mint/components/MintModal";
import { useTicketsReducer } from './useTicketsReducer';
import EditNumbersModal from './EditNumbersModal'
import useAuth from "../../../../hooks/useAuth";
import ConnectModal from "../../../../uikit/widgets/WalletModal/ConnectModal";

interface BuyTicketsModalProps {
  onDismiss?: () => void
  setModalIsOpen?: (e) => void
}

enum BuyingStage {
  BUY = 'Buy',
  EDIT = 'Edit',
}

const StyledModal = styled(ModalContainer)`
  position: relative;
  overflow: visible;
  background: #171533;
  box-shadow: 0 0 100px 100px rgba(161, 0, 255, 0.2);
  border-radius: 24px;

  ${({theme}) => theme.mediaQueries.xs} {
    max-width: calc(100vw - 30px);
  }

  ${({theme}) => theme.mediaQueries.sm} {
    min-width: 435px;
    max-width: 435px;
  }

`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
`
const Row = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
const WhiteText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: #FFF;
`
const SecondaryText = styled(WhiteText)`
  color: rgba(255, 255, 255, 0.45);
`

const BuyTicketModal: React.FC<BuyTicketsModalProps> = ({ onDismiss, setModalIsOpen }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { login } = useAuth()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} setModalisOpen={(e) => setModalIsOpen(e)}/>)
  const {
    maxNumberTicketsPerBuyOrClaim,
    currentLotteryId,
    currentRound: {
      priceTicketInTBCC,
      discountDivisor,
      userTickets: { tickets: userCurrentTickets },
    },
  } = useLottery()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [ticketsToBuy, setTicketsToBuy] = useState('')
  const [discountValue, setDiscountValue] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [ticketCostBeforeDiscount, setTicketCostBeforeDiscount] = useState('')
  const [buyingStage, setBuyingStage] = useState<BuyingStage>(BuyingStage.BUY)
  const [maxTicketPurchaseExceeded, setMaxTicketPurchaseExceeded] = useState(false)
  const [userNotEnoughTBCC, setUserNotEnoughTBCC] = useState(false)
  const lotteryContract = useLotteryV2Contract()
  const tbccContract = useTBCC()
  const { toastSuccess } = useToast()
  const { balance: userTBCC, fetchStatus } = useTokenBalance(tokens.tbcc.address)
  // balance from useTokenBalance causes rerenders in effects as a new BigNumber is instantiated on each render, hence memoising it using the stringified value below.
  const stringifiedUserTBCC = userTBCC.toJSON()
  const memoisedUserTBCC = useMemo(() => new BigNumber(stringifiedUserTBCC), [stringifiedUserTBCC])

  const dispatch = useAppDispatch()
  const hasFetchedBalance = fetchStatus === FetchStatus.SUCCESS

  const limitNumberByMaxTicketsPerBuy = useCallback(
    (number: BigNumber) => {
      return number.gt(maxNumberTicketsPerBuyOrClaim) ? maxNumberTicketsPerBuyOrClaim : number
    },
    [maxNumberTicketsPerBuyOrClaim],
  )

  const getTicketCostAfterDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const totalAfterDiscount = priceTicketInTBCC
        .times(numberTickets)
        .times(discountDivisor.plus(1).minus(numberTickets))
        .div(discountDivisor)
      return totalAfterDiscount
    },
    [discountDivisor, priceTicketInTBCC],
  )

  const getMaxTicketBuyWithDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const costAfterDiscount = getTicketCostAfterDiscount(numberTickets)
      const costBeforeDiscount = priceTicketInTBCC.times(numberTickets)
      const discountAmount = costBeforeDiscount.minus(costAfterDiscount)
      const ticketsBoughtWithDiscount = discountAmount.div(priceTicketInTBCC)
      const overallTicketBuy = numberTickets.plus(ticketsBoughtWithDiscount)
      return { overallTicketBuy, ticketsBoughtWithDiscount }
    },
    [getTicketCostAfterDiscount, priceTicketInTBCC],
  )

  useEffect(() => {
    const getMaxPossiblePurchase = () => {
      const maxBalancePurchase = memoisedUserTBCC.div(priceTicketInTBCC)
      const limitedMaxPurchase = limitNumberByMaxTicketsPerBuy(maxBalancePurchase)
      let maxPurchase

      // If the users' max TBCC balance purchase is less than the contract limit - factor the discount logic into the max number of tickets they can purchase
      if (limitedMaxPurchase.lt(maxNumberTicketsPerBuyOrClaim)) {
        // Get max tickets purchasable with the users' balance, as well as using the discount to buy tickets
        const { overallTicketBuy: maxPlusDiscountTickets } = getMaxTicketBuyWithDiscount(limitedMaxPurchase)

        // Knowing how many tickets they can buy when counting the discount - plug that total in, and see how much that total will get discounted
        const { ticketsBoughtWithDiscount: secondTicketDiscountBuy } =
          getMaxTicketBuyWithDiscount(maxPlusDiscountTickets)

        // Add the additional tickets that can be bought with the discount, to the original max purchase
        maxPurchase = limitedMaxPurchase.plus(secondTicketDiscountBuy)
      } else {
        maxPurchase = limitedMaxPurchase
      }

      if (hasFetchedBalance && maxPurchase.lt(1)) {
        setUserNotEnoughTBCC(true)
      } else {
        setUserNotEnoughTBCC(false)
      }

    }
    getMaxPossiblePurchase()
  }, [
    maxNumberTicketsPerBuyOrClaim,
    priceTicketInTBCC,
    memoisedUserTBCC,
    limitNumberByMaxTicketsPerBuy,
    getTicketCostAfterDiscount,
    getMaxTicketBuyWithDiscount,
    hasFetchedBalance,
  ])

  useEffect(() => {
    const numberOfTicketsToBuy = new BigNumber(ticketsToBuy)
    const costAfterDiscount = getTicketCostAfterDiscount(numberOfTicketsToBuy)
    const costBeforeDiscount = priceTicketInTBCC.times(numberOfTicketsToBuy)
    const discountBeingApplied = costBeforeDiscount.minus(costAfterDiscount)
    setTicketCostBeforeDiscount(costBeforeDiscount.gt(0) ? getFullDisplayBalance(costBeforeDiscount) : '0')
    setTotalCost(costAfterDiscount.gt(0) ? getFullDisplayBalance(costAfterDiscount) : '0')
    setDiscountValue(discountBeingApplied.gt(0) ? getFullDisplayBalance(discountBeingApplied, 18, 5) : '0')
  }, [ticketsToBuy, priceTicketInTBCC, discountDivisor, getTicketCostAfterDiscount])

  const handleNumberButtonClick = (number: number) => {
    setTicketsToBuy(number.toFixed())
    setUserNotEnoughTBCC(false)
    setMaxTicketPurchaseExceeded(false)
  }

  const [updateTicket, randomize, tickets, allComplete, getTicketsForPurchase] = useTicketsReducer(
    parseInt(ticketsToBuy, 10),
    userCurrentTickets,
  )

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await tbccContract.allowance(account, lotteryContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(tbccContract, 'approve', [lotteryContract.address, ethers.constants.MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract enabled - you can now purchase tickets'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      onConfirm: () => {
        const ticketsForPurchase = getTicketsForPurchase()
        return callWithGasPrice(lotteryContract, 'buyTickets', [currentLotteryId, ticketsForPurchase])
      },
      onSuccess: async ({ receipt }) => {
        onDismiss()
        setModalIsOpen(false)
        dispatch(fetchUserTicketsAndLotteries({ account, currentLotteryId }))
        toastSuccess(t('Lottery tickets purchased!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  const getErrorMessage = () => {
    if (userNotEnoughTBCC) return t('Insufficient TBCC balance')
    return t('The maximum number of tickets you can buy in one transaction is %maxTickets%', {
      maxTickets: maxNumberTicketsPerBuyOrClaim.toString(),
    })
  }

  const percentageDiscount = () => {
    const percentageAsBn = new BigNumber(discountValue).div(new BigNumber(ticketCostBeforeDiscount)).times(100)
    if (percentageAsBn.isNaN() || percentageAsBn.eq(0)) {
      return 0
    }
    return percentageAsBn.toNumber().toFixed(2)
  }

  const disableBuying =
    !isApproved ||
    isConfirmed ||
    userNotEnoughTBCC ||
    !ticketsToBuy ||
    new BigNumber(ticketsToBuy).lte(0) ||
    getTicketsForPurchase().length !== parseInt(ticketsToBuy, 10)

  if (buyingStage === BuyingStage.EDIT) {
    return (
      <EditNumbersModal
        totalCost={totalCost}
        updateTicket={updateTicket}
        randomize={randomize}
        tickets={tickets}
        allComplete={allComplete}
        onConfirm={handleConfirm}
        isConfirming={isConfirming}
        onDismiss={() => setBuyingStage(BuyingStage.BUY)}
      />
    )
  }

  const onDiss = () => {
    onDismiss();
    setModalIsOpen(false);
  }

  return (
    <StyledModal minWidth="330px" maxWidth="calc(100vw - 30px)">
      <ModalHeader padding={isMobile ? '12px 25px 0 25px' : '17px 36px 0 36px'}>
        <ModalTitle>
          <Heading fontSize='24px' fontWeight='600' color='#FFF'>{t('Buy Tickets')}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDiss} light/>
      </ModalHeader>
      <Line mt='15px'/>
      <ModalBody p={isMobile ? '25px' : '24px 36px'}>
        <Row mb='5px'>
          <SecondaryText>
            {t('Buy')}:
          </SecondaryText>
          <WhiteText>
            {t('Tickets')}
          </WhiteText>
        </Row>
        {account && (userNotEnoughTBCC || maxTicketPurchaseExceeded) && (
          <Text fontSize="12px" color="#d91a1a">
            {getErrorMessage()}
          </Text>
        )}
        {account && !hasFetchedBalance ? (
          <Skeleton width="100%" height={20} mt="8px" mb="24px"/>
        ) : (
          <CustomInput
            value={account ? Number(ticketsToBuy) : 0}
            onChange={(e) => handleNumberButtonClick(e)}
            onPlus={() => {
              if (Number(ticketsToBuy) < 100) {
                handleNumberButtonClick(Number(ticketsToBuy) + 1)
              } else {
                handleNumberButtonClick(100)
              }
            }}
            onMinus={() => {
              if (Number(ticketsToBuy) > 0) {
                handleNumberButtonClick(Number(ticketsToBuy) - 1)
              } else {
                handleNumberButtonClick(0)
              }
            }}
          />
        )}
        <Row mt={isMobile ? '15px' :'30px'}>
          <SecondaryText>
            {t('Cost')}&nbsp;(TBCC)
          </SecondaryText>
          <SecondaryText>
            {priceTicketInTBCC && getFullDisplayBalance(priceTicketInTBCC.times(ticketsToBuy || 0))} TBCC
          </SecondaryText>
        </Row>
        <Row mt={isMobile ? '12px' :'18px'}>
          <WhiteText>
            {discountValue && totalCost ? percentageDiscount() : 0}%&nbsp;
            <SecondaryText display='inline-block'>
              {t('Bulk discount')}
            </SecondaryText>
          </WhiteText>
          <SecondaryText>
            ~{discountValue} TBCC
          </SecondaryText>
        </Row>
        <Line mt={isMobile ? '20px' :'30px'} mb={isMobile ? '12px' :'18px'}/>
        <Row mb={isMobile ? '5px' :'20px'}>
          <Text fontSize='15px' fontWeight='600' color='rgba(255, 255, 255, 0.45)'>
            {t('You pay')}
          </Text>
          <Text fontSize='16px' fontWeight='500' color='#FFF'>
            ~{totalCost} TBCC
          </Text>
        </Row>
        {account ? (
          <>
            <ApproveConfirmButtons
              isApproveDisabled={isApproved}
              isApproving={isApproving}
              isConfirmDisabled={disableBuying}
              isConfirming={isConfirming}
              onApprove={handleApprove}
              onConfirm={handleConfirm}
              buttonArrangement={ButtonArrangement.SEQUENTIAL}
              confirmLabel={t('Buy Instantly')}
              confirmId="lotteryBuyInstant"
              width='100%'
            />
            {isApproved && (
              <StyledBtn
                disabled={disableBuying || isConfirming}
                onClick={() => {
                  setBuyingStage(BuyingStage.EDIT)
                }}
              >
                {t('View/Edit Numbers')}
              </StyledBtn>
            )}
          </>
        ) : (
          <StyledBtn
            onClick={onPresentConnectModal}>
            {t('Connect wallet')}
          </StyledBtn>
        )}
        <Text fontSize='12px' fontWeight='400' color='rgba(255, 255, 255, 0.45)' mt='25px'>
          {t('«Buy Tickets» chooses random numbers, with no duplicates among your tickets. Prices are set before each round starts, equal to %amount%TBCC at that time. Purchases are final.', { amount: getFullDisplayBalance(priceTicketInTBCC) })}
        </Text>
      </ModalBody>
    </StyledModal>
  )
}

export default BuyTicketModal
