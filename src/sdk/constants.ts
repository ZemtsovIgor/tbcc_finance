import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | number | string

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS = '0x864741961F7e895A48aBf3e90e2EB9caD0E58EAC'

export const FACTORY_ADDRESS_MAP = {
  [ChainId.MAINNET]: FACTORY_ADDRESS,
  [ChainId.TESTNET]: '0x864741961F7e895A48aBf3e90e2EB9caD0E58EAC'
}

export const INIT_CODE_HASH = '0x070874b9758b2ed7f5b68c570bd9d0825f4269656ea64d04288a7dadf1f3506c'

export const INIT_CODE_HASH_MAP = {
  [ChainId.MAINNET]: INIT_CODE_HASH,
  [ChainId.TESTNET]: '0x070874b9758b2ed7f5b68c570bd9d0825f4269656ea64d04288a7dadf1f3506c'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const FEES_NUMERATOR = JSBI.BigInt(9975)
export const FEES_DENOMINATOR = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
