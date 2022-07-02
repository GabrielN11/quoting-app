import { TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import {FormButton, FormBtnText} from '../../components/Form/styles'
import { API_URL } from '../../../enviroment'
import colors from '../../../assets/constants/colors'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import Commentary from '../../components/Commentaries/Commentary'
import PublicationItem from '../../components/Publication/PublicationItem'
import Loading from '../../components/Loading/Loading'

export default function ShareList({navigation, route}) {

    const [shares, setShares] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(0)

    const {profileId, profileName} = route.params

    React.useEffect(() => {
        getShares()
    }, [])

    async function getShares(){
        setLoading(true)
        try{
            const json = await fetch(API_URL + '/share/' + profileId + '?page=' + page)
            if(json.status === 200){
                const resp = await json.json()
                setPage(page+1)
                setShares(current => [...current, ...resp.data])
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
    <ScrollView style={{backgroundColor: colors.BACKGROUND}}>
        <GoBack goBack={navigation.goBack}/>
        <ProfileText style={{alignSelf: 'center'}}>{profileName}'s Favorites</ProfileText>
        {shares.map((share, index) => share.type === 'commentary' ? (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Publication', {publicationId: share.publication_id})}>
                <Commentary commentary={share} navigation={navigation} fromUser/>
            </TouchableOpacity>
        ) : (
            <PublicationItem publication={share} key={index} navigation={navigation}/>
        ))}
        {shares.length > 0 && !loaded && <FormButton onPress={getShares} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
        {loading && <Loading transparent/>}
        {!loading && shares.length === 0 && <Empty/>}
    </ScrollView>
  )
}