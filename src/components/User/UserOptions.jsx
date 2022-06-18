import { View, Text, Alert } from 'react-native'
import React from 'react'
import Option from '../Options/Option'
import { API_URL } from '../../../env.iroment'
import { GlobalContext } from '../../GlobalContext'

export default function UserOptions({profileUser}) {

    const {user} = React.useContext(GlobalContext)

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    const confirmAction = (title, text, confirmText, action) => {
        Alert.alert(
            title,
            text,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: confirmText, onPress: () => action() },
            ]
        )
    }

    async function toggleBan(){
        try{
            const json = await fetch(API_URL + '/admin-user/' + profileUser.id, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    status: profileUser.active ? false : true
                })
            })
            const resp = await json.json()
            if(json.status === 200){
                createAlert('Success', resp.message)
            }else{
                createAlert('Error', resp.error)
            }
        }catch(e){
            createAlert('Error', e.message)
        }
    }

    async function toggleAdminRights(){
        try{
            const json = await fetch(API_URL + '/set-admin/' + profileUser.id, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                }
            })
            const resp = await json.json()
            if(json.status === 200){
                createAlert('Success', resp.message)
            }else{
                createAlert('Error', resp.error)
            }
        }catch(e){
            createAlert('Error', e.message)
        }
    }

    const options = [
        {
            label: profileUser.is_admin ? 'Remove admin rights' : 'Give admin rights',
            function: () => {
                const action = profileUser.is_admin ? 'Remove' : 'Give'
                confirmAction('Are you sure?', `Are you sure you want to ${action} ${profileUser.username} admin rights?`,
                action, toggleAdminRights)
            },
        },
        {
            label: 'Change password',
            function: () => null,
        },
        {
            label: profileUser.active ? 'Ban' : 'Unban',
            function: () => {
                const action = profileUser.active ? 'Ban' : 'Unban'
                confirmAction('Are you sure?', `Are you sure you want to ${action} ${profileUser.username} ?`,
                action, toggleBan)
            },
        }
    ]

    if(!user.is_admin) return null

    return <Option options={options} size={35}/>
}