import React from 'react';
import Starship2 from "../../images/Starship2";
import Comet from "../../images/Comet";
import Star from "../../images/Star";
import Planet4 from "../../images/Planet4";
import {useMatchBreakpoints} from "../../../../uikit";

const Decor = () => {

  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <>
      <Starship2
        width={isSmall ? '300px' : '399px'}
        height={isSmall ? '295px' : '379px'}
        style={{
          position: 'absolute',
          top: isSmall ? '42px' : '50px',
          left: isSmall ? '10px' : '0px'}}/>
      <Planet4
        width={isSmall ? '120px' : '153px'}
        height={isSmall ? '122px' : '155px'}
        style={{
          position: 'absolute',
          top: isSmall ? '203px' : '300px',
          left: isSmall ? '195px' : '200px'}}/>
       <Comet style={{position: 'absolute', top: '115px', left: '330px', transform: 'rotateZ(-105deg)'}}/>
       <Star
         fill='#B047F1'
         width='16px'
         height='18px'
         style={{
           position: 'absolute',
           top: isSmall ? '170px' : '220px',
           left: isSmall ? '230px' : '320px',
           transform: 'rotateZ(-45deg)'}}/>
       <Star
         style={{
           position: 'absolute',
           top: isSmall ? '240px' : '300px',
           left: isSmall ? '40px' : '90px',
           transform: 'rotateZ(-45deg)'}}/>
    </>
  );
};

export default Decor;