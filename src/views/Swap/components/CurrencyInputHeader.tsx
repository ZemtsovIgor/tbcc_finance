import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {PATHS} from 'config/paths'
import {useTranslation} from 'contexts/Localization'
import {Flex, IconButton, useMatchBreakpoints, NewRefreshIcon, Text, Toggle} from '../../../uikit'
import GlobalSettings from '../../../components/Menu/GlobalSettings'

interface Props {
  isActiveTab?: string,
  expertMode?: boolean,
  setExpertMode?: () => void
}

const CurrencyInputContainer = styled(Flex)<{ isMobile?: boolean }>`
  align-items: center;
  padding: ${({isMobile}) => isMobile ? '24px 13px 13px 14px' : '37px 40px 14px 41px'};
  width: 100%;
`
const NavTabsContainer = styled(Flex)`
  display: flex;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`
const NavTabsItem = styled(Flex)<{ isactive?: string }>`
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 6px;
  color: ${({isactive}) => isactive === 'true' ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  background: ${({isactive}) => isactive === 'true' ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'};
`

const CurrencyInputHeader: React.FC<Props> = ({isActiveTab, expertMode, setExpertMode}) => {
  const {isMobile} = useMatchBreakpoints()
  const {t} = useTranslation()

  return (
    <CurrencyInputContainer isMobile={isMobile} style={{padding: expertMode ? '15px 20px 10px' : ''}}>
      <Flex
        width="100%"
        flexDirection={isActiveTab === 'Swap' ? 'column' : 'row'}
        alignItems={isActiveTab === 'Swap' ? 'flex-start' : 'center'}
        justifyContent="space-between"
      >
        {!expertMode && <NavTabsContainer>
          <NavTabsItem as={Link} to={PATHS.SWAP} isactive={`${isActiveTab === 'Swap'}`}>
            {t('Swap')}
          </NavTabsItem>
          <NavTabsItem as={Link} to={PATHS.LIQUIDITY} isactive={`${isActiveTab === 'Liquidity'}`}>
            {t('Liquidity')}
          </NavTabsItem>
        </NavTabsContainer>}
        <Flex width={isActiveTab === 'Swap' ? '100%' : 'auto'}>
          {
            (isActiveTab === 'Swap') ? (
              <Flex width='100%' alignItems='center' justifyContent='space-between' mt={expertMode ? '0px' : '25px'}>
                <Flex alignItems='center'>
                  <Text fontWeight='600' fontSize='24px' color='#FFF' mr='12px'>
                    {t('Swap')}
                  </Text>
                  {/* <IconButton variant="light" scale="sm" mr="18px"> */}
                  {/*  <NewRefreshIcon/> */}
                  {/* </IconButton> */}
                  <Flex style={{transform: 'translateY(2px)'}}>
                    <GlobalSettings color="#CDEDFF" />
                  </Flex>
                </Flex>
                <Flex alignItems='center'>
                  <Text  fontWeight='400' fontSize='14px' color='rgba(255, 255, 255, 0.6)' mr='10px'>
                    {t('Expert mode')}
                  </Text>
                  <Toggle
                    scale='md'
                    checked={expertMode}
                    onChange={setExpertMode}
                  />
                </Flex>
              </Flex>
            ) : <IconButton variant="light" scale="sm" mr="18px">
              <NewRefreshIcon/>
            </IconButton>
          }
        </Flex>
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
