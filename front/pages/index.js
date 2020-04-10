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
