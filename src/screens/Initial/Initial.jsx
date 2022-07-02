import React from 'react'
import SwiperComponent from '../../components/Carousel/Carousel';
import Loading from '../../components/Loading/Loading';
import { GlobalContext } from '../../GlobalContext';
import { InitialView } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { API_URL } from '../../../enviroment';

const Initial = ({ navigation }) => {
    const { setUser } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('@user_token')
                if (token) {
                    const json = await fetch(API_URL + '/sign-in', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    const response = await json.json()
                    response.data['token'] = token
                    setUser(response.data)
                    setLoading(false)
                    return navigation.reset({
                        index: 0,
                        routes: [{ name: 'Drawer' }],
                    });
                }
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])
    return (
        <InitialView>
            <SwiperComponent navigation={navigation} />
            {loading && <Loading />}
        </InitialView>
    );
}

export default Initial