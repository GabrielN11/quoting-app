import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {API_URL} from '../../../env.iroment'
import { GlobalContext } from '../../GlobalContext'
import {PublicationView, PublicationText, PublicationAuthor, PublicationWarning} from './styles'
import FeedPublication from './FeedPublication'

export default function Feed({setLoading}) {
  const [publications, setPublications] = React.useState([])
  const {user} = React.useContext(GlobalContext)
  const {width} = useWindowDimensions()

  const fetchData = async () => {
    setLoading(true)
    try{
      const json = await fetch(API_URL + '/publication', {
        headers:{
          'Authorization': 'Bearer ' + user.token
        }
      })
      const {data} = await json.json()
      if(json.status === 200){
        if(data.reset_seen) setPublications([...publications, 'reset', data])
        else setPublications([...publications, data])
      }else{
        console.log(json.status)
      }
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
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
  

  return (
    <View style={{
      height: '80%',
      width: width,
    }}>
      {publications.length > 1 && <Swiper loop={false} showsPagination={false}
      onIndexChanged={(index) => renderMorePublications(index)}>
          {publications.map(publication => <FeedPublication key={publication.id || publication} publication={publication}/>)}
      </Swiper>}
    </View>
  )
}