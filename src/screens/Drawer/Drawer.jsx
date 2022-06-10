import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Home from '../Home/Home';
import colors from '../../../assets/constants/colors';
import Logout from '../Logout/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
        drawerStyle: {
          backgroundColor: colors.BACKGROUND,
        },
        drawerActiveBackgroundColor: colors.BAR_BACKGROUND,
        drawerActiveTintColor: colors.FONT_DEFAULT_COLOR,
        drawerInactiveTintColor: colors.FONT_DEFAULT_COLOR
      }}>
        <Drawer.Screen name="Home" component={Home} options={{headerShown: false, drawerIcon: (focused, size) => (
          <FontAwesomeIcon icon={faHome} size={size} color={colors.FONT_DEFAULT_COLOR}/>
        )}} />
        <Drawer.Screen name="Log-out" component={Logout} options={{headerShown: false, drawerIcon: (focused, size) => (
          <FontAwesomeIcon icon={faRightFromBracket} size={size} color={colors.FONT_DEFAULT_COLOR}/>
        )}} />
      </Drawer.Navigator>
  );
}