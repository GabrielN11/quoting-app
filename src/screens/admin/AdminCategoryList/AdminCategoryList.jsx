import { ScrollView, Modal, Alert, RefreshControl } from 'react-native'
import React from 'react'
import colors from '../../../../assets/constants/colors'
import GoBack from '../../../components/GoBack/GoBack'
import Empty from '../../../components/Empty/Empty'
import { FormButton, FormBtnText } from '../../../components/Form/styles'
import { GlobalContext } from '../../../GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../../components/Loading/Loading'
import { CategoryItem, CategoryTitle, ScreenTitle } from './styles'
import { ModalContainer, ModalView, ModalText, ModalTouchable } from '../../../components/Options/styles'
import { API_URL } from '../../../../enviroment'

export default function AdminCategoryList({ navigation, route }) {
    const [loading, setLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [currentCategory, setCurrentCategory] = React.useState({ id: -1, name: 'Placeholder' })

    const { loadCategories, categories } = React.useContext(GlobalContext)


    React.useEffect(() => {
        setLoading(true)
        loadCategories().then(() => setLoading(false))
    }, [])

    const renderList = (categories) => {
        const array = categories.filter(category => category.id > -1)
        return (
            <>
                {array.map(category => (
                    <Category id={category.id} name={category.name} key={category.id} setCurrentCategory={setCurrentCategory}
                        setModalVisible={setModalVisible} />
                ))}
            </>
        )
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        loadCategories().then(() => setRefreshing(false))
    }, []);

    return (
        <ScrollView style={{ backgroundColor: colors.BACKGROUND, height: '100%' }}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            <GoBack goBack={navigation.goBack} />
            {loading && <Loading transparent />}
            <ScreenTitle>Categories</ScreenTitle>
            {renderList(categories)}
            <CategoryItem color={colors.BUTTON_BACKGROUND_PRIMARY} 
            onPress={() => navigation.navigate('AdminCategoryForm', {id: false, categoryName: false})}>
                <CategoryTitle>Add</CategoryTitle>
            </CategoryItem>
            {(!loading && categories.length === 0) && <Empty />}
            <CategoryOptions modalVisible={modalVisible} setModalVisible={setModalVisible} id={currentCategory.id}
                name={currentCategory.name} navigation={navigation}/>
        </ScrollView>
    )
}

const Category = ({ id, name, setCurrentCategory, setModalVisible }) => {
    return (
        <CategoryItem onPress={() => {
            setCurrentCategory({ id, name })
            setModalVisible(true)
        }}>
            <CategoryTitle>{name}</CategoryTitle>
        </CategoryItem>
    )
}

const CategoryOptions = ({ setModalVisible, modalVisible, id, name, navigation }) => {
    const { user, setCategories } = React.useContext(GlobalContext)

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
            'WARNING: Are you sure you want to delete this category? ALL PUBLICATIONS from this category will be DELETED.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteCategory() },
            ]
        )
    }

    async function deleteCategory(){
        try{
            const resp = await fetch(API_URL + '/category/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                },
            })
            if(resp.status === 200){
                const {message} = await resp.json()
                createAlert('Success', message)
                setCategories(current => {
                    const categs = current.filter(categ => categ.id !== id)
                    return categs
                })
            }else{
                const {error} = await resp.json()
                createAlert('Error', error)
            }
        }catch(e){
            createAlert('Error', e.message)
        }
    }

    const options = React.useMemo(() => [
        {
            label: 'Edit',
            function: () => navigation.navigate('AdminCategoryForm', {id, categoryName: name})
        },
        {
            label: 'Delete',
            function: () => confirmDelete()
        }
    ], [id])
    return (
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
    )
}