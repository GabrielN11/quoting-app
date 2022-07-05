import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import Home from '../Home/Home';
import colors from '../../../assets/constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo, faCircleQuestion, faGear, faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../../GlobalContext';
import Settings from '../Settings/Settings';
import Tutorial from '../../components/Tutorial/Tutorial';
import About from '../About/About';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({route}) {
  const [showTutorial, setShowTutorial] = React.useState(false)
  const {newAccount} = route.params

  React.useEffect(() => {
    if(newAccount) setShowTutorial(true)
  }, [newAccount])
  return (
    <>
      {showTutorial && <Tutorial setShowTutorial={setShowTutorial}/>}
      <Drawer.Navigator initialRouteName="Home" useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} setShowTutorial={setShowTutorial}/>}
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.BACKGROUND,
          },
          swipeEnabled: false,
          drawerActiveBackgroundColor: colors.BAR_BACKGROUND,
          drawerActiveTintColor: colors.FONT_DEFAULT_COLOR,
          drawerInactiveTintColor: colors.FONT_DEFAULT_COLOR
        }}>
        <Drawer.Screen name="Home" component={Home} options={{
          headerShown: false, drawerIcon: (focused, size) => (
            <FontAwesomeIcon icon={faHome} size={size} color={colors.FONT_DEFAULT_COLOR} />
          )
        }} />
        <Drawer.Screen name="Settings" component={Settings} options={{
          headerShown: false, drawerIcon: (focused, size) => (
            <FontAwesomeIcon icon={faGear} size={size} color={colors.FONT_DEFAULT_COLOR} />
          )
        }} />
        <Drawer.Screen name="About" component={About} options={{
          headerShown: false, drawerIcon: (focused, size) => (
            <FontAwesomeIcon icon={faCircleInfo} size={size} color={colors.FONT_DEFAULT_COLOR} />
          )
        }} />
      </Drawer.Navigator>
    </>
  );
}

function CustomDrawerContent(props) {

  const { user } = React.useContext(GlobalContext)
  const items = [
    {
      label: user.name,
      icon: (focused, size) => (
        <FontAwesomeIcon icon={faUser} size={size} color={colors.FONT_DEFAULT_COLOR} />
      ),
      onPress: () => props.navigation.navigate('Profile', { profileId: user.id })
    },
    {
      label: 'Tutorial',
      icon: (focused, size) => (
        <FontAwesomeIcon icon={faCircleQuestion} size={size} color={colors.FONT_DEFAULT_COLOR}/>
      ),
      onPress: () => props.setShowTutorial(true)
    },
    {
      label: 'Logout',
      icon: (focused, size) => (
        <FontAwesomeIcon icon={faRightFromBracket} size={size} color={colors.FONT_DEFAULT_COLOR} />
      ),
      onPress: logout
    }
  ]

  async function logout() {
    await AsyncStorage.removeItem('@user_token')
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Initial' }],
    });
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