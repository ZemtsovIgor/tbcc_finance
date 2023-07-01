import React from 'react';
import Page from "../../Page";
import SubPagesTabs from "../components/SubPagesTabs";

const GameBonuses = () => {
  return (
    <Page>
       <SubPagesTabs activeIndex={2}/>
    </Page>
  );
};

export default GameBonuses;