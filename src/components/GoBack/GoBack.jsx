import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GoBackView } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'


export default function GoBack({goBack}) {
  return (
    <GoBackView>
        <TouchableOpacity onPress={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} color={colors.FONT_DEFAULT_COLOR} size={30}/>
        </TouchableOpacity>
    </GoBackView>
  )
}