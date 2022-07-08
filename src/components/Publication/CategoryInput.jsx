import React from 'react'
import { GlobalContext } from '../../GlobalContext'
import { FormSelect, FormSelectText } from '../Form/styles'
import CustomOption from '../Options/CustomOption'

export default function CategoriesOptions({ setCategory }) {

    const [categoryName, setCategoryName] = React.useState('Click to select ▼')
    const [options, setOptions] = React.useState([])

    const { categories } = React.useContext(GlobalContext)

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
            <CustomOption options={options} ButtonComponent={FormSelect}>
                <FormSelectText>{categoryName}</FormSelectText>
            </CustomOption>
        </>
    )
}