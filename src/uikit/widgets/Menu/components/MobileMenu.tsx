import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Box/Flex'
import { MenuItemsType } from '../../../components/MenuItems/types'
import isTouchDevice from '../../../util/isTouchDevice'
import { FooterLinkType } from '../../../components/Footer/types'
import { Language } from '../../../components/LangSelector/types'
import Button from '../../../components/Button/Button'

interface Props {
  isActive: boolean
  onMobileMenuToogle: (isActive: boolean) => void
  items: MenuItemsType[]
  footerLinks: FooterLinkType[]
  activeItem?: string
  currentLang?: string
  langs?: Language[]
  setLang?: (lang: Language) => void
}

const MobileMenuFlex = styled(Flex)<{ isActive: boolean }>`
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: calc(100% - 86px);
  bottom: 0;
  padding: 5px 17px;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: ${({ isActive }) => (isActive ? 'none' : 'translate(-100%, 0)')};
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
`

const MobileMenuSectionFlex = styled(Flex)<{ isFooter?: boolean }>`
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 21px;
  margin-top: ${({ isFooter }) => (isFooter ? '42px' : '0')};

  &:last-child {
    border-bottom: 0;
  }
`

const MobileMenuLinkWrap = styled.li<{ isActive: boolean }>`
  display: block;
  padding: 17px 17px;
  border-radius: 4px;
  transition-delay: 2s;
  list-style: none;
  background-color: ${({ isActive }) => (isActive ? '#E7F7FF' : 'transparent')};
  margin-bottom: 21px;
`

const MobileMenuLink = styled.a<{ isActive: boolean }>`
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  color: ${({ isActive }) => (isActive ? '#4E89E3' : '#505050')};
`

const MobileLangSectionFlex = styled(Flex)<{ isFooter?: boolean }>`
  padding: 10px 0;
  margin-top: auto;
  margin-bottom: 55px;

`

const LangButton = styled(Button)<{ isActive: boolean }>`
  font-size: 15px;
  line-height: 16px;
  color: ${({ isActive }) => isActive ? '#4E89E3' : '#505050'};
  background: none;
  box-shadow: none;
  font-weight: normal;
  padding: 0 20px;
`

const MobileMenu: React.FC<Props> = ({ isActive, onMobileMenuToogle, items, footerLinks, activeItem, currentLang, langs, setLang }) => {
  const handleButtonClick = () => {
    onMobileMenuToogle(!isActive)
  }

  return (
    <MobileMenuFlex isActive={isActive}>
      <MobileMenuSectionFlex>
        {items.map(({ label, items: menuItems = [], href }) => {
          const isActiveLink = activeItem === href

          const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href }
          return (
            <MobileMenuLinkWrap key={`${label}#${href}`} isActive={isActiveLink} onClick={handleButtonClick}>
              <MobileMenuLink {...linkProps} isActive={isActiveLink} href={href}>
                {label}
              </MobileMenuLink>
            </MobileMenuLinkWrap>
          )
        })}
      </MobileMenuSectionFlex>

      {footerLinks.length ? (
        <MobileMenuSectionFlex isFooter>
          {footerLinks.map(({ label, href }) => {
            const isActiveLink = activeItem === href

            const linkProps = isTouchDevice() && { href }
            return (
              <MobileMenuLinkWrap key={`${label}#${href}`} isActive={isActiveLink} onClick={handleButtonClick}>
                <MobileMenuLink {...linkProps} isActive={isActiveLink} href={href}>
                  {label}
                </MobileMenuLink>
              </MobileMenuLinkWrap>
            )
          })}
        </MobileMenuSectionFlex>
      ) : null}

      <MobileLangSectionFlex>
        {langs.map((lang) => (
          <LangButton
            key={lang.locale}
            isActive={currentLang === lang.code}
            onClick={() => setLang(lang)}
            // Safari fix
            style={{ minHeight: '40px', height: 'auto' }}
          >
            {lang.language}
          </LangButton>
        ))}
      </MobileLangSectionFlex>
    </MobileMenuFlex>
  )
}

export default React.memo(
  MobileMenu,
  (prev, next) =>
    prev.isActive === next.isActive &&
    prev.onMobileMenuToogle === next.onMobileMenuToogle &&
    prev.items === next.items &&
    prev.footerLinks === next.footerLinks &&
    prev.activeItem === next.activeItem &&
    prev.currentLang === next.currentLang &&
    prev.langs === next.langs &&
    prev.setLang === next.setLang
)
