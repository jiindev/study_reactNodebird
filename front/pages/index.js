import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Icon, Card, Avatar} from 'antd';
import Link from 'next/link';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, logoutAction} from '../reducers/user'

const dummy = {
    isLoggedIn : true,
    imagePaths: [],
    mainPosts: [{
        User:{
            id:1,
            nickname:'지인지인',
        },
        content:'첫 게시글!!!!!!',
        img:'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg'
    }]
}

const Home = () => {
    const dispatch = useDispatch();
    const {isLoggedIn, user} = useSelector(state=>state.user);
    console.log(user);
    useEffect(()=>{
        dispatch(loginAction);
        dispatch(logoutAction);
        dispatch(loginAction);
    }, []);
    return(
       <>
            <div>
                {user ? <div>로그인 했습니다 : {user.nickname}</div> : <div>로그아웃 했습니다.</div>}
                {dummy.isLoggedIn && <PostForm/>}
                {dummy.mainPosts.map((c)=>{
                    return(
                        <PostCard key={c} post={c}/>
                    );
                })}
            </div>
        </>
    )
};

export default Home;