import React from 'react';
import {Form, Button, Input} from 'antd';

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

const PostForm = () => {
    return (
        <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data">
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
                </Form>
    )
}

export default PostForm;
