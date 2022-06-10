import { TouchableOpacity } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../GlobalContext'
import { HomeHeader, HomeView } from './styles'
import Feed from '../../components/Feed/Feed'
import Loading from '../../components/Loading/Loading'
import FeedBar from '../../components/FeedBar/FeedBar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function Home({navigation}) {
    const [loading, setLoading] = React.useState(false)
    const [followMode, setFollowMode] = React.useState(false)
    const {user} = React.useContext(GlobalContext)
  return (
    <HomeView>
      {loading && <Loading/>}
      <HomeHeader>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesomeIcon icon={faBars} color={colors.FONT_DEFAULT_COLOR} size={30}/>
        </TouchableOpacity>
      </HomeHeader>
      <Feed setLoading={setLoading} followMode={followMode}/>
      <FeedBar followMode={followMode} setFollowMode={setFollowMode} navigation={navigation}/>
    </HomeView>
  )
}