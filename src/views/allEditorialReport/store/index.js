// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllData = createAsyncThunk('appEditorialList/getAllData', async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    },
    params: {
      sort: "updatedAt",
      order: "desc",
      page: 1,
      limit: 10
    }
  }
  const response = await axios.get(`${API}editorial/fetch`, config)
  console.log("Response data==>", response.data.data);
  return response.data.data
})

export const getData = createAsyncThunk('appEditorialList/getData', async (params) => {
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
      businessName:  params.q
    }
  }
  const response = await axios.get(`${API}editorial/fetch`, config)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.meta.total
  }
})

export const getEditorial = createAsyncThunk('appEditorialList/getEditorial', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }
  const response = await axios.get(`${API}editorial/fetch/${id}`, config)
  return response.data.data
})

export const addEditorial = createAsyncThunk('appEditorialList/addEditorial', async (editorial, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }  
  await axios.post('/apps/editorials/add-editorial', editorial, config)
  await dispatch(getData(getState().ediorials.params))
  await dispatch(getAllData())
  return user
})

export const deleteEditorial = createAsyncThunk('appEditorialList/deleteEditorial', async (id, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }    
  await axios.delete(`${API}admin/editorial/delete/${id}`, config)
  await dispatch(getData(getState().editorials.params))
  await dispatch(getAllData())
  return id
})

console.log(localStorage.getItem('accessToken'), "accessToken")
export const permitEdiorial = createAsyncThunk('appEditorialList/permitEditorial', async (id, { dispatch, getState }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //Authorization: `Bearer ${authData.accessToken}`
    }
  }   
  console.log("accessToken==>", localStorage.getItem('accessToken'))
  await axios.patch(`${API}admin/editorial/status/${id}`, config)
  //await dispatch(getData(getState().users.params))
  //await dispatch(getAllData())
  return id
})

export const approvedEditorial = createAsyncThunk(
  "appEditorialList/approvedEditorial",
  async (data, { dispatch, getState }) => {
    console.log("editorial approved status==>", `${API}admin/editorial/status/${data.id}`)
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // Authorization: `Bearer ${authData.accessToken}`
      },
    };
    await axios.patch(
      `${API}admin/editorial/status/${data.id}`,
      { status: data.status },
      config
    );
    await dispatch(getData(getState().editorials.params));
    await dispatch(getAllData());
    return id;
  }
);

export const blockEditorial = createAsyncThunk('appEditorialList/blockEditorial', async (data, { dispatch, getState }) => {
  const config = {
    headers: {
      //Authorization: `Bearer ${localStorage.getItem('token')}`
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
  }    
  await axios.patch(`${API}admin/editorial/status/${data.id}`, { status: data.status }, config)
  await dispatch(getData(getState().editorials.params))
  await dispatch(getAllData())
  return id
})

export const appEditorialListSlice = createSlice({
  name: 'appEditorialList',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedEditorial: null
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
      .addCase(getEditorial.fulfilled, (state, action) => {
        state.selectedEditorial = action.payload
      })
  }
})

export default appEditorialListSlice.reducer
