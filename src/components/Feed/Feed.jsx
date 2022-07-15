import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {API_URL} from '../../../environment'
import { GlobalContext } from '../../GlobalContext'
import FeedPublication from './FeedPublication'
import Empty from '../Empty/Empty'

export default function Feed({setLoading, followMode=false, navigation, category}) {
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
      const json = await fetch(`${API_URL}/${followMode ? 'publication-by-follow' : 
      `publication${category > -1 ? '?category=' + category : ''}`}`, {
        headers:{
          'Authorization': 'Bearer ' + user.token
        }
      })

      const {data} = await json.json()
      if(json.status === 200){
        if(!data) {
          setPublications(arr => {
            arr.pop()
            return [...arr, 'reset']
          })
        }else{
          setPublications(arr => {
            arr.pop()
            return [...arr, data, 'unloaded']
          })
        }
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
    if(publications.includes('reset')) return
    if(publications[index] === 'unloaded' || publications[index-1] === 'unloaded'){
      //if checks a minus 1 because of a possible swiper glitch
      fetchData()
    }
  }

  function initialFetch(){
    setPublications([])
    fetchData()
  }

  React.useEffect(() => {
    initialFetch()
  }, [followMode, category])

  

  return (
    <View style={{
      height: '80%',
      width: width,
    }}>
      {publications.length > 0 && <Swiper loop={false} showsPagination={false}
      onIndexChanged={(index) => renderMorePublications(index)}>
          {publications.map((publication, index) => <FeedPublication key={publication.id || publication + index} publication={publication}
          navigation={navigation} setLoading={setLoading} initialFetch={initialFetch}/>)}
      </Swiper>}
      {publications.length === 0 && <Empty/>}
    </View>
  )
}