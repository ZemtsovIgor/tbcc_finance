import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { PATHS } from 'config/paths'
import { Title, SubTitle, StyledBtn } from 'views/Swap/styles'
import { useMatchBreakpoints, Flex, Text, Image } from '../../uikit'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import MainCard from './components/MainCard'
import NoWalletConnected, { SmallContainer } from './components/NoWalletConnected'
import NoLiquidity from './components/NoLiquidity'
import Page from '../Page'
import Dots from '../../components/Loader/Dots'
import FullPositionCard from '../../components/PositionCard'
import { Pair } from '../../sdk'
import Spinner from './components/icons/Spinner.svg'

const Liquidity = ({ setExtended }) => {

	const { account } = useWeb3React()
	const { t } = useTranslation()
	const { isMobile } = useMatchBreakpoints()

	// fetch the user's balances of all tracked V2 LP tokens
	const trackedTokenPairs = useTrackedTokenPairs()

	const tokenPairsWithLiquidityTokens = useMemo(
		() => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
		[trackedTokenPairs],
	)
	const liquidityTokens = useMemo(
		() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
		[tokenPairsWithLiquidityTokens],
	)

	const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
		account ?? undefined,
		liquidityTokens,
	)

	// fetch the reserves for all V2 pools in which the user has a balance
	const liquidityTokensWithBalances = useMemo(
		() =>
			tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
				v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
			),
		[tokenPairsWithLiquidityTokens, v2PairsBalances],
	)
	const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
	const v2IsLoading =
		fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

	const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

	React.useEffect(() => {
		setExtended(false)
	})

	const renderBody = () => {
		if (!account) {
			return <NoWalletConnected />
		}
		if (v2IsLoading) {
			return (
				<SmallContainer style={{ minHeight: '180px' }}>
					<Image src={Spinner} width='65px' height='auto' alt='' />
					<Text color="rgba(255, 255, 255, 0.6)" textAlign="center">
						<Dots>{t('Loading')}</Dots>
					</Text>
				</SmallContainer>
			)
		}
		if (allV2PairsWithLiquidity?.length > 0) {
			return allV2PairsWithLiquidity.map((v2Pair, index) => (
				<FullPositionCard
					key={v2Pair.liquidityToken.address}
					pair={v2Pair}
					mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
					lastItem={index === allV2PairsWithLiquidity.length}
				/>
			))
		}
		return (
			<NoLiquidity />
		)
	}


	return (
		<Page>
			<Flex
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				position='relative'
				zIndex='5'
				height={!isMobile && '100vh'}
				mt={isMobile && '70px'}>
				<Title isMobile={isMobile}>
					{t('Become a Liquidity Provider')}
				</Title>
				<SubTitle mb='20px'>
					{t('Earn high rewards from trading fees')}
				</SubTitle>
				<MainCard>
					{renderBody()}
					<Link to={PATHS.ADD_LIQUIDITY} style={{ width: '100%' }}>
						<StyledBtn style={{ width: '100%' }}>
							+ {t('Add Liquidity')}
						</StyledBtn>
					</Link>
				</MainCard>
			</Flex>
		</Page>
	)
}

export default Liquidity
