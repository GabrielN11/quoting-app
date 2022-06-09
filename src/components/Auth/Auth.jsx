import { View, Text } from 'react-native'
import React from 'react'
import { AuthBtnText, AuthButton, AuthText, AuthView } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function Auth({navigation}) {
  return (
    <AuthView>
      <FontAwesomeIcon icon={faUserPen} size={50} color={colors.FONT_DEFAULT_PLACEHOLDER}/>
      <View style={{marginBottom: 25, marginTop: 25}}>
        <AuthText>Create a new account...</AuthText>
        <AuthButton style={{backgroundColor: colors.BUTTON_BACKGROUND_PRIMARY}} onPress={() => navigation.navigate('SignUp')}>
          <AuthBtnText>Sign up</AuthBtnText>
        </AuthButton>
      </View>
      <View>
        <AuthText>...or sign in your account.</AuthText>
        <AuthButton onPress={() => navigation.navigate('SignIn')}>
          <AuthBtnText color={colors.FONT_SECONDARY_COLOR}>Sign in</AuthBtnText>
        </AuthButton>
      </View>
    </AuthView>
  )
}