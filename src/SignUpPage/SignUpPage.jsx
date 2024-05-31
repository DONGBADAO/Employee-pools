import React, { useEffect } from "react";
import "./SignUpPage.scss";
import EmployeeBanner from "../images/employee-banner.png";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SIGNIN_PAGE } from "../AppRoutes";
import {
  registerMember,
  resetRegisterData,
} from "../reducers/users/user.actions";
import Title from "antd/es/typography/Title";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state.userState?.loading);
  const registerData = useSelector((state) => state.userState?.registerUser);

  const onFinish = (values) => {
    const { userId, password } = values;
    dispatch(registerMember({ userId, password }));
  };

  useEffect(() => {
    if (registerData) {
      if (registerData.error) {
        message.error("Sign up error!");
      } else {
        dispatch(resetRegisterData());
        navigate(SIGNIN_PAGE);
        message.success("Sign up successfully!");
      }
    }
  }, [dispatch, navigate, registerData]);

  useEffect(() => {
    const isAuthenticated = !!sessionStorage.getItem("sessionLogin");
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [location, navigate]);

  return (
    <div className="signup-container">
      <Title level={2} className="text-center mt-4">
        Employee polls
      </Title>
      <img
        className="img-employee "
        src={EmployeeBanner}
        aria-label="Sign in image"
      />
      <Title level={3} className="text-center mt-4">
        Sign up
      </Title>
      <Form name="signup" layout="vertical" onFinish={onFinish}>
        <h4 className="text-center mb-4">Create yout account</h4>
        <Form.Item
          label="Username"
          name="userId"
          rules={[
            {
              required: true,
              message: "Please input username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
        <div className="text-sm text-center">
          Already have an account? Sign In{" "}
          <Link className="text-blue-700" to={SIGNIN_PAGE}>
            here
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
