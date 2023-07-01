import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot, useMatchBreakpoints } from '../../uikit'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)<{isMobile?: boolean}>`
  align-items: center;
  justify-content: center;
  padding: ${({isMobile}) => isMobile ? '20px 15px 14px 15px' : '38px 40px 14px 40px'};
  width: 100%;
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()
  const { isMobile } = useMatchBreakpoints()

  return (
    <AppHeaderContainer isMobile={isMobile}>
      <Flex alignItems="flex-start" mr={noConfig ? 0 : '16px'} width='100%'>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="13px" />
          </IconButton>
        )}
        <Flex flexDirection="column" width='100%' justifyContent='center'>
          <Heading as="h2" mb="8px" color='#FFF' textAlign='center' style={{fontSize: '24px', fontWeight: '600'}}>
            {title}
          </Heading>
          <Flex alignItems="center" width='100%'  mt='10px'>
            {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />}
            <Text color="rgba(255, 255, 255, 0.6)" fontSize="14px" textAlign='center'  width='100%'>
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          <Transactions />
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
