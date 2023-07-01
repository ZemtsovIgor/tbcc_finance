/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GameState,
  GameResponse,
  GameGraphEntity
} from 'state/types'
import getGameData from "./getGameData";

const initialState: GameState = {
  gameData: {
    contract: {
      totalHits: '0',
    },
    customer: {
      id: '',
      verified: false,
      myID: '0',
      inviterID: '0',
      totalHits: '0',
      currentTable: '0',
      inviterRewards: [],
      winnerRewards: [],
      winnerInviterRewards: [],
    }
  }
}

export const fetchGame = createAsyncThunk<GameGraphEntity, { customerId: string }>(
  'nft/fetchGame',
  async ({ customerId}) => {
    let gameInfo = {
      contract: {
        totalHits: '0',
      },
      customer: {
        id: '',
        verified: false,
        myID: '0',
        inviterID: '0',
        totalHits: '0',
        currentTable: '0',
        inviterRewards: [],
        winnerRewards: [],
        winnerInviterRewards: [],
      }
    }
    if (customerId) {
      const newGameInfo = await getGameData(customerId)

      if (newGameInfo.customer) {
        gameInfo = newGameInfo;
      }
    }
    return gameInfo
  },
)

export const GameSlice = createSlice({
  name: 'GAME',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGame.fulfilled, (state, action: PayloadAction<GameResponse>) => {
      state.gameData = { ...state.gameData, ...action.payload }
    })
  },
})

export default GameSlice.reducer
