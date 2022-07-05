import React, { Component } from 'react'
import {Image, View } from 'react-native'
import CarouselItems from './CarouselItems'
import { CarouselText} from './styles'
import Swiper from 'react-native-swiper'

import MobileSvg from '../../../assets/mobile-writing.svg'
import CommentariesSvg from '../../../assets/commentaries.svg'
import Auth from '../Auth/Auth'

import Logo from '../../../assets/icon.png'



export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper loop={false} showsButtons>
        <CarouselItems>
          <View>
            <Image source={Logo} style={{width: 65, height: 65, alignSelf: 'center'}}/>
            <CarouselText style={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
              Welcome to Quoting!
            </CarouselText>
            <CarouselText>
              Here you can express your ideas and thoughts in a simple and easy way.
            </CarouselText>
          </View>
          <MobileSvg height={230} />
        </CarouselItems>
        <CarouselItems>
          <CommentariesSvg height={170} />
          <View>
            <CarouselText>
              You can also see other people toughts and comment on them.
            </CarouselText>
            <CarouselText>
              Create an account and start right away!
            </CarouselText>
          </View>
        </CarouselItems>
        <CarouselItems>
          <Auth navigation={this.props.navigation}/>
        </CarouselItems>
      </Swiper>
    )
  }
}