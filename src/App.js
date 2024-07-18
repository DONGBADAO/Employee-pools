import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import {
  ADD_QUESTION_PAGE,
  CHANGE_PASS_PAGE,
  LEADER_BOARD_PAGE,
  NOT_FOUND_PAGE,
  QUESTIONS_PAGE,
  QUESTION_DETAILS_PAGE,
  SIGNIN_PAGE,
  SIGNUP_PAGE,
} from "./constant";

const SignUpPage = React.lazy(() => import("./SignUpPage/SignUpPage"));
const SignInPage = React.lazy(() => import("./SignInPage/SignInPage"));
const QuestionsPage = React.lazy(() => import("./QuestionsPage/QuestionsPage"));
const AddQuestionPage = React.lazy(() =>
  import("./AddQuestionPage/AddQuestionPage")
);
const QuestionDetailsPage = React.lazy(() =>
  import("./QuestionDetailsPage/QuestionDetailsPage")
);
const NotFoundPage = React.lazy(() => import("./NotFoundPage/NotFoundPage"));
const ChangePassPage = React.lazy(() =>
  import("./ChangePassPage/ChangePassPage")
);
const LeaderBoardPage = React.lazy(() =>
  import("./LeaderBoardPage/LeaderBoardPage")
);

const App = () => {
  const location = useLocation();

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!sessionStorage.getItem("sessionLogin");
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={SIGNIN_PAGE} replace state={{ from: location }} />
    );
  };

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={QUESTIONS_PAGE} element={<QuestionsPage />} />
        <Route path={ADD_QUESTION_PAGE} element={<AddQuestionPage />} />
        <Route path={LEADER_BOARD_PAGE} element={<LeaderBoardPage />} />
        <Route path={QUESTION_DETAILS_PAGE} element={<QuestionDetailsPage />} />
      </Route>
      <Route path="/" element={<Navigate to={SIGNIN_PAGE} />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path={SIGNIN_PAGE} element={<SignInPage />} />
      <Route path={SIGNUP_PAGE} element={<SignUpPage />} />
      <Route path={NOT_FOUND_PAGE} element={<NotFoundPage />} />
      <Route path={CHANGE_PASS_PAGE} element={<ChangePassPage />} />
    </Routes>
  );
};

export default App;
