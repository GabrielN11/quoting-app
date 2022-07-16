import { View, Text, Alert, Platform } from 'react-native'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import colors from '../../../assets/constants/colors'
import Loading from '../../components/Loading/Loading'
import { GlobalContext } from '../../GlobalContext'

import { API_URL } from '../../../environment'

export default function ReportForm({ navigation, route }) {
    const [loading, setLoading] = React.useState(false)
    const [text, setText] = React.useState('')
    const [title, setTitle] = React.useState('')

    const textFieldRef = React.useRef()
    const {user} = React.useContext(GlobalContext)
    const { publicationId = null, commentaryId = null } = route.params

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if (text.match(/^[\s]*$/)) return createAlert('Missing text', 'Describe what is the issue.')
        if (title.match(/^[\s]*$/)) return createAlert('Missing title', 'Give your report a short title.')
        setLoading(true)
        try {
            const json = await fetch(`${API_URL}/report`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    text,
                    user_id: user.id,
                    publication_id: publicationId,
                    commentary_id: commentaryId
                })
            })

            const resp = await json.json()
            if (json.status === 201) {
                setLoading(false)
                createAlert('Success', resp.message)
                navigation.goBack()
            } else {
                createAlert('Error', resp.error)
                setLoading(false)
            }
        } catch (e) {
            createAlert('Error', resp.error)
            setLoading(false)
        }
    }

    return (
        <FormContainer behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <GoBack goBack={navigation.goBack} />
            <FormText style={{ fontFamily: 'Montserrat' }}>
                Report the problem below.
            </FormText>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Title:</FormText>
                <FormInput placeholder='Give your report a title'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="next"
                    onSubmitEditing={() => textFieldRef.current.focus()}
                />
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Text:</FormText>
                <FormInput multiline={true} numberOfLines={4} placeholder='Type the text here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={text}
                    onChangeText={newText => newText.length < 1000 ? setText(newText) : null}
                    ref={textFieldRef}/>
            </View>
            <View style={{ alignSelf: 'stretch', marginVertical: 20 }}>
                <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                    <FormBtnText>Send Report</FormBtnText>
                </FormButton>
            </View>
            {loading && <Loading />}
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}