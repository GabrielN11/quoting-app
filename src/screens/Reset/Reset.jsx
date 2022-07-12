import { View, Text, Alert } from 'react-native'
import React from 'react'
import { FormContainer, FormText, FormInput, FormButton, FormBtnText } from '../../components/Form/styles'
import Loading from '../../components/Loading/Loading'
import colors from '../../../assets/constants/colors'
import { API_URL } from '../../../enviroment'

export default function Reset({ navigation, route }) {

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const confirmRef = React.useRef()

    const {id} = route.params

    function createAlert (title = 'Alert Title', message = 'Alert Message'){
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );
    }

    async function handleSubmit() {
        if(password.match(/^[\s]*$/) || confirmPassword.match(/^[\s]*$/)) return createAlert('Error', 'Invalid password!')
        if(password.length < 6 || confirmPassword.length < 6) return createAlert('Error', 'Password is too short.')
        if(password !== confirmPassword) return createAlert('Error', "Passwords doesn't match.")
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/recovery/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ password })
            })

            const resp = await json.json()
            setLoading(false)
            if (json.status === 200) {
                createAlert('Success.', resp.message)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Initial' }],
                })
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
            {loading && <Loading />}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 20 }}>
                <FormText style={{ fontFamily: 'Montserrat' }}>Enter your new password.</FormText>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
                <FormText>Password</FormText>
                <FormInput onChangeText={setPassword} secureTextEntry value={password} autoFocus returnKeyType="next" onSubmitEditing={() => confirmRef.current.focus()} />
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
                <FormText>Confirm your password</FormText>
                <FormInput onChangeText={setConfirmPassword} secureTextEntry ref={confirmRef} value={confirmPassword} returnKeyType="send" onSubmitEditing={() => handleSubmit()} />
            </View>
            <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                <FormBtnText>Change Password</FormBtnText>
            </FormButton>
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}