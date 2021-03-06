import { View, Text, ScrollView, TouchableOpacity  } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import GoBack from '../../components/GoBack/GoBack'
import { ProfileText } from '../Profile/styles'
import Empty from '../../components/Empty/Empty'
import UserItem from '../../components/User/UserItem'
import { API_URL } from '../../../environment'
import { FormButton, FormBtnText } from '../../components/Form/styles'
import { GlobalContext } from '../../GlobalContext'
import { CommentaryTextInput } from '../Commentaries/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/Loading/Loading'

export default function SearchUserList({navigation, route}) {
    const [users, setUsers] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [search, setSearch] = React.useState('')

    const {user} = React.useContext(GlobalContext)
    const {type} = route.params


    React.useEffect(() => {
        getAllUsers()
    }, [])

    async function getAllUsers(){
        setLoading(true);
        try{
            const json = await fetch(`${API_URL}/${type === 'banned' ? 'admin-banned' : 'user'}-list?page=${page}${search.length > 0 ? `&search=${search}`:''}`, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            if(json.status === 200){
                const resp = await json.json()
                setUsers(current => [...current, ...resp.data])
                setPage(page+1)
                if(resp.data.length < 10) setLoaded(true)
            }else if(json.status === 204){
                setLoaded(true)
            }
        }catch(e){
            console.log(e.message)
        }finally{
            setLoading(false)
        }
    }

    function startSearch(){
        setUsers([])
        setLoaded(false)
        getAllUsers()
    }

  return (
    <ScrollView style={{backgroundColor: colors.BACKGROUND, height: '100%'}}>
      <GoBack goBack={navigation.goBack}/>
      {loading && <Loading transparent/>}
      <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
        <CommentaryTextInput onChangeText={newSearch => {
            setPage(0)
            setSearch(newSearch)
        }} placeholder='Search users...'  placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER}
        returnKeyType="send" onSubmitEditing={startSearch}/>
        <TouchableOpacity onPress={startSearch} style={{marginLeft: 7}}>
            <FontAwesomeIcon icon={faSearch} size={25} color={colors.FONT_DEFAULT_COLOR}/>
        </TouchableOpacity>
      </View>
      {users.map(user => (
          <UserItem user={user} navigation={navigation} key={user.id}/>
      ))}
      {users.length > 0 && !loaded && <FormButton onPress={getAllUsers} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
      {(!loading && users.length === 0) && <Empty/>}
    </ScrollView>
  )
}