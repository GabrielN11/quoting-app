import { View, Text } from 'react-native'
import { AuthBtnText, AuthButton, AuthContainer, AuthInput, AuthText } from '../../components/Auth/styles'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import colors from '../../../assets/constants/colors'
import Loading from '../../components/Loading/Loading'

import { API_URL } from '../../../env.iroment'

export default function SignIn({ navigation }) {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleSubmit(){
        //validation
        setLoading(true)
        try{
            console.log(API_URL + '/sign-in')
            const json = await fetch(API_URL + '/sign-in', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const user = await json.json()
            console.log(user)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    return (
        <AuthContainer>
            <GoBack goBack={navigation.goBack} />
            <AuthText style={{ fontFamily: 'Montserrat' }}>Sign in your account!</AuthText>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                <AuthText>Username:</AuthText>
                <AuthInput placeholder='Type your username here...' 
                placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                value={username}
                onChangeText={setUsername} />
            </View>
            <View style={{ alignSelf: 'stretch', padding: 20 }}>
                <AuthText>Password:</AuthText>
                <AuthInput secureTextEntry={true} placeholder='Type your password here...'
                placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                value={password}
                onChangeText={setPassword} />
            </View>
            <View style={{alignSelf: 'stretch', marginTop: 20}}>
                <AuthButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                    <AuthBtnText>Sign in</AuthBtnText>
                </AuthButton>
            </View>
            {loading && <Loading/>}
        </AuthContainer>
    )
}