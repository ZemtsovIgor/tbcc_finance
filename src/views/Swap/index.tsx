import React, {useCallback, useEffect, useMemo, useState} from 'react'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import useAuth from 'hooks/useAuth'
import ConnectModal from 'uikit/widgets/WalletModal/ConnectModal'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { CurrencyAmount, JSBI, Token, Trade } from '../../sdk'
import { Text, Box, Flex, useMatchBreakpoints, SecondSwapIcon, useModal } from '../../uikit'
import { GreyCard } from '../../components/Card'
import Column, { AutoColumn } from '../../components/Layout/Column'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { SwapCallbackError, Wrapper } from './components/styleds'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import ProgressSteps from './components/ProgressSteps'
import { AppBody } from '../../components/App'

import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import {useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly} from '../../state/user/hooks'
import {maxAmountSpend} from '../../utils/maxAmountSpend'
import {computeTradePriceBreakdown, warningSeverity} from '../../utils/prices'
import CircleLoader from '../../components/Loader/CircleLoader'
import Page from '../Page'
import SwapWarningModal from './components/SwapWarningModal'
import {
  StyledInputCurrencyWrapper,
  StyledSwapContainer,
  StyledBtn,
  SwapTokensBtn,
  ExpertModeGrid
} from './styles'
import CurrencyInputHeader from './components/CurrencyInputHeader'
import { PriceBar } from "./components/PriceBar";
import { TradingHistory } from "./components/TradingHistory";
import { MobileExpertModeTabs } from "./components/MobileExpertModeTabs";
import { useAllTokenData, useProtocolTransactions } from "../../state/info/hooks";
import { ProtocolUpdater, TokenUpdater } from "../../state/info/updaters";
import { TransactionType } from "../../state/info/types";

// import CashbackPool from './components/CashbackPool'

