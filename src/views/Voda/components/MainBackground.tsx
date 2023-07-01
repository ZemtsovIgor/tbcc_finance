import React from "react";
import styled from "styled-components";
import {Box, Image, useMatchBreakpoints} from "../../../uikit";
import MainBgDecs from '../images/MainBgDes.png'
import MainBgMob from '../images/MainBgMob.png'

const ImgContainer = styled(Box)`
  position: absolute;
  top: 0px;
  right: 0px;
  pointer-events: none;
  
  @media (max-width: 968px) {
    top: 400px;
  }
`

export const MainBackground = () => {

  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <ImgContainer>
      <Image src={isSmall ? MainBgMob : MainBgDecs} width='720px' height='auto'/>
    </ImgContainer>
  )
}