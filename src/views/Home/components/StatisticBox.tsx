import React from "react"
import styled from 'styled-components'
import { useTranslation } from "contexts/Localization"
import { Flex, useMatchBreakpoints, Box } from '../../../uikit'
import { MainText, SecondaryText } from "./ExtendedHome/FirstBlock"
import { formatAmount } from "../../Analytics/utils/formatInfoNumbers";

const Container = styled(Flex) <{ isMobile?: boolean }>`
	width: 100%;
	flex-direction: column;
	padding-top: ${({ isMobile }) => isMobile ? '18px' : '24px'};
	padding-left: ${({ isMobile }) => isMobile ? '30px' : '60px'};
	padding-bottom: 30px;
	border-radius: 24px;
	border: 1px solid rgba(255, 255, 255, 0.09);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
`
interface StatisticBoxProps {
	volume: number,
	traders?: string,
	locked?: number
}

const StatisticBox: React.FC<StatisticBoxProps> = ({volume, traders, locked}) => {

	const { t } = useTranslation()
	const { isMobile } = useMatchBreakpoints()


	return (
			<Container isMobile={isMobile}>
				<Box mb={isMobile ? '13px' : '30px'}>
					<MainText>
					{t(`$${formatAmount(volume, { displayThreshold: 1000, tokenPrecision: true })}+`)}
				</MainText>
				<SecondaryText isMobile={isMobile}>
					{t('Trading Volume (30d)')}
				</SecondaryText>
				</Box>
				<Box mb={isMobile ? '13px' : '30px'}>
					<MainText>
					{t(`${traders}+`)}
				</MainText>
				<SecondaryText isMobile={isMobile}>
					{t('Traders')}
				</SecondaryText>
				</Box>
				<Box mb={isMobile ? '13px' : '30px'}>
					<MainText>
					{t(`${formatAmount(locked, { isInteger: true })}+`)}
				</MainText>
				<SecondaryText isMobile={isMobile}>
					{t('TBCC Burn')}
				</SecondaryText>
				</Box>
			</Container>
    )
}

export default StatisticBox
