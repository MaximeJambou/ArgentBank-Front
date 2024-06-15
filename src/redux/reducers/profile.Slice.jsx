import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProfile = createAsyncThunk (
    "user/getProfile",
    async (data, thunkApi) => {
        return fetch (
            "http://localhost:3001/profile",
            {
                method : "POST",
                Authorization : "Bearer" + thunkApi.getState().user.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        )
        .then (response => response.json())
        .catch (error => {
            thunkApi.rejectWithValue(error)
        })
    }
)