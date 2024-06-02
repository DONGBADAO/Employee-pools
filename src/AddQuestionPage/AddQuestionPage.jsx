import React, { useEffect, useState } from "react";
import "./AddQuestionPage.scss";
import { Form, Input, Button, Typography, Layout, message } from "antd";
import Header from "../Header/Header";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  resetAddQuestionData,
} from "../reducers/questions/questions.actions";
import { generateUID } from "../utils/string";
import { clearError, updateMemberInfo } from "../reducers/users/user.actions";
import { concat } from "lodash";
import { useNavigate } from "react-router-dom";
import { QUESTIONS_PAGE } from "../App";

const { Title } = Typography;

const AddQuestionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const loading = useSelector((state) => state.questionsState.loading);
  const error = useSelector((state) => state.questionsState.error);
  const addQuestionInfo = useSelector(
    (state) => state.questionsState.addQuestionInfo
  );

  const onFinish = (values) => {
    const { firstOption, secondOption } = values;
    const questionId = generateUID();
    const questionData = {
      questionId,
      author: userInfo?.userId,
      timestamp: new Date().getTime(),
      optionOne: {
        votes: [],
        text: firstOption,
      },
      optionTwo: {
        votes: [],
        text: secondOption,
      },
    };
    dispatch(addQuestion(questionData));
    dispatch(
      updateMemberInfo({
        userId: userInfo.id,
        questions: concat(userInfo.questions || [], questionId),
      })
    );
  };

  useEffect(() => {
    const sessionLogin = sessionStorage.getItem("sessionLogin");
    if (sessionLogin) {
      setUserInfo(JSON.parse(sessionLogin));
    }
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (addQuestionInfo) {
      if (addQuestionInfo) {
        navigate(QUESTIONS_PAGE);
      } else {
        message.error("Add question failed!");
      }
      dispatch(resetAddQuestionData());
    }
  }, [addQuestionInfo, dispatch, navigate]);

  return (
    <Layout className="add-question">
      <Header />
      <Content>
        <Title level={2}>Would You Rather</Title>
        <span className="decription text-secondary">Create Your Own Poll</span>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="First Option"
            name="firstOption"
            rules={[{ required: true, message: "Please enter First Option!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Second Option"
            name="secondOption"
            rules={[{ required: true, message: "Please enter Second Option!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default AddQuestionPage;
