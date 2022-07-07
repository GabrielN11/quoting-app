import { View, Text, Alert } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../../GlobalContext'
import { FormContainer, FormText, FormInput, FormButton, FormBtnText } from '../../../components/Form/styles'
import GoBack from '../../../components/GoBack/GoBack'
import Loading from '../../../components/Loading/Loading'
import colors from '../../../../assets/constants/colors'
import { API_URL } from '../../../../enviroment'

export default function AdminCategoryForm({ navigation, route }) {

    const [name, setName] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const { user, loadCategories } = React.useContext(GlobalContext)
    const { id, categoryName } = route.params

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function handleSubmit() {
        if (name === '') return createAlert('Missing name', 'Inform the new name.')
        setLoading(true)
        try {
            const json = await fetch(API_URL + `${id ? `/category/${id}`:
            '/category'}`, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ name })
            })

            const resp = await json.json()
            setLoading(false)
            if (json.status === 201) {
                createAlert('Success', resp.message)
                loadCategories()
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
                <FormText style={{ fontFamily: 'Montserrat' }}>{categoryName ? `Editing ${categoryName}.` : 'Create a new category.'}</FormText>
            </View>
            <View style={{ alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: 15 }}>
                <FormText>Type the name</FormText>
                <FormInput onChangeText={setName} value={name} autoFocus returnKeyType="send" onSubmitEditing={() => handleSubmit()} />
            </View>
            <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={handleSubmit}>
                <FormBtnText>{categoryName? 'Alter name' : 'Create Category'}</FormBtnText>
            </FormButton>
            <View style={{ flex: 1 }} />
        </FormContainer>
    )
}