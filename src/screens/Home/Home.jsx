import { View, Text } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../GlobalContext'

export default function Home() {
    const {user} = React.useContext(GlobalContext)
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}