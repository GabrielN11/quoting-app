import { View, ScrollView, Text, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import { FollowInfo, PinnedView, ProfileCount, ProfileItem, ProfileItemsView, ProfileName, ProfileText, ProfileUsername } from './styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserXmark, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import PublicationItem from '../../components/Publication/PublicationItem'
import Loading from '../../components/Loading/Loading'
import { API_URL } from '../../../enviroment'
import { GlobalContext } from '../../GlobalContext'
import UserOptions from '../../components/User/UserOptions'

export default function Profile({ navigation, route }) {

    const [loading, setLoading] = React.useState(false)
    const [pinnedPublication, setPinnedPublication] = React.useState(null)
    const [follow, setFollow] = React.useState(null)
    const [profileUser, setProfileUser] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);

    const { user } = React.useContext(GlobalContext)
    const {profileId} = route.params

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        getUser().then(() => setRefreshing(false))
    }, []);

    React.useEffect(() => {
        getUser()
    }, [route])

    React.useEffect(() => {
        if(profileUser){
            if (profileUser.pinned_publication) getPinnedPublication()
            else setPinnedPublication(null)
            getFollow()
        }
    }, [profileUser])

    async function getUser(){
        setLoading(true)
        try{
            const json = await fetch(API_URL + '/profile/' + profileId)
            const resp = await json.json()
            if(json.status === 200){
                setProfileUser(resp.data)
            }else{
                console.log(resp.error)
            }
        }catch(e){
            resp.error
        }finally{
            setLoading(false)
            return
        }
    }

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
            console.log(e.message)
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
            {profileUser && <ScrollView style={{ marginHorizontal: 15 }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <ProfileName>{profileUser.name}</ProfileName>
                <ProfileUsername>@{profileUser.username}</ProfileUsername>

                {user.id !== profileUser.id && <TouchableOpacity style={{ marginTop: 25, alignItems: 'center' }}
                onPress={() => follow ? fetchUnfflow() : fetchFollow()}>
                    <FontAwesomeIcon icon={follow ? faUserXmark : faUserPlus} size={30} color={follow ? 'lightgreen' : colors.FONT_DEFAULT_COLOR} />
                    <ProfileText color={follow && 'lightgreen'} style={{ alignSelf: 'center', fontSize: 16 }}>{follow ? 'Unfollow' : 'Follow'}</ProfileText>
                </TouchableOpacity>}

                {(user.is_admin && user.id !== profileUser.id) && <View style={{alignSelf: 'center', marginTop: 20}}>
                    <UserOptions profileUser={profileUser} navigation={navigation}/>    
                </View>}

                {pinnedPublication && <PinnedView>
                    <ProfileText style={{marginHorizontal: 25, fontSize: 16}}>Pinned Publication</ProfileText>
                    <PublicationItem publication={pinnedPublication} navigation={navigation} />
                </PinnedView>}

                <ProfileItemsView>
                    <Item background='darkorange' center screen='UserList' profileUser={profileUser} props={{type: 'followers'}} text='Followers'
                    navigation={navigation}/>

                    <Item background='#00A3A3' center screen='UserList' profileUser={profileUser} props={{type: 'following'}} text='Following'
                    navigation={navigation}/>

                    <Item background={colors.BUTTON_BACKGROUND_PRIMARY} screen='PublicationList' profileUser={profileUser} text='Publications'
                    navigation={navigation} count={profileUser.publication_count}/>

                    <Item background='darkgreen' screen='CommentariesList' profileUser={profileUser} text='Commentaries'
                    navigation={navigation} count={profileUser.commentary_count}/>

                    <Item background='brown' screen='ShareList' profileUser={profileUser} text='Favorites'
                    navigation={navigation} count={profileUser.share_count}/>
                </ProfileItemsView>
            </ScrollView>}
        </View>
    )
}

const Item = ({navigation, screen, background, text, count = false, center = false, profileUser, props = {}}) => {
    return <ProfileItem backgroundColor={background} 
    onPress={() => navigation.push(screen, {profileId: profileUser.id, profileName: profileUser.name, ...props})} center={center}>
        <ProfileText>{text}</ProfileText>
        {count !== false && <ProfileCount>{count}</ProfileCount>}
    </ProfileItem>
}