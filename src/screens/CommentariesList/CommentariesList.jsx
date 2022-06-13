import { TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import {FormButton, FormBtnText} from '../../components/Form/styles'
import { API_URL } from '../../../env.iroment'
import colors from '../../../assets/constants/colors'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import Commentary from '../../components/Commentaries/Commentary'

export default function CommentariesList({navigation, route}) {

    const [commentaries, setCommentaries] = React.useState([])
    const [loaded, setLoaded] = React.useState(true)
    const [page, setPage] = React.useState(0)

    const {profileId, profileName} = route.params

    React.useEffect(() => {
        getCommentaries()
    }, [])

    async function getCommentaries(){
        try{
            const json = await fetch(API_URL + '/commentary-by-user/' + profileId + '?page=' + page)
            if(json.status === 200){
                const resp = await json.json()
                setPage(page+1)
                setCommentaries(current => [...current, ...resp.data])
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
        <ProfileText style={{alignSelf: 'center'}}>{profileName}'s Commentaries</ProfileText>
        {commentaries.map(commentary => (
            <TouchableOpacity key={commentary.id} onPress={() => navigation.navigate('Publication', {publicationId: commentary.publication_id})}>
                <Commentary commentary={commentary} navigation={navigation} fromUser/>
            </TouchableOpacity>
        ))}
        {commentaries.length > 0 && loaded && <FormButton onPress={getCommentaries} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
        {commentaries.length === 0 && <Empty/>}
    </ScrollView>
  )
}