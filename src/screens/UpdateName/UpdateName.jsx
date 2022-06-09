import { View, Text, Alert } from 'react-native'
import React from 'react'
import { AuthBtnText, AuthButton, AuthContainer, AuthInput, AuthText, AuthView } from '../../components/Auth/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import CustomTooltip from '../../components/Tooltip/Tooltip'
import GoBack from '../../components/GoBack/GoBack'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../env.iroment'
import Loading from '../../components/Loading/Loading'

export default function UpdateName({route, navigation}) {
    const {newAccount, newUser} = route.params
    const [name, setName] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const {user, setUser} = React.useCallback(GlobalContext)

    const createAlert = (title='Alert Title', message='Alert Message') =>
    Alert.alert(
      title,
      message,
      [
        { text: "OK" }
      ]
    );

    async function handleSubmit(){
        if(name === '') return createAlert('Missing name', 'Type a display name.')
        if(name.length < 3) return createAlert('Invalid name length', 'Your display name is too short.')
        if(!user && !newUser) return
        setLoading(true)
        try{
            const json = await fetch(`${API_URL}/alter-name/${newAccount ? newUser.id : user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${newAccount ? newUser.token : user.token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name})
            })
            if(json.status === 200){
                setUser({...user, name})
                if (newAccount) navigation.navigate('Home')
                else navigation.goBack()
            }else createAlert('Error', 'Something went wrong. Try again.')
        }catch(e){
            createAlert('Error', e.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <AuthContainer>
        {!newAccount && <GoBack/>}
        {loading && <Loading/>}
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 40}}>
        <AuthText style={{fontFamily: 'Montserrat'}}>{newAccount ? 'Set your display name.' : 'Update your display name.'}</AuthText>
        <CustomTooltip text='Your display name is the nickname that will be displayed to others in your publications and commentaries.'/>
      </View>
      <View style={{alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 30}}>
          <AuthText>Type your new display name: {name}</AuthText>
          <AuthInput onChangeText={setName} value={name}/>
      </View>
      <AuthButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
          <AuthBtnText>{newAccount ? 'Define name' : 'Update name'}</AuthBtnText>
      </AuthButton>
      <View style={{ flex : 1 }} />
    </AuthContainer>
  )
}