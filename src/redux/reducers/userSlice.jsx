import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to login');
            console.log('data',data)
            return data.body.token; // Retourne directement le token
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

// Définition de la constante pour l'URL de l'API
const apiUrl = 'http://localhost:3001/api/v1/user/profile';


export const getProfile = createAsyncThunk(
    "user/getProfile",
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

// Action asynchrone pour la mise à jour du nom d'utilisateur
export const updateUsername = createAsyncThunk(
    'user/updateUsername',
    async ({ newUsername }, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userName: newUsername }) 
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update username');
            return data.body;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        data: null, 
        isLoading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
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
        })
        
        builder.addCase(updateUsername.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUsername.fulfilled, (state, action) => {
            console.log("action", action.payload)
            state.isLoading = false;
            state.userName = action.payload; // Met à jour le nom d'utilisateur
        })
        .addCase(updateUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
