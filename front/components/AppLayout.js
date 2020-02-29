import React from 'react';
import {Menu, Input, Button, Row, Col, Card, Avatar} from 'antd';
import propTypes from 'prop-types';
import Link from 'next/link';

const dummy = {
    nickname: '지인쓰',
    Post:[],
    Followers:['33','3333'],
    Followings:[]
}

const AppLayout = ({children}) => {
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign: "middle"}}/>
                </Menu.Item>
            </Menu>
            <Link href="signup"><Button>회원가입</Button></Link>
            <Row>
                <Col xs={24} md={6}>
                    <Card
                        actions={[
                            <div key="twit">짹짹<br/>{dummy.Post.length}</div>,
                            <div key="following">팔로잉<br/>{dummy.Followings.length}</div>,
                            <div key="follower">팔로워<br/>{dummy.Followers.length}</div>
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar>{dummy.nickname[0]}</Avatar>} 
                            title={dummy.nickname}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                {children}
                </Col>
                <Col xs={24} md={6}>세번째</Col>
            </Row>
            
        </div>
    );
};

AppLayout.propTypes = {
    children : propTypes.node,
}

export default AppLayout;