import { TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack/GoBack'
import {FormButton, FormBtnText} from '../../components/Form/styles'
import { API_URL } from '../../../env.iroment'
import colors from '../../../assets/constants/colors'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import Commentary from '../../components/Commentaries/Commentary'
import PublicationItem from '../../components/Publication/PublicationItem'

export default function ShareList({navigation, route}) {

    const [shares, setShares] = React.useState([])
    const [loaded, setLoaded] = React.useState(true)
    const [page, setPage] = React.useState(0)

    const {profileUser} = route.params

    React.useEffect(() => {
        getShares()
    }, [])

    async function getShares(){
        try{
            const json = await fetch(API_URL + '/share/' + profileUser.id + '?page=' + page)
            if(json.status === 200){
                const resp = await json.json()
                setPage(page+1)
                setShares(current => [...current, ...resp.data])
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
        <ProfileText style={{alignSelf: 'center'}}>{profileUser.name}'s Favorites</ProfileText>
        {shares.map(share => share.type === 'commentary' ? (
            <TouchableOpacity key={share.id}>
                <Commentary commentary={share} navigation={navigation} fromUser/>
            </TouchableOpacity>
        ) : (
            <PublicationItem publication={share} key={share.id}/>
        ))}
        {shares.length > 0 && loaded && <FormButton onPress={getShares} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
        {shares.length === 0 && <Empty/>}
    </ScrollView>
  )
}