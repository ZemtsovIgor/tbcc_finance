import React, {useCallback, useMemo, useState} from 'react'
import styled from "styled-components";
import {Route, useRouteMatch} from 'react-router-dom'
import {useUserFarmsViewMode} from 'state/user/hooks'
import {useFarms, usePriceCakeBusd} from 'state/farms/hooks'
import {useWeb3React} from '@web3-react/core'
import SearchInput from 'components/SearchInput'
import BigNumber from 'bignumber.js'
import {DeserializedFarm} from 'state/types'
import {getFarmApr} from 'utils/apr'
import {latinise} from 'utils/latinise'
import {orderBy} from 'lodash'
import {getBalanceNumber} from 'utils/formatBalance'
import {ChainId} from '../../sdk'
import {useTranslation} from "../../contexts/Localization";
import {Flex, Grid, RowType, useMatchBreakpoints} from "../../uikit";
import Page from "../Page";
import {ConfigContainer, Container, Header, SubTitle, Title} from "./style";
import SortbyDropDown, {OptionProps} from "./components/SortbyDropDown";
import ToggleView from "./components/ToggleView/ToggleView";
import {ViewMode} from "../../state/user/actions";
import FarmCard, {FarmWithStakedValue} from './components/Cards/FarmCard'
import {RowProps} from './components/Table/TableRow'
import {DesktopColumnSchema} from './components/types'
import Table from './components/Table/FarmTable'

const StyledGrid = styled(Grid)`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 50px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`

const getDisplayApr = (tftRewardsApr?: number, lpRewardsApr?: number) => {
  if (tftRewardsApr && lpRewardsApr) {
    return (tftRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (tftRewardsApr) {
    return tftRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms = () => {
  const { path } = useRouteMatch()
  // const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const tftPrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')

  // const isArchived = pathname.includes('archived')
  // const isInactive = pathname.includes('history')
  // const isActive = !isInactive && !isArchived

  // usePollFarmsWithUserData(isArchived)
  // const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const userDataReady = !account || (!!account && userDataLoaded)

  // const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  // const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  // const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))
  //
  // const stakedOnlyFarms = activeFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )
  //
  // const stakedInactiveFarms = inactiveFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )
  //
  // const stakedArchivedFarms = archivedFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { tftRewardsApr, lpRewardsApr } = getFarmApr(new BigNumber(farm.poolWeight), tftPrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])

        return { ...farm, apr: tftRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [tftPrice, query],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    chosenFarms = farmsList(farmsLP)
    return sortFarms(chosenFarms)
  }, [
    sortOption,
    farmsLP,
    farmsList,
  ])

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('TBCC', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        tftPrice,
        originalValue: farm.apr,
        viewMode,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      farm: {
        multiplier: farm.multiplier,
        isCommunity: farm.isCommunity,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }
              return 0
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <StyledGrid>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              tftPrice={tftPrice}
              account={account}
              removed={false}
              viewMode={viewMode}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              tftPrice={tftPrice}
              account={account}
              removed
              viewMode={viewMode}
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              tftPrice={tftPrice}
              account={account}
              removed
              viewMode={viewMode}
            />
          ))}
        </Route>
      </StyledGrid>
    )
  }

  return (
     <Page>
       <Container>
        <Header>
          <Flex flexDirection='column'>
            <Title>
              {t('Farms')}
            </Title>
            <SubTitle>
              {t('Stake LP tokens to earn.')}
            </SubTitle>
          </Flex>
           <ConfigContainer mt={isSmall ? '25px' : '0'}>
             <Flex
               justifyContent={isSmall ? 'space-between' : 'center'}
               width={isSmall ? '100%' : 'auto'}
               mb={isSmall ? '26px' : '0'}
             >
               {
                 isSmall ? (
                   <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
                 ) : null
               }
             </Flex>
             <SortbyDropDown
               options={[
                 {
                   label: t('Hot'),
                   value: 'hot',
                 },
                 {
                   label: t('APR'),
                   value: 'apr',
                 },
                 {
                   label: t('Liquidity'),
                   value: 'liquidity',
                 },
                 {
                   label: t('Multiplier'),
                   value: 'multiplier',
                 }
               ]}
               onOptionChange={handleSortOptionChange}
             />
             <SearchInput onChange={handleChangeQuery} placeholder="Search farms" />
             {
               !isSmall ? (
                 <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
               ) : null
             }
           </ConfigContainer>
        </Header>
         {renderContent()}
       </Container>
     </Page>
  )
}

export default Farms

