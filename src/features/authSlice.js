import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signupUser } from "../firebase/authService";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'

export const loginAsync = createAsyncThunk(
    "auth/login",
    async ({email, password}) => {
        const user = await loginUser(email, password);

        return {
            id : user.uid,
            email : user.email,
            name : user.displayName
            
        };
    }
)

export const logoutAsync = createAsyncThunk(
    "auth/logout",
    async () => {
        await logoutUser();
    }
)



const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        isLoggedIn : false,
        loading : true
    },
    reducers: {
        logout : (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = !!action.payload;
            state.loading = false;
        }
            },
    extraReducers : (builder) =>{
        builder
        .addCase(loginAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
            
            
            toast.success("Login Successful")
        })
        .addCase(loginAsync.rejected, (state) => {
            state.loading = false;

            toast.error("Login Failed")
        })
        //signup
        .addCase(signupAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(signupAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;

            toast.success("Account Created Successfully")
        })
        .addCase(signupAsync.rejected, (state) => {
            state.loading = false;

            toast.error("Signup Failed")
        })
        .addCase(logoutAsync.fulfilled, (state) =>{
            state.user = null;
            state.isLoggedIn = false;
        })
    }
})

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async ({ email, password, username }) => {
    const user = await signupUser(email, password, username);

    return {
      id: user.uid,
      email: user.email,
      name: user.displayName
    };
  }
);

export const { logout , setUser} = authSlice.actions;
export default authSlice.reducer;