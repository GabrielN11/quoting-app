import { View, Text, ScrollView  } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import GoBack from '../../components/GoBack/GoBack'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import UserItem from '../../components/User/UserItem'
import { API_URL } from '../../../env.iroment'
import { FormButton, FormBtnText } from '../../components/Form/styles'

export default function UserList({navigation, route}) {
    const [users, setUsers] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false)

    const {profileUser, type} = route.params

    React.useEffect(() => {
        getUsers()
    }, [])

    async function getUsers(){
        try{
            const json = await fetch(`${API_URL}/${type}/${profileUser.id}?page=${page}`)
            if(json.status === 200){
                const resp = await json.json()
                setUsers(current => [...current, ...resp.data])
                setPage(page+1)
            }else if(json.status === 204){
                setLoaded(true)
            }
        }catch(e){
            console.log(e)
        }
    }
  return (
    <ScrollView style={{backgroundColor: colors.BACKGROUND, height: '100%'}}>
      <GoBack goBack={navigation.goBack}/>
      <ProfileText style={{alignSelf: 'center'}}>User's followers</ProfileText>
      {users.map(user => (
          <UserItem user={user} navigation={navigation} key={user.id}/>
      ))}
      {users.length > 0 && !loaded && <FormButton onPress={getUsers} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
      {users.length === 0 && <Empty/>}
    </ScrollView>
  )
}