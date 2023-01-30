// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import API from '../../../configs/api'
const authData = JSON.parse(localStorage.getItem("userData"))

export const getAllClubData = createAsyncThunk('appClubList/getAllClubData', async() => {
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
      const response = await axios.get(`${API}club/fetch`, config)
      return response.data.data
    
})