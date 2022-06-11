import { View, Text, Alert } from 'react-native'
import React from 'react'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import colors from '../../../assets/constants/colors'
import CustomTooltip from '../../components/Tooltip/Tooltip'
import GoBack from '../../components/GoBack/GoBack'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../env.iroment'
import Loading from '../../components/Loading/Loading'

export default function UpdateName({route, navigation}) {
    const {newAccount} = route.params
    const [name, setName] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const {user, setUser} = React.useContext(GlobalContext)

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
        if(!user) return
        setLoading(true)
        try{
            const json = await fetch(`${API_URL}/alter-name/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name})
            })
            if(json.status === 200){
                setUser(current => ({...current, name}))
                if (newAccount) navigation.navigate('Drawer')
                else navigation.goBack()
            }else createAlert('Error', 'Something went wrong. Try again.')
        }catch(e){
            createAlert('Error', e.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <FormContainer>
        {!newAccount && <GoBack/>}
        {loading && <Loading/>}
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 40}}>
        <FormText style={{fontFamily: 'Montserrat'}}>{newAccount ? 'Set your display name.' : 'Update your display name.'}</FormText>
        <CustomTooltip text='Your display name is the nickname that will be displayed to others in your publications and commentaries.'/>
      </View>
      <View style={{alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 30}}>
          <FormText>Type your new display name: {name}</FormText>
          <FormInput onChangeText={setName} value={name}/>
      </View>
      <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
          <FormBtnText>{newAccount ? 'Define name' : 'Update name'}</FormBtnText>
      </FormButton>
      <View style={{ flex : 1 }} />
    </FormContainer>
  )
}