import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const CurrentPrice: React.FC<SvgProps> = (props) => (
  <Svg width="58" height="51" viewBox="0 0 58 51" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M29.3551 1.4106C28.9658 0.768467 28.0341 0.768468 27.6448 1.4106L23.044 9L6 9C2.68629 9 -1.17423e-07 11.6863 -2.62269e-07 15L-1.57361e-06 45C-1.71846e-06 48.3137 2.68629 51 6 51L52 51C55.3137 51 58 48.3137 58 45V15C58 11.6863 55.3137 9 52 9L33.9559 9L29.3551 1.4106Z" fill="url(#paint0_linear_1234_10792)"/>
    <defs>
      <linearGradient id="paint0_linear_1234_10792" x1="-6.11717e-05" y1="61.8487" x2="75.7543" y2="43.0294" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DB00FF"/>
        <stop offset="1" stopColor="#2C5EE0"/>
      </linearGradient>
    </defs>
  </Svg>
)

export default CurrentPrice