import { View, Text, Alert } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../../GlobalContext'
import { FormContainer, FormText, FormInput, FormButton, FormBtnText } from '../../../components/Form/styles'
import GoBack from '../../../components/GoBack/GoBack'
import Loading from '../../../components/Loading/Loading'
import colors from '../../../../assets/constants/colors'
import { API_URL } from '../../../../environment'

export default function AdminChangePassword({ navigation, route }) {

    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const { user } = React.useContext(GlobalContext)
    const { userId, username } = route.params

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if (password === '') return createAlert('Missing password', 'Inform the new password.')
        if (password.length < 6) return createAlert('Invalid password length', 'Password is too short.')
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/change-password/' + userId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ password })
            })

            const resp = await json.json()
            setLoading(false)
            if (json.status === 200) {

                createAlert('Success.', resp.message)
                navigation.goBack()
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
                <FormText style={{ fontFamily: 'Montserrat' }}>Change {username}'s password.</FormText>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
                <FormText>Type the new password</FormText>
                <FormInput secureTextEntry onChangeText={setPassword} value={password} autoFocus returnKeyType="send" onSubmitEditing={() => handleSubmit()} />
            </View>
            <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                <FormBtnText>Alter password</FormBtnText>
            </FormButton>
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}