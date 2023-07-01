import React from 'react'
import Text from '../Text/Text'
import Dropdown from '../Dropdown/Dropdown'
import Button from '../Button/Button'
import LanguageIcon from '../Svg/Icons/Language'
import MenuButton from './MenuButton'
import { Colors } from '../../theme'
import { Language } from './types'
import { Position } from '../Dropdown/types'
import { Scale } from '../Button/types'

interface Props {
  currentLang: string
  langs: Language[]
  setLang: (lang: Language) => void
  color: keyof Colors
  dropdownPosition?: Position
  buttonScale?: Scale
  hideLanguage?: boolean
}

const LangSelector: React.FC<Props> = ({
  currentLang,
  langs,
  color,
  setLang,
  dropdownPosition = 'bottom',
  buttonScale = 'md',
  hideLanguage = false,
}) => (
  <Dropdown
    position={dropdownPosition}
    target={
      <Button pb="12px" mt="12px" scale={buttonScale} variant="text" startIcon={<LanguageIcon width="22px" />}>
        {!hideLanguage && <Text color={color}>{currentLang?.toUpperCase()}</Text>}
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.locale}
        fullWidth
        isActive={currentLang === lang.code}
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: '40px', height: 'auto', boxShadow: 'none' }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
)

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
