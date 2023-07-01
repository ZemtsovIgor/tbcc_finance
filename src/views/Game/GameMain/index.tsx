import React, { useState } from 'react';
import styled from "styled-components";
import {RouteComponentProps} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {useTranslation} from "../../../contexts/Localization";
import Page from "../../Page";
import {Flex, Text, useMatchBreakpoints} from "../../../uikit";
// import SubPagesTabs from "../components/SubPagesTabs";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TableCard from "./components/TableCard";
import Footer from "../../../uikit/components/Footer";
import {useFetchGame, useGame} from "../../../state/game/hooks";

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin-top: 60px;
  
  @media (max-width: 968px) {
    max-width: 600px;
    padding: 0 15px;
  }
`
const roundReward = {
  1: '240%',
  2: '360%',
  3: '500%',
  4: 'Unlimited'
}

const tableData = {
  1: [
    {
      tableNumber: 1,
      coin: 0.1,
      price: '100000000000000000'
    },
    {
      tableNumber: 2,
      coin: 0.2,
      price: '200000000000000000'
    },
    {
      tableNumber: 3,
      coin: 0.4,
      price: '400000000000000000'
    },
    {
      tableNumber: 4,
      coin: 0.8,
      price: '800000000000000000'
    }
  ],
  2: [
    {
      tableNumber: 5,
      coin: 1.6,
      price: '1600000000000000000'
    },
    {
      tableNumber: 6,
      coin: 3.2,
      price: '3200000000000000000'
    },
    {
      tableNumber: 7,
      coin: 6.4,
      price: '6400000000000000000'
    }
  ],
  3: [
    {
      tableNumber: 8,
      coin: 12.5,
      price: '12500000000000000000'
    },
    {
      tableNumber: 9,
      coin: 25,
      price: '25000000000000000000'
    }
  ],
  4: [
    {
      tableNumber: 10,
      coin: 50,
      price: '50000000000000000000'
    }
  ]
};

const GameMain = ({
  match: {
    params: { inviterAddress },
  },
}: RouteComponentProps<{ inviterAddress?: string; }>) => {
  useFetchGame()

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [selectedRound, setSelectedRound] = useState(1)
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const {
    gameData: {
      contract,
      customer,
    },
  } = useGame()

  const rewards: any = {};

  [...customer.inviterRewards, ...customer.winnerRewards, ...customer.winnerInviterRewards].forEach((reward) => {
    const currentTable = Number(reward.tableNum);
    const newReward: any = rewards[currentTable] ? rewards[currentTable] : {};
    const newInviterReward = Number(reward.inviterReward) ? Number(ethers.utils.formatEther(reward.inviterReward)) : 0;
    const newWinnerReward = Number(reward.winnerReward) ? Number(ethers.utils.formatEther(reward.winnerReward)) : 0;
    const newWinnerInviterReward = Number(reward.winnerInviterReward) ? Number(ethers.utils.formatEther(reward.winnerInviterReward)) : 0;
    const newHits = newWinnerReward ? 1 : 0;

    rewards[currentTable] = {
      inviterReward: (newReward?.inviterReward || 0) + newInviterReward,
      winnerReward: (newReward?.winnerReward || 0) + newWinnerReward,
      winnerInviterReward: (newReward?.winnerInviterReward || 0) + newWinnerInviterReward,
      hits: (newReward?.hits || 0) + newHits,
    }
  });

  return (
    <Page>
      {/* <SubPagesTabs activeIndex={0}/> */}
      <Container>
        <Header
          userId={customer.myID}
          invitedById={Number(customer.inviterID) || 0}
          inviterAddress={inviterAddress}
          totalHit={customer.totalHits}
          totalMissed={Number(contract.totalHits) - Number(customer.totalHits)}
          refferalLink={customer.myID ? `https://tbcc.finance/uragame/main/${account}` : ''}
          verified={customer.verified}
        />
        <Flex
          justifyContent='space-between'
          flexDirection={isSmall ? 'column' : 'row'}
          mt={isSmall ? '36px' : '50px'}
        >
          <Flex flexDirection='column'>
            <Text
              fontSize={isSmall ? '24px' : '36px'}
              fontWeight='600'
              color='#FFF'
              textAlign={isSmall ? 'center' : 'start'}
            >
              {t('Round')}&nbsp;{selectedRound}
            </Text>
            <Text
              fontSize='16px'
              fontWeight='400'
              color='rgba(255, 255, 255, 0.6)'
              textAlign={isSmall ? 'center' : 'start'}
            >
              {t(`Get your reward up to`)} ${roundReward[selectedRound]} {t(`on each table`)}
            </Text>
          </Flex>
          <Tabs
            numberOfRound={4}
            setSelectedRound={(e) => setSelectedRound(e)}
            selectedRound={selectedRound}/>
        </Flex>
        <Flex flexWrap='wrap' style={{gridGap: '18px'}} mt='40px' mb={isSmall ? '70px' : '0'}>
          {tableData[selectedRound].map((el) => {
            return (
              <TableCard
                key={el.tableNumber}
                tableNumber={el.tableNumber}
                coin={el.coin}
                currentTable={Number(customer.currentTable)}
                price={el.price}
                rewards={rewards[el.tableNumber] ? rewards[el.tableNumber] : {}}
              />
            )
          })}
        </Flex>
        <Footer center/>
      </Container>
    </Page>
  );
};

export default GameMain;
