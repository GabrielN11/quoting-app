import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { LoadingContainer } from './styles'
import colors from '../../../assets/constants/colors'

export default function Loading({transparent}) {
  return (
    <LoadingContainer transparent={transparent}>
        <ActivityIndicator size="large" color={colors.BUTTON_BACKGROUND_PRIMARY}/>
    </LoadingContainer>
  )
}