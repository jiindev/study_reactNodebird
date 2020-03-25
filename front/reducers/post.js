export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: '지인지인',
        },
        content: '첫 게시글!!!!!!',
        img: 'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg',
    }], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: false, // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드중
    postAdded: false, // 포스트 업로드 성공
};

const dummyPost = {
    User: {
        id: 1,
        nickname: '지인',
    },
    content: '나는 더미입니다.',
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 숙제

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';


const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST_REQUEST: {
            return {
                ...state,
                isAddingPost: true,
                addPostErrorReason: '',
                postAdded: false,
            };
        }
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                isAddingPost: false,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        }
        case ADD_POST_FAILURE: {
            return {
                ...state,
                isAddingPost: false,
                addPostErrorReason: action.error,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default reducer;
