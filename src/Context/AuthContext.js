import { createContext , useState,useEffect } from "react";
import {auth} from "../firebase"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{

    const [currentuser, setCurrentUser] = useState({})

    useEffect(()=>{
         const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })

        return ()=>{
            unsub()
        }
    },[]);

    return (
        <AuthContext.Provider value={{currentuser}}>
        {children}
    </AuthContext.Provider>
    )
   
}