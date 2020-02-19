import React, {useState} from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {Form, Input, Checkbox, Button} from 'antd';

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);


    const onSubmit = () => {

    }
    const onChageId = (e) => {
        setId(e.target.value);
    }
    const onChageNick = (e) => {
        setNick(e.target.value);
    }
    const onChagePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangePasswordChk = (e) => {
        setPasswordCheck(e.target.value);
    }
    const onChageTerm = (e) => {
        setTerm(e.target.value);
    }
    return (
        <>
        <Head>
           <title>Nodebird</title>
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css"/>
       </Head>
        <AppLayout>
            <Form onSubmit = {onSubmit} style={{padding:'10px'}}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChageId}/>
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br/>
                    <Input name="user-nick" value={nick} required onChange={onChageNick}/>
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" value={password} type="password" required onChange={onChagePassword}/>
                </div>
                <div>
                    <label htmlFor="user-password-chk">비밀번호 체크</label>
                    <br/>
                    <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePasswordChk}/>
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChageTerm}>이에 동의합니다.</Checkbox>
                </div>
                <div>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>
        </>
    )
}

export default Signup;
