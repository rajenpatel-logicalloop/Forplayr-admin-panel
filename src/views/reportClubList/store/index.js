// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllData = createAsyncThunk('appReportClubList/getAllData', async () => {
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
      report: 'club'
    }
  }
  const response = await axios.get(`${API}report/fetchcount`, config)
  return response.data.data
})

export const getData = createAsyncThunk('appReporClubList/getData', async (params) => {
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
      report: 'club',
    }
  }
  const response = await axios.get(`${API}report/fetchcount`, config)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.meta.total
  }
})

export const getReport = createAsyncThunk('appReporClubList/getReport', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    },
    params:{
      report:'club',
      reportClub:id,
    }
   
  }
  // const response = await axios.get(`${API}report/fetch/${id}`, config)
  const response = await axios.get(`${API}report/fetchcount`, config)  
  console.log("get report single details==>");
  return response.data.data
})

export const getUser = createAsyncThunk('appReportClubList/getUser', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }
  const response = await axios.get(`${API}user/fetch/${id}`, config)
  console.log('User data from report==>', response.data.data);
  return response.data.data
})


export const addReport = createAsyncThunk('appReportClubList/addReportClub', async (report, { dispatch, getState }) => {
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

export const deleteReport = createAsyncThunk('appReportClubList/deleteReportClub', async (id, { dispatch, getState }) => {
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
export const permitReport = createAsyncThunk('appReportClubList/permitReportClub', async (id, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }   
  // console.log("accessToken==>", localStorage.getItem('accessToken'))
  await axios.patch(`${API}admin/report/status/${id}`, config)
  //await dispatch(getData(getState().users.params))
  //await dispatch(getAllData())
  return id
})

export const approvedReport = createAsyncThunk(
  "appReportClubList/approvedReportClub",
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

export const blockReport = createAsyncThunk('appReportClubList/blockReportClub', async (data, { dispatch, getState }) => {
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

export const appReportClubListSlice = createSlice({
  name: 'appReportClubList',
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
        state.selectedReport = action.payload
      })
  }
})

export default appReportClubListSlice.reducer
