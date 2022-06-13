import { View, Text } from 'react-native'
import React from 'react'
import { PublicationInfoItem, PublicationInfoText, PublicationInfoView, PublicationItemText, PublicationItemButton } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'

export default function PublicationItem({publication, navigation}) {
  return (
    <PublicationItemButton onPress={() => navigation.navigate('Publication', {publicationId: publication.id})}>
        <PublicationItemText>{publication.text.length > 100 ? publication.text.substring(0, 100) + '...' : publication.text}</PublicationItemText>
        <PublicationInfoView>
            <PublicationInfoItem>
                <FontAwesomeIcon icon={faMessage} color={colors.FONT_DEFAULT_COLOR} size={22}/>
                <PublicationInfoText>{publication.commentaries_count}</PublicationInfoText>
            </PublicationInfoItem>
            <PublicationInfoItem>
                <FontAwesomeIcon icon={faHeart} color={colors.FONT_DEFAULT_COLOR} size={22}/>
                <PublicationInfoText>{publication.share_count}</PublicationInfoText>
            </PublicationInfoItem>
        </PublicationInfoView>
    </PublicationItemButton>
  )
}