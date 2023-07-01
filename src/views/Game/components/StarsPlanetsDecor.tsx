import React from 'react';
import styled, {keyframes} from "styled-components";
import { Box, useMatchBreakpoints} from "../../../uikit";
import Planet1 from "../images/Planet1";
import Planet2 from "../images/Planet2";
import Planet3 from "../images/Planet3";
import Starship1 from "../images/Starship1";
import Star from "../images/Star";
import Comet from "../images/Comet";
import Comet2 from "../images/Comet2";

const starShipFly = keyframes`
  0% {
    transform: translate(200px, -500px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`
const shine = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
  }
  50% {
    transform: scale(0.8) rotate(180deg);
  }
  100% {
    transform: scale(0) rotate(360deg);
  }
`
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
`
const StarshipContainer = styled(Box)`
  position: absolute;
  top: 220px;
  right: 30px;
  animation: ${starShipFly} 3s ease-in-out;
  
  @media (max-width: 968px) {
    top: 50px;
    right: 59px;
  }
`
const PlanetShine = styled(Box)`
  position: absolute;
  width: 21px;
  height: 24px;
  top: 150px;
  right: 670px;
  animation: ${shine} 2s linear infinite;

  @media (max-width: 968px) {
    top: 61px;
    right: 91%;
  }
`
const PlanetShine2 = styled(Box)`
  position: absolute;
  width: 21px;
  height: 24px;
  top: 618px;
  right: 668px;
  transform: scale(0);
  animation: ${shine} 2s linear infinite;
  animation-delay: 1s;

  @media (max-width: 968px) {
    top: 329px;
    right: 78%;
  }
`
const Star1 = styled(Box)`
  position: absolute;
  width: 16px;
  height: 18px;
  top: 100px;
  right: 550px;
  animation: ${pulse} 2s linear infinite;
`
const Star2 = styled(Box)`
  position: absolute;
  width: 21px;
  height: 24px;
  top: 310px;
  right: 600px;
  animation: ${pulse} 3.5s linear infinite;
`
const Star3 = styled(Box)`
  position: absolute;
  width: 21px;
  height: 24px;
  top: 400px;
  right: -30px;
  animation: ${pulse} 4s linear infinite;
`
const Star4 = styled(Box)`
  position: absolute;
  width: 16px;
  height: 18px;
  top: 510px;
  right: 575px;
  animation: ${pulse} 3s linear infinite;
`

const StarsPlanetsDecor = () => {

  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <>
      <Planet1
        width={isSmall ? '40px' : '66px'}
        height={isSmall ? '40px' : '66px'}
        style={{
          position: 'absolute',
          top: isSmall ? '61px' : '150px',
          right: isSmall ? '93%' : '670px'}}/>
      <PlanetShine>
        <Star width='100%' height='100%'/>
      </PlanetShine>
      <Planet2
        style={{
          position: 'absolute',
          top: isSmall ? '320px' : '610px',
          right: isSmall ? '68%' : '630px'}}/>
      <PlanetShine2>
        <Star width='100%' height='100%'/>
      </PlanetShine2>
      <Planet3
        width={isSmall ? "45px" : "69px"}
        height={isSmall ? "45px" : "67px"}
        style={{
          position: 'absolute',
          top: isSmall ? '326px' : '465px',
          right: isSmall ? '13px' : '10px'}}/>
      <StarshipContainer>
        <Starship1 width={isSmall ? "130px" : "176px"} height={isSmall ? "135px" : "182px"}/>
      </StarshipContainer>
      <Star1>
        <Star fill='#B047F1' width='100%' height='100%'/>
      </Star1>
      <Star2>
        <Star width='100%' height='100%'/>
      </Star2>
      <Star3>
        <Star width='100%' height='100%'/>
      </Star3>
      <Star4>
        <Star fill='#B047F1' width='100%' height='100%'/>
      </Star4>
      {!isSmall && <Comet style={{position: 'absolute', top: '130px', right: '350px'}}/>}
      {!isSmall && <Comet2 style={{position: 'absolute', top: '660px', right: '25px'}}/>}
    </>
  );
};

export default StarsPlanetsDecor;