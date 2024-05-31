import React, { useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import "./SignInPage.scss";
import EmployeeBanner from "../images/employee-banner.png";
import { reduce, concat } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { QUESTIONS_PAGE, SIGNUP_PAGE } from "../AppRoutes";
import { useLocation } from "react-router-dom";
import { fetchAllUser, fetchUser } from "../reducers/users/user.actions";
import Title from "antd/es/typography/Title";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.userState.user);
  const loading = useSelector((state) => state.userState.loading);
  const allUser = useSelector((state) => state.userState.allUser);

  const onFinish = (values) => {
    dispatch(fetchUser(values));
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.id) {
        sessionStorage.setItem("sessionLogin", JSON.stringify(userInfo));
        navigate(QUESTIONS_PAGE);
      } else {
        message.error("Login failled!");
      }
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  useEffect(() => {
    const isAuthenticated = !!sessionStorage.getItem("sessionLogin");
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [location, navigate]);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="signin-container">
      <Title level={2} className="text-center mt-4">
        Employee polls
      </Title>
      <img
        className="img-employee"
        src={EmployeeBanner}
        aria-label="Sign in image"
      />
      <Title level={3} className="text-center mt-4">
        Sign in
      </Title>
      <Form
        name="normal_signin"
        layout="vertical"
        className="signin-form mt-2"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="userId"
          rules={[{ required: true, message: "Please enter username!" }]}
        >
          <Select
            showSearch
            placeholder="Select user"
            optionFilterProp="children"
            filterOption={filterOption}
            options={reduce(
              allUser,
              (result, user) => {
                return concat(result || [], {
                  value: user.id,
                  label: user.name,
                });
              },
              []
            )}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signin-form-button"
            loading={loading}
          >
            Login
          </Button>
          <div className="signin-form-forgot">
            <div>
              Or
              <Link to={SIGNUP_PAGE}>Register now!</Link>
            </div>
            <Link className="signin-form-forgot" to={SIGNUP_PAGE}>
              Forgot your password?
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignInPage;
