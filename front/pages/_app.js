import React from "react";
import propTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import AppLayout from "../components/AppLayout";
import rootsaga from "../sagas";
import { LOAD_USER_REQUEST } from "../reducers/user";
import axios from "axios";
import {Container} from 'next/app';
import {Helmet} from 'react-helmet';

// import { initialState } from '../reducers/user';

const NodeBird = ({ Component, store, pageProps }) => (
  <>
    <Container>
      <Provider store={store}>
        <Helmet 
        title="NodeBird" 
        htmlAttributes={{lang:'ko'}}
        meta={[{
          charset: 'UTF-8',
        }, {
          name: 'viewport', content: 'width=device-width, initial-scale=1',
        }, {
          'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
        }, {
          name: 'description', content: 'Nodebird 사이트'
        }, {
          name: 'og:title', content: 'nodebird'
        }, {
          name: 'og:description', content: 'nodebird 사이트'
        }, {
          property: 'og:type', content: 'website'
        }]}
        link={[{
          rel: 'stylesheet', href:"https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css"
        }, {
          rel: 'stylesheet', href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        }, {
          rel: 'stylesheet', href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        }]}
        script={[{
          src:"https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css"
        }]}
        />
      
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
  </>
);

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
  store: propTypes.object.isRequired,
  pageProps: propTypes.object.isRequired,
};

NodeBird.getInitialProps = async (context) => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ""; //서버 환경이라 쿠키를 직접 넣어주어야 함
  if (ctx.isServer && cookie) {
    axios.defaults.headers.cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    (store) => (next) => (action) => {
      console.log(action);
      next(action); //리덕스 사가 액션 찾기
    },
  ];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootsaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
