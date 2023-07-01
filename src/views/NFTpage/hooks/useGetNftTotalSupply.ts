import { useEffect, useReducer, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'

interface State {
  totalSupply: number
}

type Action =
  | { type: 'nft_total_supply_gutted', payload: number }
  | { type: 'nft_total_supply_loading' }
  | { type: 'nft_total_supply_error' }

const initialState: State = {
  totalSupply: 0
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'nft_total_supply_gutted':
      return {
        ...state,
        totalSupply: actions.payload
      }
    case 'nft_total_supply_loading':
      return {
        ...state,
        totalSupply: 0
      }
    case 'nft_total_supply_error':
      return {
        ...state,
        totalSupply: 0
      }
    default:
      return state
  }
}

interface GetNftTotalSupplyTransaction {
  onGetNftTotalSupply?: () => Promise<any>
}

const useGetNftTotalSupply = ({
  onGetNftTotalSupply,
}: GetNftTotalSupplyTransaction) => {
  const { account } = useWeb3React()

  const [state, dispatch] = useReducer(reducer, initialState)
  const handleNftTotalSupplyOptions = useRef(onGetNftTotalSupply)

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handleNftTotalSupplyOptions.current) {

      handleNftTotalSupplyOptions.current().then((result) => {

        if (result) {
          dispatch({ type: 'nft_total_supply_gutted', payload: result })
        }
      })
    }
  }, [account, handleNftTotalSupplyOptions, dispatch])

  return state.totalSupply
}

export default useGetNftTotalSupply
