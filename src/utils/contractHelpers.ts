import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getB8dexProfileAddress,
  getPancakeRabbitsAddress,
  getNftFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getICOAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getStakingAddress,
  getNftAddress, getNftTDAAddress, getGameAddress, getNftVODAAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import nftFactoryAbi from 'config/abi/nftFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import b8dAbi from 'config/abi/b8d.json'
import tbccAbi from 'config/abi/tbcc.json'
import busdAbi from 'config/abi/busd.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import ICOAbi from 'config/abi/ico.json'
import StakingAbi from 'config/abi/staking.json'
import NftVODAAbi from 'config/abi/nftVODA.json'
import NftAbi from 'config/abi/nftTBCC.json'
import NftTDAAbi from 'config/abi/nftTDA.json'
import GameAbi from 'config/abi/game.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'
import { ChainLinkOracleContract, FarmAuctionContract, B8dexProfileContract, PredictionsContract } from './types'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getIfoV1Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV1Abi, address, signer)
}
export const getIfoV2Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV2Abi, address, signer)
}
export const getSouschefContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), signer)
}
export const getSouschefV2Contract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), signer)
}
export const getPointCenterIfoContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer)
}
export const getCakeContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeAbi, tokens.cake.address, signer)
}
export const getB8DContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(b8dAbi, tokens.b8d.address, signer)
}
export const getTBCCContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tbccAbi, tokens.tbcc.address, signer)
}
export const getBUSDContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(busdAbi, tokens.busd.address, signer)
}
export const getProfileContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(profileABI, getB8dexProfileAddress(), signer) as B8dexProfileContract
}
export const getPancakeRabbitContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), signer)
}
export const getNftFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftFactoryAbi, getNftFactoryAddress(), signer)
}
export const getBunnySpecialContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), signer)
}
export const getLotteryV2Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(), signer)
}
export const getICOContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ICOAbi, getICOAddress(), signer)
}
export const getStakingContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(StakingAbi, getStakingAddress(), signer)
}
export const getNftContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(NftAbi, getNftAddress(), signer)
}
export const getNftVODAContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(NftVODAAbi, getNftVODAAddress(), signer)
}
export const getNftTDAContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(NftTDAAbi, getNftTDAAddress(), signer)
}
export const getGameContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(GameAbi, getGameAddress(), signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}
export const getClaimRefundContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), signer)
}
export const getTradingCompetitionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), signer)
}
export const getEasterNftContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(), signer)
}
export const getCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeVaultAbi, getCakeVaultAddress(), signer)
}

export const getPredictionsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(), signer) as PredictionsContract
}

export const getChainlinkOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer) as ChainLinkOracleContract
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}
export const getBunnySpecialCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialCakeVaultAbi, getBunnySpecialCakeVaultAddress(), signer)
}
export const getBunnySpecialPredictionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(), signer)
}
export const getBunnySpecialLotteryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), signer)
}
export const getFarmAuctionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), signer) as FarmAuctionContract
}
export const getAnniversaryAchievementContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(), signer)
}
export const getNftMarketContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(), signer)
}
export const getNftSaleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftSaleAbi, getNftSaleAddress(), signer)
}
export const getPancakeSquadContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(), signer)
}
export const getErc721CollectionContract = (signer?: ethers.Signer | ethers.providers.Provider, address?: string) => {
  return getContract(erc721CollectionAbi, address, signer)
}
