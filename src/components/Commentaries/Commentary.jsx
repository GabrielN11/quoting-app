import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CommentaryInfo, CommentaryText, CommentaryView } from '../../screens/Commentaries/styles'
import { API_URL } from '../../../env.iroment'
import Share from '../Share/Share'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Commentary({ commentary, navigation, fromUser=false }) {

    const [publisher, setPublisher] = React.useState(null)

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const json = await fetch(API_URL + '/profile/' + commentary.user_id)
                const resp = await json.json()
                if (json.status === 200) {
                    setPublisher(resp.data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser()
    }, [])

    function returnTime(stringDate) {
        let dateTimeParts = stringDate.split(/[- :]/)
        dateTimeParts[1]--
        const utc = Date.UTC(...dateTimeParts)
        const utcDate = new Date(utc)

        return `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString().substring(0, 5)}`
    }

    return (
        <CommentaryView>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', {profileId: publisher.id})}>
                <CommentaryInfo>{publisher ? publisher.name : 'Anonymous'}:</CommentaryInfo>
            </TouchableOpacity>
            <CommentaryText>
                {commentary.text}
            </CommentaryText>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <CommentaryInfo style={{ marginTop: 7, fontSize: 16 }}>
                    {returnTime(commentary.date)}
                </CommentaryInfo>
                {!fromUser && <Share content={commentary} type='commentary' size={25}/>}
            </View>
        </CommentaryView>
    )
}