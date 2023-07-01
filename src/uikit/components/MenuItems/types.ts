import { BoxProps } from '../Box'
import { DropdownMenuItems } from '../DropdownMenu/types'

export type MenuItemsType = {
  label: string
  href: any
  icon?: string
  items?: DropdownMenuItems[]
  showOnMobile?: boolean
  showItemsOnMobile?: boolean
  target?: string
}

export interface MenuItemsProps extends BoxProps {
  items: MenuItemsType[]
  activeItem?: string
  activeSubItem?: string
}
