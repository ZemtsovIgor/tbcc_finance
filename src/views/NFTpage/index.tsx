import React, {useEffect} from "react";
import styled from "styled-components";
import {useTranslation} from "../../contexts/Localization";
import Page from "../Page"
import MainSection from "./components/MainSection";
import Footer from "../../uikit/components/Footer";
import {Box, useMatchBreakpoints} from "../../uikit";
import TokenPriceScale from "./components/TokenPriceScale";
import {useFetchNFT} from "../../state/nft/hooks";
import {SubTitle} from "./style";
import LinkExternal from "../../uikit/components/Link/LinkExternal";

export const StyledBtn = styled(LinkExternal)`
    display: flex;
    justify-content: center;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    cursor: pointer;
    align-items: center;
    min-width: 130px;
    min-height: 60px;
`

const NftPage = ({setExtended}) => {
  useFetchNFT()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { t } = useTranslation()

  useEffect(() => {
    setExtended(true)
  })

  const tokenInfo = {
    current: 1.5,
    next: 1.75
  }

  return (
    <Page>
      <MainSection nextPrice={tokenInfo.next}/>
      <TokenPriceScale />
      {/* <AtbccRoad/> */}
      {/* <WhitePaper/> */}
      <SubTitle>
        {t('Download Presentation')}
      </SubTitle>
      <Box mx='auto' mt='10px'>
        <StyledBtn
          href="docs/TBCCTDA.pdf"
          style={{width: '185px'}}
          color='#FFFFFF'
        >
          {t('Download')}&nbsp;.pdf
        </StyledBtn>
      </Box>
      <Box mt={isMobile ? '80px' : '0px'} width='100%' p={isSmall && '0 15px'}>
        <Footer center/>
      </Box>
    </Page>
  )
}

export default NftPage
