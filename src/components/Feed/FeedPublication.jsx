import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { PublicationView, PublicationWarning, PublicationText, PublicationAuthor, PublicationActions, PublicationShowMore } from './styles'
import ResetSvg from '../../../assets/reset.svg'
import UnloadedSvg from '../../../assets/unloaded.svg'
import { GlobalContext } from '../../GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMessage, faRotate } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import Share from '../Share/Share'
import { API_URL } from '../../../environment'
import PublicationOptions from '../Publication/PublicationOptions'
import PublicationDetails from '../Publication/PublicationDetails'


export default function FeedPublication({ publication, navigation, initialFetch }) {

    const [statePublication, setStatePublication] = React.useState(publication)
    const [text, setText] = React.useState(publication.text)
    const [fullText, setFullText] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = React.useContext(GlobalContext)

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        refreshPublication().then(() => setRefreshing(false))
    }, []);

    async function refreshPublication() {
        try {
            const json = await fetch(API_URL + '/publication-by-id/' + statePublication.id)
            const resp = await json.json()
            if (json.status === 200) {
                setStatePublication(resp.data)
                setText(resp.data.text)
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            return
        }
    }

    if (publication === 'reset') return (
        <PublicationView>
            <PublicationWarning>
                You have seen all quotes so far. Click in the button below to see them again!
            </PublicationWarning>
            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 25 }} onPress={initialFetch}>
                <FontAwesomeIcon icon={faRotate} color={colors.FONT_DEFAULT_COLOR} size={35} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <ResetSvg width={250} />
            </View>
        </PublicationView>
    )

    if (publication === 'unloaded') return (
        <PublicationView>
            <View style={{ alignItems: 'center' }}>
                <UnloadedSvg width={250} />
            </View>
        </PublicationView>
    )
    return (
        <PublicationView>
            <PublicationDetails publication={publication} navigation={navigation}/>
            <ScrollView style={{ maxHeight: '70%', marginVertical: 5 }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <PublicationText>"{fullText ? text : (text.substring(0, 250) + (text.length > 250 ? '...' : ''))}"</PublicationText>
                {text.length > 250 && <TouchableOpacity onPress={() => setFullText(!fullText)}>
                    <PublicationShowMore>{fullText ? 'Hide' : 'Show more'}</PublicationShowMore>
                </TouchableOpacity>}
            </ScrollView>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                <PublicationAuthor>{statePublication.author ? '- ' + statePublication.author : ''}</PublicationAuthor>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: statePublication.user.id })}>
                    <PublicationAuthor>By {statePublication.user.name}</PublicationAuthor>
                </TouchableOpacity>
            </View>
            <PublicationActions>
                <Share content={statePublication} type='publication' />
                {(user.id === statePublication.user_id || user.is_admin) && <PublicationOptions navigation={navigation} publication={statePublication} />}
                <TouchableOpacity onPress={() => navigation.navigate('Commentaries', { publicationId: statePublication.id })}>
                    <FontAwesomeIcon icon={faMessage} color={colors.FONT_DEFAULT_COLOR} size={30} />
                    <Text style={{ textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: 15 }}>
                        {statePublication.commentaries_count}
                    </Text>
                </TouchableOpacity>
            </PublicationActions>
        </PublicationView>
    )
}