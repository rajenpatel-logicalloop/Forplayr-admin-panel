// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllData = createAsyncThunk('appReportUserList/getAllData', async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    },
    params: {
      sort: "updatedAt",
      order: "desc",
      page: 1,
      limit: 10,
      report: 'user'
    }
  }
  const response = await axios.get(`${API}report/fetch`, config)
  console.log("Response data==>", response.data.data);
  return response.data.data
})

export const getData = createAsyncThunk('appReportList/getData', async (params) => {
  console.log("Params==>", params.q)
  const config = {
    headers: {
      //Authorization: `Bearer ${authData.accessToken}`
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    params: {
      sort: "updatedAt",
      order: params.sort,
      page: params.page,
      limit: params.perPage,
      report: 'user',
      search:  params.q
    }
  }
  const response = await axios.get(`${API}report/fetch`, config)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.meta.total
  }
})

export const getReport = createAsyncThunk('appReportList/getReport', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }
  const response = await axios.get(`${API}report/fetch/${id}`, config)
  return response.data.data
})

export const addReport = createAsyncThunk('appReportList/addReport', async (report, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }  
  await axios.post('/apps/reports/add-report', report, config)
  await dispatch(getData(getState().reports.params))
  await dispatch(getAllData())
  return report
})

export const deleteReport = createAsyncThunk('appReportList/deleteReport', async (id, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }    
  await axios.delete(`${API}admin/report/delete/${id}`, config)
  await dispatch(getData(getState().reports.params))
  await dispatch(getAllData())
  return id
})

console.log(localStorage.getItem('accessToken'), "accessToken")
export const permitReport = createAsyncThunk('appReportList/permitReport', async (id, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }   
  console.log("accessToken==>", localStorage.getItem('accessToken'))
  await axios.patch(`${API}admin/report/status/${id}`, config)
  //await dispatch(getData(getState().users.params))
  //await dispatch(getAllData())
  return id
})

export const approvedReport = createAsyncThunk(
  "appReportList/approvedReport",
  async (data, { dispatch, getState }) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // Authorization: `Bearer ${authData.accessToken}`
      },
    };
    await axios.patch(
      `${API}admin/report/status/${data.id}`,
      { status: data.status },
      config
    );
    await dispatch(getData(getState().reports.params));
    await dispatch(getAllData());
    return id;
  }
);

export const blockReport = createAsyncThunk('appReportList/blockReport', async (data, { dispatch, getState }) => {
  const config = {
    headers: {
      //Authorization: `Bearer ${localStorage.getItem('token')}`
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }    
  await axios.patch(`${API}admin/report/status/${data.id}`, { status: data.status }, config)
  await dispatch(getData(getState().reports.params))
  await dispatch(getAllData())
  return id
})

export const appReportListSlice = createSlice({
  name: 'appReportList',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedReport: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.selectedEditorial = action.payload
      })
  }
})

export default appReportListSlice.reducer
