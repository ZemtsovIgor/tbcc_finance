import React from 'react'
import { Route } from 'react-router-dom'
import { TBCCNFTToken } from './Tokens'
import {PATHS} from "../../config/paths";

const Mint: React.FC = () => {
  return (
    <>
      {/* <InfoNav /> */}
      <Route path={PATHS.MINT} exact>
        <TBCCNFTToken />
      </Route>
    </>
  )
}

export default Mint
