import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slice/messageslice";
import authReducer from "./slice/authslice"
import registerReducer from "./slice/registerSlice"


export const store = configureStore({
    reducer:{
        messages:messageReducer,
        auth:authReducer,
        register:registerReducer
    }
})

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch