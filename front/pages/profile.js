import React from 'react';
import {Form, Button, List, Card, Input, Icon} from 'antd';

const Profile = () => {
    return (
        <>
            <Form style={{marginBottom:'20px', border: '1px solid #d9d9d9', padding: '20px'}}>
                <Input addonBefore="닉네임"/>
                <Button type="primary">수정</Button>
            </Form>
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