// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllData = createAsyncThunk('appUserList/getAllData', async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authData.accessToken}`
    },
    params: {
      sort: "updatedAt",
      order: "desc",
      page: 1,
      limit: 10
    }
  }
  const response = await axios.get(`${API}user/fetch`, config)
  return response.data.data
})

export const getData = createAsyncThunk('appUserList/getData', async (params) => {

  const config = {
    headers: {
      Authorization: `Bearer ${authData.accessToken}`
    },
    params: {
      sort: "updatedAt",
      order: params.sort,
      page: params.page,
      limit: params.perPage,
      search: params.q
    }
  }
  const response = await axios.get(`${API}user/fetch`, config)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.meta.total
  }
})

export const getUser = createAsyncThunk('appUserList/getUser', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authData.accessToken}`
    }
    // params: {
    //   include: "role,companies,companies.category,companies.vacancies,resume,resume.experience,resume.skills,resume.education,resume.achivements,resumeAppliedInCompanies,resumeAppliedInCompanies.vacancy"
    // }
  }
  
  const response = await axios.get(`${API}user/fetch/${id}`, config)
  return response.data.data
})

export const addUser = createAsyncThunk('appUserList/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUserList/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appUserListSlice = createSlice({
  name: 'appUserList',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUserListSlice.reducer
