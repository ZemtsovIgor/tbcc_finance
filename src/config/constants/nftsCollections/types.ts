import { Address } from '../types'

export enum CollectionKey {
  B8DEXFISH = 'b8dexfish',
}

export type Collection = {
  name: string
  description?: string
  slug: string
  address: Address
}

export type Collections = {
  [key in CollectionKey]: Collection
}
