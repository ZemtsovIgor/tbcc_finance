import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import {useWeb3React} from "@web3-react/core";
import { State } from '../types'
import {
  fetchNFTVODA
} from '.'

export const useGetNFTVODAData = () => {
  return useSelector((state: State) => state.voda.nftVODAData)
}

export const useFetchNFTVODA = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchNFTVODA({customerId: account}))
  }, [dispatch, fastRefresh, account])
}

export const useVODA = () => {
  const nftVODAData = useGetNFTVODAData()

  return {
    nftVODAData,
  }
}
