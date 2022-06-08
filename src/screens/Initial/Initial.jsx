import React from 'react'
import SwiperComponent from '../../components/Carousel/Carousel';
import { InitialView } from './styles';

const Initial = ({navigation}) => {
    return (
        <InitialView>
            <SwiperComponent navigation={navigation}/>
        </InitialView>
    );
}

export default Initial