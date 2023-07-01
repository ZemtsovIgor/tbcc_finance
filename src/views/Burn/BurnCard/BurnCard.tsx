import React, {useCallback, useState} from 'react'
import styled from "styled-components";
import {BigNumber} from "@ethersproject/bignumber";
import {TransactionResponse} from "@ethersproject/providers";
import TBCCIcon from "../../../uikit/components/Svg/Icons/TBCCIcon"
import {
  Box,
  Button,
  Flex,
  Text,
  Slider,
  useMatchBreakpoints, useModal,
}
  from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import useTransactionDeadline from "../../../hooks/useTransactionDeadline";
import {useGasPrice} from "../../../state/user/hooks";
import {Percent} from "../../../sdk";
import {BurnTransaction, TokenBurnFields} from "../../../state/info/types";
import {useDerivedTokenBurnInfo, useTokenBurnActionHandlers, useTokenBurnState} from "../../../state/info/hooks";
import tokens from "../../../config/constants/tokens";
import {ApprovalState, useApproveCallback} from "../../../hooks/useApproveCallback";
import {useTransactionAdder} from "../../../state/transactions/hooks";
import {calculateGasMargin} from "../../../utils";
import {AutoColumn} from "../../../components/Layout/Column";
import useDebouncedChangeHandler from "../../../hooks/useDebouncedChangeHandler";
import {useTBCC} from "../../../hooks/useContract";
import {useTBCCBusdPrice} from "../../../hooks/useBUSDPrice";
import ConnectModal from "../../../uikit/widgets/WalletModal/ConnectModal";
import useAuth from "../../../hooks/useAuth";
import {formatAmount} from "../../Swap/utils/formatInfoNumbers";
import Dots from "../../../components/Loader/Dots";

const ResponsiveBurnGrid = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => isMobile ? 'calc(100% - 4px)' : '465px'};
  flex-direction: column;
  border: solid 1px rgba(255, 255, 255, 0.09);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
`

export const StyledBtn = styled(Button)<{ isMobile: boolean }>`
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border: none;
  box-shadow: none;
  border-radius: 6px;
  color: #FFF;
  font-size: 16px;
  font-weight: 600;
  margin-top: 35px;
  cursor: pointer;
  align-items: center;
`

const SubText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #e7fdd8;
  opacity: 0.4;
  text-align: center;
  margin-bottom: 0;
`
const SubDText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-left: 8px;
  margin-bottom: 0;
`
const SubBotText = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  text-align: center;
`
const SubBottomText = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #e7fdd8;
  opacity: 0.4;
`
const StyledCard = styled(Box)<{ isMobile: boolean }>`
  width: ${({ isMobile }) => isMobile ? 'calc(100% - 30px)' : '550px'};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;
  margin-top: ${({ isMobile }) => isMobile ? '-90px' : '-50px'};
  margin-bottom: ${({ isMobile }) => isMobile ? '90px' : ''};
`
const ButtonContainer = styled(Flex)<{ isMobile: boolean }>`
  gap: 20px;
  width: 100%;
  margin-top: ${({ isMobile }) => isMobile ? '15px' : '50px'};
  background: transparent;
  border: none;

`

const TxtContainer = styled(Flex)<{ isMobile: boolean }>`
  width: 100%;
  margin-top: ${({ isMobile }) => isMobile ? '15px' : '4px'};
  background: transparent;
  justify-content: space-between;
`
const TxtBottomContainer = styled(Flex)<{ isMobile: boolean }>`
  width: 100%;
  margin-top: ${({ isMobile }) => isMobile ? '15px' : '4px'};
  background: transparent;
  flex-direction: column;
`
const GridContainer = styled(Flex)<{ isMobile: boolean }>`
  justify-content: space-between;
  margin-top: ${({ isMobile }) => isMobile ? '15px' : '27px'};
  background: transparent;
  padding: 0 16px;
  padding-bottom: 20px;
`
const SelectButton = styled(Button)<{ isActive: boolean, isMobile: boolean }>`
  font-weight: ${({ isActive }) => isActive ? '600' : 'normal'};
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: #FFFFFF;
  border: none;
  width: 100%;
  padding: ${({ isMobile }) => isMobile ? '0 6px' : '0 18px'};
`

export const Break = styled.div`
  height: 1px;
  background-color: rgba(217, 217, 217, 0.05);
  width: 100%;
