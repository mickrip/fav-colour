import React from 'react';
import Head from 'next/head';
import ColorSelect from '../components/ColorSelect/ColorSelect';
import { AppStateWrapper } from '@bluechilli/bcstatemachine';
import selections from '../state/selections';
import { useAppear } from '@bluechilli/appear';
import HeadingText from '../components/HeadingText/HeadingText';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: white;
    color: black;
    font-family: Tahoma;
  }
`;

const containers = {
  selections,
  appear: useAppear,
};

const Home = () => (
  <AppStateWrapper containers={containers}>
    <Head>
      <title>What's your favourite colour?!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GlobalStyle />
    <HeadingText />
    <ColorSelect />
  </AppStateWrapper>
);

export default Home;
