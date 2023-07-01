import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import {useWeb3React} from "@web3-react/core";
import { State } from '../types'
import {
  fetchNFTTDA
} from '.'

export const useGetNFTTDAData = () => {
  return useSelector((state: State) => state.nft.nftTDAData)
}

export const useFetchNFT = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchNFTTDA({ ownerId: account }))
  }, [dispatch, fastRefresh, account])
}

export const useNFT = () => {
  const nftTDAData = useGetNFTTDAData()

  return {
    nftTDAData,
  }
}
