import { all, fork, takeLatest, takeEvery, call, put, delay } from 'redux-saga/effects';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST } from '../reducers/user';

function loginAPI(){
    //서버에 요청을 보내는 부분
}
function* login(){
    try {
        yield call(loginAPI);  //함수 동기적 호출 (응답을 받을 때까지 기다림)
        yield put({ //put은 dispatch와 동일
            type: LOG_IN_SUCCESS,
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

function signUpAPI() {
    return axios.post('/login');
}
function* signUp() {
    try {
        yield call(signUpAPI);  //함수 동기적 호출 (응답을 받을 때까지 기다림)
        yield put({ //put은 dispatch와 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
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
