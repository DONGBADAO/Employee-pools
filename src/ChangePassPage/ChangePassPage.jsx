import React, { useEffect } from "react";
import "./ChangePassPage.scss";
import EmployeeBanner from "../images/employee-banner.png";
import { Form, Input, Button, message, Select } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SIGNIN_PAGE } from "../constant";
import {
  changePass,
  clearError,
  fetchAllUser,
  resetChangePassData,
} from "../reducers/users/user.actions";
import Title from "antd/es/typography/Title";
import { reduce, concat } from "lodash";

const ChangePassPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state.userState?.loading);
  const allUser = useSelector((state) => state.userState?.allUser);
  const changePassInfo = useSelector(
    (state) => state.userState?.changePassInfo
  );
  const error = useSelector((state) => state.userState?.error);

  const onFinish = (values) => {
    const { userId, password } = values;
    dispatch(changePass({ userId, password }));
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    if (!allUser) {
      dispatch(fetchAllUser());
    }
  }, [dispatch, allUser]);

  useEffect(() => {
    if (changePassInfo) {
      if (changePassInfo.id) {
        navigate(SIGNIN_PAGE);
        message.success("Change password successfully!");
      } else {
        message.success("Change password failed!");
      }
      dispatch(resetChangePassData());
    }
  }, [dispatch, navigate, changePassInfo]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    const isAuthenticated = !!sessionStorage.getItem("sessionLogin");
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [location, navigate]);

  return (
    <div className="change-pass-container">
      <Title level={2} className="text-center mt-4">
        Employee polls
      </Title>
      <img
        className="img-employee "
        src={EmployeeBanner}
        aria-label="Banner image"
      />
      <Form name="signup" layout="vertical" onFinish={onFinish}>
        <h4 className="text-center mb-4">Change Password</h4>
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
            Submit
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

export default ChangePassPage;
