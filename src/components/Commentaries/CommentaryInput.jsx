import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import { CommentaryTextInput } from '../../screens/Commentaries/styles'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../env.iroment'



export default function CommentaryInput({publication, setCommentaries, setLoading}) {
    const [text, setText] = React.useState('')
    const {user} = React.useContext(GlobalContext)

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function sendCommentary(){
        if(text === '') return createAlert('Missing commentary.', 'Type a commentary to send it!')
        setLoading(true)
        try{
            const json = await fetch(`${API_URL}/commentary`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    user_id: user.id,
                    publication_id: publication.id
                })
            })
            const resp = await json.json()

            if(json.status === 201){
                setText('')
                setCommentaries(current => [resp.data, ...current])
            }else{
                createAlert('Error', resp.error)
            }
        }catch(e){
            createAlert('Error', e.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <View style={{flexDirection:'row', padding: 20, alignItems: 'center'}}>
      <CommentaryTextInput placeholderTextColor={colors.FONT_DEFAULT_PLACEHOLDER} placeholder='Type a comment here...'
      value={text} onChangeText={newText => newText.length > 500 ? null : setText(newText)} multiline
      returnKeyType="send" onSubmitEditing={() => sendCommentary()}/>
      <TouchableOpacity onPress={sendCommentary}>
          <FontAwesomeIcon icon={faPaperPlane} color={colors.FONT_DEFAULT_COLOR} size={25}/>
      </TouchableOpacity>
    </View>
  )
}