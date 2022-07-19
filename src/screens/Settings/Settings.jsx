import { View, Text, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import DrawerHeader from '../../components/DrawerHeader/DrawerHeader'
import { TextItem, TextTitle, TouchableItem } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCrown, faKey, faPen, faRightFromBracket, faList } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GlobalContext } from '../../GlobalContext'

export default function Settings({ navigation }) {

    const {user} = React.useContext(GlobalContext)

    async function logout() {
        await AsyncStorage.removeItem('@user_token')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Initial' }],
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
            <DrawerHeader navigation={navigation} />
            <FlatList
                data={[
                    {
                        label: 'Alter name',
                        icon: faPen,
                        action: () => navigation.navigate('UpdateName', { newUser: false })
                    },
                    {
                        label: 'Alter password',
                        icon: faKey,
                        action: () => navigation.navigate('UpdatePassword')
                    },
                    {
                        label: 'Activity History',
                        icon: faList,
                        action: () => navigation.navigate('ActivityHistory')
                    },
                    {
                        label: 'Admin Settings',
                        icon: faCrown,
                        action: () => navigation.navigate('AdminSettings'),
                        adminOnly: true
                    },
                    {
                        label: 'Logout',
                        icon: faRightFromBracket,
                        action: logout,
                        background: colors.ALERT
                    },
                ]}
                renderItem={({ item }) => {
                    if(item.adminOnly){
                        if(user.is_admin) return <TouchableItem onPress={item.action} background={item.background && item.background}>
                        <FontAwesomeIcon style={{ marginRight: 15 }} icon={item.icon} size={22} color={colors.FONT_DEFAULT_COLOR} />
                        <TextItem>{item.label}</TextItem>
                    </TouchableItem>
                    }else{
                        return <TouchableItem onPress={item.action} background={item.background && item.background}>
                        <FontAwesomeIcon style={{ marginRight: 15 }} icon={item.icon} size={22} color={colors.FONT_DEFAULT_COLOR} />
                        <TextItem>{item.label}</TextItem>
                    </TouchableItem>
                    }
                }}
            />
        </View>
    )
}