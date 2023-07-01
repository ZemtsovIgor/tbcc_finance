import React from 'react';
import Page from "../../Page";
import SubPagesTabs from "../components/SubPagesTabs";

const GameRules = () => {
  return (
    <Page>
       <SubPagesTabs activeIndex={3}/>
    </Page>
  );
};

export default GameRules;