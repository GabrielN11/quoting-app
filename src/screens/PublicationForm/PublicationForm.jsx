import { View, Text, Alert, Platform } from 'react-native'
import { FormBtnText, FormButton, FormContainer, FormInput, FormText } from '../../components/Form/styles'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import colors from '../../../assets/constants/colors'
import Loading from '../../components/Loading/Loading'
import { GlobalContext } from '../../GlobalContext'

import { API_URL } from '../../../enviroment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignUp({ navigation, route }) {
    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [author, setAuthor] = React.useState('');

    const { user, editingPublication } = React.useContext(GlobalContext);
    const { editMode } = route.params
    const textfieldRef = React.useRef()

    React.useEffect(() => {
        if (editMode) {
            setText(editingPublication.text)
            setAuthor(editingPublication.author ? editingPublication.author : null)
        }
    }, [editMode])

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if (text === '') return createAlert('Missing text', 'Write something to publish!')
        if (text.length < 10) return createAlert('Short text', 'Your text is too short.')
        setLoading(true)
        try {
            const json = await fetch(`${API_URL}/publication${editMode ? `/${editingPublication.id}` : ''}`, {
                method: editMode ? 'PUT' : 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    author: author === '' ? null : author,
                    user_id: user.id
                })
            })

            const resp = await json.json()
            if (json.status === 201 || json.status === 200) {
                setLoading(false)
                navigation.replace('Publication', { publicationId: resp.data.id })
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
                {editMode ? 'Changed your mind? Change your publication too!' : 'Tell us what you are thinking!'}
            </FormText>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Text:</FormText>
                <FormInput multiline={true} numberOfLines={4} placeholder='Type the text here...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={text}
                    onChangeText={newText => newText.length < 1000 ? setText(newText) : null}
                    autoFocus
                    returnKeyType="next"
                    onSubmitEditing={() => textfieldRef.current.focus()}/>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5 }}>
                <FormText>Author (optional):</FormText>
                <FormInput placeholder='Author of the text...'
                    placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    value={author}
                    onChangeText={setAuthor}
                    ref={textfieldRef}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit()}/>
            </View>
            <View style={{ alignSelf: 'stretch', marginVertical: 20 }}>
                <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                    <FormBtnText>{editMode ? 'Edit' : 'Publish'}</FormBtnText>
                </FormButton>
            </View>
            {loading && <Loading />}
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}