import React from "react";
import {Route} from "react-router-dom";
import {PATHS} from "config/paths";
import Page from "../Page";
import { ContentContainer } from "./styles";
import ClaimMain from "./ClaimMain";
import ClaimPersonal from "./ClaimPersonal";
import {useFetchNFT} from "../../state/nft/hooks";

const Claim = () => {
  useFetchNFT()

  return (
    <Page>
      <ContentContainer>
        <Route exact path={PATHS.CLAIM} component={ClaimMain}/>
        <Route exact path={PATHS.CLAIM_YOURS} component={ClaimPersonal}/>
      </ContentContainer>
    </Page>
  )
}

export default Claim
