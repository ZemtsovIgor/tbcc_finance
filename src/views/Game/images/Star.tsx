import React from "react";
import { Svg, SvgProps } from "../../../uikit";

const Star: React.FC<SvgProps> = (props) => (
  <Svg width="21" height="24" viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg"  fill="white" {...props}>
    <path d="M10.35 23.03C10.49 23.03 10.63 23.04 10.76 23.06C10.87 23.08 10.98 22.99 11 22.86C12.13 17.06 15.51 13.34 20.66 12.29C20.78 12.27 20.86 12.14 20.84 12C20.83 11.96 20.83 11.93 20.83 11.89C20.82 11.78 20.74 11.69 20.65 11.67C15.19 10.54 11.71 6.43 10.81 0C10.75 0.01 10.69 0.02 10.63 0.02C10.59 0.02 10.55 0.02 10.51 0.02C10.4 0.02 10.31 0.11 10.3 0.23C9.32998 6.65 5.75998 10.71 0.189983 11.72C0.0899829 11.74 0.019983 11.83 -1.70453e-05 11.94C-0.020017 12.08 0.069983 12.21 0.189983 12.23C5.55998 13.21 9.06998 17.02 10.19 23.04C10.24 23.04 10.29 23.04 10.35 23.03Z"/>
  </Svg>
)

export default Star