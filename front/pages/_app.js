import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../components/AppLayout';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga'; 
import rootsaga from '../sagas';

// import { initialState } from '../reducers/user';

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

const middleware = (store)=>(next)=>(action)=>{
    console.log(action) //다른 작업들
    next(action);
};



export default withRedux((initialState, options)=>{
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ?
    compose(applyMiddleware(...middlewares))
    :compose(applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootsaga);
    return store;
})(NodeBird);
