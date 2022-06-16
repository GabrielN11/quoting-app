import React from 'react'
import { GlobalContext } from '../../GlobalContext'
import { HomeView } from './styles'
import Feed from '../../components/Feed/Feed'
import Loading from '../../components/Loading/Loading'
import FeedBar from '../../components/FeedBar/FeedBar'
import DrawerHeader from '../../components/DrawerHeader/DrawerHeader'

export default function Home({navigation}) {
    const [loading, setLoading] = React.useState(false)
    const [followMode, setFollowMode] = React.useState(false)
    const {user} = React.useContext(GlobalContext)
  return (
    <HomeView>
      {loading && <Loading/>}
      <DrawerHeader navigation={navigation}/>
      <Feed setLoading={setLoading} followMode={followMode} navigation={navigation}/>
      <FeedBar followMode={followMode} setFollowMode={setFollowMode} navigation={navigation}/>
    </HomeView>
  )
}