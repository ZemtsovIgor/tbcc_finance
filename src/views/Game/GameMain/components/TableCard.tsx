import React from 'react';
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Box, Text, useModal} from "../../../../uikit";
import CoinIcon from "../../images/CoinIcon";
import useRunBNBTransaction from "../../../../hooks/useRunBNBTransaction";
import {fetchGame} from "../../../../state/game";
import {ToastDescriptionWithTx} from "../../../../components/Toast";
import {useCallWithGasPrice} from "../../../../hooks/useCallWithGasPrice";
import {useGameContract} from "../../../../hooks/useContract";
import useToast from "../../../../hooks/useToast";
import {useAppDispatch} from "../../../../state";
import {StyledBtn} from "../../../Swap/styles";
import ConnectModal from "../../../../uikit/widgets/WalletModal/ConnectModal";
import useAuth from "../../../../hooks/useAuth";

const Card = styled(Flex)`
  width: 261px;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  
  @media (max-width: 968px) {
    width: 100%;
  }
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
  margin: 15px 0;
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
`
const WhiteText = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  text-align: center;
`
interface TableCardProps {
  tableNumber: number,
  coin: number,
  currentTable: number,
  price: string
  rewards: any
}

const TableCard: React.FC<TableCardProps> = ({tableNumber, coin, currentTable, price, rewards}) => {

  const { t } = useTranslation()
  const { login } = useAuth()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)
  const { account } = useWeb3React()
  const gameContract = useGameContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()
  const inviterReward = Number(rewards?.inviterReward) || 0;
  const winnerReward = Number(rewards?.winnerReward) || 0;
  const winnerInviterReward = Number(rewards?.winnerInviterReward) || 0;
  const hits = Number(rewards?.hits) || 0;

  const { handleConfirmTrans } =
    useRunBNBTransaction({
      onConfirm: () => {
        return callWithGasPrice(gameContract, 'buy', ['0xb471a86ec50b2783e44e72ec535c832b586a9ada'], { value: price })
      },
      onSuccess: async ({ receipt }) => {
        dispatch(fetchGame({ customerId: account }))
        toastSuccess(`${t('You went to the table')}!`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  const Connected = () => {
    return (
      <StyledBtn
        onClick={handleConfirmTrans}
        disabled={currentTable !== (tableNumber - 1)}
        id="tableBtn"
      >
        {currentTable >= tableNumber ? t('You here') : currentTable + 1 === tableNumber ? t('Go To Table') : `${t('Visit table')} ${currentTable + 1}`}
      </StyledBtn>
    )
  }

  const Unconnected = () => {
    if (currentTable === 0) return null
    return (
      <StyledBtn
        onClick={onPresentConnectModal}
      >
        {t('Connect Wallet')}
      </StyledBtn>
    )
  }

  return (
    <Card>
      <Flex
        width='100%'
        justifyContent='space-between'
        alignItems='center'
        mt='20px'
        mb='5px'
        p='0 20px'
      >
        <Text fontSize='15px' fontWeight='600' color='#FFF'>
          {t('Table')}&nbsp;{tableNumber}
        </Text>
        <Flex alignItems='center'>
          <CoinIcon mr='8px'/>
          <Text fontSize='15px' fontWeight='600' color='#FFF'>
            {coin}
          </Text>
        </Flex>
      </Flex>
      <Line/>
      <SecondaryText>
        {t('You already Hit')}
      </SecondaryText>
      <WhiteText style={{fontSize: '32px'}}>
        {currentTable >= tableNumber ? hits : 'X'}
      </WhiteText>
      <Line/>
      <SecondaryText>
        {t('Reward')}
      </SecondaryText>
      <WhiteText mb='15px'>
        {currentTable >= tableNumber ? Number.parseFloat(winnerReward.toFixed(3)) : 'X'}
      </WhiteText>
      <SecondaryText>
        {t('Referral')}
      </SecondaryText>
      <WhiteText mb='15px'>
        {currentTable >= tableNumber ? Number.parseFloat(inviterReward.toFixed(3)) : 'X'}
      </WhiteText>
      <SecondaryText>
        {t('Referral on Reward')}
      </SecondaryText>
      <WhiteText mb='25px'>
        {currentTable >= tableNumber ? Number.parseFloat(winnerInviterReward.toFixed(3)) : 'X'}
      </WhiteText>
      {
        account && currentTable > 0 ? (
          <Connected />
        ) : (
          <Unconnected />
        )
      }
    </Card>
  );
};

export default TableCard;
