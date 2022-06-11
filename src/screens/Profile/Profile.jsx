import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import { PinnedView, ProfileCount, ProfileItem, ProfileItemsView, ProfileName, ProfileText, ProfileUsername } from './styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserXmark, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import PublicationItem from '../../components/Publication/PublicationItem'
import Loading from '../../components/Loading/Loading'
import { API_URL } from '../../../env.iroment'
import { GlobalContext } from '../../GlobalContext'

export default function Profile({ navigation, route }) {

    const [loading, setLoading] = React.useState(false)
    const [pinnedPublication, setPinnedPublication] = React.useState(null)
    const [follow, setFollow] = React.useState(null)

    const { user } = React.useContext(GlobalContext)
    const {profileUser} = route.params

    React.useEffect(() => {
        if (user.pinned_publication) getPinnedPublication()
        getFollow()
    }, [])

    async function getFollow() {
        try {
            const resp = await fetch(API_URL + '/follow/' + profileUser.id, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const { data } = await resp.json()
            if (resp.status === 200) setFollow(data)
        } catch (e) {

        }
    }

    async function getPinnedPublication() {
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/publication-by-id/' + profileUser.pinned_publication)
            const resp = await json.json()
            if (json.status === 200) {
                setPinnedPublication(resp.data)
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    async function fetchFollow() {
        try {
            const resp = await fetch(API_URL + '/follow/' + profileUser.id, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const { data } = await resp.json()
            if (resp.status === 201) setFollow(data)
        } catch (e) {

        }
    }

    async function fetchUnfflow() {
        try {
            const resp = await fetch(API_URL + '/follow/' + follow, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            if (resp.status === 200) setFollow(null)
        } catch (e) {

        }
    }

    return (
        <View style={{ height: '100%', alignItems: 'center', backgroundColor: colors.BACKGROUND }}>
            <GoBack goBack={navigation.goBack} />
            {loading && <Loading />}
            <ScrollView style={{ marginHorizontal: 15 }}>
                <ProfileName>{profileUser.name}</ProfileName>
                <ProfileUsername>@{profileUser.username}</ProfileUsername>
                {user.id !== profileUser.id && <TouchableOpacity style={{ marginTop: 25, alignItems: 'center' }}
                onPress={() => follow ? fetchUnfflow() : fetchFollow()}>
                    <FontAwesomeIcon icon={follow ? faUserXmark : faUserPlus} size={40} color={follow ? 'lightgreen' : colors.FONT_DEFAULT_COLOR} />
                    <ProfileText color={follow && 'lightgreen'} style={{ alignSelf: 'center' }}>{follow ? 'Unfollow' : 'Follow'}</ProfileText>
                </TouchableOpacity>}
                {pinnedPublication && <PinnedView>
                    <ProfileText>Pinned Publication</ProfileText>
                    <PublicationItem publication={pinnedPublication} />
                </PinnedView>}
                <ProfileItemsView>
                    <ProfileItem backgroundColor='brown' onPress={() => navigation.navigate('PublicationList', {profileUser})}>
                        <ProfileText>Publications</ProfileText>
                        <ProfileCount>{profileUser.publication_count}</ProfileCount>
                    </ProfileItem>
                    <ProfileItem backgroundColor='darkgreen' onPress={() => navigation.navigate('CommentariesList', {profileUser})}>
                        <ProfileText>Commentaries</ProfileText>
                        <ProfileCount>{profileUser.commentary_count}</ProfileCount>
                    </ProfileItem>
                    <ProfileItem backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={() => navigation.navigate('ShareList', {profileUser})}>
                        <ProfileText>Favorites</ProfileText>
                        <ProfileCount>{profileUser.share_count}</ProfileCount>
                    </ProfileItem>
                </ProfileItemsView>
            </ScrollView>
        </View>
    )
}