import React, { useState, useCallback } from 'react';
import {
 Card, Icon, Button, Avatar, Input, Form, List, Comment,
} from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commntText, setCommntText] = useState('');
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me){
            return alert('로그인이 필요합니다');
        }
        dispatch({
            type: ADD_COMMENT_REQUEST,
        });
    }, []);

    const onChangeCommentText = useCallback((e) => {
        setCommntText(e.target.value);
    }, []);

      return (
        <div>
          <Card
            key={+post.createAt}
            cover={post.img && <img alt="example" src={post.img} />}
            actions={[
              <Icon type="retweet" key="retweet" />,
              <Icon type="heart" key="heart" />,
              <Icon type="message" key="message" onClick={onToggleComment} />,
              <Icon type="ellipsis" key="ellipsis" />,
                            ]}
            extra={<Button>팔로우</Button>}
          >
            <Card.Meta
              avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
              title={post.User.nickname}
              description={post.content}
            />
          </Card>
          {commentFormOpened && (
          <>
            <Form onSubmit={onSubmitComment}>
              <Form.Item>
                <Input.TextArea rows={4} value={commntText} onChange={onChangeCommentText} />
                <Button type="primary" htmlType="submit">삐약</Button>
              </Form.Item>
            </Form>
            <List
              header={`${post.Comments ? post.Comments.length : 0} 댓글`}
              itemLayout="horizontal"
              dataSource={post.Comments || []}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                    datetime={item.createdAt}
                  />
                </li>
              )}
            />
          </>
          )}
        </div>
      );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.array,
    }),
};

export default PostCard;
