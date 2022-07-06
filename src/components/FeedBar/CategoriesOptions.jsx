import { Modal, Text } from 'react-native'
import React from 'react'
import { BarItem, BarButton } from './styles'
import {ModalContainer, ModalView, ModalTouchable, ModalText} from '../Options/styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { GlobalContext } from '../../GlobalContext'

export default function CategoriesOptions({icon, setCategory, active, setFollowMode }) {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [categoryName, setCategoryName] = React.useState('All')
    const [options, setOptions] = React.useState([])
    const {categories} = React.useContext(GlobalContext)
    
    React.useEffect(() => {
        const categoriesArray = categories.map(category => ({
            id: category.id,
            label: category.name,
            function: () => {
                setCategory(category.id)
                setCategoryName(category.name)
                setFollowMode(false)
            }
        }))
        setOptions(categoriesArray)
    }, [categories])

    return (
        <BarItem>
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
            <BarButton onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon icon={icon} size={20} color={!active ? 'orange' : colors.FONT_DEFAULT_COLOR} />
                <Text style={{color: !active ? 'orange' : colors.FONT_DEFAULT_COLOR}}>{categoryName}</Text>
            </BarButton>
        </BarItem>
    )
}