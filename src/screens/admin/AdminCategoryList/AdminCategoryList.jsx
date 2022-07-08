import { ScrollView, Modal, Alert, RefreshControl } from 'react-native'
import React from 'react'
import colors from '../../../../assets/constants/colors'
import GoBack from '../../../components/GoBack/GoBack'
import Empty from '../../../components/Empty/Empty'
import { GlobalContext } from '../../../GlobalContext'
import Loading from '../../../components/Loading/Loading'
import { CategoryItem, CategoryTitle, ScreenTitle } from './styles'
import CustomOption from '../../../components/Options/CustomOption'
import { API_URL } from '../../../../enviroment'

export default function AdminCategoryList({ navigation, route }) {
    const [loading, setLoading] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false);

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
                    <Category id={category.id} name={category.name} key={category.id} navigation={navigation} />
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
                onPress={() => navigation.navigate('AdminCategoryForm', { id: false, categoryName: false })}>
                <CategoryTitle>Add</CategoryTitle>
            </CategoryItem>
            {(!loading && categories.length === 0) && <Empty />}
        </ScrollView>
    )
}

const Category = ({ id, name, navigation }) => {
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

    async function deleteCategory() {
        try {
            const resp = await fetch(API_URL + '/category/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                },
            })
            if (resp.status === 200) {
                const { message } = await resp.json()
                createAlert('Success', message)
                setCategories(current => {
                    const categs = current.filter(categ => categ.id !== id)
                    return categs
                })
            } else {
                const { error } = await resp.json()
                createAlert('Error', error)
            }
        } catch (e) {
            createAlert('Error', e.message)
        }
    }

    const options = React.useMemo(() => [
        {
            label: 'Edit',
            function: () => navigation.navigate('AdminCategoryForm', { id, categoryName: name })
        },
        {
            label: 'Delete',
            function: () => confirmDelete()
        }
    ], [id])

    return (
        <CustomOption ButtonComponent={CategoryItem} options={options}>
            <CategoryTitle>{name}</CategoryTitle>
        </CustomOption>
    )
}