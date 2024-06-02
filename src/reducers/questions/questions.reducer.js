import {
  ACTION_FULFILLED,
  ACTION_PENDING,
  ACTION_REJECTED,
} from "../action-type.util";
import { ACTION_TYPE } from "./questions.actions";
import { sortBy, reduce, concat, isEmpty } from "lodash";

const initialState = {
  loading: false,
  allQuestion: null,
  question: null,
  addQuestionInfo: null,
  updateQuestionInfo: null,
  error: null,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_PENDING(ACTION_TYPE.FETCH_ALL_QUESTION):
    case ACTION_PENDING(ACTION_TYPE.FETCH_QUESTION):
    case ACTION_PENDING(ACTION_TYPE.ADD_QUESTION):
    case ACTION_PENDING(ACTION_TYPE.UPDATE_QUESTION):
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ACTION_REJECTED(ACTION_TYPE.FETCH_ALL_QUESTION):
    case ACTION_REJECTED(ACTION_TYPE.FETCH_QUESTION):
    case ACTION_REJECTED(ACTION_TYPE.ADD_QUESTION):
    case ACTION_REJECTED(ACTION_TYPE.UPDATE_QUESTION):
      return {
        ...state,
        loading: false,
        error: action.payload || "System error",
      };
    case ACTION_FULFILLED(ACTION_TYPE.FETCH_ALL_QUESTION): {
      const newQuestionData = reduce(
        action.payload,
        (result, question) => {
          const newQuestion = {
            ...question,
            newQuestion:
              isEmpty(question.optionOne.votes) &&
              isEmpty(question.optionTwo.votes),
          };
          return concat(result || [], newQuestion);
        },
        []
      );

      return {
        ...state,
        loading: false,
        allQuestion: sortBy(newQuestionData, "timestamp").reverse(),
      };
    }
    case ACTION_FULFILLED(ACTION_TYPE.FETCH_QUESTION):
      return {
        ...state,
        loading: false,
        question: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.ADD_QUESTION):
      return {
        ...state,
        loading: false,
        addQuestionInfo: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.UPDATE_QUESTION):
      return {
        ...state,
        loading: false,
        updateQuestionInfo: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.RESET_UPDATE_QUESTION_DATA):
      return {
        ...state,
        updateQuestionInfo: null,
      };
    case ACTION_FULFILLED(ACTION_TYPE.RESET_ADD_QUESTION_DATA):
      return {
        ...state,
        addQuestionInfo: null,
      };
    case ACTION_FULFILLED(ACTION_TYPE.CLEAR_ERROR):
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default questionsReducer;
