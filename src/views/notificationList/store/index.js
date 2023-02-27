// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllData = createAsyncThunk('appNotificationList/getAllData', async () => {
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
  const response = await axios.get(`${API}report/fetchcount`, config)
  // console.log("Response data==>", response.data.data);
  return response.data.data
})

export const getData = createAsyncThunk('appNotificationList/getData', async (params) => {
  // console.log("Params==>", params.reportUser)
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
      //reportUser: params.reportUser, 
    }
  }
  const response = await axios.get(`${API}report/fetchcount`, config)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.meta.total
  }
})

/* get residence/province data */
export const getResidence = createAsyncThunk('appNotificationResidence/getdata', async(params) => {
    const config = {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      params:{
        sort:"updatedAt",
        order: params.sort,
        page: params.page,
        limit: 10000,
        deletedAt: null
      }
    }

    const response = await axios.get(`${API}province/fetch`, config)
    console.log("Residence data ==>", response.data.data)
    // return {
    //   params,
    //   residencedata: response.data.data,
    //   totalPages: response.data.meta.total
    // }
    return response.data.data
})

/* get residence/province data */
export const getRegion = createAsyncThunk('appNotificationRegion/getdata', async(params) => {
  const config = {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    params:{
      sort:"updatedAt",
      order: params.sort,
      page: params.page,
      limit: params.perPage,
      deletedAt: null
    }
  }

  const response = await axios.get(`${API}region/fetch`, config)
  return response.data.data
})

export const sendnotificationMes = createAsyncThunk('appNotificationSend/sendNotification', async(params) => {
  const config = {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    params:{
      deletedAt: null,
      region: params.region,
      residence: params.residence,
      noti_tittle: params.noti_tittle,
      messageDet: params.messageDet,
    }
  }

  const response = await axios.get(`${API}notification/getBackPushUserData`, config)
  return response.data.data  
})

export const getReport = createAsyncThunk('appNotificationList/getReport', async (id) => {
  console.log("get report Id==>", id);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    },
    params:{
      report:'user',
      reportUser:id,
    }
   
  }
  // const response = await axios.get(`${API}report/fetch/${id}`, config)
  const response = await axios.get(`${API}report/fetchcount`, config)  
  console.log("get report single details==>");
  return response.data.data
})

export const getUser = createAsyncThunk('appNotificationList/getUser', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }
  const response = await axios.get(`${API}user/fetch/${id}`, config)
  return response.data.data
})


export const addReport = createAsyncThunk('appNotificationList/addReportUser', async (report, { dispatch, getState }) => {
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

export const deleteReportUser = createAsyncThunk('appNotificationList/deleteReportUser', async (id, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }    
  await axios.delete(`${API}admin/user/delete/${id}`, config)
  await dispatch(getData(getState().reports.params))
  await dispatch(getAllData())
  return id
})

console.log(localStorage.getItem('accessToken'), "accessToken")
export const permitReport = createAsyncThunk('appNotificationList/permitReportUser', async (id, { dispatch, getState }) => {
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
  "appReportUserList/approvedReportUser",
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

export const blockReport = createAsyncThunk('appNotificationList/blockReportUser', async (data, { dispatch, getState }) => {
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

export const appNotificationListSlice = createSlice({
  name: 'appNotificationList',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    residenceData: [],
    regionData:[],
    selectedNotification: null
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
      .addCase(getResidence.fulfilled, (state, action) => {
        state.residenceData = action.payload
      })
      .addCase(getRegion.fulfilled, (state, action) => {
        state.regionData = action.payload
      })      
      .addCase(getReport.fulfilled, (state, action) => {
        state.selectedNotification = action.payload
      })
  }
})

export default appNotificationListSlice.reducer
