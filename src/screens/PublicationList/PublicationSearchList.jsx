import { View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import PublicationItem from '../../components/Publication/PublicationItem'
import { FormButton, FormBtnText } from '../../components/Form/styles'
import { API_URL } from '../../../environment'
import colors from '../../../assets/constants/colors'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import Loading from '../../components/Loading/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { CommentaryTextInput } from '../Commentaries/styles'
import { GlobalContext } from '../../GlobalContext'

export default function PublicationSearchList({ navigation }) {

    const [publications, setPublications] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [search, setSearch] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const {user} = React.useContext(GlobalContext)

    React.useEffect(() => {
        getPublications()
    }, [])

    async function getPublications() {
        setLoading(true)
        try {
            const json = await fetch(API_URL + '/publication-list?page=' + page + `${search.length > 0 ? '&search=' + search : ''}`, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            if (json.status === 200) {
                const resp = await json.json()
                setPage(page + 1)
                setPublications(current => [...current, ...resp.data])
                if (resp.data.length < 10) setLoaded(true)
            } else if (json.status === 204) {
                setLoaded(true)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    function startSearch(){
        setPage(0)
        setPublications([])
        setLoaded(false)
        getPublications()
    }

    return (
        <ScrollView style={{ height: '100%', backgroundColor: colors.BACKGROUND }}>
            <GoBack goBack={navigation.goBack} />
            <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <CommentaryTextInput onChangeText={newSearch => {
                    setPage(0)
                    setSearch(newSearch)
                }} placeholder='Search by author or quote...' placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
                    returnKeyType="send" onSubmitEditing={startSearch} />
                <TouchableOpacity onPress={startSearch} style={{ marginLeft: 7 }}>
                    <FontAwesomeIcon icon={faSearch} size={25} color={colors.FONT_DEFAULT_COLOR} />
                </TouchableOpacity>
            </View>
            {publications.map(publication => (
                <PublicationItem publication={publication} key={publication.id} navigation={navigation} />
            ))}
            {publications.length > 0 && !loaded && <FormButton onPress={getPublications} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
                <FormBtnText>Load More...</FormBtnText>
            </FormButton>}
            {loading && <Loading transparent />}
            {!loading && publications.length === 0 && <Empty />}
        </ScrollView>
    )
}