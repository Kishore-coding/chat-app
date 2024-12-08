import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface register{
    loading:boolean;
    success:boolean;
    error:string | null;
}

const initialState:register={
    loading:false,
    success:false,
    error:null
}

const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers:{
        registerStart(state){
            state.loading=true
        },
        registerSuccess(state){
            state.success=true
        },
        registerFailure(state, action:PayloadAction<{error:string}>){
            state.error=action.payload.error;
            state.loading = false;
            state.success = false;
        }
    }
})


export const {registerStart, registerSuccess, registerFailure} = registerSlice.actions;

export default registerSlice.reducer