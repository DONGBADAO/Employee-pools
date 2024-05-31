import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Card,
  Layout,
  Skeleton,
  Button,
  Progress,
} from "antd";
import "./QuestionDetailsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import {
  fetchAllQuestion,
  updateQuestion,
} from "../reducers/questions/questions.actions";
import { useParams, useNavigate } from "react-router-dom";
import { LikeOutlined, UserOutlined, CheckOutlined } from "@ant-design/icons";
import { find, includes, size, round, without, concat } from "lodash";
import { red } from "@ant-design/colors";
import { NOT_FOUND_PAGE } from "../AppRoutes";

const { Content } = Layout;
const { Title } = Typography;

const QuestionDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [questionInfo, setQuestionInfo] = useState(null);
  const allQuestion = useSelector((state) => state.questionsState.allQuestion);
  const updateQuestionStatus = useSelector(
    (state) => state.questionsState.updateQuestionStatus
  );

  const handleVote = (option) => {
    let optionOneNewVote = questionInfo.optionOne.votes;
    let optionTwoNewVote = questionInfo.optionTwo.votes;
    if (option === "optionOne") {
      optionOneNewVote = includes(questionInfo.optionOne.votes, userInfo.userId)
        ? without(questionInfo.optionOne.votes, userInfo.userId)
        : concat(questionInfo.optionOne.votes, userInfo.userId);
      optionTwoNewVote = without(questionInfo.optionTwo.votes, userInfo.userId);
    } else {
      optionOneNewVote = without(questionInfo.optionOne.votes, userInfo.userId);
      optionTwoNewVote = includes(questionInfo.optionTwo.votes, userInfo.userId)
        ? without(questionInfo.optionTwo.votes, userInfo.userId)
        : concat(questionInfo.optionTwo.votes, userInfo.userId);
    }
    const data = {
      questionId: questionInfo.id,
      vote: {
        optionOne: {
          votes: optionOneNewVote,
          text: questionInfo.optionOne.text,
        },
        optionTwo: {
          votes: optionTwoNewVote,
          text: questionInfo.optionTwo.text,
        },
      },
    };
    dispatch(updateQuestion(data));
  };

  useEffect(() => {
    if (allQuestion) {
      const question = find(allQuestion, ["questionId", questionId]);
      if (question) {
        setQuestionInfo(question);
      } else {
        navigate(NOT_FOUND_PAGE);
      }
    }
  }, [allQuestion, navigate, questionId]);

  useEffect(() => {
    const sessionLogin = sessionStorage.getItem("sessionLogin");
    if (sessionLogin) {
      setUserInfo(JSON.parse(sessionLogin));
    }
  }, []);

  useEffect(() => {
    if (questionInfo) {
    }
  }, [questionInfo]);

  useEffect(() => {
    console.log(!allQuestion, updateQuestionStatus);
    if (!allQuestion || updateQuestionStatus) {
      dispatch(fetchAllQuestion());
    }
  }, [allQuestion, updateQuestionStatus, dispatch]);

  return (
    <Layout className="question-details-page">
      <Header />
      <Content className="p-4">
        <Title level={2}>{`Poll By ${questionInfo?.author}`}</Title>
        <Avatar
          src={userInfo?.avatarURL}
          icon={<UserOutlined />}
          alt={userInfo?.name}
        />
        <Title className="decription" level={2}>
          Would You Rather
        </Title>
        <Layout>
          {questionInfo ? (
            <div className="question-contain">
              <Card
                className="card-wrap"
                actions={
                  includes(questionInfo.optionOne.votes, userInfo.userId)
                    ? [
                        <Button
                          type="primary"
                          icon={<CheckOutlined />}
                          onClick={() => handleVote("optionOne")}
                        />,
                      ]
                    : [
                        <Button
                          type="primary"
                          icon={<LikeOutlined />}
                          onClick={() => handleVote("optionOne")}
                        >
                          Click
                        </Button>,
                      ]
                }
              >
                <pre>{questionInfo.optionOne.text}</pre>
              </Card>
              <Progress
                percent={round(
                  (size(questionInfo.optionOne.votes) /
                    (size(questionInfo.optionOne.votes) +
                      size(questionInfo.optionTwo.votes))) *
                    100
                )}
                steps={
                  size(questionInfo.optionOne.votes) +
                  size(questionInfo.optionTwo.votes)
                }
                format={(percent) => `${percent}%`}
              />
            </div>
          ) : (
            <Skeleton />
          )}
          {questionInfo ? (
            <div className="question-contain">
              <Card
                className="card-wrap"
                actions={
                  includes(questionInfo.optionTwo.votes, userInfo.userId)
                    ? [
                        <Button
                          type="primary"
                          icon={<CheckOutlined />}
                          onClick={() => handleVote("optionTwo")}
                        />,
                      ]
                    : [
                        <Button
                          type="primary"
                          icon={<LikeOutlined />}
                          onClick={() => handleVote("optionTwo")}
                        >
                          Click
                        </Button>,
                      ]
                }
              >
                <pre>{questionInfo.optionTwo.text}</pre>
              </Card>
              <Progress
                percent={round(
                  (size(questionInfo.optionTwo.votes) /
                    (size(questionInfo.optionOne.votes) +
                      size(questionInfo.optionTwo.votes))) *
                    100
                )}
                steps={
                  size(questionInfo.optionOne.votes) +
                  size(questionInfo.optionTwo.votes)
                }
                format={(percent) => `${percent}%`}
                strokeColor={red[5]}
              />
            </div>
          ) : (
            <Skeleton />
          )}
        </Layout>
      </Content>
    </Layout>
  );
};

export default QuestionDetailsPage;
