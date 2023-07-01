import React from 'react';
import Cloud1 from "../images/Cloud1";
import { useMatchBreakpoints } from "../../../uikit";
import Cloud2 from "../images/Cloud2";

const CloudsDecor = () => {

  const { isMobile } = useMatchBreakpoints()

  const cloud1Pos = {
    top: isMobile ? '50px' : '140px',
    right: isMobile ? '-166px' : '0px'
  }

  return (
    <>
      <Cloud1 style={{position: 'absolute', top: cloud1Pos.top, right: cloud1Pos.right}}/>
      {!isMobile && <Cloud2 style={{position: 'absolute', top: '300px', left: '0'}}/>}
    </>
  );
};

export default CloudsDecor;