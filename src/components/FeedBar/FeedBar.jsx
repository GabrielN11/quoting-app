import { View, Text} from 'react-native'
import React from 'react'
import { BarAdd, BarButton, BarContainer, BarItem } from './styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'

export default function FeedBar({followMode, setFollowMode, navigation}) {
  return (
    <BarContainer>
        <FeedBarItem active={!followMode} setFollowMode={setFollowMode} text='All' icon={faGlobe}/>
        <BarAdd>
            <BarButton onPress={() => navigation.navigate('PublicationForm', {editMode: false})}>
                <FontAwesomeIcon icon={faPlus} size={40} color={colors.FONT_DEFAULT_COLOR}/>
            </BarButton>
        </BarAdd>
        <FeedBarItem active ={followMode} setFollowMode={setFollowMode} text='Following' icon={faUserGroup}/>
    </BarContainer>
  )
}

function FeedBarItem({text, icon, active=true, setFollowMode}){
    return (
        <BarItem>
            <BarButton onPress={() => active ? null : setFollowMode(current => !current)}>
                <FontAwesomeIcon icon={icon} size={20} color={active ? 'orange' : colors.FONT_DEFAULT_COLOR}/>
                <Text style={{color: active ? 'orange' : colors.FONT_DEFAULT_COLOR}}>{text}</Text>
            </BarButton>
        </BarItem>
    )
}