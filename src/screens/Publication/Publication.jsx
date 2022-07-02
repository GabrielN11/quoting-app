import { View, Text } from 'react-native'
import React from 'react'

import FeedPublication from '../../components/Feed/FeedPublication'
import Loading from '../../components/Loading/Loading'
import { API_URL } from '../../../enviroment'
import colors from '../../../assets/constants/colors'
import GoBack from '../../components/GoBack/GoBack'

export default function Publication({navigation, route}) {

    const {publicationId} = route.params
    const [publication, setPublication] = React.useState(null)

    React.useEffect(() => {
        getPublication()
    }, [])

    async function getPublication(){
        try{
            const json = await fetch(API_URL + '/publication-by-id/' + publicationId)
            const resp = await json.json()
            if(json.status === 200){
                setPublication(resp.data)
            }else{
                navigation.goBack()
            }
        }catch(e){
            navigation.goBack()
        }
    }

    if(!publication) return (
        <View style={{height: '100%', backgroundColor: colors.BACKGROUND, alignItems: 'center', justifyContent: 'center'}}>
            <Loading/>
        </View>
    )

  return (
    <View style={{height: '100%', backgroundColor: colors.BACKGROUND, alignItems: 'center'}}>
        <GoBack goBack={navigation.goBack}/>
        <View style={{height: '80%', width: '100%'}}>
            <FeedPublication publication={publication} navigation={navigation}/>
        </View>
    </View>
  )
}