import { useEffect, useReducer, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'

interface State {
  maxSupply: number
}

type Action =
  | { type: 'nft_max_supply_gutted', payload: number }
  | { type: 'nft_max_supply_loading' }
  | { type: 'nft_max_supply_error' }

const initialState: State = {
  maxSupply: 0
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'nft_max_supply_gutted':
      return {
        ...state,
        maxSupply: actions.payload
      }
    case 'nft_max_supply_loading':
      return {
        ...state,
        maxSupply: 0
      }
    case 'nft_max_supply_error':
      return {
        ...state,
        maxSupply: 0
      }
    default:
      return state
  }
}

interface GetNftMaxSupplyTransaction {
  onGetNftMaxSupply?: () => Promise<any>
}

const useGetNftMaxSupply = ({
  onGetNftMaxSupply,
}: GetNftMaxSupplyTransaction) => {
  const { account } = useWeb3React()

  const [state, dispatch] = useReducer(reducer, initialState)
  const handleNftMaxSupplyOptions = useRef(onGetNftMaxSupply)

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handleNftMaxSupplyOptions.current) {
      handleNftMaxSupplyOptions.current().then((result) => {
        if (result) {
          dispatch({ type: 'nft_max_supply_gutted', payload: result })
        }
      })
    }
  }, [account, handleNftMaxSupplyOptions, dispatch])

  return state.maxSupply
}

export default useGetNftMaxSupply
