import { all, fork, takeLatest, takeEvery, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, FOLLOW_USER_REQUEST, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, EDIT_NICKNAME_SUCCESS, EDIT_NICKNAME_FAILURE, EDIT_NICKNAME_REQUEST } from '../reducers/user';
import { Result } from 'antd';
import { RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE, UNFOLLOW_USER_REQUEST, REMOVE_POST_SUCCESS } from '../reducers/post';


function logInAPI(loginData){
    //서버에 요청을 보내는 부분
    return axios.post('/user/login', loginData, {
        withCredentials: true, // 서로 쿠키를 주고받을 수 있도록 (front)
    });
}
function* logIn(action){
    try {
        const result = yield call(logInAPI, action.data);  //함수 동기적 호출 (응답을 받을 때까지 기다림)
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
function* watchLogIn(){
    yield takeEvery(LOG_IN_REQUEST, logIn);
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



function logOutAPI(){
    return axios.post('/user/logout', {}, {
        withCredentials: true, // 쿠키를 백으로 보내기 위해
    });
}
function* logOut(){
    try {
        yield call(logOutAPI); 
        yield put({ 
            type: LOG_OUT_SUCCESS
        });
    } catch (e){
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}
function* watchLogOut(){
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}



function loadUserAPI(userId){
    console.log('loadUserAPI arrived');
    return axios.get(userId? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}
function* loadUser(action){
    console.log('loadUser arrived')
    try {
        const result = yield call(loadUserAPI, action.data);  
        console.log(result);
        yield put({ 
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}


function followAPI(userId){
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials: true,
    });
}
function* follow(action){
    try {
        const result = yield call(followAPI, action.data);  
        yield put({ 
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e,
        });
    }
}


function* watchFollow(){
    yield takeEvery(FOLLOW_USER_REQUEST, follow);
}


function unfollowAPI(userId){
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
    });
}
function* unfollow(action){
    try {
        const result = yield call(unfollowAPI, action.data);  
        yield put({ 
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e,
        });
    }
}


function* watchUnfollow(){
    yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}


function loadFollowingsAPI(userId){
    return axios.get(`/user/${userId || 0}/followings`, {
        withCredentials: true,
    });
}
function* loadFollowings(action){
    try {
        const result = yield call(loadFollowingsAPI, action.data);  
        yield put({ 
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e,
        });
    }
}


function* watchLoadFollowings(){
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function loadFollowersAPI(userId){
    return axios.get(`/user/${userId || 0}/followers`, {
        withCredentials: true,
    });
}
function* loadFollowers(action){
    try {
        const result = yield call(loadFollowersAPI, action.data);  
        yield put({ 
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e,
        });
    }
}


function* watchLoadFollowers(){
    yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}



function removeFollowerAPI(userId){
    return axios.delete(`/user/${userId}/followers`, {
        withCredentials: true,
    });
}
function* removeFollower(action){
    try {
        const result = yield call(removeFollowerAPI, action.data);  
        yield put({ 
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e,
        });
    }
}


function* watchRemoveFollower(){
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname){
    return axios.patch(`/user/nickname`, {nickname}, { //전체 수정은 put, 부분 수정은  patch
        withCredentials: true,
    });
}
function* editNickname(action){
    try {
        const result = yield call(editNicknameAPI, action.data);  
        yield put({ 
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (e){
        console.error(e);
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e,
        });
    }
}


function* watchEditNickname(){
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}



export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowings),
        fork(watchLoadFollowers),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}
