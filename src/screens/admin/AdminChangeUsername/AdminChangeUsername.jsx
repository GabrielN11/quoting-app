import { View, Text, Alert } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../../GlobalContext'
import { FormContainer, FormText, FormInput, FormButton, FormBtnText } from '../../../components/Form/styles'
import GoBack from '../../../components/GoBack/GoBack'
import Loading from '../../../components/Loading/Loading'
import colors from '../../../../assets/constants/colors'
import { API_URL } from '../../../../enviroment'

export default function AdminChangeUsername({ navigation, route }) {

    const [username, setUsername] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const { user } = React.useContext(GlobalContext)
    const { userId, currentUsername } = route.params

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if (username === '') return createAlert('Missing username', 'Inform the new username.')
        if (username.length < 3) return createAlert('Invalid username length', 'Username is too short.')
        if (username.length > 20) return createAlert('Invalid username length', 'Username is too long.')
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/change-username/' + userId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username })
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
                <FormText style={{ fontFamily: 'Montserrat' }}>Change {currentUsername}'s username.</FormText>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
                <FormText>Type the new Username</FormText>
                <FormInput onChangeText={setUsername} value={username} autoFocus returnKeyType="send" onSubmitEditing={() => handleSubmit()} />
            </View>
            <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                <FormBtnText>Alter Username</FormBtnText>
            </FormButton>
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}