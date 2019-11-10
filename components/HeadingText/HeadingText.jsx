import React, { useEffect, useState } from 'react';
import HeadingTextStyles from './HeadingTextStyles.jsx';
import { useAppState } from '@bluechilli/bcstatemachine';
import { Appear } from '@bluechilli/appear';

const HeadingText = () => {
  const { finished } = useAppState('selections');
  return (
    <>
      <HeadingTextStyles>
        <h1>What's your favourite colour?</h1>
        <Appear show={!finished}>
          <p>Drag the squares in order from your favourite to your least favourite</p>
        </Appear>
      </HeadingTextStyles>
    </>
  );
};

export default HeadingText;
