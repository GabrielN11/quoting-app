import { View, Text } from 'react-native'
import React from 'react'
import ErrorSvg from '../../../assets/error.svg'
import colors from '../../../assets/constants/colors'

export default function Error() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 25}}>
        <ErrorSvg width={200} height={200}/>
        <Text style={{fontFamily: 'Montserrat', color: colors.FONT_DEFAULT_COLOR, fontSize: 20, marginTop: 10}}>Oops! Something went wrong.</Text>
    </View>
  )
}