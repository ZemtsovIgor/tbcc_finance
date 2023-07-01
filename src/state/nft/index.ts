/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  NFTState,
  NFTTDAResponse,
  NFTTDAGraphEntity
} from 'state/types'
import getNFTTDAData from './getNFTTDAData'

const initialState: NFTState = {
  nftTDAData: {
    totalTokens: '0',
    totalSupply: '0',
    busdPrice: '0',
    totalOwners: '0',
    floorPrice: '',
    owner: {
      totalTokens: '0',
      tokens: []
    }
  }
}

export const fetchNFTTDA = createAsyncThunk<NFTTDAGraphEntity, { ownerId: string }>(
  'nft/fetchNFTTDA',
  async ({ ownerId}) => {
    const nftTDAInfo = await getNFTTDAData(ownerId)
    return nftTDAInfo
  },
)

export const NFTSlice = createSlice({
  name: 'NFT',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNFTTDA.fulfilled, (state, action: PayloadAction<NFTTDAResponse>) => {
      state.nftTDAData = { ...state.nftTDAData, ...action.payload }
    })
  },
})

export default NFTSlice.reducer
