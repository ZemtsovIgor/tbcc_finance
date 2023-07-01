import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import Overview from "./Overview";
import {PATHS} from "../../config/paths";
import Rating from "./Rating";
import {useTBCCBusdPrice} from "../../hooks/useBUSDPrice";
import {BurnTransaction} from "../../state/info/types";
import {fetchTokenBurnRating, TokenBurnRatingResponse} from "../../state/info/queries/tokens/tokenBurns";
import tokens from "../../config/constants/tokens";

const Burn: React.FC = () => {
  const tbccPriceBusd = useTBCCBusdPrice()

  const [tokenBurnTransactions, setTokenBurnTransactions] = useState<BurnTransaction[] | null>(null)

  useEffect(() => {
    const getTokenBurnTransactions = async () => {
      const { data } = await fetchTokenBurnRating(tokens.tbcc.address)
      const tbccUSDPrice = Number(tbccPriceBusd.toFixed(9));

      const newData: BurnTransaction[] = data.map((burnTransaction: TokenBurnRatingResponse) => {
        return {
          sender: burnTransaction.sender || '',
          amount: Number(burnTransaction.amount),
          amountUSD: burnTransaction.amount * tbccUSDPrice
        }
      });

      setTokenBurnTransactions(newData)
    }
    if (!tokenBurnTransactions && tbccPriceBusd) {
      getTokenBurnTransactions()
    }
  }, [tbccPriceBusd, tokenBurnTransactions])

  return (
    <>
      <Route path={PATHS.BURN} exact>
        <Overview burnTransactions={tokenBurnTransactions}/>
      </Route>
      <Route path={PATHS.BURN_RATING} exact>
        <Rating burnTransactions={tokenBurnTransactions}/>
      </Route>
    </>
  )
}

export default Burn
