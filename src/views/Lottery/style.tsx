import styled from "styled-components";
import {Box, Flex} from "../../uikit";

export const MobileTabsItem = styled(Flex)<{isActive?: boolean}>`
  align-items: center;
  justify-content: center;
  background: ${({isActive}) => isActive ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : ''};
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: ${({isActive}) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  width: 95px;
  height: 57px;
  text-align: center;
`
export const HorizontalLine = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
`