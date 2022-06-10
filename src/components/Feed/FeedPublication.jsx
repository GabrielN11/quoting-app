import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { PublicationView, PublicationWarning, PublicationText, PublicationAuthor, PublicationActions } from './styles'
import ResetSvg from '../../../assets/reset.svg'
import { GlobalContext } from '../../GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import Share from '../Share/Share'


export default function FeedPublication({ publication }) {

    const {user} = React.useContext(GlobalContext)

    if (publication === 'reset') return (
        <PublicationView>
            <PublicationWarning>
                You have seen all phrases so far. Swipe right to see them again!
            </PublicationWarning>
            <View style={{alignItems: 'center'}}>
                <ResetSvg width={250}/>
            </View>
        </PublicationView>
    )
    return (
        <PublicationView>
            <PublicationText>"{publication.text}"</PublicationText>
            <PublicationAuthor>{publication.author ? '- ' + publication.author : ''}</PublicationAuthor>
            <PublicationActions>
                <Share publication={publication}/>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faMessage} color={colors.FONT_DEFAULT_COLOR} size={40}/>
                    <Text style={{textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: 18}}>
                        {publication.commentaries_count}
                    </Text>
                </TouchableOpacity>
            </PublicationActions>
        </PublicationView>
    )
}