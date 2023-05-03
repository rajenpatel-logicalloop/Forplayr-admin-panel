// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// ** Axios Imports
import axios from "axios";
import API from "../../../configs/api";
import { getData } from "../../userList/store";
const authData = JSON.parse(localStorage.getItem("userData"));

export const getAllCompanyBannerData = createAsyncThunk(
  "appCompanyBannerList/getAllCompanyBannerData",
  async () => {
    //console.log("allclubreport==>", localStorage.getItem('accessToken'))
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // Authorization: `Bearer ${authData.accessToken}`
      },
      params: {
        sort: "updatedAt",
        order: "desc",
        page: 1,
        limit: 10,
      },
    };
    const response = await axios.get(`${API}companybanner/fetch`, config);
    return {
      // params,
      data: response.data.data,
      // totalPages: response.data.meta.total,
    };
  }
);

export const getCompanyBannerData = createAsyncThunk(
  "appCompanyBannerList/getData",
  async (params) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // Authorization: `Bearer ${authData.accessToken}`
      },
      params: {
        sort: "updatedAt",
        order: params.sort,
        page: params.page,
        limit: params.perPage,
        name: params.q
      },
    };
    const response = await axios.get(`${API}companybanner/fetch`, config);
    console.log("Response data==>", response);
    return {
      params,
      data: response.data.data,
      totalPages: response.data.meta.total,
    };
  }
);

export const getCompanyBanner = createAsyncThunk("appCompanybannerList/getCompanyBanner", async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // Authorization: `Bearer ${authData.accessToken}`
    },
  };
  const response = await axios.get(`${API}companybanner/fetch/${id}`, config);
  return response.data.data;
});

export const addCompanyBanner = createAsyncThunk(
  "appCompanyBannerList/addCompanyBanner",
  async (data, { dispatch, getState }) => {
    await axios.post(`${API}/companybanner/`, data);
    await dispatch(getCompanyBannerData(getState().data.params));
    await dispatch(getAllCompanyBannerData());
    return data;
  }
);

export const deleteCompanyBanner = createAsyncThunk(
  "appCompanyBannerList/deleteCompanyBanner",
  async (id, { dispatch, getState }) => {
    await axios.delete(`${API}companybanner/delete/${id}`);
    await dispatch(getCompanyBannerData(getState().data.params));
    await dispatch(getAllCompanyBannerData());
    return id;
  }
);

export const appCompanyBannerListSlice = createSlice({
  name: "appCompanyBannerList",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedCompanyBanner: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyBannerData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getCompanyBannerData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getCompanyBanner.fulfilled, (state, action) => {
        state.selectedCompanyBanner = action.payload;
      });
  },
});

export default appCompanyBannerListSlice.reducer;
