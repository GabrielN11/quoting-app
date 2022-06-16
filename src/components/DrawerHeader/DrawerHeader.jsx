import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerHeaderView } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'


export default function DrawerHeader({navigation}) {
  return (
    <DrawerHeaderView>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesomeIcon icon={faBars} color={colors.FONT_DEFAULT_COLOR} size={30}/>
        </TouchableOpacity>
      </DrawerHeaderView>
  )
}