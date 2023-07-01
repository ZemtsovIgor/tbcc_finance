import React from 'react';
import Page from "../../Page";
import SubPagesTabs from "../components/SubPagesTabs";

const GameStats = () => {
  return (
    <Page>
      <SubPagesTabs activeIndex={1}/>
    </Page>
  );
};

export default GameStats;