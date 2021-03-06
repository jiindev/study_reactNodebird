import React, { useState, useCallback, useEffect } from 'react';
import {
 Form, Input, Checkbox, Button,
} from 'antd';
import Password from 'antd/lib/input/Password';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { SIGN_UP_REQUEST } from '../reducers/user';
import styled from 'styled-components';

const SignupError = styled.div`
  color: red;
`;

export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, [value]);
    return [value, handler];
};

const Signup = () => {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const [id, onChangeId] = useInput(''); // 커스텀 훅 사용
    const dispatch = useDispatch();
    const { isSigningUp, me } = useSelector(state => state.user);

    useEffect(() => {
        if (me){
            alert('로그인 후 메인페이지로 이동');
            Router.push('/');
        }
    }, [me && me.id]);


    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (password !== passwordCheck){
            return setPasswordError(true);
        }
        if (!term){
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nick,
            },
        });
    }, [id, password, passwordCheck, term]);
    const onChangeNick = useCallback((e) => {
        setNick(e.target.value);
    }, [nick]);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [password]);
    const onChangePasswordChk = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password, passwordCheck]);
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, [term]);

    if(me){
      return null;
    }

    return (
      <>
        <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
          {/* <TextInput value={'135'}/> */}
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nick} required onChange={onChangeNick} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor="user-password-chk">비밀번호 체크</label>
            <br />
            <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePasswordChk} />
            {passwordError && <SignupError>비밀번호가 일치하지 않습니다.</SignupError>}
          </div>
          <div style={{ marginTop: '10' }}>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>이에 동의합니다.</Checkbox>
            {termError && <SignupError>약관에 동의하세요</SignupError>}
          </div>
          <div>
            <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
          </div>
        </Form>
      </>
    );
};

export default Signup;