`

const BurnCard: React.FC<{
  burnTransactions: BurnTransaction[] | undefined
}> = ({ burnTransactions }) => {

  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const gasPrice = useGasPrice()
  const { login } = useAuth()
  const { account, chainId, library } = useActiveWeb3React()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)
  const walletTransactions = {};
  burnTransactions.forEach((burnTransaction: BurnTransaction) => {
    walletTransactions[burnTransaction.sender] = burnTransaction.amount
  })

  // burn state
  const { independentField, typedValue } = useTokenBurnState()
  const { parsedAmounts, userBalance, error } = useDerivedTokenBurnInfo(tokens.tbcc ?? undefined)
  const { onUserInput: _onUserInput } = useTokenBurnActionHandlers()
  const tbccPriceBusd = useTBCCBusdPrice()
  const isValid = !error

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm
  const [txHash, setTxHash] = useState<string>('')

  // txn values
  const deadline = useTransactionDeadline()

  const formattedAmounts = {
    [TokenBurnFields.TOKEN_PERCENT]: parsedAmounts[TokenBurnFields.TOKEN_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[TokenBurnFields.TOKEN_PERCENT].lessThan(new Percent('1', '100'))
        ? '<1'
        : parsedAmounts[TokenBurnFields.TOKEN_PERCENT].toFixed(0),
    [TokenBurnFields.TOKEN]:
      independentField === TokenBurnFields.TOKEN ? typedValue : parsedAmounts[TokenBurnFields.TOKEN]?.toSignificant(4) ?? '',
  }

  // token contract
  const tbccContract = useTBCC()

  // allowance handling
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[TokenBurnFields.TOKEN], tokens.tbcc.address)

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: TokenBurnFields, value: string) => {
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  const tokenPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(TokenBurnFields.TOKEN_PERCENT, value.toString())
    },
    [onUserInput],
  )
  const [innerTokenPercentage, setInnerTokenPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[TokenBurnFields.TOKEN_PERCENT].toFixed(0)),
    tokenPercentChangeCallback,
  )

  // tx sending
  const addTransaction = useTransactionAdder()
  async function onRemove() {
    if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies')
    const { [TokenBurnFields.TOKEN]: tokenAmount } = parsedAmounts
    if (!tokenAmount) {
      throw new Error('missing token amounts')
    }

    let methodNames: [string]
    let args: [string]
    // we have approval, use normal remove tokens
    if (approval === ApprovalState.APPROVED) {
      methodNames = ['burn']
      args = [
        tokenAmount.raw.toString()
      ]
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        tbccContract.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((err) => {
            console.error(`estimateGas failed`, methodName, args, err)
            return undefined
          }),
      ),
    )

    const methodName = 'burn'
    const safeGasEstimate = safeGasEstimates[0]

    setAttemptingTxn(true)
    await tbccContract[methodName](...args, {
      gasLimit: safeGasEstimate,
      gasPrice,
    })
      .then((response: TransactionResponse) => {
        setAttemptingTxn(false)

        addTransaction(response, {
          summary: `Removed ${parsedAmounts[TokenBurnFields.TOKEN]?.toSignificant(3)} ${
            tokens.tbcc?.symbol
          }`,
        })

        setTxHash(response.hash)
      })
      .catch((err: Error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        console.error(err)
      })
  }

  const getRatingPlace = (allSumm: number = 0) => {
    if (!burnTransactions.length) {
      return 0
    }

    let nextPlace: number = burnTransactions.length + 1
    burnTransactions.forEach((burnTransaction: BurnTransaction, index: number) => {
      if ((allSumm >= burnTransaction.amount) && (nextPlace > index + 1)) {
        nextPlace = index + 1
      }
    })

    return nextPlace
  }

  const BtnContain = () => {
    return(
      <ButtonContainer isMobile={isMobile} style={{marginTop:"5px"}}>
        <SelectButton
          onClick={() => onUserInput(TokenBurnFields.TOKEN_PERCENT, '25')}
          isMobile={isMobile}
        >
          {t('25%')}
        </SelectButton>

        <SelectButton
          onClick={() => onUserInput(TokenBurnFields.TOKEN_PERCENT, '50')}
          isMobile={isMobile}
        >
          {t('50%')}
        </SelectButton>

        <SelectButton
          onClick={() => onUserInput(TokenBurnFields.TOKEN_PERCENT, '75')}
          isMobile={isMobile}
        >
          {t('75%')}
        </SelectButton>

        <SelectButton
          onClick={() => onUserInput(TokenBurnFields.TOKEN_PERCENT, '100')}
          isMobile={isMobile}
        >
          {t('Max')}
        </SelectButton>
      </ButtonContainer>
    )
  }

  const TextHeadContain = () => {
    return(
      <TxtContainer isMobile={isMobile}>
        <Flex>
          <SubText>
            {t('Amount')}
          </SubText>
        </Flex>
        <Flex>
          <SubText>
            {t('Balance')}:
          </SubText>
          <SubDText>
            {userBalance?.toSignificant(4) || 0}
          </SubDText>
        </Flex>
      </TxtContainer>
    )
  }

  const TextBottomContain = () => {
    return(
      <TxtBottomContainer isMobile={isMobile}>
        <Flex mb="20px" justifyContent="space-between">
          <SubBottomText>
            {t('Already burned by me')}:
          </SubBottomText>
          <SubBotText>
            {formatAmount(walletTransactions[account?.toLocaleLowerCase()] || 0)} TBCC
          </SubBotText>
        </Flex>

        <Flex mb="20px" justifyContent="space-between">
          <SubBottomText>
            {t('Tokens will be burned')}:
          </SubBottomText>
          <SubBotText>
            {formattedAmounts[TokenBurnFields.TOKEN] || 0} TBCC
          </SubBotText>
        </Flex>

        <Flex mb="20px" justifyContent="space-between">
          <SubBottomText>
            {t('Estimated token value')}:
          </SubBottomText>
          <SubBotText>
            ${formatAmount(Number(formattedAmounts[TokenBurnFields.TOKEN]) * Number(tbccPriceBusd?.toFixed(9))) || 0}
          </SubBotText>
        </Flex>

        <Flex mb="20px" justifyContent="space-between">
          <SubBottomText>
            {t('Expected place in the ranking')}:
          </SubBottomText>
          <SubBotText>
            #{getRatingPlace(walletTransactions[account?.toLocaleLowerCase()] + Number(formattedAmounts[TokenBurnFields.TOKEN]))}
          </SubBotText>
        </Flex>
      </TxtBottomContainer>
    )
  }

  const GridHeader = () => {
    return(
      <GridContainer isMobile={isMobile}>
        <TBCCIcon/>
        <Text fontSize="20px" fontWeight="400" color='#FFF' ml="15px" mr="auto" >
          {t('TBCC')}
        </Text>
        <Text fontSize='20px' fontWeight='400' color='#FFF' >
          {formattedAmounts[TokenBurnFields.TOKEN] || 0}
        </Text>
      </GridContainer>
    )
  }

  return (
    <StyledCard
      isMobile={isMobile}
      style={{ padding: '10px 41px 40px 39px' }}
      >
      {
        !attemptingTxn && !txHash ? (
          <AutoColumn gap="10px">
            <Flex
              alignItems='center'
              justifyContent='space-between'
              flexDirection={isMobile ? 'column' : 'row'}
              m={isMobile ? '10px 18px 0px 18px' : '25px 50px 15px 50px'}
            >
              <Text fontSize='24px' fontWeight='600' color='#FFF' width="100%" textAlign="center">
                {t('Burn your TBCC & get privilege')}
              </Text>

            </Flex>

            <TextHeadContain/>
            <ResponsiveBurnGrid  isMobile={isMobile}>
              <GridHeader/>
              <Break/>
              <Flex p="0 16px" pb="27px" pt="10px" flexDirection="column">
                <Slider
                  name="burn-slide"
                  min={0}
                  max={100}
                  value={innerTokenPercentage}
                  onValueChanged={(value) => setInnerTokenPercentage(Math.ceil(value))}
                />
                <BtnContain/>
              </Flex>
            </ResponsiveBurnGrid>
            <TextBottomContain/>
            {
              !account ? (
                <StyledBtn isMobile={isMobile} width="100%" mb="4px" onClick={onPresentConnectModal}>
                  {t('Connect Wallet')}
                </StyledBtn>
              ) : null
            }

            {
              (account && approval !== ApprovalState.APPROVED) ? (
                <StyledBtn
                  isMobile={isMobile}
                  onClick={approveCallback}
                  disabled={approval !== ApprovalState.NOT_APPROVED}
                  style={{marginBottom: isMobile ? '40px' : ''}}
                >
                  {approval === ApprovalState.PENDING ? (
                    <Dots>{t('Enabling')}</Dots>
                  ) : !error ? (
                    t('Enable')
                  ) : (
                    error
                  )}
                </StyledBtn>
              ) : account ? (
                <StyledBtn
                  isMobile={isMobile}
                  onClick={() => onRemove()}
                  disabled={!isValid}
                  style={{marginBottom: isMobile ? '40px' : ''}}
                >
                  {error || t('Burn')} {formattedAmounts[TokenBurnFields.TOKEN]} TBCC
                </StyledBtn>
              ) : null
            }
          </AutoColumn>
        ) : txHash ? (
          <Flex
            alignItems='center'
            justifyContent='space-between'
            flexDirection={isMobile ? 'column' : 'row'}
            m={isMobile ? '28px 22px 20px 22px' : '25px 30px 20px 30px'}
          >
            <Text fontSize='24px' fontWeight='600' color='#FFF' width="100%" textAlign="center">
              {t('Burned')}
            </Text>

          </Flex>
        ) : (
          <Flex
            alignItems='center'
            justifyContent='space-between'
            flexDirection={isMobile ? 'column' : 'row'}
            m={isMobile ? '28px 22px 20px 22px' : '25px 30px 20px 30px'}
          >
            <Text fontSize='24px' fontWeight='600' color='#FFF' width="100%" textAlign="center">
              <Dots>{t('Loading')}</Dots>
            </Text>

          </Flex>
        )
      }

    </StyledCard>
  );
};

export default BurnCard;

