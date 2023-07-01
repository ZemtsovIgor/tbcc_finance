import React from "react";
import {useWeb3React} from "@web3-react/core";
import Mint from "./mintPage";
import MintUn from "./mintPageUn";
import {useFetchNFTVODA} from "../../state/voda/hooks";

const MintIndex = () => {
  const {account} = useWeb3React()
  useFetchNFTVODA();

  return (
    <>
      {
        account ? <Mint /> : <MintUn />
      }
    </>
  )
}

export default MintIndex
