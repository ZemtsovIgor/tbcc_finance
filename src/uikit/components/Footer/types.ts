import { Language } from '../LangSelector/types'
import { FlexProps } from '../Box'

export type FooterLinkType = {
  label: string
  href?: string
}

export type FooterProps = {
  items: FooterLinkType[]
  buyCakeLabel: string
  onlyIcon: boolean
  toggleTheme: (isDark: boolean) => void
  cakePriceUsd?: number
  currentLang: string
  langs: Language[]
  setLang: (lang: Language) => void
} & FlexProps
