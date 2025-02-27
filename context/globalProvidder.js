import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appWrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() =>{
        getCurrentUser()
            .then((res) => {
                if(res){
                    setIsLoggedIn(true)
                    setUser(res)
                }else{
                    console.log('aaaaa')
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
