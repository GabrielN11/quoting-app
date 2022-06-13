import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {API_URL} from '../../../env.iroment'
import { GlobalContext } from '../../GlobalContext'
import FeedPublication from './FeedPublication'
import Empty from '../Empty/Empty'

export default function Feed({setLoading, followMode=false, navigation}) {
  const [publications, setPublications] = React.useState([])
  const {user} = React.useContext(GlobalContext)
  const {width} = useWindowDimensions()

  const fetchData = async () => {
    setLoading(true)
    try{
      const json = await fetch(`${API_URL}/${followMode ? 'publication-by-follow' : 'publication'}`, {
        headers:{
          'Authorization': 'Bearer ' + user.token
        }
      })
      const {data} = await json.json()
      if(json.status === 200){
        if(data.reset_seen) setPublications(arr => [...arr, 'reset', data])
        else setPublications(arr => [...arr, data])
      }else{
        console.log(json.status)
      }
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
      return
    }
  }

  function renderMorePublications(index){
    if(index < publications.length - 2) return
    fetchData()
  }

  React.useEffect(() => {
    if(publications.length <= 1)
    fetchData()
  }, [publications])

  React.useEffect(() => {
    setPublications([])
  }, [followMode])
  

  return (
    <View style={{
      height: '80%',
      width: width,
    }}>
      {publications.length > 1 && <Swiper loop={false} showsPagination={false}
      onIndexChanged={(index) => renderMorePublications(index)}>
          {publications.map(publication => <FeedPublication key={publication.id || publication} publication={publication}
          navigation={navigation}/>)}
      </Swiper>}
      {publications.length === 0 && <Empty/>}
    </View>
  )
}