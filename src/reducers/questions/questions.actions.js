import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getQuestion,
  getAllQuestion,
  addNewQuestion,
  updateQuestionStatus,
} from "../../EmployeePollsAPI";

export const ACTION_TYPE = {
  CLEAR_ERROR: "questions/clearError",
  ADD_QUESTION: "questions/addQuestion",
  FETCH_QUESTION: "questions/fetchQuestion",
  UPDATE_QUESTION: "questions/updateQuestion",
  FETCH_ALL_QUESTION: "questions/fetchAllQuestion",
  RESET_ADD_QUESTION_DATA: "questions/resetAddQuestionData",
  RESET_UPDATE_QUESTION_DATA: "questions/resetUpdateQuestionData",
};

export const fetchAllQuestion = createAsyncThunk(
  ACTION_TYPE.FETCH_ALL_QUESTION,
  async () => {
    const result = await getAllQuestion();
    return result;
  }
);

export const fetchQuestion = createAsyncThunk(
  ACTION_TYPE.FETCH_QUESTION,
  async (questionId) => {
    const result = await getQuestion(questionId);
    return result;
  }
);

export const addQuestion = createAsyncThunk(
  ACTION_TYPE.ADD_QUESTION,
  async (question) => {
    const result = await addNewQuestion(question);
    return result;
  }
);

export const updateQuestion = createAsyncThunk(
  ACTION_TYPE.UPDATE_QUESTION,
  async (data) => {
    const result = await updateQuestionStatus(data);
    return result;
  }
);

export const resetUpdateQuestionData = createAsyncThunk(
  ACTION_TYPE.RESET_UPDATE_QUESTION_DATA,
  () => {}
);

export const resetAddQuestionData = createAsyncThunk(
  ACTION_TYPE.RESET_ADD_QUESTION_DATA,
  () => {}
);
