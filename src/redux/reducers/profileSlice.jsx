import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Définition de la constante pour l'URL de l'API
const apiUrl = 'http://localhost:3001/api/v1/user/profile';

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, { getState, rejectWithValue }) => {
        const token = getState().user.token; 

        const requestOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            let data = await response.json(); 
            console.log("data", data)
            return data.body
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { setData } = profileSlice.actions;
export default profileSlice.reducer;