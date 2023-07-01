import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { useTranslation } from "contexts/Localization"
import BigNumber from "bignumber.js";
import { Text, Flex, Box, useMatchBreakpoints } from '../../../../uikit'
import { StyledBtn, TransparentBtn, Container, SubContainer } from "../../style"
import StatisticBox from "../StatisticBox"
import {fetchTokenMonthData} from "../../../../state/info/queries/helpers";
import fetchTokenInfo from "../../../../state/info/queries/tokens/tokenInfo";
import {getDeltaTimestamps} from "../../../Swap/utils/infoQueryHelpers";
import {useBlocksFromTimestamps} from "../../../Swap/hooks/useBlocksFromTimestamps";
import {getChangeForPeriod} from "../../../Swap/utils/infoDataHelpers";
import tokens from "../../../../config/constants/tokens";

export const Title = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 600;
	font-size: ${({ isMobile }) => isMobile ? '28px' : '42px'};
	line-height: ${({ isMobile }) => isMobile ? '36px' : '48px'};
	color: #FFF;
`
export const SubTitle = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '16px' : '18px'};
	line-height: ${({ isMobile }) => isMobile ? '24px' : '26px'};
	color: rgba(255, 255, 255, 0.6);
`
export const MainText = styled(Text)`
	font-weight: 600;
	font-size: 42px;
	color: #FFF;
`
export const SecondaryText = styled(Text) <{ isMobile?: boolean }>`
	font-weight: 400;
	font-size: ${({ isMobile }) => isMobile ? '14px' : '16px'};
	color: rgba(255, 255, 255, 0.6);
`

interface AnalyticsData {
	volume?: number
}

interface TokenInfo {
	totalSupply?: number
}

interface TokenFields {
	id: string
	symbol: string
	name: string
	derivedBNB: string // Price in BNB per token
	derivedUSD: string // Price in USD per token
	tradeVolumeUSD: string
	totalTransactions: string
	totalLiquidity: string
}

interface FormattedTokenFields
	extends Omit<TokenFields, 'derivedBNB' | 'derivedUSD' | 'tradeVolumeUSD' | 'totalTransactions' | 'totalLiquidity'> {
	derivedBNB: number
	derivedUSD: number
	tradeVolumeUSD: number
	totalTransactions: number
	totalLiquidity: number
}

const parseTokenData = (tokens?: TokenFields[]) => {
	if (!tokens) {
		return {}
	}
	return tokens.reduce((accum: { [address: string]: FormattedTokenFields }, tokenData) => {
		const { derivedBNB, derivedUSD, tradeVolumeUSD, totalTransactions, totalLiquidity } = tokenData
		// eslint-disable-next-line no-param-reassign
		accum[tokenData.id] = {
			...tokenData,
			derivedBNB: parseFloat(derivedBNB),
			derivedUSD: parseFloat(derivedUSD),
			tradeVolumeUSD: parseFloat(tradeVolumeUSD),
			totalTransactions: parseFloat(totalTransactions),
			totalLiquidity: parseFloat(totalLiquidity),
		}
		return accum
	}, {})
}

const FirstBlock = () => {

	const { t } = useTranslation()
	const { isMobile, isTablet } = useMatchBreakpoints()
	const isSmall = isMobile || isTablet
	const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
	const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
	const [, , , , t30d] = getDeltaTimestamps()
	const { blocks } = useBlocksFromTimestamps([t30d])
	const [block30d] = blocks ?? []


	useEffect(() => {
		const getAnalytics = async () => {

			const { error, data } = await fetchTokenMonthData(
				block30d.number,
				[tokens.tbcc.address.toLowerCase()],
			)

			if (error) {
				setAnalytics({ volume: 0 })
			} else {

				const parsed = parseTokenData(data?.now)
				const parsed30d = parseTokenData(data?.oneMonthAgo)

				const current: FormattedTokenFields | undefined = parsed[tokens.tbcc.address.toLowerCase()]
				const oneMonth: FormattedTokenFields | undefined = parsed30d[tokens.tbcc.address.toLowerCase()]
				const [volumeUSD] = getChangeForPeriod(
					current?.tradeVolumeUSD,
					oneMonth?.tradeVolumeUSD,
				)

				const newData = {
					volume: volumeUSD || 0,
				};

				setAnalytics(newData)
			}
		}
		if (!analytics && block30d) {
			getAnalytics()
		}
	}, [block30d, analytics])

	useEffect(() => {
		const getTokenInfo = async () => {
			const { data } = await fetchTokenInfo(tokens.tbcc.address.toLowerCase())
			const totalSupply: number = data?.token?.totalSupply ? new BigNumber(data?.token?.totalSupply).dividedBy(1000000000000000000).toNumber() : 0
			const newData = {
				totalSupply,
			};

			setTokenInfo(newData)
		}
		if (!tokenInfo) {
			getTokenInfo()
		}
	}, [tokenInfo])

	return (
		<Container isMobile={isSmall}>
			<SubContainer isMobile={isSmall}>
				<Flex flexDirection='column' width={!isSmall ? '500px' : 'auto'} mr={!isSmall && '100px'}>
					<Title mb={isSmall ? '15px' : '23px'} isMobile={isSmall}>
						{t('Best decentralized exchange experience')}
					</Title>
					<SubTitle mb={isSmall ? '35px' : '56px'} isMobile={isSmall}>
						{t('Explore trading, GameFi, and TBCC in the TBCC FINANCE ecosystem.')}
					</SubTitle>
					<Flex>
						<Box width='180px' mr='20px'>
							<StyledBtn>
								{t('View Roadmap')}
							</StyledBtn>
						</Box>
						<Box width={isSmall ? '120px' : 'auto'}>
							<TransparentBtn>
								{t('API docs')}
							</TransparentBtn>
						</Box>
					</Flex>
				</Flex>
				<Box width={isSmall ? '100%' : '380px'}  mb={isSmall && '30px'} mr={!isSmall && '30px'}>
					<StatisticBox volume={analytics?.volume || 0} traders="227K" locked={1000000000 - (tokenInfo?.totalSupply || 0)} />
				</Box>
			</SubContainer>
		</Container>
	)
}

export default FirstBlock
