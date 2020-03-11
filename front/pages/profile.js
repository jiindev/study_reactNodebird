import React from 'react';
import {Button, List, Card, Icon} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
    return (
        <>
            <NicknameEditForm/>
            <List
                style={{marginBottom: '20px'}}
                grid={{gutter:4, sx:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더 보기</Button>}
                bordered
                dataSource={['네임드', '네이버', '네트워크', 't']}
                renderItem={item=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<Icon key="stop" type="stop"/>]}><Card.Meta description={item}/></Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginBottom: '20px'}}
                grid={{gutter:4, sx:2, md:3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더 보기</Button>}
                bordered
                dataSource={['지인', '흠냐', '오오']}
                renderItem={item=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<Icon key="stop" type="stop"/>]}><Card.Meta description={item}/></Card>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Profile;