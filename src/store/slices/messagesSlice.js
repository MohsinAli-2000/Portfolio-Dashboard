import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const APIBaseURL = "https://my-portfolio-backend-nilc.onrender.com";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    sendMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    sendMessageSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    sendMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(`${APIBaseURL}/api/v1/message/get-all`, {
      withCredentials: true,
    });
    dispatch(
      messageSlice.actions.getAllMessagesSuccess(response.data.messages)
    );
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(messageSlice.actions.getAllMessagesFailed(errorMessage));
  }
};

export const sendMessage = (data) => async (dispatch) => {
  dispatch(messageSlice.actions.sendMessageRequest());
  try {
    const response = await axios.post(
      `${APIBaseURL}/api/v1/message/send`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(messageSlice.actions.sendMessageSuccess(response.data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(messageSlice.actions.sendMessageFailed(errorMessage));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const response = await axios.delete(
      `${APIBaseURL}/api/v1/message/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(messageSlice.actions.deleteMessageFailed(errorMessage));
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
