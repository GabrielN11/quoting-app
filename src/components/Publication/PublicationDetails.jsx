import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { DetailBtn, DetailBtnLabel, DetailsClose, DetailsLabel, DetailsOptionsView, DetailsText, DetailsView, PublicationDetailsView } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import { TutorialContainer } from '../Tutorial/styles'

export default function PublicationDetails({id, date, publisher, author, commentaryCount, shareCount, navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <PublicationDetailsView>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon icon={faInfoCircle} size={25} color={colors.FONT_DEFAULT_COLOR} />
        </TouchableOpacity>
      </PublicationDetailsView>
      <PublicationDetailsModal setModalVisible={setModalVisible} modalVisible={modalVisible}
        date={date} publisher={publisher} commentaryCount={commentaryCount} shareCount={shareCount} author={author}
        navigation={navigation} id={id}/>
    </>
  )
}

const PublicationDetailsModal = ({id, date, publisher, commentaryCount, shareCount, author, setModalVisible, modalVisible, navigation }) => {
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
              <FontAwesomeIcon icon={faXmark} size={20} color={colors.FONT_DEFAULT_COLOR} />
            </TouchableOpacity>
          </DetailsClose>
          <DetailsField label='Publisher' text={publisher}/>
          <DetailsField label='Author' text={author ? author : publisher}/>
          <DetailsField label='Publication Date' text={date}/>
          <DetailsField label='Favorites' text={shareCount}/>
          <DetailsField label='Commentaries' text={commentaryCount}/>
          <DetailsOptionsView>
              <DetailBtn onPress={() => {
                setModalVisible(false)
                navigation.navigate('ReportForm', {publicationId: id, commentaryId: null})
              }}>
                <FontAwesomeIcon icon={faFlag} color='brown' size={20}/>
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