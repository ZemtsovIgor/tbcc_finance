import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'TBCC',
  description: 'TBCC',
  image: '',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/')) {
    basePath = '/'
  }
  // else if (path.startsWith('/add')) {
  //   basePath = '/add'
  // } else if (path.startsWith('/remove')) {
  //   basePath = '/remove'
  // } else if (path.startsWith('/teams')) {
  //   basePath = '/teams'
  // } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
  //   basePath = '/voting/proposal'
  // } else if (path.startsWith('/nfts/collections')) {
  //   basePath = '/nfts/collections'
  // } else if (path.startsWith('/nfts/profile')) {
  //   basePath = '/nfts/profile'
  // } else if (path.startsWith('/pancake-squad')) {
  //   basePath = '/pancake-squad'
  // } else {
  //   basePath = path
  // }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | TBCC`,
      }
    // case '/add':
    //   return {
    //     title: `${t('Add Liquidity')} | B8DEX`,
    //   }
    // case '/remove':
    //   return {
    //     title: `${t('Remove Liquidity')} | B8DEX`,
    //   }
    // case '/find':
    //   return {
    //     title: `${t('Import Pool')} | B8DEX`,
    //   }
    // case '/competition':
    //   return {
    //     title: `${t('Trading Battle')} | B8DEX`,
    //   }
    // case '/prediction':
    //   return {
    //     title: `${t('Prediction')} | B8DEX`,
    //   }
    // case '/prediction/leaderboard':
    //   return {
    //     title: `${t('Leaderboard')} | B8DEX`,
    //   }
    // case '/pools':
    //   return {
    //     title: `${t('Pools')} | B8DEX`,
    //   }
    // case '/lottery':
    //   return {
    //     title: `${t('Lottery')} | B8DEX`,
    //   }
    // case '/ifo':
    //   return {
    //     title: `${t('Initial Farm Offering')} | B8DEX`,
    //   }
    // case '/teams':
    //   return {
    //     title: `${t('Leaderboard')} | B8DEX`,
    //   }
    // case '/voting':
    //   return {
    //     title: `${t('Voting')} | B8DEX`,
    //   }
    // case '/voting/proposal':
    //   return {
    //     title: `${t('Proposals')} | B8DEX`,
    //   }
    // case '/voting/proposal/create':
    //   return {
    //     title: `${t('Make a Proposal')} | B8DEX`,
    //   }
    // case '/info':
    //   return {
    //     title: `${t('Overview')} | ${t('PancakeSwap Info & Analytics')}`,
    //     description: 'View statistics for Pancakeswap exchanges.',
    //   }
    // case '/info/pools':
    //   return {
    //     title: `${t('Pools')} | ${t('PancakeSwap Info & Analytics')}`,
    //     description: 'View statistics for Pancakeswap exchanges.',
    //   }
    // case '/info/tokens':
    //   return {
    //     title: `${t('Tokens')} | ${t('PancakeSwap Info & Analytics')}`,
    //     description: 'View statistics for Pancakeswap exchanges.',
    //   }
    // case '/nfts':
    //   return {
    //     title: `${t('Overview')} | ${t('PancakeSwap')}`,
    //   }
    // case '/nfts/collections':
    //   return {
    //     title: `${t('Collections')} | ${t('PancakeSwap')}`,
    //   }
    // case '/nfts/profile':
    //   return {
    //     title: `${t('Your Profile')} | ${t('PancakeSwap')}`,
    //   }
    // case '/pancake-squad':
    //   return {
    //     title: `${t('Pancake Squad')} | ${t('PancakeSwap')}`,
    //   }
    default:
      return null
  }
}
