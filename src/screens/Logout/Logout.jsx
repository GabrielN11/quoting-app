import { View, Text } from 'react-native'
import React from 'react'

import {GlobalContext} from '../../GlobalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Logout({navigation}) {
    const {setUser} = React.useContext(GlobalContext)

    React.useEffect(() => {
        logout()
    }, [])

    async function logout(){
        await AsyncStorage.removeItem('@user_token')
        navigation.navigate('Initial')
    }
  return (
    <View>
    </View>
  )
}