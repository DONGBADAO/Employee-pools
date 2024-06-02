import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePassword,
  getAllUser,
  getUserInfo,
  registerUser,
  updateUserInfo,
} from "../../EmployeePollsAPI";

export const ACTION_TYPE = {
  FETCH_USER: "user/fetchUser",
  REGISTER_USER: "user/registerUser",
  FETCH_ALL_USER: "user/fetchAllUser",
  RESET_USER_DATA: "user/resetUserData",
  RESET_REGISTER_DATA: "user/resetRegisterData",
  RESET_CHANGE_PASS_DATA: "user/resetChangePassData",
  CLEAR_ERROR: "user/clearError",
  UPDATE_USER: "user/updateUser",
  CHANGE_PASSWORD: "user/changePassword",
};

export const fetchUser = createAsyncThunk(
  ACTION_TYPE.FETCH_USER,
  async (data) => {
    const result = await getUserInfo(data?.userId);
    return {
      ...result,
      meta: data,
    };
  }
);

export const fetchAllUser = createAsyncThunk(
  ACTION_TYPE.FETCH_ALL_USER,
  async () => {
    const result = await getAllUser();
    return result;
  }
);

export const registerMember = createAsyncThunk(
  ACTION_TYPE.REGISTER_USER,
  async (data) => {
    const { userId, password } = data;
    const newUser = {
      userId,
      password,
      name: userId,
      avatarURL: "",
      answers: {},
      questions: [],
    };
    const result = await registerUser(newUser);
    return result;
  }
);

export const updateMemberInfo = createAsyncThunk(
  ACTION_TYPE.UPDATE_USER,
  async (data) => {
    const result = await updateUserInfo(data);
    return result;
  }
);

export const changePass = createAsyncThunk(
  ACTION_TYPE.CHANGE_PASSWORD,
  async (data) => {
    const result = await changePassword(data);
    return result;
  }
);

export const resetRegisterData = createAsyncThunk(
  ACTION_TYPE.RESET_REGISTER_DATA,
  () => {}
);

export const resetChangePassData = createAsyncThunk(
  ACTION_TYPE.RESET_CHANGE_PASS_DATA,
  () => {}
);

export const clearError = createAsyncThunk(ACTION_TYPE.CLEAR_ERROR, () => {});

export const resetUserData = createAsyncThunk(
  ACTION_TYPE.RESET_USER_DATA,
  () => {}
);
