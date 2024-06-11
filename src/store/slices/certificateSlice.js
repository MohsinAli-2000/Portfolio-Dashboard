import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const APIBaseURL = "https://my-portfolio-backend-rose.vercel.app";

const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    loading: false,
    certificates: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllCertificatesRequest(state, action) {
      state.certificates = [];
      state.error = null;
      state.loading = true;
    },
    getAllCertificatesSuccess(state, action) {
      state.certificates = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllCertificatesFailed(state, action) {
      state.certificates = state.certificates;
      state.error = action.payload;
      state.loading = false;
    },
    addNewCertificateRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewCertificateSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewCertificateFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteCertificateRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteCertificateSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteCertificateFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetCertificateSlice(state, action) {
      state.error = null;
      state.certificates = state.certificates;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.certificates = state.certificates;
    },
  },
});

export const getAllCertificates = () => async (dispatch) => {
  dispatch(certificateSlice.actions.getAllCertificatesRequest());
  try {
    const response = await axios.get(
      `${APIBaseURL}/api/v1/certificates/get-all-certificate`,
      { withCredentials: true }
    );
    dispatch(
      certificateSlice.actions.getAllCertificatesSuccess(
        response.data.certificates
      )
    );
    dispatch(certificateSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      certificateSlice.actions.getAllCertificatesFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewCertificate = (data) => async (dispatch) => {
  dispatch(certificateSlice.actions.addNewCertificateRequest());
  try {
    const response = await axios.post(
      `${APIBaseURL}/api/v1/certificates/add-certificate`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      certificateSlice.actions.addNewCertificateSuccess(response.data.message)
    );
    dispatch(certificateSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      certificateSlice.actions.addNewCertificateFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteCertificate = (id) => async (dispatch) => {
  dispatch(certificateSlice.actions.deleteCertificateRequest());
  try {
    const response = await axios.delete(
      `${APIBaseURL}/api/v1/certificates/delete-certificate/${id}`,
      { withCredentials: true }
    );
    dispatch(
      certificateSlice.actions.deleteCertificateSuccess(response.data.message)
    );
    dispatch(certificateSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      certificateSlice.actions.deleteCertificateFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllCertificateErrors = () => (dispatch) => {
  dispatch(certificateSlice.actions.clearAllErrors());
};

export const resetCertificateSlice = () => (dispatch) => {
  dispatch(certificateSlice.actions.resetCertificateSlice());
};

export default certificateSlice.reducer;
