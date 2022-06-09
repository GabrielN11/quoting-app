import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = React.createContext()

const reducer = async (state, action) => {
    switch(action.type){
        case 'ADD':
            try{
                await AsyncStorage.setItem('@user_token', action.user.token)
                return action.user
            }catch(e){
                return null
            }
        default:
            try{
                await AsyncStorage.removeItem('@user_token')
            }catch(e){
                console.log(e)
            }
            return null
    }
}

export const GlobalProvider = ({ children }) => {

    const [user, dispatch] = React.useReducer(reducer, null);

    return (
        <GlobalContext.Provider value={{user, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}