export const initialState = {
    mainPosts: [{
        User:{
            id:1,
            nickname:'지인지인',
        },
        content:'첫 게시글!!!!!!',
        img:'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg'
    }],
    imagePaths: []
};

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
    type: ADD_POST,
};
const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User:{
            nickname: '지인쓰'
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:{
            return {
                ...state,
            };
        }
        case ADD_DUMMY:{
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        }
        default:{
            return{
                ...state,
            }
        }
    }
}

export default reducer;