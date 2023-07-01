import React, {useEffect, useState} from "react";
import styled from "styled-components";
import _ from 'lodash'
import {Flex, Box, useMatchBreakpoints, Image} from "../../../uikit";
import {SubTitle, Container} from "../style";
import TbccImg from "../images/TBCC.png"
import ColorLine from "../images/ColorLine";
import GrayLine from "../images/GrayLine";
import GrayLineMobile from "../images/GrayLineMobile";
import ColorLineMobile from "../images/ColorLineMobile";

const AtbccRoad = () => {

  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  const [clipPath, setClipPath] = useState(100)

  const lineOffset = document.getElementById('interactive-line')?.offsetTop + document.getElementById('atbcc')?.offsetTop
  const windowHeight = window.innerHeight

  const onScroll = () => {
    const scroll = window.pageYOffset
    if (scroll - lineOffset + windowHeight * 0.6 >= -50) {
      const diff = (scroll - lineOffset) + windowHeight * 0.6
      setClipPath(100 - ((diff / 495) * 100))
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak
    return () => document.removeEventListener("scroll", onScroll);
  })

  return (
    <Container mb='33px' id='atbcc'>
      <SubTitle>
        1 NFT Token = 1 ATBCC
      </SubTitle>
      {isSmall &&
        <GradientCard mt='47px'>
        ATBCC token =
      </GradientCard>}
      <Flex mt={isSmall ? '0' : '55px'}>
        {!isSmall &&
        <Flex flexDirection='column' alignItems='flex-end'>
          <GradientCard mr='50px'>
            ATBCC token =
          </GradientCard>
          <Image
            src={TbccImg}
            width='445px'
            height='497px'
            alt=''
            mt='70px'/>
        </Flex>
        }
        <Box id='interactive-line' position='relative' mt={!isSmall ? '56px' : '30px'}>
          {!isSmall ? <GrayLine/> : <GrayLineMobile/>}
          {!isSmall
            ? <ColorLine style={{position: 'absolute', top: 0, left:0, clipPath: `inset(0 0 ${clipPath}% 0)`}}/>
            : <ColorLineMobile style={{position: 'absolute', top: 0, left:'3px', clipPath: `inset(0 0 ${clipPath}% 0)`}}/>
          }

        </Box>
         <Flex flexDirection='column' ml={!isSmall ? '50px' : '10px'} mt={isSmall && '70px'} flex='1'>
          {_.times(4, (index) => {
            return (
              <GrayCard key={index}>
                LP {index + 1}
              </GrayCard>
            )
          })}
         </Flex>
      </Flex>
    </Container>
  )
}

export default AtbccRoad

const GradientCard = styled(Flex)`
  width: 300px;
  height: 113px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  font-weight: 600;
  font-size: 28px;
  color: #FFFFFF;

  @media (max-width: 968px) {
    height: 90px;
    width: 300px;
  }
`
const GrayCard = styled(GradientCard)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #DB00FF;
  margin-bottom: 25px;
  
  @media (max-width: 968px) {
    height: 90px;
    width: 174px;
    margin-bottom: 47px;
  }
`