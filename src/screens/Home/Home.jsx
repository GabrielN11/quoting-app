import { View, Text } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../GlobalContext'
import { HomeView } from './styles'
import Feed from '../../components/Feed/Feed'
import Loading from '../../components/Loading/Loading'

export default function Home() {
    const [loading, setLoading] = React.useState(false)
    const {user} = React.useContext(GlobalContext)
  return (
    <HomeView>
      {loading && <Loading/>}
      <View style={{flex: 1}}></View>
      <Feed setLoading={setLoading}/>
      <View style={{flex: 1}}></View>
    </HomeView>
  )
}