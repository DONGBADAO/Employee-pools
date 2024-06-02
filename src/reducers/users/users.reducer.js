import {
  ACTION_FULFILLED,
  ACTION_PENDING,
  ACTION_REJECTED,
} from "../action-type.util";
import { ACTION_TYPE } from "./user.actions";

const initialState = {
  loading: false,
  user: null,
  allUser: null,
  changePassInfo: null,
  registerUserInfo: null,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ACTION_PENDING(ACTION_TYPE.FETCH_ALL_USER):
      return {
        ...state,
        error: null,
      };
    case ACTION_PENDING(ACTION_TYPE.FETCH_USER):
    case ACTION_PENDING(ACTION_TYPE.REGISTER_USER):
    case ACTION_PENDING(ACTION_TYPE.CHANGE_PASSWORD):
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ACTION_REJECTED(ACTION_TYPE.FETCH_USER):
    case ACTION_REJECTED(ACTION_TYPE.REGISTER_USER):
    case ACTION_REJECTED(ACTION_TYPE.CHANGE_PASSWORD):
      return {
        ...state,
        loading: false,
        error: action.payload || "System error",
      };
    case ACTION_FULFILLED(ACTION_TYPE.FETCH_ALL_USER):
      return {
        ...state,
        allUser: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.REGISTER_USER):
      return {
        ...state,
        loading: false,
        registerUserInfo: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.CHANGE_PASSWORD):
      return {
        ...state,
        loading: false,
        changePassInfo: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.FETCH_USER): {
      if (action.payload.password === action.meta.arg.password) {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      }
      return {
        ...state,
        user: {},
        loading: false,
      };
    }
    case ACTION_FULFILLED(ACTION_TYPE.RESET_USER_DATA):
      return {
        ...state,
        user: null,
      };
    case ACTION_FULFILLED(ACTION_TYPE.RESET_REGISTER_DATA):
      return {
        ...state,
        registerUserInfo: null,
      };
    case ACTION_FULFILLED(ACTION_TYPE.RESET_CHANGE_PASS_DATA):
      return {
        ...state,
        changePassInfo: null,
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

export default usersReducer;
