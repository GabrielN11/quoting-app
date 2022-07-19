import { View, Text } from 'react-native'
import React from 'react'
import colors from '../../../assets/constants/colors'
import DrawerHeader from '../../components/DrawerHeader/DrawerHeader'
import { SearchOption, SearchOptionsView, SearchOptionText, SearchText } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQuoteLeft, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Search({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: colors.BACKGROUND}}>
      <DrawerHeader navigation={navigation}/>
      <SearchText>What are you looking for?</SearchText>
      <SearchOptionsView>
          <SearchOption onPress={() => navigation.navigate('PublicationSearchList')}>
              <SearchOptionText>Quotes</SearchOptionText>
              <FontAwesomeIcon icon={faQuoteLeft} size={22} color={colors.FONT_DEFAULT_COLOR}/>
          </SearchOption>
          <SearchOption backgroundColor={colors.ALERT} onPress={() => navigation.navigate('AdminUserList', {type: 'user'})}>
              <SearchOptionText>People</SearchOptionText>
              <FontAwesomeIcon icon={faUser} size={22} color={colors.FONT_DEFAULT_COLOR}/>
          </SearchOption>
      </SearchOptionsView>
      <View style={{flex: 1}}/>
    </View>
  )
}