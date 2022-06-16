import { View, Text, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import DrawerHeader from '../../components/DrawerHeader/DrawerHeader'
import { TextItem, TouchableItem } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faKey, faPen } from '@fortawesome/free-solid-svg-icons'

export default function Settings({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: colors.BACKGROUND}}>
            <DrawerHeader navigation={navigation} />
            <FlatList
                data={[
                    {
                        label: 'Alter name',
                        icon: faPen,
                        action: () => navigation.navigate('UpdateName', {newUser: false})
                    },
                    {
                        label: 'Alter password',
                        icon: faKey,
                        action: () => navigation.navigate('UpdatePassword')
                    },
                ]}
                renderItem={({ item }) => <TouchableItem onPress={item.action}>
                    <FontAwesomeIcon style={{marginRight: 15}} icon={item.icon} size={22} color={colors.FONT_DEFAULT_COLOR}/>
                    <TextItem>{item.label}</TextItem>
                </TouchableItem>}
            />
        </View>
    )
}