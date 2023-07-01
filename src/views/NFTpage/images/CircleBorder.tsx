import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const CircleBorder: React.FC<SvgProps> = (props) => (
  <Svg width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path opacity="1" d="M78 39.5C78 60.763 60.763 78 39.5 78C18.237 78 1 60.763 1 39.5C1 18.237 18.237 1 39.5 1C60.763 1 78 18.237 78 39.5Z" stroke="url(#paint0_linear_1237_11607)" strokeWidth="2"/>
    <defs>
      <linearGradient id="paint0_linear_1237_11607" x1="14.1686" y1="66.1431" x2="67.8375" y2="9.69776" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D202F4" stopOpacity="0"/>
        <stop offset="0.4099" stopColor="#D202F4"/>
        <stop offset="0.5828" stopColor="#A51BEF"/>
        <stop offset="0.9731" stopColor="#345AE1"/>
        <stop offset="1" stopColor="#2C5EE0"/>
      </linearGradient>
    </defs>
  </Svg>


)

export default CircleBorder