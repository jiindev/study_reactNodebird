import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import AppLayout from '../components/AppLayout';

const NodeBird = ({Component}) => {
    return (
        <>
            <Head>
                <title>Nodebird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    )
}

NodeBird.propTypes = {
    Component:propTypes.elementType,
};

export default NodeBird;