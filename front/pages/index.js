import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { loginAction, logoutAction } from "../reducers/user";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  const { user, me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const onScroll = () => {
    if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
      dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length-1].id,
      })
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [mainPosts.length]);

  return (
    <>
      <div>
        {me && <PostForm />}
        {mainPosts.map((c) => {
          return <PostCard key={c} post={c} />;
        })}
      </div>
    </>
  );
};

Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
