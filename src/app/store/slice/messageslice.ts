import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message{
    id:string,
    content:string,
    username:string,
    timestamps:string
}

interface MessageState{
    messages:Message[]
}

const initialState:MessageState = {
    messages:[]
}

const messageslice = createSlice({
    name: "messages",
    initialState,
    reducers:{
     addMessage : (state, action:PayloadAction<Message>)=>{
        state.messages.push(action.payload)
     }
    }

})

export const {addMessage} = messageslice.actions

export default messageslice.reducer