export default function Swap({history}: RouteComponentProps) {
  const loadedUrlParams = useDefaultsFromURLSearch()
  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const [isChartExpanded] = useState(false)
  const [mobileTab] = useState(0)
  const {login} = useAuth()
  const {account} = useWeb3React()
  const [activeMobExpModeIndex, setActiveMobExpModeIndex] = useState(0)
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t}/>)
  const [transactions] = useProtocolTransactions()

  // get tokens for slider
  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token)
      .map((token) => {
        return {
          currency: {
            decimals: 18,
            name: token.name,
            symbol: token.symbol,
            address: token.address
          },
          price: token.priceUSD,
          change: token.priceUSDChange,
        }
      })
  }, [allTokens])

  // get transactions for traiding history
  const sortedTransactions = useMemo(() => {
    return transactions
      ? transactions
        .slice()
        .sort((a, b) => {
          if (a && b) {
            return a.timestamp > b.timestamp ? 1 : -1
          }
          return -1
        })
        .filter((trans) => trans.type === TransactionType.SWAP)
        .slice(0, 10)
        .map((trans) => {
          return {
            profit: trans.amountUSD,
            curr1: {
              name: trans.token0Symbol,
              amount: trans.amountToken0,
            },
            curr2: {
              name: trans.token1Symbol,
              amount: trans.amountToken1,
            },
            time: trans.timestamp,
          }
        })
      : []
  }, [transactions])

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  // for expert mode
  const [isExpertMode, toggleSetExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const {independentField, typedValue, recipient} = useSwapState()
  const {v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError} = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
    : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    }

  const {onSwitchTokens, onCurrencySelection, onUserInput} = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{tradeToConfirm, swapErrorMessage, attemptingTxn, txHash}, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])

  // the callback to execute the swap
  const {callback: swapCallback, error: swapCallbackError} = useSwapCallback(trade, allowedSlippage, recipient)

  const {priceImpactWithoutFee} = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined})
    swapCallback()
      .then((hash) => {
        setSwapState({attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash})
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t])

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({tradeToConfirm, attemptingTxn, swapErrorMessage, txHash})
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn})
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency}/>)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  const setSwitchTokens = () => {
    setApprovalSubmitted(false)
    onSwitchTokens()
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')}/>,
  )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  const SwapBody = () => {
    return (
      <>
        <CurrencyInputHeader
          isActiveTab="Swap"
          expertMode={isExpertMode}
          setExpertMode={toggleSetExpertMode}
        />
        <Wrapper id="swap-page" isMobile={isMobile} style={{padding: isExpertMode ? '11px 16px 27px 16px' : ''}}>
          <AutoColumn gap="9px">
            <CurrencyInputPanel
              label={t('From')}
              value={formattedAmounts[Field.INPUT]}
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              id="swap-currency-input"
              isExpertMode={isExpertMode}
            />
            <Flex width='100%' justifyContent='center' mt='14px'>
              <SwapTokensBtn>
                <SecondSwapIcon
                  onClick={() => {
                    setSwitchTokens()
                  }}
                />
              </SwapTokensBtn>
            </Flex>
            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeOutput}
              label={t('To')}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={handleOutputSelect}
              id="swap-currency-output"
              isExpertMode={isExpertMode}
            />

            {/* {isExpertMode && recipient !== null && !showWrap ? ( */}
            {/*  <> */}
            {/*    <AutoRow justify="space-between" style={{ padding: '0 1rem' }}> */}
            {/*      <ArrowWrapper clickable={false}> */}
            {/*        <ArrowDownIcon width="16px" /> */}
            {/*      </ArrowWrapper> */}
            {/*      <Button variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}> */}
            {/*        {t('- Remove send')} */}
            {/*      </Button> */}
            {/*    </AutoRow> */}
            {/*    <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} /> */}
            {/*  </> */}
            {/* ) : null} */}
          </AutoColumn>

          <Box mt={isMobile ? '13px' : '21px'}>
            {!account ? (
              <StyledBtn width="100%" mb="4px"
                         onClick={onPresentConnectModal}>
                {t('Connect Wallet')}
              </StyledBtn>
            ) : swapIsUnsupported ? (
              <StyledBtn width="100%" disabled mb="4px">
                {t('Unsupported Asset')}
              </StyledBtn>
            ) : showWrap ? (
              <StyledBtn width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                {wrapInputError ??
                  (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
              </StyledBtn>
            ) : noRoute && userHasSpecifiedInputOutput ? (
              <GreyCard style={{textAlign: 'center', backgroundColor: 'transparent'}}>
                <Text color="#FFF" mb="4px">
                  {t('Insufficient liquidity for this trade.')}
                </Text>
                {singleHopOnly && (
                  <Text color="#FFF" mb="4px">
                    {t('Try enabling multi-hop trades.')}
                  </Text>
                )}
              </GreyCard>
            ) : showApproveFlow ? (
              <RowBetween>
                <StyledBtn
                  onClick={approveCallback}
                  disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                  width="48%"
                  style={{fontSize: '15px', lineHeight: '16px', fontWeight: '500'}}
                >
                  {approval === ApprovalState.PENDING ? (
                    <AutoRow gap="6px" justify="center">
                      {t('Enabling')} <CircleLoader stroke="white"/>
                    </AutoRow>
                  ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                    t('Enabled')
                  ) : (
                    t('Enable %asset%', {asset: currencies[Field.INPUT]?.symbol ?? ''})
                  )}
                </StyledBtn>
                <StyledBtn
                  variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        txHash: undefined,
                      })
                      onPresentConfirmModal()
                    }
                  }}
                  width="48%"
                  id="swap-button"
                  style={{fontSize: '15px', lineHeight: '16px', fontWeight: '500'}}
                  disabled={
                    !isValid ||
                    approval !== ApprovalState.APPROVED ||
                    (priceImpactSeverity > 3 && !isExpertMode)
                  }
                >
                  {priceImpactSeverity > 3 && !isExpertMode
                    ? t('Price Impact High')
                    : priceImpactSeverity > 2
                      ? t('Swap Anyway')
                      : t('Swap')}
                </StyledBtn>
              </RowBetween>
            ) : (
              <StyledBtn
                variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      txHash: undefined,
                    })
                    onPresentConfirmModal()
                  }
                }}
                id="swap-button"
                width="100%"
                style={{fontSize: '15px', lineHeight: '16px', fontWeight: '500'}}
                disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
              >
                {(priceImpactSeverity > 3 && !isExpertMode
                  ? t('Price Impact Too High')
                  : priceImpactSeverity > 2
                    ? t('Swap Anyway')
                    : t('Swap'))}
              </StyledBtn>
            )}
            {showApproveFlow && (
              <Column style={{marginTop: '1rem'}}>
                <ProgressSteps steps={[approval === ApprovalState.APPROVED]}/>
              </Column>
            )}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage}/> : null}
          </Box>
        </Wrapper>
      </>
    )
  }

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      <ProtocolUpdater />
      <TokenUpdater />
      {
        isExpertMode
          ? (isSmall
            ? <>
              <Flex width='100%' mt='95px'>
                {
                  formattedTokens.length ? (
                    <PriceBar priceList={formattedTokens}/>
                  ) : null
                }

              </Flex>
              <Flex width='100%' p='0 15px' mt='40px'>
                <MobileExpertModeTabs
                  activeIndex={activeMobExpModeIndex}
                  setActiveIndex={(e) => setActiveMobExpModeIndex(e)}/>
              </Flex>
              {
                activeMobExpModeIndex === 0 &&
                <Flex width='100%' id='trading-view-mobile-widget' pb='80px' mt='27px'>
                  <AdvancedRealTimeChart
                    width='100%'
                    theme="dark"
                    height='640px'
                    container_id='trading-view-mobile-widget'
                    symbol="BINANCE:BTCUSDT"
                  />
                </Flex>
              }
              {
                activeMobExpModeIndex === 1 &&
                <Flex p='0 15px 80px' width='100%' mt='40px' justifyContent='center'>
                  <AppBody maxWidth='600px'>
                    <SwapBody/>
                  </AppBody>
                </Flex>
              }
              {
                activeMobExpModeIndex === 2 &&
                <Flex p='0 15px 80px' width='100%' mt='40px' justifyContent='center'>
                  <AppBody maxWidth='600px'>
                    {
                      sortedTransactions.length ? (
                        <TradingHistory tradeHistory={sortedTransactions}/>
                      ) : null
                    }
                  </AppBody>
                </Flex>
              }
            </>
            : <Flex width='100%' mt='115px' p='0 30px 0 120px'>
              <AppBody maxWidth='100%'>
                <Flex flexDirection='column' width='100%'>
                  <Flex
                    width='100%'
                    height='60px'
                    alignItems='center'
                    style={{borderBottom: '1px solid rgba(217, 217, 217, 0.1)'}}>
                    {formattedTokens.length}
                    {
                      formattedTokens.length ? (
                        <PriceBar priceList={formattedTokens}/>
                      ) : null
                    }

                  </Flex>
                  <ExpertModeGrid>
                    <Flex style={{borderRight: '1px solid rgba(217, 217, 217, 0.1)'}} id='trading-view-widget'>
                      <AdvancedRealTimeChart
                        width='100%'
                        theme="dark"
                        height='100%'
                        container_id='trading-view-widget'
                        symbol="TBCCWBNB_D65B21"
                      />
                    </Flex>
                    <Flex style={{borderRight: '1px solid rgba(217, 217, 217, 0.1)'}}>
                      {
                        sortedTransactions.length ? (
                          <TradingHistory tradeHistory={sortedTransactions}/>
                        ) : null
                      }
                    </Flex>
                    <Flex flexDirection='column'>
                      <SwapBody/>
                      {!swapIsUnsupported ? (
                        trade && <AdvancedSwapDetailsDropdown isExpertMode={isExpertMode} trade={trade}/>
                      ) : (
                        <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]}/>
                      )}
                    </Flex>
                  </ExpertModeGrid>
                </Flex>
              </AppBody>
            </Flex>
          )
          : <Flex width="100%" minHeight='100vh' alignItems='center' justifyContent='center' position="relative"
                  zIndex='10'>
            {mobileTab === 0 ? (
              <Flex flexDirection="column" width={isMobile ? '100%' : 'auto'} alignItems='center'>
                <Flex flexDirection='column' width={isMobile ? 'calc(100% - 24px)' : '545px'}>
                  <StyledSwapContainer>
                    <StyledInputCurrencyWrapper
                      isMobile={isMobile}
                      mt={isChartExpanded ? '24px' : '0'}
                      mr={isChartExpanded ? '0' : '0'}
                    >
                      <AppBody boxShadow="0px 8px 16px rgba(0, 0, 0, 0.02)" maxWidth='100%'>
                        <SwapBody/>
                      </AppBody>

                      {!swapIsUnsupported ? (
                        trade && <AdvancedSwapDetailsDropdown trade={trade}/>
                      ) : (
                        <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]}/>
                      )}
                    </StyledInputCurrencyWrapper>
                  </StyledSwapContainer>
                  {/* <CashbackPool current={485.4} total={5000}/> */}
                </Flex>
              </Flex>
            ) : null}
            {isMobile && <Box height={65}/>}
          </Flex>
      }
    </Page>
  )
}
