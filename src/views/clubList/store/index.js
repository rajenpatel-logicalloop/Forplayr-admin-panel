// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllClubData = createAsyncThunk('appClubList/getAllClubData', async () => {
  //console.log("clublist==>", localStorage.getItem('accessToken')) 
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }, 
     params: {
      sort: "updatedAt",
      order: "desc",
      page: 1,
      limit: 10
    }
  }
  const response = await axios.get(`${API}club/fetch`, config)
  return response.data.data
})

export const getClubData = createAsyncThunk('appClubList/getClubData', async (params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    },
    params: {
      sort: "updatedAt",
      order: params.sort,
      page: params.page,
      limit: params.perPage      
    }
  }
  const response = await axios.get(`${API}club/fetch`, config)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.meta.total
  }
})

export const getClub = createAsyncThunk('appClubList/getClub', async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      // Authorization: `Bearer ${authData.accessToken}`
    }
    // params: {
    //   include: "role,companies,companies.category,companies.vacancies,resume,resume.experience,resume.skills,resume.education,resume.achivements,resumeAppliedInCompanies,resumeAppliedInCompanies.vacancy"
    // }
  }
  
  const response = await axios.get(`${API}club/fetch/${id}`, config)
  return response.data.data
})

export const addClub = createAsyncThunk('appClubList/addClub', async (club, { dispatch, getState }) => {
  await axios.post('/apps/clubs/add-club', club)
  await dispatch(getClubData(getState().clubs.params))
  await dispatch(getAllClubData())
  return club
})

export const deleteClub = createAsyncThunk('appClubList/deleteClub', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/clubs/delete', { id })
  await dispatch(getClubData(getState().clubs.params))
  await dispatch(getAllClubData())
  return id
})

export const appClubListSlice = createSlice({
  name: 'appClubList',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedClub: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClubData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getClubData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getClub.fulfilled, (state, action) => {
        state.selectedClub = action.payload
      })
  }
})

export default appClubListSlice.reducer