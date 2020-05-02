import React, { useState, useEffect } from "react";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import propTypes from "prop-types";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import Router from "next/router";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  const onSearch = (value) => {
    Router.push({ pathname: '/hashtag', query: {tag:value }}, `/hashtag/${value}`);
  }

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search 
          enterButton 
          style={{ verticalAlign: "middle" }} 
          onSearch = {onSearch}
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          세번째
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node,
};

export default AppLayout;
