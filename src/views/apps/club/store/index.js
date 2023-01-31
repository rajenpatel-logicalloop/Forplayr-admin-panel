// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllClubData = createAsyncThunk('appClubs/getAllClubData', async () => {
  //console.log("club-store-Access token==>", localStorage.getItem('accessToken')) 
  const response = await axios.get('/api/clubs/list/all-data')
  return response.data
})

export const getClubData = createAsyncThunk('appClubs/getClubData', async params => {
  //console.log("vies\clublist\Access token==>", localStorage.getItem('accessToken')) 
  const response = await axios.get('/api/clubs/list/data', params)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total
  }
})

export const getClub = createAsyncThunk('appClubs/getClub', async id => {
  const response = await axios.get('/api/clubs/club', { id })
  return response.data.data
})

export const addClub = createAsyncThunk('appClubs/addClub', async (club, { dispatch, getState }) => {
  await axios.post('/apps/clubs/add-club', club)
  await dispatch(getClubData(getState().clubs.params))
  await dispatch(getAllClubData())
  return user
})

export const deleteUser = createAsyncThunk('appClubs/deleteClub', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/clubs/delete', { id })
  await dispatch(getClubData(getState().clubs.params))
  await dispatch(getAllClubData())
  return id
})

export const appClubsSlice = createSlice({
  name: 'appClubs',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedClub: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllClubData.fulfilled, (state, action) => {
        state.allClubData = action.payload
      })
      .addCase(getClubData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getClub.fulfilled, (state, action) => {
        state.selectedClub= action.payload
      })
  }
})

export default appClubsSlice.reducer
