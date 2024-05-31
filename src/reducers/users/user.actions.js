import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUser,
  getUserInfo,
  registerUser,
  updateUserInfo,
} from "../../EmployeePollsAPI";

export const ACTION_TYPE = {
  FETCH_USER: "user/fetchUser",
  FETCH_ALL_USER: "user/fetchAllUser",
  REGISTER_USER: "user/registerUser",
  RESET_REGISTER_DATA: "user/resetRegisterData",
  RESET_USER_DATA: "user/resetUserData",
  UPDATE_USER: "user/updateUser",
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

export const resetRegisterData = createAsyncThunk(
  ACTION_TYPE.RESET_REGISTER_DATA,
  () => {}
);

export const resetUserData = createAsyncThunk(
  ACTION_TYPE.RESET_USER_DATA,
  () => {}
);
