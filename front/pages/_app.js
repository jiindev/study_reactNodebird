
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

const NodeBird = ({ Component, store, pageProps }) => (
  <>
    <Provider store={store}>
      <Head>
        <title>Nodebird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css" />
        <link rel="icon" href="data:;base64,iVBORw0KGgo="></link>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />  
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  </>
);

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
  store: propTypes.object.isRequired,
  pageProps:propTypes.object.isRequired
};

NodeBird.getInitialProps = async (context) => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
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
