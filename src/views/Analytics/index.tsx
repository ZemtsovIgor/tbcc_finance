import React from 'react'
import { Route } from 'react-router-dom'
import { PoolUpdater, ProtocolUpdater, TokenUpdater } from 'state/info/updaters'
import Overview from './Overview'
import Pools from './Pools'
import PoolPage from './Pools/PoolPage'
import Tokens from './Tokens'
import RedirectInvalidToken from './Tokens/redirects'

const Analytics: React.FC = () => {
  return (
    <>
      <ProtocolUpdater />
      <PoolUpdater />
      <TokenUpdater />
      {/* <InfoNav /> */}
      <Route path="/analytics" exact>
        <Overview />
      </Route>
      <Route path="/analytics/pools" exact>
        <Pools />
      </Route>
      <Route path="/analytics/tokens" exact>
        <Tokens />
      </Route>
      <Route exact path={['/analytics/tokens/:address', '/analytics/token/:address']} component={RedirectInvalidToken} />
      <Route exact path={['/analytics/pools/:address', '/analytics/pool/:address', '/analytics/pair/:address']} component={PoolPage} />
    </>
  )
}

export default Analytics
