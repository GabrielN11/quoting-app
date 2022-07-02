import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { ModalContainer, ModalText, ModalTouchable, ModalView } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../assets/constants/colors';

export default function Option({options, size=30}) {
    const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <ModalView>
            {options.map(option => (<ModalTouchable key={option.label} onPress={() => {
                option.function()
                setModalVisible(false)
            }}>
                <ModalText>{option.label}</ModalText>
            </ModalTouchable>))}
            <ModalTouchable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <ModalText color='red'>Cancel</ModalText>
            </ModalTouchable>
          </ModalView>
        </ModalContainer>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
      >
        <FontAwesomeIcon icon={faGear} size={size} color={colors.FONT_DEFAULT_COLOR}/>
      </TouchableOpacity>
    </View>
  )
}