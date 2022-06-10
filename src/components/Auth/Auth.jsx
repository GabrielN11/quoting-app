import { View, Text } from 'react-native'
import React from 'react'
import { AuthView } from './styles'
import { FormBtnText, FormButton, FormText } from '../Form/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function Auth({navigation}) {
  return (
    <AuthView>
      <FontAwesomeIcon icon={faUserPen} size={50} color={colors.FONT_DEFAULT_PLACEHOLDER}/>
      <View style={{marginBottom: 25, marginTop: 25}}>
        <FormText>Create a new account...</FormText>
        <FormButton style={{backgroundColor: colors.BUTTON_BACKGROUND_PRIMARY}} onPress={() => navigation.navigate('SignUp')}>
          <FormBtnText>Sign up</FormBtnText>
        </FormButton>
      </View>
      <View>
        <FormText>...or sign in your account.</FormText>
        <FormButton onPress={() => navigation.navigate('SignIn')}>
          <FormBtnText color={colors.FONT_SECONDARY_COLOR}>Sign in</FormBtnText>
        </FormButton>
      </View>
    </AuthView>
  )
}