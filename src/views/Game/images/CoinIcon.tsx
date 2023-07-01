import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const CoinIcon: React.FC<SvgProps> = (props) => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="11" cy="11" r="11" fill="url(#paint0_linear_1796_9555)"/>
    <circle cx="11" cy="11.0001" r="7.33333" fill="url(#paint1_linear_1796_9555)"/>
    <defs>
      <linearGradient id="paint0_linear_1796_9555" x1="-5.17967e-08" y1="26.7667" x2="29.1663" y2="20.5115" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0066FF"/>
        <stop offset="1" stopColor="#2CE0C5"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1796_9555" x1="3.66663" y1="21.5112" x2="23.1108" y2="17.3411" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2CE0C5"/>
        <stop offset="1" stopColor="#0066FF"/>
      </linearGradient>
    </defs>
  </Svg>
)

export default CoinIcon