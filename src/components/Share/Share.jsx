import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../enviroment'

export default function Share({ content, type='publication', size=30, ...props }) {
    const [share, setShare] = React.useState(false)
    const [count, setCount] = React.useState(content.share_count)
    const { user } = React.useContext(GlobalContext)

    React.useEffect(() => {
        const fetchShare = async () => {
            try {
                const resp = await fetch(API_URL + '/share-by-publication/' + content.id + '/' + type, {
                    headers: {
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const data = await resp.json()
                if (resp.status === 200) setShare(data.data)
            } catch (e) {

            }
        }
        if (typeof content !== 'string') fetchShare()
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
                    publication_id: type === 'publication' ? content.id : null,
                    commentary_id: type === 'commentary' ? content.id : null
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

    if (content.user_id === user.id) return (
        <View {...props}>
            <FontAwesomeIcon icon={faHeart} color={colors.BUTTON_BACKGROUND_PRIMARY} size={size} />
            <Text style={{ textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: size/2 }}>
                {count}
            </Text>
        </View>
    )

    return (
        <TouchableOpacity onPress={() => share ? deleteShare() : submitShare()} {...props}>
            <FontAwesomeIcon icon={share ? faHeart : faHeartCirclePlus} color={share ? '#ff0000' : colors.FONT_DEFAULT_COLOR} size={size} />
            <Text style={{ textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: size/2 }}>
                {count}
            </Text>
        </TouchableOpacity>
    )
}