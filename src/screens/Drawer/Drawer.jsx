import { View, Text } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import Home from '../Home/Home';
import colors from '../../../assets/constants/colors';
import Logout from '../Logout/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../../GlobalContext';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
      <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />} 
      screenOptions={{
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
      </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {

  const {user} = React.useContext(GlobalContext)
  const items = [
    {
      label: user.name,
      icon:  (focused, size) => (
        <FontAwesomeIcon icon={faUser} size={size} color={colors.FONT_DEFAULT_COLOR}/>
      ),
      onPress: () => props.navigation.navigate('Profile', {profileId: user.id})
    },
    {
      label: 'Logout',
      icon:  (focused, size) => (
        <FontAwesomeIcon icon={faRightFromBracket} size={size} color={colors.FONT_DEFAULT_COLOR}/>
      ),
      onPress: logout
    }
  ]

  async function logout(){
    await AsyncStorage.removeItem('@user_token')
    props.navigation.navigate('Initial')
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {items.map(item => (
         <DrawerItem
         key={item.label}
         activeBackgroundColor={colors.BAR_BACKGROUND}
         activeTintColor={colors.FONT_DEFAULT_COLOR}
         inactiveTintColor={colors.FONT_DEFAULT_COLOR}
         label={item.label}
         onPress={item.onPress}
         icon={item.icon}
       />
      ))}
    </DrawerContentScrollView>
  );
}