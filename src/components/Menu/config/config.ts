import { ContextApi } from 'contexts/Localization/types'
import { MenuItemsType } from '../../../uikit'
import { PATHS } from '../../../config/paths'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Home'),
    href: PATHS.HOME,
    icon: 'Home',
    items: [],
  },
  // {
  //   label: t('Mint'),
  //   href: PATHS.NFT,
  //   icon: 'Dashboard',
  //   items: [],
  // },
  {
    label: t('Swap'),
    href: PATHS.SWAP,
    icon: 'Swap',
    items: [],
  },
  {
    label: t('Liquidity'),
    href: PATHS.LIQUIDITY,
    icon: 'Liquidity',
    items: []
  },
  // {
  //   label: t('Universe Game'),
  //   href: PATHS.GAME,
  //   icon: 'Game',
  //   items: []
  // },
  {
    label: t('Analytics'),
    href: PATHS.ANALYTICS,
    icon: 'Analytics',
    items: []
  },
  {
    label: t('Burning Hall'),
    href: PATHS.BURN,
    icon: 'Burn',
    items: [
      {
        label: t('Burning Hall'),
        href: PATHS.BURN_RATING,
        icon: 'Burn',
        items: []
      }
    ]
  },
  {
    label: t('Lottery'),
    href: PATHS.LOTTERY,
    icon: 'Launchpools',
    items: []
  },
  // {
  //   label: t('Farms'),
  //   href: PATHS.FARMS,
  //   icon: 'Farms',
  //   items: []
  // },
]

export default config

export const titles: (t: ContextApi['t'], account?: string) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Exchange'),
    href: PATHS.SWAP,
  },
  {
    label: t('Your Liquidity'),
    href: PATHS.LIQUIDITY,
  },
  {
    label: t('Adding liquidity'),
    href: PATHS.ADD_LIQUIDITY,
  },
  {
    label: t('Add Liquidity'),
    href: PATHS.ADDA_LIQUIDITY,
  },
  {
    label: t('Add Liquidity'),
    href: PATHS.ADDAB_LIQUIDITY,
  }
]
