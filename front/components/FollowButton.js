import React from 'react';
import {Button} from 'antd';
import propTypes from 'prop-types';
import {useSelecter, useSelector} from 'react-redux';

const FollowButton = ({ post, onUnfollow, onFollow}) => {
    const {me} = useSelector(state=>state.user);
    return !me || post.User.id === me.id
              ? null
              : me.Followings && me.Followings.find(v=>v.id === post.User.id)
                ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
                : <Button onClick={onFollow(post.User.id)}>팔로우</Button> ;
};

FollowButton.propTypes = {
    post: propTypes.object.isRequired,
    onUnfollow: propTypes.func.isRequired,
    onFollow: propTypes.func.isRequired
};

FollowButton.defaultProps = {
    me: null,
}

export default FollowButton;