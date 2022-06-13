import { View, Text, Alert } from 'react-native'
import React from 'react'
import Option from '../Options/Option'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../env.iroment'

export default function PublicationOptions({publication, navigation}) {

    const {user, setEditingPublication} = React.useContext(GlobalContext)

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
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', onPress: () =>  deletePublication()},
            ]
        )
    }

    async function deletePublication(id){
        try{
            const resp = await fetch(API_URL + '/publication/' + publication.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
            })

            if(resp.status === 200){
                createAlert('Success', 'Publication deleted')
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Drawer'}],
                  });
            }else{
                const data = await resp.json()
                createAlert('Error', data.error)
            }
        }catch(e){
            createAlert('Error', e.message)
        }
    }

    const [options] = React.useState([
        {
            label: 'Pin',
            function: () => null,
            adminOnly: false,
        },
        {
            label: 'Edit',
            function: () => {
                setEditingPublication(publication)
                navigation.navigate('PublicationForm', {editMode: true})
            },
            adminOnly: false
        },
        {
            label: 'Delete',
            function: confirmDelete,
            adminOnly: false
        }
    ])
    

  return (
    <Option options={options}/>
  )
}