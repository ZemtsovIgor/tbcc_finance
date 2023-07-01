import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { PATHS } from 'config/paths';
import { Circle } from 'views/Mint/components/MintModal';
import LangSelector from 'uikit/components/LangSelector/LangSelector';
import { Link } from 'react-router-dom';
import Flex from '../../components/Box/Flex'
import useModal from '../Modal/useModal'
import useMatchBreakpoints from "../../hooks/useMatchBreakpoints";
import { useTranslation } from "../../../contexts/Localization";
import useAuth from '../../../hooks/useAuth'
import {
  ConnectBtn,
  MenuBackgound,
  Wrapper,
  Container,
  IconContainer,
  MenuItem,
  OpenMenuBtn,
  MenuText,
  TopMenu,
  SettingMenuItem,
  BurgerBtn,
  MobileBottomMenu,
  MobileWrapper,
  MobileBackground,
  MobileContainer
} from "./style"
import {
  LogoIcon,
  ArrowRightIcon,
  ArrowLefttIcon,
  BurgerMenuIcon,
  CloseMenuIcon,
  LogoutIcon
} from '../../components/Svg'
import IconComponent from '../../components/Svg/IconComponent'
import { Box } from '../../components/Box'
import { Text } from '../../components/Text'
import { CurrDropdown } from './components/CurrDropdown'
import ConnectModal from "../WalletModal/ConnectModal"



const Menu: React.FC<any> = ({
  activeItem,
  links,
  children,
  currentLang,
  langs,
  setLang,
  extended
}) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { account } = useWeb3React()
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} t={t} />)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <>
      {!isTablet && !isMobile
        ? <>
          <TopMenu>

            <Box mr='27px'>
              <LangSelector
                currentLang={currentLang}
                langs={langs}
                setLang={setLang}
                buttonScale="xs"
                color="textSubtle"
                hideLanguage
              />
            </Box>

            <Box width='150px' minHeight='45px' position='relative' mr='27px'>
              <CurrDropdown />
            </Box>
            {
              account ? (
                <Flex
                  alignItems='center'
                  justifyContent='space-between'
                  border='2px solid rgba(255, 255, 255, 0.09)'
                  borderRadius='6px'
                  width='150px'
                  height='45px'
                  paddingX='10px'
                  mr='27px'>
                  <Flex alignItems='center'>
                    <Circle />
                    <Text color="#FFF" fontSize="15px" lineHeight="16px" ml="6px" fontWeight='500'>
                      {`${account.substring(0, 2)}...${account.substring(account.length - 4)}`}
                    </Text>
                  </Flex>
                </Flex>
              ) : (
                <ConnectBtn
                  onClick={onPresentConnectModal}
                >
                  {t('Connect Wallet')}
                </ConnectBtn>
              )
            }

            <SettingMenuItem onClick={logout} style={{ padding: '0' }}>
              <LogoutIcon opacity='0.45' />
            </SettingMenuItem>

          </TopMenu>
          <Container extended={extended} isOpen={menuIsOpen}>
            <MenuBackgound isOpen={menuIsOpen} />
            <Wrapper>
              <Link to={PATHS.HOME} style={{ width: '90px', display: 'flex', justifyContent: 'center' }}>
                <LogoIcon />
              </Link>
              <IconContainer isOpen={menuIsOpen}>
                {links.map(({ label, href, icon = '' }) => {
                  const isActive = activeItem === href
                  return (
                    <MenuItem key={`${label}#${href}#${icon}`} to={href} $isActive={isActive}>
                      <IconComponent iconName={icon} opacity='0.45' />
                      <MenuText>{label}</MenuText>
                    </MenuItem>
                  )
                })}
              </IconContainer>
              {/* <MenuItem to={PATHS.HOME} style={{marginBottom: '0', paddingLeft: '32px', marginTop: 'auto'}}> */}
              {/*  <SupportIcon opacity='0.45'/> */}
              {/*  <MenuText>{t('Support')}</MenuText> */}
              {/* </MenuItem> */}
              {/* <SettingsIcon opacity='0.45'/> */}
            </Wrapper>
          </Container>
          <OpenMenuBtn isOpen={menuIsOpen} onClick={() => setMenuIsOpen(!menuIsOpen)} >
            {menuIsOpen ? <ArrowLefttIcon style={{ transform: 'translateX(-2px)' }} /> : <ArrowRightIcon />}
          </OpenMenuBtn>
        </>
        : <>
          <Box position='fixed' zIndex='20' top='15px' left='18px'>
            <LogoIcon />
          </Box>
          <Box width='56px' minHeight='36px' position='fixed' top='8px' right='105px' zIndex={20}>
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              buttonScale="xs"
              color="textSubtle"
              hideLanguage
            />
          </Box>
          <Box width='56px' minHeight='36px' position='fixed' top='15px' right='60px' zIndex={20}>
            <CurrDropdown />
          </Box>
          <BurgerBtn onClick={() => setMenuIsOpen(!menuIsOpen)}>
            {!menuIsOpen ? <BurgerMenuIcon /> : <CloseMenuIcon />}
          </BurgerBtn>
          <MobileContainer isOpen={menuIsOpen}>
            <MobileBackground isOpen={menuIsOpen} />
            <MobileWrapper>
              {links.map(({ label, href, icon = '' }) => {
                const isActive = activeItem === href
                return (
                  <MenuItem key={`${label}#${href}#${icon}`} to={href} $isActive={isActive} onClick={() => setMenuIsOpen(false)}>
                    <IconComponent iconName={icon} opacity='0.45' />
                    <MenuText>{label}</MenuText>
                  </MenuItem>
                )
              })}
            </MobileWrapper>
          </MobileContainer>
          <MobileBottomMenu>
            {account
              ? <Flex
                alignItems='center'
                justifyContent='center'
                border='2px solid rgba(255, 255, 255, 0.09)'
                borderRadius='6px'
                width='120px'
                height='45px'
                paddingX='10px'
                mr='27px'>
                <Flex alignItems='center'>
                  <Circle />
                  <Text color="#FFF" fontSize="15px" lineHeight="16px" ml="6px" fontWeight='500'>
                    {`${account.substring(0, 2)}...${account.substring(account.length - 4)}`}
                  </Text>
                </Flex>
              </Flex>
              : <ConnectBtn
                onClick={onPresentConnectModal}
              >
                {t('Connect Wallet')}
              </ConnectBtn>
            }
            {
              account ? (
                <SettingMenuItem onClick={logout} >
                  <LogoutIcon opacity='0.45' />
                </SettingMenuItem>
              ) : null
            }
          </MobileBottomMenu>
        </>
      }
      {children}
    </>
  )
}

export default Menu
