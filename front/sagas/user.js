import { all, fork, takeLatest, takeEvery, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST } from '../reducers/user';
import { Result } from 'antd';
axios.defaults.baseURL = 'http://localhost:3065/api'

function loginAPI(loginData){
    //서버에 요청을 보내는 부분
    console.log(loginData);
    return axios.post('/user/login', loginData, {
        withCredentials: true, // 서로 쿠키를 주고받을 수 있도록 (front)
    });
}
function* login(action){
    try {
        console.log('ok1');
        const result = yield call(loginAPI, action.data);  //함수 동기적 호출 (응답을 받을 때까지 기다림)
        yield put({ // put은 dispatch와 동일
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin(){
    yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
    return axios.post('/user', signUpData);
}
function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);  // 함수 동기적 호출 (응답을 받을 때까지 기다림) 
        // call은 첫번째는 함수, 두번째부터 인자
        yield put({ //put은 dispatch와 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}


function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(){
    yield all([
        fork(watchSignUp),
        fork(watchLogin),
    ]);
}
