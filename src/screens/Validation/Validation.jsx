import { View, Text, Alert } from 'react-native'
import React from 'react'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import colors from '../../../assets/constants/colors'
import CustomTooltip from '../../components/Tooltip/Tooltip'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../enviroment'
import Loading from '../../components/Loading/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Validation({ route, navigation }) {
  const [code, setCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { user, setUser } = React.useContext(GlobalContext)

  React.useEffect(() => {
    createAlert('Validation', 'We sent a validation code to your e-mail. Please use it to validate your account.')
  }, [])

  function createAlert(title = 'Alert Title', message = 'Alert Message'){
    Alert.alert(
      title,
      message,
      [
        { text: "OK" }
      ]
    );
  }

  async function handleSubmit() {
    setLoading(true)
    const token = await AsyncStorage.getItem('@validation_token')
    if(!token){
      setLoading(false)
      return createAlert('Error', 'Something went wrong. Please re-open the app.')
    }
    try {
      const json = await fetch(`${API_URL}/sign-up`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ code, token })
      })
      const response = await json.json()
      if (json.status === 200) {
        setLoading(false)
        setUser(response.data)
        navigation.navigate('UpdateName', {newAccount: true})
      }else{
        setLoading(false)
        createAlert('Error', response.error)
      }
    } catch (e) {
      createAlert('Error', e.message)
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      {loading && <Loading />}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 40 }}>
        <FormText style={{ fontFamily: 'Montserrat' }}>Validate your account</FormText>
      </View>
      <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 30 }}>
        <FormText>Inform your confirmation code:</FormText>
        <FormInput onChangeText={string => string.length < 6 && setCode(string)} value={code} autoFocus returnKeyType="send" onSubmitEditing={() => handleSubmit()}/>
      </View>
      <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
        <FormBtnText>Validate</FormBtnText>
      </FormButton>
      <View style={{ flex: 1 }} />
    </FormContainer>
  )
}