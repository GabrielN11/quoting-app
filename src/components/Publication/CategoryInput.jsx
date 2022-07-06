import { Modal, Text } from 'react-native'
import React from 'react'
import { BarItem, BarButton } from './styles'
import {ModalContainer, ModalView, ModalTouchable, ModalText} from '../Options/styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { GlobalContext } from '../../GlobalContext'

import { API_URL } from '../../../enviroment'
import { FormSelect, FormSelectText } from '../Form/styles'

export default function CategoriesOptions({setCategory }) {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [categoryName, setCategoryName] = React.useState('Click to select ▼')
    const [options, setOptions] = React.useState([])

    const {categories} = React.useContext(GlobalContext)

    React.useEffect(() => {
        const categoriesArray = categories.map(category => ({
            id: category.id,
            label: category.name,
            function: () => {
                setCategory(category.id)
                setCategoryName(category.name)
            }
        }))
        const categoriesFilter = categoriesArray.filter(category => category.id > -1)
        setOptions(categoriesFilter)
    }, [categories])

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
                        {options.map(option => (<ModalTouchable key={option.id} onPress={() => {
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
            <FormSelect onPress={() => setModalVisible(true)}>
                <FormSelectText>{categoryName}</FormSelectText>
            </FormSelect>
        </>
    )
}