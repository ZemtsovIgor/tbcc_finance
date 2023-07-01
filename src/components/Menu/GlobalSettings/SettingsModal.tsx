import React from 'react'
import styled from 'styled-components'
import { useUserSingleHopOnly } from 'state/user/hooks'
// import { useExpertModeManager, useUserExpertModeAcknowledgementShow, useUserSingleHopOnly } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
// import { useSwapActionHandlers } from 'state/swap/hooks'
import { Text, Toggle, Flex, Modal, InjectedModalProps, useMatchBreakpoints, InfoTBCCIcon } from '../../../uikit'
import TransactionSettings from './TransactionSettings'
// import ExpertModal from './ExpertModal'
import GasSettings from "./GasSettings";

const ScrollableContainer = styled(Flex)<{ isMobile: boolean }>`
  flex-direction: column;
  max-height: ${({ isMobile }) => isMobile ? '412px' : '400px'};
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
const StyledModal = styled(Modal)<{isMobile?: boolean}>`
  background-color: #171533;
  color: #FFF;
  min-width: ${({isMobile}) => isMobile ? '' : '545px'};

  & > div:first-child {
    padding: ${({isMobile}) => isMobile ? '17px 11px 0px 17px' : '20px 40px 0px 40px'} ;
    & > div {
      & > h2 {
      color: #FFF;
      font-size: ${({isMobile}) => isMobile ? '24px' : ''}
      }
    }
    & > button {
      & > svg {
        stroke: #FFF;
        opacity: 0.6;
      }
    }  
  }
`
const Line = styled.div<{isMobile?: boolean}>`
  width: 100%;
  height: 1px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
  margin: ${({isMobile}) => isMobile ? '2px 0 21px 0' : '25px 0'};
`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  // const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  // const [setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  // const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  // const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  // const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  // if (showConfirmExpertModal) {
  //   return (
  //     <ExpertModal
  //       setShowConfirmExpertModal={setShowConfirmExpertModal}
  //       onDismiss={onDismiss}
  //       setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
  //     />
  //   )
  // }

  // const handleExpertModeToggle = () => {
  //   if (expertMode) {
  //     onChangeRecipient(null)
  //     toggleExpertMode()
  //   } else if (!showExpertModeAcknowledgement) {
  //     onChangeRecipient(null)
  //     toggleExpertMode()
  //   } else {
  //     setShowConfirmExpertModal(true)
  //   }
  // }

  return (
    <StyledModal
      title={t('Settings')}
      headerBackground="#171533"
      onDismiss={onDismiss}
      style={{ maxWidth: isMobile ? 'calc(100% - 30px)' : '704px' }}
      bodyPadding={isMobile ? '17px 17px 17px 17px' : '0px 40px 38px 40px'}
      lightClose
      isMobile={isMobile}
    >
      <Line isMobile={isMobile}/>
      <ScrollableContainer isMobile={isMobile}>
        <Flex pb={isMobile ? '10px' : '28px'} flexDirection="column">
          <GasSettings />
        </Flex>
        <Flex flexDirection="column">
          <TransactionSettings />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          {/* <Flex alignItems="center"> */}
          {/*  <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} /> */}
          {/*  <Text fontSize="14px" lineHeight="16px" color="#505050">{t('Expert Mode')}</Text> */}
          {/* </Flex> */}
          <Flex alignItems="center">
            <Toggle
              id="toggle-disable-multihop-button"
              checked={singleHopOnly}
              scale="md"
              onChange={() => {
                setSingleHopOnly(!singleHopOnly)
              }}
            />
            <Text fontSize="14px" ml='12px' lineHeight="16px" color="rgba(255, 255, 255, 0.45)">{t('Disable Multihops')}</Text>
            <InfoTBCCIcon ml='10px'/>
          </Flex>
        </Flex>
      </ScrollableContainer>
    </StyledModal>
  )
}

export default SettingsModal;
