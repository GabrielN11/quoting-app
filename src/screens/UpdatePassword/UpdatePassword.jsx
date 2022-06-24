import { View, Text, Alert } from 'react-native'
import React from 'react'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import colors from '../../../assets/constants/colors'
import GoBack from '../../components/GoBack/GoBack'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../env.iroment'
import Loading from '../../components/Loading/Loading'

export default function UpdatePassword({ navigation }) {
  const [password, setPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { user } = React.useContext(GlobalContext)

  const passwordRef = React.useRef()
  const repeatPasswordRef = React.useRef()

  const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
    Alert.alert(
      title,
      message,
      [
        { text: "OK" }
      ]
    );

  async function handleSubmit() {
    if (password === '' || newPassword === '' || confirmNewPassword === '') return createAlert('Missing field', 'Complete all fields.')
    if (password.length < 6 || newPassword.length < 6 || confirmNewPassword.length < 6) return createAlert('Invalid password length', 'Password is too short.')
    if (newPassword.length > 100 || confirmNewPassword.length > 100) return createAlert('Invalid password length', 'Password is too long.')
    if(confirmNewPassword !== newPassword) return createAlert('Error', "Passwords doesn't match.")
    if(password === newPassword) return createAlert('Error', 'You cannot change to the same password.')

    setLoading(true)
    try {
      const json = await fetch(`${API_URL}/alter-password/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ 
            password: password,
            "new-password": newPassword
         })
      })
      if (json.status === 200) {
        setLoading(false)
        createAlert('Success', 'Password updated.')
        navigation.goBack()
      }else{
        const resp = await json.json()
        setLoading(false)
        createAlert('Error', resp.error)
      }
    } catch (e) {
      createAlert('Error', e.message)
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      <GoBack goBack={navigation.goBack}/>
      {loading && <Loading />}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <FormText style={{ fontFamily: 'Montserrat' }}>Change your password.</FormText>
      </View>
      <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
        <FormText>Type your current password</FormText>
        <FormInput secureTextEntry onChangeText={setPassword} value={password}
        returnKeyType="next" onSubmitEditing={() => passwordRef.current.focus()} />
      </View>
      <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
        <FormText>Type your new password</FormText>
        <FormInput secureTextEntry onChangeText={setNewPassword} value={newPassword}
        ref={passwordRef} returnKeyType="next" onSubmitEditing={() => repeatPasswordRef.current.focus()} />
      </View>
      <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 30 }}>
        <FormText>Confirm your new password</FormText>
        <FormInput secureTextEntry onChangeText={setConfirmNewPassword} value={confirmNewPassword}
        ref={repeatPasswordRef} returnKeyType='send' onSubmitEditing={() => handleSubmit()}/>
      </View>
      <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
        <FormBtnText>Alter password</FormBtnText>
      </FormButton>
      <View style={{ flex: 1 }} />
    </FormContainer>
  )
}