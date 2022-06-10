import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../env.iroment'

export default function Share({ publication }) {
    const [share, setShare] = React.useState(false)
    const [count, setCount] = React.useState(publication.share_count)
    const { user } = React.useContext(GlobalContext)

    React.useEffect(() => {
        const fetchShare = async () => {
            try {
                const resp = await fetch(API_URL + '/share-by-publication/' + publication.id + '/publication', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const data = await resp.json()
                if (resp.status === 200) setShare(data.data)
            } catch (e) {

            }
        }
        if (typeof publication !== 'string') fetchShare()
    }, [])

    async function submitShare() {
        try {
            const json = await fetch(API_URL + '/share', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    publication_id: publication.id,
                    commentary_id: null
                })
            })
            const data = await json.json()
            if (json.status === 200) {
                setShare(data.data)
                setCount(count + 1)
            }
        } catch (e) {

        }
    }

    async function deleteShare() {
        try {
            const json = await fetch(API_URL + '/share/' + share, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                }
            })
            if (json.status === 200) {
                setShare(false)
                setCount(count - 1)
            }
        } catch (e) {

        }
    }

    if (publication.user_id === user.id) return (
        <View>
            <FontAwesomeIcon icon={faHeart} color={colors.BUTTON_BACKGROUND_PRIMARY} size={40} />
            <Text style={{ textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: 18 }}>
                {count}
            </Text>
        </View>
    )

    return (
        <TouchableOpacity onPress={() => share ? deleteShare() : submitShare()}>
            <FontAwesomeIcon icon={share ? faHeart : faHeartCirclePlus} color={share ? '#ff0000' : colors.FONT_DEFAULT_COLOR} size={40} />
            <Text style={{ textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: 18 }}>
                {count}
            </Text>
        </TouchableOpacity>
    )
}