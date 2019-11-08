import React from 'react'
import Head from 'next/head'
import ColorSelect from "../components/ColorSelect/ColorSelect";
import {AppStateWrapper} from "@bluechilli/bcstatemachine";
import selections from "../state/selections";

const containers = {
    selections
};

const Home = () => (
    <AppStateWrapper containers={containers}>
        <Head>
            <title>What's your favourite colour?!</title>
            <link rel='icon' href='/favicon.ico'/>
        </Head>
        <ColorSelect/>
    </AppStateWrapper>
)

export default Home
