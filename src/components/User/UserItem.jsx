import { View, Text } from 'react-native'
import React from 'react'
import { NameText, UserItemButton, UsernameText } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function UserItem({navigation, user}) {
  return (
    <UserItemButton onPress={() => navigation.push('Profile', {profileId: user.id})}>
        <FontAwesomeIcon icon={faUser} size={35} color={colors.FONT_DEFAULT_COLOR}/>
        <View style={{marginLeft: 15}}>
            <NameText>{user.name}</NameText>
            <UsernameText>@{user.username}</UsernameText>
        </View>
    </UserItemButton>
  )
}