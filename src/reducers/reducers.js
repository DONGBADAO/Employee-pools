import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/users.reducer";
import questionsReducer from "./questions/questions.reducer";

const rootReducer = combineReducers({
  userState: usersReducer,
  questionsState: questionsReducer,
});

export default rootReducer;
