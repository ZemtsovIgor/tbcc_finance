import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import { useFarmUser, useLpTokenPrice } from 'state/farms/hooks'
import { Flex, useModal } from '../../../../uikit'
import {ArrowUpIcon, CalculatorIcon} from "../../icons";
import {GreenText, WhiteText} from "../Table/TableRow";
import {ViewMode} from "../../../../state/user/actions";

const ApyLabelContainer = styled(Flex)`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

export interface ApyButtonProps {
  pid: number
  lpSymbol: string
  lpLabel?: string
  multiplier: string
  tftPrice?: BigNumber
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  viewMode: ViewMode
}

const ApyButton: React.FC<ApyButtonProps> = ({
  pid,
  lpLabel,
  lpSymbol,
  tftPrice,
  apr,
  multiplier,
  displayApr,
  addLiquidityUrl,
  viewMode,
}) => {
  const { t } = useTranslation()
  const lpPrice = useLpTokenPrice(lpSymbol)
  const { tokenBalance, stakedBalance } = useFarmUser(pid)
  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      stakingTokenBalance={stakedBalance.plus(tokenBalance)}
      stakingTokenSymbol={lpSymbol}
      stakingTokenPrice={lpPrice.toNumber()}
      earningTokenPrice={tftPrice.toNumber()}
      apr={apr}
      multiplier={multiplier}
      displayApr={displayApr}
      linkHref={addLiquidityUrl}
      isFarm
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <ApyLabelContainer alignItems="center" onClick={handleClickButton}>
      {
        (viewMode === ViewMode.CARD) ? multiplier ? (
          <>
            <ArrowUpIcon/>
            <GreenText ml='5px'>
              {displayApr}%
            </GreenText>
            <WhiteText ml='8px'><s>{displayApr}%</s></WhiteText>
            <CalculatorIcon ml='8px'/>
          </>
        ) : (
          <>
            <WhiteText>{displayApr}%</WhiteText>
            <CalculatorIcon ml='8px'/>
          </>
        ) : multiplier ? (
          <>
            <WhiteText><s>{displayApr}%</s></WhiteText>
            <CalculatorIcon ml='8px'/>
            <ArrowUpIcon ml='16px'/>
            <GreenText ml='5px'>
              {displayApr}%
            </GreenText>
          </>
        ) : (
          <>
            <WhiteText>{displayApr}%</WhiteText>
            <CalculatorIcon ml='8px'/>
          </>
        )
      }
    </ApyLabelContainer>
  )
}

export default ApyButton
