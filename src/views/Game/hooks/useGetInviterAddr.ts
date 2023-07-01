import { useEffect, useReducer, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'

interface State {
  inviterAddress: number
}

type Action =
  | { type: 'inviter_address_gutted', payload: number }
  | { type: 'inviter_address_loading' }
  | { type: 'inviter_address_error' }

const initialState: State = {
  inviterAddress: 0
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'inviter_address_gutted':
      return {
        ...state,
        inviterAddress: actions.payload
      }
    case 'inviter_address_loading':
      return {
        ...state,
        inviterAddress: 0
      }
    case 'inviter_address_error':
      return {
        ...state,
        inviterAddress: 0
      }
    default:
      return state
  }
}

interface GetInviterAddressTransaction {
  onGetInviterAddress?: () => Promise<any>
}

const useGetInviterAddr = ({
  onGetInviterAddress,
}: GetInviterAddressTransaction) => {
  const { account } = useWeb3React()

  const [state, dispatch] = useReducer(reducer, initialState)
  const handleInviterAddressOptions = useRef(onGetInviterAddress)

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handleInviterAddressOptions.current) {
      console.log('account', account);
      console.log('handleInviterAddressOptions', handleInviterAddressOptions);
      handleInviterAddressOptions.current().then((result) => {
        console.log('result', result);
        if (result) {
          dispatch({ type: 'inviter_address_gutted', payload: result })
        }
      })
    }
  }, [account, handleInviterAddressOptions, dispatch])

  return state.inviterAddress
}

export default useGetInviterAddr
