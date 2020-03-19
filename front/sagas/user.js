import {all, fork, takeLatest, takeEvery, call, put, take, delay} from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI(){
    //서버에 요청을 보내는 부분
}
function* login(){
    try{
        yield call(loginAPI);  //함수 동기적 호출 (응답을 받을 때까지 기다림)
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
    yield takeEvery(LOG_IN, login);
}

function* hello(){
    yield delay(1000);
    yield put({
        type:'BYE_SAGA' //액션을 여러번 동시에 요청할 경우 마지막꺼만 처리
    })
}

function* watchHello(){
    // yield takeEvery(HELLO_SAGA, function*(){
    //     yield put({
    //         type:'BYE_SAGA'
    //     })
    // });
    yield takeLatest(HELLO_SAGA, hello);
}

// function* watchHello(){
//     while(true){
//         yield take(HELLO_SAGA);
//         console.log(1);
//         console.log(2);
//         console.log(3);
//         console.log(4);
//         console.log(5);
//     }
// }

function* watchSignUp(){
    
}

export default function* userSaga(){
    yield all([
        fork(watchHello), //비동기호출
        fork(watchSignUp),
        fork(watchLogin),
    ]);
}