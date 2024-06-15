import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to login');
            return data.token; // Retourne directement le token
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        isLoading: false,
        error: null
    },
    reducers: {
        logOut: (state) => {
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
