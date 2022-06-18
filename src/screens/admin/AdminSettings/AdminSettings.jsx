import { View, Text, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../../assets/constants/colors'
import { TouchableItem, TextItem } from '../../Settings/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import GoBack from '../../../components/GoBack/GoBack'

export default function AdminSettings({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
            <GoBack goBack={navigation.goBack}/>
            <FlatList
                data={[
                    {
                        label: 'User List',
                        icon: faUser,
                        action: () => navigation.navigate('AdminUserList')
                    }]
                }
                renderItem={({ item }) => <TouchableItem onPress={item.action} background={item.background && item.background}>
                    <FontAwesomeIcon style={{ marginRight: 15 }} icon={item.icon} size={22} color={colors.FONT_DEFAULT_COLOR} />
                    <TextItem>{item.label}</TextItem>
                </TouchableItem>}
            />
        </View>
    )
}