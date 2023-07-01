import React, { lazy, useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import ResetCSS from './uikit/ResetCSS'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import history from './routerHistory'
import Swap from './views/Swap'
import {
  RedirectToAddLiquidity,
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
// Views included in the main bundle

import { useInactiveListener } from './hooks/useInactiveListener'
import { PATHS } from './config/paths'

// Route-based code splitting
// const Home = lazy(() => import('./views/Home'))
const Mint = lazy(() => import('./views/Mint'))
const NotFound = lazy(() => import('./views/NotFound'))
const Liquidity = lazy(() => import('./views/Liquidity'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'));
const Home = lazy(() => import('./views/Home'))
const Analytics = lazy(() => import('./views/Analytics'))
const Burn =lazy(() => import('./views/Burn'))
const Lottery = lazy(() => import('./views/Lottery'))
const Game = lazy(() => import('./views/Game'))
const GameMain = lazy(() => import('./views/Game/GameMain'))
const GameStats = lazy(() => import('./views/Game/GameStats'))
const GameBonuses = lazy(() => import('./views/Game/GameBonuses'))
const GameRules = lazy(() => import('./views/Game/GameRules'))
const Farms = lazy(() => import('./views/Farms'))
const NftPage = lazy(() => import('./views/NFTpage'))
const Team = lazy(() => import('./views/Team'))
const Claim = lazy(() => import('./views/Claim'))
const Voda = lazy(() => import('./views/Voda'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()
  useInactiveListener()

  const [extended, setExtended] = useState(false)

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <GlobalCheckClaimStatus excludeLocations={[]} />
      {/* <Attention/> */}
      <Menu extended={extended}>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route exact strict path={PATHS.HOME}>
              <Home extended={extended} setExtended={setExtended} />
            </Route>
            <Route path={PATHS.MINT}>
              <Mint />
            </Route>
            <Route exact strict path={PATHS.SWAP} component={Swap}/>
            <Route exact strict path={PATHS.LIQUIDITY}>
              <Liquidity setExtended={setExtended}/>
            </Route>
            <Route exact strict path={PATHS.ADD_LIQUIDITY} component={AddLiquidity}/>
            <Route exact strict path={PATHS.CREATE_LIQUIDITY} component={RedirectToAddLiquidity} />
            <Route exact path={PATHS.ADDA_LIQUIDITY} component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path={PATHS.ADDAB_LIQUIDITY} component={RedirectDuplicateTokenIds} />
            <Route exact strict path={PATHS.REMOVE_LIQUIDITY} component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path={PATHS.REMOVEAB_LIQUIDITY} component={RemoveLiquidity} />
            <Route exact strict path={PATHS.GAME}>
              <Game setExtenden={setExtended}/>
            </Route>
            <Route exact strict path={PATHS.GAME_MAIN} component={GameMain} />
            <Route exact strict path={PATHS.GAME_MAIN_INVITER} component={GameMain} />
            <Route exact strict path={PATHS.GAME_STATS}>
              <GameStats/>
            </Route>
            <Route exact strict path={PATHS.GAME_BONUSES}>
              <GameBonuses/>
            </Route>
            <Route exact strict path={PATHS.GAME_RULES}>
              <GameRules/>
            </Route>
            <Route exact strict path={PATHS.FARMS} component={Farms} />
            <Route exact strict path={PATHS.LOTTERY}>
              <Lottery setExtended={setExtended}/>
            </Route>
            <Route path={PATHS.ANALYTICS}>
              <Analytics />
            </Route>
            <Route path={PATHS.BURN}>
              <Burn />
            </Route>
            <Route exact strict path={PATHS.NFT}>
              <NftPage setExtended={setExtended}/>
            </Route>
            <Route exact strict path={PATHS.TEAM}>
              <Team/>
            </Route>
            <Route path={PATHS.CLAIM}>
              <Claim/>
            </Route>
            <Route path={PATHS.VODA}>
              <Voda />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
