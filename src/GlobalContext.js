import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);

    return (
        <GlobalContext.Provider value={{user, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}