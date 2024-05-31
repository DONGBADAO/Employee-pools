import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Skeleton } from "antd";
import { map, partition, replace, isNull, isEmpty } from "lodash";
import "./QuestionsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import { fetchAllQuestion } from "../reducers/questions/questions.actions";
import Meta from "antd/es/card/Meta";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { QUESTION_DETAILS_PAGE } from "../App";

const { Content } = Layout;

const QuestionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState(null);
  const [doneQuestion, setDoneQuestion] = useState(null);
  const allQuestions = useSelector((state) => state.questionsState.allQuestion);

  const showQuestionDetails = (questionId) => {
    navigate(replace(QUESTION_DETAILS_PAGE, ":questionId", questionId));
  };

  useEffect(() => {
    dispatch(fetchAllQuestion());
  }, [dispatch]);

  useEffect(() => {
    if (allQuestions) {
      const [doneQuestion, newQuestion] = partition(
        allQuestions,
        (n) => !n.newQuestion
      );
      setNewQuestion(newQuestion);
      setDoneQuestion(doneQuestion);
    }
  }, [allQuestions]);

  return (
    <Layout className="questions-page">
      <Header />
      <Content className="p-4">
        <Card
          title="New Questions"
          className={`card-wrap ${isEmpty(newQuestion) ? "no-data" : ""}`}
        >
          {isNull(newQuestion) ? (
            <Skeleton />
          ) : !isEmpty(newQuestion) ? (
            map(newQuestion, (questions) => {
              const { questionId, author, timestamp } = questions;
              const date = new Date(timestamp);
              const formatedDate = format(date, "hh:mm a | MM/dd/yyyy");
              return (
                <Card
                  key={questionId}
                  className="text-center"
                  actions={[
                    <Button
                      type="primary"
                      ghost
                      key="show"
                      onClick={() => showQuestionDetails(questionId)}
                    >
                      Show
                    </Button>,
                  ]}
                >
                  <Meta title={author} description={formatedDate} />
                </Card>
              );
            })
          ) : (
            <p className="text-center">There are no new questions.</p>
          )}
        </Card>
        <Card
          title="Done"
          className={`card-wrap ${isEmpty(doneQuestion) ? "no-data" : ""}`}
        >
          {isNull(doneQuestion) ? (
            <Skeleton />
          ) : !isEmpty(doneQuestion) ? (
            map(doneQuestion, (question) => {
              const { questionId, author, timestamp } = question;
              const date = new Date(timestamp);
              const formatedDate = format(date, "hh:mm a | MM/dd/yyyy");
              return (
                <Card
                  key={questionId}
                  className="text-center"
                  actions={[
                    <Button
                      type="primary"
                      ghost
                      key="show"
                      onClick={() => showQuestionDetails(questionId)}
                    >
                      Show
                    </Button>,
                  ]}
                >
                  <Meta title={author} description={formatedDate} />
                </Card>
              );
            })
          ) : (
            <p className="text-center">There are no new questions.</p>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default QuestionsPage;
