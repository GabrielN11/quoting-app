import { TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import CustomOption from '../Options/CustomOption'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../environment'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function PublicationOptions({ publication, navigation }) {

    const { user, setEditingPublication } = React.useContext(GlobalContext)

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
            'Are you sure you want to delete your publication?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deletePublication() },
            ]
        )
    }

    async function deletePublication() {
        try {
            const resp = await fetch(API_URL + '/publication/' + publication.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
            })

            if (resp.status === 200) {
                createAlert('Success', 'Publication deleted')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Drawer', params: {newAccount: false} }],
                });
            } else {
                const data = await resp.json()
                createAlert('Error', data.error)
            }
        } catch (e) {
            createAlert('Error', e.message)
        }
    }

    async function pinPublication() {
        try {
            const resp = await fetch(API_URL + '/pin/' + publication.id, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({user_id: user.id})
            })
            if(resp.status === 200){
                createAlert('Pinned', 'Publication pinned.')
                publication.pinned = true
            }else{
                const data = await data.json()
                createAlert('Error', data.error)
            }
        } catch (e) {
            console.log(e)
            createAlert('Error', e.message)
        }
    }

    async function unpinPublication() {
        try {
            const resp = await fetch(API_URL + '/pin/' + publication.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                },
            })
            if(resp.status === 200){
                publication.pinned = false
                createAlert('Unpinned', 'Publication unpinned.')
            }else{
                createAlert('Error', data.error)
            }
        } catch (e) {
            createAlert('Error', e.message)
        }
    }

    const options = React.useMemo(() => [
        {
            label: publication.pinned ?  'Unpin' : 'Pin',
            function: () => {
                if(publication.pinned) unpinPublication()
                else pinPublication()
            },
            adminOnly: false,
        },
        {
            label: 'Edit',
            function: () => {
                setEditingPublication(publication)
                navigation.navigate('PublicationForm', { editMode: true })
            },
            adminOnly: false
        },
        {
            label: 'Delete',
            function: confirmDelete,
            adminOnly: false
        }
    ], [publication])


    return (
        <CustomOption ButtonComponent={TouchableOpacity} options={options}>
            <FontAwesomeIcon icon={faGear} size={30} color={colors.FONT_DEFAULT_COLOR}/>
        </CustomOption>
    )
}