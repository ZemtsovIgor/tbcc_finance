export interface FarmData {
  address: string

  token0: {
    name: string
    symbol: string
    address: string
  }

  token0Price: number

  token1: {
    name: string
    symbol: string
    address: string
  }

  token1Price: number

  core?: boolean
  raised?: boolean
  APR: number
  oldAPR?:number
  liquidity:number
  multiplier:number
  live?: boolean
}