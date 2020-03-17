import {all, fork, takeLatest, call, put} from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';


function loginAPI(){
    //서버에 요청을 보내는 부분
}
function* login(){
    try{
        yield call(loginAPI);  //함수 동기적 호출
        yield put({ //put은 dispatch와 동일
            type: LOG_IN_SUCCESS
        })
    }catch (e){
        console.error(e);
        yield put({
            type:LOG_IN_FAILURE
        })
    }

}
function* watchLogin(){
    yield takeLatest(LOG_IN, login)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin) //함수 비동기적 호출
    ]);
}