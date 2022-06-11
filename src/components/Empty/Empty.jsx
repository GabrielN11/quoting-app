import { View, Text } from 'react-native'
import React from 'react'
import VoidSvg from '../../../assets/void.svg'
import colors from '../../../assets/constants/colors'

export default function Empty() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 25}}>
        <VoidSvg width={200} height={200}/>
        <Text style={{fontFamily: 'Montserrat', color: colors.FONT_DEFAULT_COLOR, fontSize: 20, marginTop: 10}}>Nothing to see here.</Text>
    </View>
  )
}