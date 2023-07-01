import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const AsTable: React.FC<SvgProps> = (props) => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="9" cy="9" r="6.75" stroke="white" strokeOpacity="0.4" strokeWidth="1.5"/>
      <path d="M9.375 5.625C9.375 5.83211 9.20711 6 9 6C8.79289 6 8.625 5.83211 8.625 5.625C8.625 5.41789 8.79289 5.25 9 5.25C9.20711 5.25 9.375 5.41789 9.375 5.625Z" fill="white" fillOpacity="0.4" stroke="white" strokeOpacity="0.4"/>
      <path d="M9 12.75V7.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.5"/>
  </Svg>
)

export default AsTable