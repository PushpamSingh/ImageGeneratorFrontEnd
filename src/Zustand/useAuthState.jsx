import {create} from "zustand"

export const useAuthState=create((set)=>({
    authState:"",
    setAuthState:(authState)=>{
        set({authState})
    }
}))