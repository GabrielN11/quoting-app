import { View, Text, ScrollView  } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import GoBack from '../../components/GoBack/GoBack'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import UserItem from '../../components/User/UserItem'
import { API_URL } from '../../../enviroment'
import { FormButton, FormBtnText } from '../../components/Form/styles'
import Loading from '../../components/Loading/Loading'

export default function UserList({navigation, route}) {
    const [users, setUsers] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const {profileId, profileName, type} = route.params

    React.useEffect(() => {
        getUsers()
    }, [])

    async function getUsers(){
        setLoading(true)
        try{
            const json = await fetch(`${API_URL}/${type}/${profileId}?page=${page}`)
            if(json.status === 200){
                const resp = await json.json()
                setUsers(current => [...current, ...resp.data])
                setPage(page+1)
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
    <ScrollView style={{backgroundColor: colors.BACKGROUND, height: '100%'}}>
      <GoBack goBack={navigation.goBack}/>
      <ProfileText style={{alignSelf: 'center'}}>{profileName}'s {type}</ProfileText>
      {users.map(user => (
          <UserItem user={user} navigation={navigation} key={user.id}/>
      ))}
      {users.length > 0 && !loaded && <FormButton onPress={getUsers} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
      {!loading && users.length === 0 && <Empty/>}
      {loading && <Loading transparent/>}
    </ScrollView>
  )
}