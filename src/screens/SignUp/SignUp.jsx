import { View, Text, Alert, Platform } from 'react-native'
import { AuthBtnText, AuthButton, AuthContainer, AuthInput, AuthText } from '../../components/Auth/styles'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import colors from '../../../assets/constants/colors'
import Loading from '../../components/Loading/Loading'
import { GlobalContext } from '../../GlobalContext'

import { API_URL } from '../../../env.iroment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignUp({ navigation }) {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const { user, setUser } = React.useContext(GlobalContext);

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if (username === '') return createAlert('Missing user name.', 'Type your user name in the field.')
        if (username.length < 3) return createAlert('Invalid user name length.', 'The informed username is too short.')
        if (password === '') return createAlert('Missing password.', 'Type your password in the field.')
        if (password.length < 6) return createAlert('Invalid password length.', 'The informed password is too short.')
        if(password !== repeatPassword) return createAlert("Passwords doesn't match.", "Check your password.")
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const response = await json.json()
            if(json.status === 201) {
                await AsyncStorage.setItem('@user_token', response.data.token)
                setUser(response.data)
                navigation.navigate('UpdateName', {newAccount: true, newUser: response.data})
            }else{
                createAlert('Error', response.error)
            }
        } catch (e) {
            createAlert('Error', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContainer behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <GoBack goBack={navigation.goBack} />
            <AuthText style={{ fontFamily: 'Montserrat' }}>Create a new account!</AuthText>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <AuthText>User name:</AuthText>
                <AuthInput placeholder='Type your use name here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={username}
                    onChangeText={setUsername} />
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <AuthText>Password:</AuthText>
                <AuthInput secureTextEntry={true} placeholder='Type your password here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={password}
                    onChangeText={setPassword} />
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <AuthText>Repeat your password:</AuthText>
                <AuthInput secureTextEntry={true} placeholder='Type your password again..'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={repeatPassword}
                    onChangeText={setRepeatPassword} />
            </View>
            <View style={{ alignSelf: 'stretch', marginVertical: 20 }}>
                <AuthButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                    <AuthBtnText>Sign up</AuthBtnText>
                </AuthButton>
            </View>
            {loading && <Loading />}
            <View style={{ flex : 1 }} />
        </AuthContainer>
    )
}