import React from "react"
import styled from "styled-components"
import useMatchBreakpoints from "../../../uikit/hooks/useMatchBreakpoints";

const ElOfBackground = styled.div`
  position: absolute;
  pointer-events: none;
`

const FirstEl = styled(ElOfBackground)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '150vw': '40vw'};
  height: ${({isMobile}) => isMobile ? '150vw': '40vw'};
  top: ${({isMobile}) => isMobile ? '-344px': '313px'};
  left: ${({isMobile}) => isMobile ? '140px': '-466px'};
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.5;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
const SecondEl = styled(ElOfBackground)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '730px': '35vw'};
  height: ${({isMobile}) => isMobile ? '730px': '35vw'};
  top: ${({isMobile}) => isMobile ? '0px': '-288px'};
  left: ${({isMobile}) => isMobile ? '0px': '349px'};
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.35;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
const ThirdEl = styled(ElOfBackground)`
  width: 39vw;
  height: 39vw;
  top: 200px;
  right: 0;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.5;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
const FourthEl = styled(ElOfBackground)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '150vw': '40vw'};
  height: ${({isMobile}) => isMobile ? '150vw': '40vw'};
  top: ${({isMobile}) => isMobile ? '953px': '1000px'};
  right: ${({isMobile}) => isMobile ? '323px': '300px'};
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.5;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
const FithEl = styled(ElOfBackground)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '75vw': '40vw'};
  height: ${({isMobile}) => isMobile ? '75vw': '40vw'};
  top: ${({isMobile}) => isMobile ? '1843px': '1800px'};
  right: ${({isMobile}) => isMobile ? '10px': '-250px'};
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.5;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
const SixthEl = styled(ElOfBackground)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '70vw': '40vw'};
  height: ${({isMobile}) => isMobile ? '70vw': '40vw'};
  top: ${({isMobile}) => isMobile ? '2844px': '2600px'};
  left: ${({isMobile}) => isMobile ? '138px': '-350px'};
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.5;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
const SeventhEl = styled(ElOfBackground)<{isMobile?: boolean}>`
  width: ${({isMobile}) => isMobile ? '150vw': '40vw'};
  height: ${({isMobile}) => isMobile ? '150vw': '40vw'};
  top: 3200px;
  right: -150px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  opacity: 0.5;
  filter: blur(125px);
  border-radius: 50%;
  transform: rotate(180deg);
`
interface Props {
  extended?: boolean
}
const Background: React.FC<Props> = ({extended}) => {

  const { isMobile } = useMatchBreakpoints()

  return (
    <>
      <FirstEl isMobile={isMobile}/>
      <SecondEl isMobile={isMobile}/>
      {!isMobile && <ThirdEl/>}
      {extended &&
      <>
      <FourthEl isMobile={isMobile}/>
      <FithEl isMobile={isMobile}/>
      <SixthEl isMobile={isMobile}/>
      {!isMobile && <SeventhEl/>}
      </>}
    </>
  )
}

export default Background
