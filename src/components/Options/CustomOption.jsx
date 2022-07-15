import { Modal, ScrollView } from 'react-native'
import React from 'react'
import { ModalContainer, ModalView, ModalTouchable, ModalText } from '../Options/styles'

export default function CustomOption({ options, ButtonComponent, children }) {
    const [modalVisible, setModalVisible] = React.useState(false)
    return (
        <>
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
                        <ScrollView style={{flexGrow: 0}}>
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
                        </ScrollView>
                    </ModalView>
                </ModalContainer>
            </Modal>
            <ButtonComponent onPress={() => setModalVisible(true)}>
                {children}
            </ButtonComponent>
        </>
    )
}