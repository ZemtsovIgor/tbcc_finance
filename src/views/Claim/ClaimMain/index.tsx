import React from "react";
import {PATHS} from "config/paths";
import {Flex, Image, useMatchBreakpoints } from "../../../uikit";
import {MainCard, MainCardEmpty} from "./components/MainCard";
import {useNFT} from "../../../state/nft/hooks";

const ClaimMain = () => {

  const { isTablet, isMobile } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {
    nftTDAData: {
      totalTokens,
      totalSupply,
      totalOwners,
      floorPrice,
      owner
    },
  } = useNFT()

  return (
    <Flex
      width='100%'
      flexDirection={isSmall ? 'column' : 'row'}
      style={{gridGap: isSmall ? '17px' : '30px'}}
      mt={isSmall ? '77px' : '125px'}
      pb={isSmall ? '80px' : '0'}
    >
      <MainCard
        img={<Image
          src='/images/decorations/DefiApesImg.png'
          width='270px'
          height='250px'
          style={{minHeight: '250px'}}
        />}
        title='TBCC DEFI APES'
        quantity={Number(owner.totalTokens)}
        floorPrice={Number(floorPrice)}
        totalVolume={Number(totalTokens)}
        items={Number(totalSupply)}
        owners={Number(totalOwners)}
        href={PATHS.CLAIM_YOURS}
      />
      <MainCardEmpty />
      {/* <MainCard */}
      {/*  img={<Image width='260px' height='250px' src='/images/decorations/AdminNftImg.png'/>} */}
      {/*  title='Admin NFT Token 2' */}
      {/*  quantity={100} */}
      {/*  floorPrice={0.223} */}
      {/*  totalVolume={6.6035} */}
      {/*  items={1000} */}
      {/*  owners={351} */}
      {/*  href={PATHS.CLAIM_YOURS} */}
      {/* /> */}
    </Flex>
  )
}

export default ClaimMain
