import { View, Text, Alert } from 'react-native'
import React from 'react'
import Option from '../Options/Option'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../enviroment'

export default function CommentaryOptions({ commentary, navigation }) {

    const { user } = React.useContext(GlobalContext)

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    const confirmDelete = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete your commentary?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteCommentary() },
            ]
        )
    }

    async function deleteCommentary() {
        try {
            const resp = await fetch(API_URL + '/commentary/' + commentary.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
            })

            if (resp.status === 200) {
                createAlert('Success', 'Commentary deleted')
                navigation.replace('Commentaries', {publicationId: commentary.publication_id})
            } else {
                const data = await resp.json()
                createAlert('Error', data.error)
            }
        } catch (e) {
            createAlert('Error', e.message)
        }
    }

    const options = React.useMemo(() => [
        {
            label: 'Delete',
            function: confirmDelete,
        }
    ], [commentary])


    return (
        <Option options={options} size={25} />
    )
}