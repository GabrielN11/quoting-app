import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {API_URL} from '../../../enviroment'
import { GlobalContext } from '../../GlobalContext'
import FeedPublication from './FeedPublication'
import Empty from '../Empty/Empty'

export default function Feed({setLoading, followMode=false, navigation}) {
  const [publications, setPublications] = React.useState([])
  const {user} = React.useContext(GlobalContext)
  const {width} = useWindowDimensions()

  const fetchData = async () => {
    setLoading(true)
    if(publications.length > 20){
      //resets the array to save memory
      setPublications(current => [current.pop()])
    }
    try{
      const json = await fetch(`${API_URL}/${followMode ? 'publication-by-follow' : 'publication'}`, {
        headers:{
          'Authorization': 'Bearer ' + user.token
        }
      })
      const {data} = await json.json()
      if(json.status === 200){
        if(!data) setPublications(arr => [...arr, 'reset'])
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
    if(publications[publications.length-1] === 'reset') return
    if(index > publications.length - 2) fetchData()
  }

  function initialFetch(){
    setPublications([])
    fetchData().then(() => {
      if(publications[0] === 'reset') setPublications([])
      fetchData()
    })
  }

  React.useEffect(() => {
    initialFetch()
  }, [followMode])

  

  return (
    <View style={{
      height: '80%',
      width: width,
    }}>
      {publications.length > 1 && <Swiper loop={false} showsPagination={false}
      onIndexChanged={(index) => renderMorePublications(index)}>
          {publications.map((publication, index) => <FeedPublication key={publication.id || publication + index} publication={publication}
          navigation={navigation} setLoading={setLoading} initialFetch={initialFetch}/>)}
      </Swiper>}
      {publications.length === 0 && <Empty/>}
    </View>
  )
}