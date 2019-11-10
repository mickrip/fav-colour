import React, { useEffect, useState } from 'react';
import LookupTableStyles from './LookupTableStyles.jsx';
import { useAppState } from '@bluechilli/bcstatemachine';
import orderBy from 'lodash/orderBy';
import LookupTableSquareStyles from './LookupTableSquareStyles';
import { TOP } from '../../helpers/chooser';
import { Appear } from '@bluechilli/appear';

const LookupTable = () => {
  const { lookupTable, finished } = useAppState('selections');

  const orderedLT = orderBy(
    lookupTable,
    ['beaten', 'testPriority', 'random'],
    ['asc', 'desc', 'desc']
  );

  return (
    <>
      <LookupTableStyles>
        <>
          <Appear show={finished}>
            <h2>These are your top 5</h2>
            <p>Refresh the page to restart</p>
          </Appear>
          <Appear show={!finished}>
            <h2>Colour Table</h2>
          </Appear>
          {orderedLT.map((entry, key) => {
            return <ShowLTColor key={key} data={entry} />;
          })}
        </>
      </LookupTableStyles>
    </>
  );
};

const ShowLTColor = ({ data }) => {
  return (
    <LookupTableSquareStyles col={data.name} eliminated={data.beaten > 4}>
      {data.beaten > TOP - 1 && <img src="/cross.png" />}
      {data.beaten < TOP && <div></div>}
    </LookupTableSquareStyles>
  );
};

export default LookupTable;
