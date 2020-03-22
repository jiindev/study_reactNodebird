
import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import AppLayout from '../components/AppLayout';
import rootsaga from '../sagas';

// import { initialState } from '../reducers/user';

const NodeBird = ({ Component, store }) => (
  <>
    <Provider store={store}>
      <Head>
        <title>Nodebird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  </>
);

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
  store: propTypes.object.isRequired,
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares),
      !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootsaga);
  return store;
};

export default withRedux(configureStore)(NodeBird);
