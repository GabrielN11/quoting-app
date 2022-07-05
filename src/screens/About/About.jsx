import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import DrawerHeader from '../../components/DrawerHeader/DrawerHeader'
import Logo from '../../../assets/icon.png'
import { AboutTitle, LogoImage, AboutText, IconLabel, VersionText } from './styles'
import colors from '../../../assets/constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import * as Linking from 'expo-linking'

export default function About({ navigation }) {
  return (
    <View style={{ backgroundColor: colors.BACKGROUND, flex: 1 }}>
      <DrawerHeader navigation={navigation} />
      <View style={{alignItems: 'center', flex: 6}}>
        <LogoImage source={Logo} />
        <AboutTitle>Quoting</AboutTitle>
        <VersionText>Beta 0.9.1</VersionText>
        <AboutText>
          Quoting is an open source social media app developed by Gabriel Nunes. The application was developed to practice my skills
          in mobile developement. The goal of the application is to provide a way for people to share their thoughts in
          an environment dedicated to this purpose, where they can interact with other people, adding ideas in a healthy way.
        </AboutText>
        <AboutText>Click in the icons below to visit the pages!</AboutText>
        <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around' }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => Linking.openURL('https://github.com/GabrielN11/quoting-app')}>
            <FontAwesomeIcon icon={faGithub} size={30} color={colors.FONT_DEFAULT_COLOR} />
            <IconLabel>Repository</IconLabel>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => Linking.openURL('https://gabrielnunes.vercel.app/')}>
            <FontAwesomeIcon icon={faCode} size={30} color={colors.FONT_DEFAULT_COLOR} />
            <IconLabel>My portfolio</IconLabel>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}