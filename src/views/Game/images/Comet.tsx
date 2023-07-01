import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const Comet: React.FC<SvgProps> = (props) => (
  <Svg width="64" height="47" viewBox="0 0 64 47" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g opacity="0.49">
      <path d="M62.53 4.58846L0 46.3385L59.62 0.518465C60.72 -0.321535 62.29 -0.121535 63.13 0.978465C63.97 2.07846 63.77 3.64846 62.67 4.48846C62.63 4.51847 62.58 4.55846 62.53 4.58846Z" fill="url(#paint0_linear_1796_7968)"/>
      <mask id="mask0_1796_7968" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="47">
        <path d="M62.53 4.58846L0 46.3385L59.62 0.518465C60.72 -0.321535 62.29 -0.121535 63.13 0.978465C63.97 2.07846 63.77 3.64846 62.67 4.48846C62.63 4.51847 62.58 4.55846 62.53 4.58846Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_1796_7968)">
        <path d="M63.97 8.79847L62.87 -0.321533H63.97V8.79847Z" fill="url(#paint1_linear_1796_7968)"/>
      </g>
      <mask id="mask1_1796_7968" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="47">
        <path d="M62.53 4.58846L0 46.3385L59.62 0.518465C60.72 -0.321535 62.29 -0.121535 63.13 0.978465C63.97 2.07846 63.77 3.64846 62.67 4.48846C62.63 4.51847 62.58 4.55846 62.53 4.58846Z" fill="white"/>
      </mask>
      <g mask="url(#mask1_1796_7968)">
        <path d="M63.97 40.6685L16.78 46.3385H0V4.95847L43.94 -0.321533H62.87L63.97 8.79847V40.6685Z" fill="url(#paint2_linear_1796_7968)"/>
      </g>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1796_7968" x1="79.1838" y1="-15.2253" x2="-10.6622" y2="61.0822" gradientUnits="userSpaceOnUse">
        <stop offset="0.00526316" stopColor="white"/>
        <stop offset="0.9895" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1796_7968" x1="82.1836" y1="-11.6935" x2="-7.66319" y2="64.6147" gradientUnits="userSpaceOnUse">
        <stop offset="0.00526316" stopColor="white"/>
        <stop offset="0.9895" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1796_7968" x1="78.1728" y1="-16.4158" x2="-11.6738" y2="59.8921" gradientUnits="userSpaceOnUse">
        <stop offset="0.00526316" stopColor="white"/>
        <stop offset="0.9895" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </Svg>
)

export default Comet