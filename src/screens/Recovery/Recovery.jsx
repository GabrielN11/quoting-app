import { View, Text, Alert } from 'react-native'
import React from 'react'
import { FormContainer, FormText, FormInput, FormButton, FormBtnText } from '../../components/Form/styles'
import GoBack from '../../components/GoBack/GoBack'
import Loading from '../../components/Loading/Loading'
import colors from '../../../assets/constants/colors'
import { API_URL } from '../../../enviroment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Recovery({ navigation, route }) {

    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return createAlert('Error', 'Invalid e-mail format.')
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/recovery', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const resp = await json.json()
            setLoading(false)
            if (json.status === 200) {
                await AsyncStorage.setItem('@recovery_token', resp.data.recovery_token)
                createAlert('Success.', resp.message)
                navigation.navigate('Validation', {recovery: true})
            } else {
                createAlert('Error', resp.error)
            }
        } catch (e) {
            createAlert('Error', e.message)
            setLoading(false)
        }
    }

    return (
        <FormContainer>
            <GoBack goBack={navigation.goBack} />
            {loading && <Loading />}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <FormText style={{ fontFamily: 'Montserrat' }}>Enter your registered E-mail to recover your password.</FormText>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
                <FormText>Your E-mail</FormText>
                <FormInput onChangeText={setEmail} value={email} autoFocus returnKeyType="send" onSubmitEditing={() => handleSubmit()} />
            </View>
            <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                <FormBtnText>Send recovery e-mail</FormBtnText>
            </FormButton>
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}