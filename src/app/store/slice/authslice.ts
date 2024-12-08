import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface authState{
    user: null | {
        id:string,
        email:string
    };
    token: string | null;
    isAuthenticated:boolean;
    loading:boolean
}

const initialState:authState={
    user:null,
    token:null,
    isAuthenticated:false,
    loading:false
}

const authslice = createSlice({
   name:"auth",
   initialState,
    reducers:{
        loginStart(state){
            state.loading=true
        },
        loginSuccess(state,action:PayloadAction<{user:authState["user"]; token:string}>){
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.isAuthenticated = true;
        },
        loginFailure(state){
            state.loading = false
        },
        logout(state){
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;
            state.token=null
        }
    }
})

export const {loginStart, loginFailure, loginSuccess,logout} = authslice.actions;
export default authslice.reducer 