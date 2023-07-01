import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../uikit";
import {ViewMode} from "../../../../state/user/actions";
import {AsCardIcon, AsTableIcon} from "../../icons";

const SwitchContainer = styled(Flex)`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  cursor: pointer;
`
const SwitchElement = styled(Flex)<{ isActive?: boolean }>`
  height: 45px;
  align-items: center;
  border-radius: 6px;
  background: ${({isActive}) => isActive ? '#2D2B45' : ''};
  padding: 0 18px;
`


interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const ToggleView: React.FC<ToggleViewProps> = ({viewMode, onToggle}) => {

  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <SwitchContainer>
      <SwitchElement isActive={viewMode === ViewMode.CARD} onClick={() => handleToggle(ViewMode.CARD)}>
        <AsCardIcon/>
      </SwitchElement>
      <SwitchElement isActive={viewMode === ViewMode.TABLE} onClick={() => handleToggle(ViewMode.TABLE)}>
        <AsTableIcon/>
      </SwitchElement>
    </SwitchContainer>
  )
}

export default ToggleView

