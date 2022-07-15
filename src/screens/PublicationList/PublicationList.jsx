import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import PublicationItem from '../../components/Publication/PublicationItem'
import {FormButton, FormBtnText} from '../../components/Form/styles'
import { API_URL } from '../../../environment'
import colors from '../../../assets/constants/colors'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import Loading from '../../components/Loading/Loading'

export default function PublicationList({navigation, route}) {

    const [publications, setPublications] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const {profileId, profileName} = route.params

    React.useEffect(() => {
        getPublications()
    }, [])

    async function getPublications(){
        setLoading(true)
        try{
            const json = await fetch(API_URL + '/publications-by-user/' + profileId + '?page=' + page)
            if(json.status === 200){
                const resp = await json.json()
                setPage(page+1)
                setPublications(current => [...current, ...resp.data])
                if(resp.data.length < 10) setLoaded(true)
            }else if(json.status === 204){
                setLoaded(true)
            }
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

  return (
    <ScrollView style={{height: '100%', backgroundColor: colors.BACKGROUND}}>
        <GoBack goBack={navigation.goBack}/>
        <ProfileText style={{alignSelf: 'center'}}>{profileName}'s Publications</ProfileText>
        {publications.map(publication => (
            <PublicationItem publication={publication} key={publication.id} navigation={navigation}/>
        ))}
        {publications.length > 0 && !loaded && <FormButton onPress={getPublications} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
        {loading && <Loading transparent/>}
        {!loading && publications.length === 0 && <Empty/>}
    </ScrollView>
  )
}