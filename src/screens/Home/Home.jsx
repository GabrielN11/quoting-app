import React from 'react'
import { GlobalContext } from '../../GlobalContext'
import { HomeView } from './styles'
import Feed from '../../components/Feed/Feed'
import Loading from '../../components/Loading/Loading'
import FeedBar from '../../components/FeedBar/FeedBar'
import DrawerHeader from '../../components/DrawerHeader/DrawerHeader'
import { API_URL } from '../../../environment'

export default function Home({navigation}) {
    const [loading, setLoading] = React.useState(true)
    const [followMode, setFollowMode] = React.useState(false)
    const [category, setCategory] = React.useState(-1)


  
  return (
    <HomeView>
      {loading && <Loading/>}
      <DrawerHeader navigation={navigation}/>
      <Feed setLoading={setLoading} followMode={followMode} navigation={navigation} category={category}/>
      <FeedBar followMode={followMode} setFollowMode={setFollowMode} navigation={navigation} setCategory={setCategory}/>
    </HomeView>
  )
}