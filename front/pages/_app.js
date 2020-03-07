import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../components/AppLayout';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import { initialState } from '../reducers/user';

const NodeBird = ({Component, store}) => {
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>Nodebird</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css"/>
                </Head>
                <AppLayout>
                    <Component/>
                </AppLayout>
            </Provider>
        </>
    )
}

NodeBird.propTypes = {
    Component:propTypes.elementType,
    store: propTypes.object
};

export default withRedux((initialState, options)=>{
    const middlewares = [];
    const enhancer = compose(applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
})(NodeBird);
