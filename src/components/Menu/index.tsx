import React from 'react'
import { useLocation } from 'react-router'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useWeb3React } from '@web3-react/core'
import { Menu as UikitMenu } from '../../uikit'
import config, { titles } from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem, getActiveTitleItem } from './utils'
import { footerLinks } from './config/footerConfig'

const Menu = (props) => {
  const { toggleTheme } = useTheme()
  const { account } = useWeb3React()
  const cakePriceUsd = usePriceCakeBusd()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  const activeTitleItem = getActiveTitleItem({ menuConfig: titles(t), pathname })

  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : null;

  return (
    <UikitMenu
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      loggedIn={!!account}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      titles={titles(t, accountEllipsis)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      // footerLinks={footerLinks(t)}
      footerLinks={footerLinks}
      activeItem={activeMenuItem?.href}
      activeTitleItem={activeTitleItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      buyCakeLabel={t('Buy CAKE')}
      {...props}
    />
  )
}

export default Menu
