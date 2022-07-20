import { View, Text, Alert, Platform } from 'react-native'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import colors from '../../../assets/constants/colors'
import Loading from '../../components/Loading/Loading'
import { GlobalContext } from '../../GlobalContext'

import { API_URL } from '../../../environment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignUp({ navigation }) {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const { user, setUser } = React.useContext(GlobalContext);

    const emailRef = React.useRef()
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
                    password,
                    email
                })
            })
            const response = await json.json()
            if(json.status === 201) {
                await AsyncStorage.setItem('@validation_token', response.data.validation_token)
                navigation.navigate('Validation', {recovery: false})
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
        <FormContainer behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <GoBack goBack={navigation.goBack} />
            <FormText style={{ fontFamily: 'Montserrat' }}>Create a new account!</FormText>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>User name:</FormText>
                <FormInput placeholder='Type your use name here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={username}
                    onChangeText={setUsername}
                    returnKeyType="next"
                    autoCapitalize='none'
                    onSubmitEditing={() => emailRef.current.focus()}/>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Email:</FormText>
                <FormInput placeholder='Type your email here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    ref={emailRef}
                    onChangeText={setEmail}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}/>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Password:</FormText>
                <FormInput secureTextEntry={true} placeholder='Type your password here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={password}
                    autoCapitalize='none'
                    onChangeText={setPassword} 
                    ref={passwordRef}
                    returnKeyType="next"
                    onSubmitEditing={() => repeatPasswordRef.current.focus()}/>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Repeat your password:</FormText>
                <FormInput secureTextEntry={true} placeholder='Type your password again..'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    ref={repeatPasswordRef}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit()} />
            </View>
            <View style={{ alignSelf: 'stretch', marginVertical: 20 }}>
                <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                    <FormBtnText>Sign up</FormBtnText>
                </FormButton>
            </View>
            {loading && <Loading />}
            <View style={{ flex : 1 }} />
        </FormContainer>
    )
}