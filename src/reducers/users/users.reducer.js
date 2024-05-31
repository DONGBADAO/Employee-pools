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
  registerUser: null,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_PENDING(ACTION_TYPE.FETCH_ALL_USER):
      return {
        ...state,
        error: null,
      };
    case ACTION_PENDING(ACTION_TYPE.REGISTER_USER):
    case ACTION_PENDING(ACTION_TYPE.FETCH_USER):
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ACTION_REJECTED(ACTION_TYPE.FETCH_ALL_USER):
    case ACTION_REJECTED(ACTION_TYPE.REGISTER_USER):
    case ACTION_REJECTED(ACTION_TYPE.FETCH_USER):
      return {
        ...state,
        error: action.payload,
        user: null,
        allUser: null,
        loading: false,
      };
    case ACTION_FULFILLED(ACTION_TYPE.FETCH_ALL_USER):
      return {
        ...state,
        loading: false,
        allUser: action.payload,
      };
    case ACTION_FULFILLED(ACTION_TYPE.REGISTER_USER):
      return {
        ...state,
        loading: false,
        registerUser: action.payload,
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
    case ACTION_TYPE.RESET_REGISTER_DATA:
      return {
        ...state,
        registerUser: null,
      };
    case ACTION_TYPE.RESET_USER_DATA:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
