import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Icon, Card, Avatar} from 'antd';
import Link from 'next/link';

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
    return(
       <>
            <div>
                {dummy.isLoggedIn && <Form style={{marginBottom:20}} encType="multipart/form-data">
                    <Input.TextArea maxLength={140} placeholder="무슨 일이 일어났나요?"/>
                    <div>
                        <input type="file" multiple hidden/>
                        <Button>이미지 업로드</Button>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">짹짹</Button>
                    </div>
                    <div>
                        {dummy.imagePaths.map((v, i)=>{
                            return (
                                <div key={v} style={{display:'inline-block'}}>
                                    <img src={'http://localhost:3065/'+v} style={{width:'200px'}} alt={v}/>
                                    <div>
                                        <Button>제거</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Form>}
                {dummy.mainPosts.map((c)=>{
                    return(
                        <Card
                            key={+c.createAt}
                            cover={c.img && <img alt="example" src={c.img} />}
                            actions={[
                                <Icon type="retweet" key="retweet" />,
                                <Icon type="heart" key="heart" />,
                                <Icon type="message" key="message" />,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                            extra={<Button>팔로우</Button>}
                        >
                            <Card.Meta
                                avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                                title={c.User.nickname}
                                description={c.content}
                            />
                        </Card>
                    );
                })}
            </div>
        </>
    )
};

export default Home;