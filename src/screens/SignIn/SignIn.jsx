import { View, TouchableOpacity, Alert, Platform } from 'react-native'
import { StackActions, NavigationActions } from '@react-navigation/native'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import colors from '../../../assets/constants/colors'
import Loading from '../../components/Loading/Loading'
import { GlobalContext } from '../../GlobalContext'

import { API_URL } from '../../../enviroment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignIn({ navigation }) {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { user, setUser } = React.useContext(GlobalContext)
    const passwordFieldRef = React.useRef()

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
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/sign-in', {
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
            if(json.status === 403 && response.data){
                await AsyncStorage.setItem('@validation_token', response.data.validation_token)
                setLoading(false)
                return navigation.navigate('Validation')
            }
            if (json.status !== 200){
                setLoading(false)
                return createAlert('Error.', response.error)
            }
            else {
                await AsyncStorage.setItem('@user_token', response.data.token)
                setUser(response.data)
                setLoading(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Drawer', params: {newAccount: false} }],
                  });
            }
        } catch (e) {
            setLoading(false)
            createAlert('Error', e.message)
        }
    }

    return (
        <FormContainer behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <GoBack goBack={navigation.goBack} />
            <FormText style={{ fontFamily: 'Montserrat' }}>Sign in your account!</FormText>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                <FormText>User name:</FormText>
                <FormInput placeholder='Type your use name here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={username}
                    onChangeText={setUsername} 
                    autoFocus
                    returnKeyType="next"
                    onSubmitEditing={() => passwordFieldRef.current.focus()}/>
            </View>
            <View style={{ alignSelf: 'stretch', padding: 20 }}>
                <FormText>Password:</FormText>
                <FormInput secureTextEntry={true} placeholder='Type your password here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={password}
                    onChangeText={setPassword} 
                    returnKeyType="send"
                    ref={passwordFieldRef}
                    onSubmitEditing={() => handleSubmit()}/>
            </View>
            <View style={{ alignSelf: 'stretch', marginVertical: 20 }}>
                <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                    <FormBtnText>Sign in</FormBtnText>
                </FormButton>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
                    <FormText style={{fontSize: 18}}>Forgot my password</FormText>
                </TouchableOpacity>
            </View>
            {loading && <Loading />}
            <View style={{ flex : 1 }} />
        </FormContainer>
    )
}