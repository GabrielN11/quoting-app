import { TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { GlobalContext } from '../../GlobalContext'
import { API_URL } from '../../../environment'
import CustomOption from '../Options/CustomOption'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function CommentaryOptions({ commentary, navigation }) {

    const { user } = React.useContext(GlobalContext)

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    const confirmDelete = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete your commentary?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteCommentary() },
            ]
        )
    }

    async function deleteCommentary() {
        try {
            const resp = await fetch(API_URL + '/commentary/' + commentary.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
            })

            if (resp.status === 200) {
                createAlert('Success', 'Commentary deleted')
                navigation.replace('Commentaries', { publicationId: commentary.publication_id })
            } else {
                const data = await resp.json()
                createAlert('Error', data.error)
            }
        } catch (e) {
            createAlert('Error', e.message)
        }
    }

    const options = React.useMemo(() => {
        const array = []
        if ((user.id === commentary.user_id) || user.is_admin) array.push(
            {
                label: 'Delete',
                function: confirmDelete,
            }
        )
        if (user.id !== commentary.user_id) array.push({
            label: 'Report',
            function: () => navigation.navigate('ReportForm', { publicationId: null, commentaryId: commentary.id })
        })
        return array
    }, [commentary])


    return (
        <CustomOption ButtonComponent={TouchableOpacity} options={options}>
            <FontAwesomeIcon icon={faGear} size={25} color={colors.FONT_DEFAULT_COLOR} />
        </CustomOption>
    )
}