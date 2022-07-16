import { Text } from 'react-native'
import React from 'react'
import { BarItem, BarButton } from './styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { GlobalContext } from '../../GlobalContext'
import CustomOption from '../Options/CustomOption'

export default function CategoriesOptions({ icon, setCategory, active, setFollowMode }) {

    const [categoryName, setCategoryName] = React.useState('All')
    const [options, setOptions] = React.useState([])
    const { categories } = React.useContext(GlobalContext)

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
            <CustomOption options={options} ButtonComponent={BarButton}>
                <FontAwesomeIcon icon={icon} size={20} color={!active ? colors.ACTIVE : colors.FONT_DEFAULT_COLOR} />
                <Text style={{ color: !active ? colors.ACTIVE : colors.FONT_DEFAULT_COLOR }}>{categoryName}</Text>
            </CustomOption>
        </BarItem>
    )
}