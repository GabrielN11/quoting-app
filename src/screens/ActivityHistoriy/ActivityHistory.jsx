import { View, Text, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import { TouchableItem, TextItem } from '../Settings/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag, faHeart, faListUl, faMessage, faQuoteLeft, faQuoteRight, faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import GoBack from '../../components/GoBack/GoBack'
import { GlobalContext } from '../../GlobalContext'

export default function ActivityHistory({ navigation }) {
    const {user} = React.useContext(GlobalContext)
    return (
        <View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
            <GoBack goBack={navigation.goBack}/>
            <FlatList
                data={[
                    {
                        label: 'Your Favorites',
                        icon: faHeart,
                        action: () => navigation.navigate('ShareList', {profileId: user.id, profileName: user.name})
                    },
                    {
                        label: 'Your Commentaries',
                        icon: faMessage,
                        action: () => navigation.navigate('CommentariesList', {profileId: user.id, profileName: user.name})
                    },
                    {
                        label: 'Your Publications',
                        icon: faQuoteLeft,
                        action: () => navigation.navigate('PublicationList', {profileId: user.id, profileName: user.name})
                    },
                    {
                        label: "Publications You've Seen",
                        icon: faQuoteRight,
                        action: () => navigation.navigate('SeenPublicationsList')
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