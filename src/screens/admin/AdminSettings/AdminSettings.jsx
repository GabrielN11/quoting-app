import { View, Text, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../../assets/constants/colors'
import { TouchableItem, TextItem } from '../../Settings/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag, faListUl, faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons'
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
                        action: () => navigation.navigate('SearchUserList', {type: 'user'})
                    },
                    {
                        label: 'Banned List',
                        icon: faUserSlash,
                        action: () => navigation.navigate('SearchUserList', {type: 'banned'})
                    },
                    {
                        label: 'Categories',
                        icon: faListUl,
                        action: () => navigation.navigate('AdminCategoryList')
                    },
                    {
                        label: 'Reports',
                        icon: faFlag,
                        action: () => navigation.navigate('AdminReportList', {type: 'opened'})
                    },
                    {
                        label: 'Closed Reports',
                        icon: faFlag,
                        action: () => navigation.navigate('AdminReportList', {type: 'closed'})
                    }
                ]
                }
                renderItem={({ item }) => <TouchableItem onPress={item.action} background={item.background && item.background}>
                    <FontAwesomeIcon style={{ marginRight: 15 }} icon={item.icon} size={22} color={colors.FONT_DEFAULT_COLOR} />
                    <TextItem>{item.label}</TextItem>
                </TouchableItem>}
            />
        </View>
    )
}