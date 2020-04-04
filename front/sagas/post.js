import { all, fork, takeLatest, put, delay,call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_FAILURE, ADD_COMMENT_SUCCESS, ADD_COMMENT_REQUEST, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE, LOAD_HASHTAG_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_FAILURE, LOAD_COMMENT_SUCCESS, LOAD_COMMENT_FAILURE, LOAD_COMMENT_REQUEST, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_REQUEST, LIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE } from '../reducers/post';


function loadMainPostsAPI(){
    return axios.get('/posts');
}

function* loadMainPosts() {
    try {
        const result = yield call(loadMainPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}


function loadHashtagPostsAPI(tag){
    return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI,action.data);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadHashtagPosts(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}


function loadUserPostsAPI(user){
    return axios.get(`/user/${user}/posts`);
}

function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.log('loadUserPost:',e);
        console.error(e);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}




function addPostAPI(postData){
    return axios.post('/post', postData, {
        withCredentials: true
    })
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI(data){
    return axios.post(`post/${data.postId}/comment`,{content: data.content},{
        withCredentials: true
    });
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                comment: result.data
            },
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadCommentsAPI(postId){
    return axios.get(`post/${postId}/comments`);
}

function* loadComments(action) {
    try {
        const result = yield call(loadCommentsAPI, action.data);
        yield put({
            type: LOAD_COMMENT_SUCCESS,
            data: {
                postId: action.data,
                comments: result.data
            },
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchLoadComments(){
    yield takeLatest(LOAD_COMMENT_REQUEST, loadComments);
}

function uploadImagesAPI(formData){
    return axios.post(`post/images`, formData, {
        withCredentials: true
    });
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        });
    }
}

function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function likePostAPI(postId){
    return axios.post(`post/${postId}/like`, {}, {
        withCredentials: true
    });
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId
            },
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LIKE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}





function UnlikePostAPI(postId){
    return axios.delete(`post/${postId}/like`, {
        withCredentials: true
    });
}

function* UnlikePost(action) {
    try {
        const result = yield call(UnlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId
            },
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchUnlikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, UnlikePost);
}



export default function* postSaga(){
    yield all([
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
    ]);
}
