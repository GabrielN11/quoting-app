import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { DetailBtn, DetailBtnLabel, DetailsClose, DetailsLabel, DetailsOptionsView, DetailsText, DetailsView, PublicationDetailsView } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import { TutorialContainer } from '../Tutorial/styles'

export default function PublicationDetails({ publication, navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <PublicationDetailsView>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon icon={faInfoCircle} size={25} color={colors.FONT_DEFAULT_COLOR} />
        </TouchableOpacity>
      </PublicationDetailsView>
      <PublicationDetailsModal setModalVisible={setModalVisible} modalVisible={modalVisible}
        publication={publication} navigation={navigation} />
    </>
  )
}

const PublicationDetailsModal = ({ publication, setModalVisible, modalVisible, navigation }) => {

  function returnTime(stringDate) {
    let dateTimeParts = stringDate.split(/[- :]/)
    dateTimeParts[1]--
    const utc = Date.UTC(...dateTimeParts)
    const utcDate = new Date(utc)

    return `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString().substring(0, 5)}`
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TutorialContainer>
        <DetailsView>
          <DetailsClose>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FontAwesomeIcon icon={faXmark} size={25} color={colors.FONT_DEFAULT_COLOR} />
            </TouchableOpacity>
          </DetailsClose>
          <DetailsField label='Publisher' text={publication.user.name} />
          <DetailsField label='Author' text={publication.author ? publication.author : publication.user.name} />
          <DetailsField label='Publication Date' text={returnTime(publication.date)} />
          <DetailsField label='Favorites' text={publication.shareCount} />
          <DetailsField label='Commentaries' text={publication.commentaryCount} />
          <DetailsOptionsView>
            <DetailBtn onPress={() => {
              setModalVisible(false)
              navigation.navigate('ReportForm', { publicationId: publication.id, commentaryId: null })
            }}>
              <FontAwesomeIcon icon={faFlag} color={colors.ALERT} size={20} />
              <DetailBtnLabel>Report</DetailBtnLabel>
            </DetailBtn>
          </DetailsOptionsView>
        </DetailsView>
      </TutorialContainer>
    </Modal>
  )
}

const DetailsField = ({ label, text }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <DetailsLabel>{label}: </DetailsLabel>
      <DetailsText>{text}</DetailsText>
    </View>
  )
}