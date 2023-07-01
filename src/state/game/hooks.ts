import { useEffect } from 'react'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import {useSelector} from "react-redux";
import {useWeb3React} from "@web3-react/core";
import {
  fetchGame
} from '.'
import {State} from "../types";

export const useGetGameData = () => {
  return useSelector((state: State) => state.game.gameData)
}

export const useFetchGame = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchGame({ customerId: account }))
  }, [dispatch, fastRefresh, account])
}

export const useGame = () => {
  const gameData = useGetGameData()

  return {
    gameData,
  }
}
