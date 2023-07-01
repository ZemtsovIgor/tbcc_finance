import React, {useState} from 'react';
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {useTranslation} from "../../../contexts/Localization";
import {Text, useMatchBreakpoints, Grid, Flex, Box, LinkExternal} from "../../../uikit";
import {ReferralTabs} from "./ReferralTabs";
import {getBscScanLink} from "../../../utils";
import {formatAmount} from "../../Swap/utils/formatInfoNumbers";
import useApproveConfirmTransaction from "../../../hooks/useApproveConfirmTransaction";
import {ToastDescriptionWithTx} from "../../../components/Toast";
import {fetchNFTVODA} from "../../../state/voda";
import {useAppDispatch} from "../../../state";
import {useCallWithGasPrice} from "../../../hooks/useCallWithGasPrice";
import useToast from "../../../hooks/useToast";
import {useNftVODAContract, useTBCC} from "../../../hooks/useContract";
import ApproveConfirmButtons, {ButtonArrangement} from "../../../components/ApproveConfirmButtons";

const HeaderGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: 1.4fr 1fr 1fr;
  align-items: center;
  padding: 0 8px;
`
const RowGrid = styled(HeaderGrid)`
  height: 45px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`
const HeaderText = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
`
const ScrollableContainer = styled(Box)`
  width: 100%;
  height: 135px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
const Line = styled(Box)`
  width: 100%;
  height: 2px;
  background: #4F5054;
  border-radius: 12px;
`

interface ReferralProps {
  unpaid: any[],
  history: any[]
}

export const Referral = ({unpaid = [], history = []}: ReferralProps) => {

  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const [referralTab, setReferralTab] = useState(0)

  const {account} = useWeb3React()
  const tbccContract = useTBCC()
  const nftContract = useNftVODAContract()
  const dispatch = useAppDispatch()
  const {callWithGasPrice} = useCallWithGasPrice()
  const {toastSuccess} = useToast()

  const totalAmount = ({list, key}: {list: any[], key: string}) => {
    let sum = 0
    list.forEach((el) => {
      sum += Number(el[key])
    })
    return sum.toFixed(2)
  }

  const {isApproving, isConfirming, handleApprove, handleConfirm} =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        return true
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
        return callWithGasPrice(nftContract, 'claim', )
      },
      onSuccess: async ({receipt}) => {
        dispatch(fetchNFTVODA({customerId: account}))
        toastSuccess(`${t('Your reward was claimed')}!`, <ToastDescriptionWithTx txHash={receipt.transactionHash}/>)
      },
    })

  return (
    <>
      <Text
        fontSize={isSmall ? '20px' : '24px'}
        fontWeight='600'
        color='#FFF'
        lineHeight={isSmall ? '28px' : '36px'}
        mt={isSmall ? '15px' : '30px'}
        mb='30px'
      >
        {t('Get 10% of the amount of NFTs purchased by referrals. Invite friends, after they make an NFT purchase, wait for the accrual after make a mint and get your reward on your wallet.')}
      </Text>
      <ReferralTabs activeTab={referralTab} setActiveTab={(e) => setReferralTab(e)}/>
      {
        referralTab === 0 &&
        (
          <>
            {unpaid && unpaid.length > 0
              ?
              <>
                <HeaderGrid mt='20px'>
                  <HeaderText>
                    {t('Time')}
                  </HeaderText>
                  <HeaderText>
                    {t('TXID')}
                  </HeaderText>
                  <HeaderText textAlign='right'>
                    {t('Amount')}
                  </HeaderText>
                </HeaderGrid>
                <ScrollableContainer mt='5px'>
                  {
                    unpaid.map((row) => {
                      return (
                        <Row key={row.txid} {...row}/>
                      )
                    })
                  }
                </ScrollableContainer>
                <Flex mt='30px'/>
              </>

              : <Flex width='100%' height='200px' alignItems='center' justifyContent='center'>
                <HeaderText textAlign='left'>
                  {t('No accruals yet.')}
                </HeaderText>
              </Flex>}
            <ApproveConfirmButtons
              isApproveDisabled
              isApproving={isApproving}
              isConfirmDisabled={false}
              isConfirming={isConfirming}
              onApprove={handleApprove}
              onConfirm={handleConfirm}
              buttonArrangement={ButtonArrangement.SEQUENTIAL}
              confirmLabel={`${t('Mint')} & ${t('Get reward')}`}
              confirmId="claimRewardBtn"
              width='100%'
            />
          </>
        )
      }
      {
        referralTab === 1 &&
        ( history && history.length > 0
              ?
              <>
                <HeaderGrid mt='20px'>
                  <HeaderText>
                    {t('Time')}
                  </HeaderText>
                  <HeaderText>
                    {t('TXID')}
                  </HeaderText>
                  <HeaderText textAlign='right'>
                    {t('Amount')}
                  </HeaderText>
                </HeaderGrid>
                <ScrollableContainer mt='5px' style={{height: '225px'}}>
                  {
                    history.map((row) => {
                      return (
                        <Row key={row.txid} {...row}/>
                      )
                    })
                  }
                </ScrollableContainer>
                <Line mt='10px'/>
                <Flex width='100%' height='70px' alignItems='center' justifyContent='space-between'>
                  <HeaderText>
                    {t('Total reward amount')}:
                  </HeaderText>
                  <Text fontWeight='800' fontSize='18px' color='#FFF'>
                    + ${totalAmount({list: history, key:'amount'})} {' '} TBCC
                  </Text>
                </Flex>
              </>

              : <Flex width='100%' height='200px' alignItems='center' justifyContent='center'>
                <HeaderText textAlign='left'>
                  {t('No history yet.')}
                </HeaderText>
              </Flex>
        )
      }

    </>

  );
};

const Row = (row: any) => {

  const {time, txid, amount} = row
  const [hovered, setHovered] = useState(false)
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const txDate = new Date(Number(time) * 1000).toLocaleString("en-US", {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  return (
    <RowGrid
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}>
      <Text color='rgba(255, 255, 255, 0.6)' fontWeight='600' letterSpacing='0.15em'>
        {txDate}
      </Text>
      {
        hovered
          ? <LinkExternal href={getBscScanLink(txid.replace('PREINVITER', ''), 'transaction')} fontWeight='600' style={{letterSpacing: isSmall ? 'normal' :'0.15em'}} >
            {`${txid.replace('PREINVITER', '').substring(0, isSmall ? 2 : 5)}...${txid.substring(txid.length - 3)}`}
          </LinkExternal>
          : <Text fontWeight='600' color='#FFF' letterSpacing={isSmall ? 'normal' :'0.15em'}>
            {`${txid.replace('PREINVITER', '').substring(0, isSmall ? 2 : 5)}...${txid.substring(txid.length - 3)}`}
          </Text>
      }

      <Text color='#FFF' letterSpacing='0.15em' fontWeight='800' textAlign='right'>
        +&nbsp;{formatAmount(amount)} {' '} TBCC
      </Text>
    </RowGrid>
  )
}
