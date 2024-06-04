import React, { useEffect, useState } from "react";
import { Layout, Menu, Space, Typography, Button, Avatar } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import {
  QUESTIONS_PAGE,
  LEADER_BOARD_PAGE,
  SIGNIN_PAGE,
  ADD_QUESTION_PAGE,
} from "../constant";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { resetUserData } from "../reducers/users/user.actions";

const { Header: AntHeader } = Layout;
const { Title } = Typography;
const menuItems = [
  {
    key: QUESTIONS_PAGE,
    label: <Link to={QUESTIONS_PAGE}>Home</Link>,
  },
  {
    key: LEADER_BOARD_PAGE,
    label: <Link to={LEADER_BOARD_PAGE}>Leader board</Link>,
  },
  {
    key: ADD_QUESTION_PAGE,
    label: <Link to={ADD_QUESTION_PAGE}>New</Link>,
  },
];

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("sessionLogin");
    dispatch(resetUserData());
    setTimeout(() => navigate(SIGNIN_PAGE), 100);
  };

  useEffect(() => {
    const sessionLogin = sessionStorage.getItem("sessionLogin");
    if (sessionLogin) {
      setUserInfo(JSON.parse(sessionLogin));
    }
  }, []);

  return (
    <AntHeader className="header">
      <div className="logo">
        <Title level={3}>
          <Link to={QUESTIONS_PAGE}>Employee Polls</Link>
        </Title>
      </div>
      <Menu
        mode="horizontal"
        items={menuItems}
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={[QUESTIONS_PAGE]}
      />
      <Space className="header-buttons">
        <Avatar
          src={userInfo?.avatarURL}
          icon={<UserOutlined />}
          alt={userInfo?.name}
        />
        <span>{userInfo?.name}</span>
        <Button type="link" icon={<PoweroffOutlined />} onClick={handleLogout}>
          Log Out
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
