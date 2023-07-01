import React from 'react'
import { Flex, IconButton, SettingOnSwapIcon, useModal } from '../../../uikit'

import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
}

const GlobalSettings = ({ color, mr = '8px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr={mr} id="open-settings-dialog-button">
        <SettingOnSwapIcon color={color} opacity='0.6'/>
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
