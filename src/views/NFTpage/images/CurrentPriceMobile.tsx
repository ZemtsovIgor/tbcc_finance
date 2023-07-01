import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const CurrentPriceMobile: React.FC<SvgProps> = (props) => (
  <Svg width="68" height="42" viewBox="0 0 68 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M58 6.07099C58 2.75728 55.3137 0.070986 52 0.0709859L6 0.0709839C2.68629 0.0709839 0 2.75727 0 6.07098V35.071C0 38.3847 2.68629 41.071 6 41.071L52 41.071C55.3137 41.071 58 38.3847 58 35.071V26.5622L66.5894 21.3551C67.2315 20.9659 67.2315 20.0341 66.5894 19.6449L58 14.4378V6.07099Z" fill="url(#paint0_linear_1237_15129)"/>
    <defs>
      <linearGradient id="paint0_linear_1237_15129" x1="-1.57912e-07" y1="49.9543" x2="82.8151" y2="20.8997" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DB00FF"/>
        <stop offset="1" stopColor="#2C5EE0"/>
      </linearGradient>
    </defs>
  </Svg>
)

export default CurrentPriceMobile