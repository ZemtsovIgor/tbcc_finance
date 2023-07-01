/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  VODAState,
  NFTVODAResponse,
  NFTVODAGraphEntity
} from 'state/types'
import getNFTVODAData from './getNFTVODAData'

const initialState: VODAState = {
  nftVODAData: {
    totalTokens: '0',
    totalSupply: '0',
    busdPrice: '0',
    tokens: [],
    inviter: {
      id: '',
      count: '',
      reward: '',
      referral: []
    }
  }
}

export const fetchNFTVODA = createAsyncThunk<NFTVODAGraphEntity, { customerId: string }>(
  'nft/fetchNFTVODA',
  async ({ customerId}) => {

    let nftVODAInfo = {
      totalSupply: '0',
      totalTokens: '0',
      busdPrice: '0',
      tokens: [],
      inviter: {
        id: '',
        count: '',
        reward: '',
        referral: []
      }
    };

    if (customerId) {
      const newNftVODAInfo = await getNFTVODAData(customerId)

      if (newNftVODAInfo.totalTokens) {
        nftVODAInfo = newNftVODAInfo;
      }
    }

    return nftVODAInfo
  },
)

export const NFTVODASlice = createSlice({
  name: 'NFT',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNFTVODA.fulfilled, (state, action: PayloadAction<NFTVODAResponse>) => {
      state.nftVODAData = { ...state.nftVODAData, ...action.payload }
    })
  },
})

export default NFTVODASlice.reducer
