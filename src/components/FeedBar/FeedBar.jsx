import { View, Text} from 'react-native'
import React from 'react'
import { BarAdd, BarButton, BarContainer, BarItem } from './styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import CategoriesOptions from './CategoriesOptions'

export default function FeedBar({followMode, setFollowMode, navigation, setCategory}) {
  return (
    <BarContainer>
        <CategoriesOptions icon={faGlobe} setCategory={setCategory} active={followMode} 
        setFollowMode={setFollowMode}/>
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
                <FontAwesomeIcon icon={icon} size={20} color={active ? colors.ACTIVE : colors.FONT_DEFAULT_COLOR}/>
                <Text style={{color: active ? colors.ACTIVE : colors.FONT_DEFAULT_COLOR}}>{text}</Text>
            </BarButton>
        </BarItem>
    )
}