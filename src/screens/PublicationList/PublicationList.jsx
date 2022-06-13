import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import PublicationItem from '../../components/Publication/PublicationItem'
import {FormButton, FormBtnText} from '../../components/Form/styles'
import { API_URL } from '../../../env.iroment'
import colors from '../../../assets/constants/colors'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'

export default function PublicationList({navigation, route}) {

    const [publications, setPublications] = React.useState([])
    const [loaded, setLoaded] = React.useState(true)
    const [page, setPage] = React.useState(0)

    const {profileUser} = route.params

    React.useEffect(() => {
        getPublications()
    }, [])

    async function getPublications(){
        try{
            const json = await fetch(API_URL + '/publications-by-user/' + profileUser.id + '?page=' + page)
            if(json.status === 200){
                const resp = await json.json()
                setPage(page+1)
                setPublications(current => [...current, ...resp.data])
            }else if(json.status === 204){
                setLoaded(false)
            }
        }catch(e){
            console.log(e)
        }
    }

  return (
    <ScrollView style={{height: '100%', backgroundColor: colors.BACKGROUND}}>
        <GoBack goBack={navigation.goBack}/>
        <ProfileText style={{alignSelf: 'center'}}>{profileUser.name}'s Publications</ProfileText>
        {publications.map(publication => (
            <PublicationItem publication={publication} key={publication.id} navigation={navigation}/>
        ))}
        {publications.length > 0 && loaded && <FormButton onPress={getPublications} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
        {publications.length === 0 && <Empty/>}
    </ScrollView>
  )
}