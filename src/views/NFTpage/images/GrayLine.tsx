import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const GrayLine: React.FC<SvgProps> = (props) => (
  <Svg width="226" height="502" viewBox="0 0 226 502" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_119_2)">
      <path d="M216.958 1H8.7341C6.81671 1 5.39144 2.77404 5.80457 4.6464L113.008 490.503C113.475 492.62 115.965 493.558 117.712 492.275L218.867 418.033C220.716 416.676 220.42 413.83 218.331 412.883L127.857 371.855C125.91 370.972 125.485 368.393 127.047 366.932L218.782 281.107C220.557 279.447 219.725 276.477 217.346 275.98L128.681 257.452C126.46 256.988 125.538 254.32 126.999 252.584L220.094 141.954C221.474 140.313 220.738 137.795 218.69 137.158L142.695 113.49C140.709 112.871 139.94 110.469 141.197 108.812L219.348 5.81336C220.847 3.83781 219.438 1 216.958 1Z" stroke="url(#paint0_linear_119_2)" strokeWidth="2" shapeRendering="crispEdges"/>
    </g>
    <defs>
      <filter id="filter0_d_119_2" x="0.732498" y="0" width="225.068" height="501.86" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_119_2"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_119_2" result="shape"/>
      </filter>
      <linearGradient id="paint0_linear_119_2" x1="5" y1="602.033" x2="304.621" y2="573.677" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0"/>
        <stop offset="1" stopColor="white" stopOpacity="0.15"/>
      </linearGradient>
    </defs>
  </Svg>
)

export default GrayLine