import { StatusBar } from 'expo-status-bar';
import { StatusBar as RactNativeStatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { GlobalProvider } from './src/GlobalContext';
import Initial from './src/screens/Initial/Initial'
import SignIn from './src/screens/SignIn/SignIn';
import UpdateName from './src/screens/UpdateName/UpdateName';
import UpdatePassword from './src/screens/UpdatePassword/UpdatePassword'
import SignUp from './src/screens/SignUp/SignUp';
import PublicationForm from './src/screens/PublicationForm/PublicationForm';
import Profile from './src/screens/Profile/Profile';

import colors from './assets/constants/colors';
import DrawerRoutes from './src/screens/Drawer/Drawer';
import Commentaries from './src/screens/Commentaries/Commentaries';
import PublicationList from './src/screens/PublicationList/PublicationList';
import CommentariesList from './src/screens/CommentariesList/CommentariesList';
import ShareList from './src/screens/ShareList/ShareList';
import Publication from './src/screens/Publication/Publication';
import UserList from './src/screens/UserList/UserList';
import AdminSettings from './src/screens/admin/AdminSettings/AdminSettings';
import AdminUserList from './src/screens/admin/AdminUserList/AdminUserList';

const Stack = createNativeStackNavigator()

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratThin: require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),
    SourceSans: require('./assets/fonts/SourceSansPro-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor={colors.BACKGROUND} />
      <GlobalProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="Drawer" component={DrawerRoutes} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateName" component={UpdateName} options={{ headerShown: false }} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{ headerShown: false }} />
            <Stack.Screen name="PublicationForm" component={PublicationForm} options={{headerShown: false}}/>
            <Stack.Screen name="Commentaries" component={Commentaries} options={{headerShown: false}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="PublicationList" component={PublicationList} options={{headerShown: false}}/>
            <Stack.Screen name="CommentariesList" component={CommentariesList} options={{headerShown: false}}/>
            <Stack.Screen name="ShareList" component={ShareList} options={{headerShown: false}}/>
            <Stack.Screen name="Publication" component={Publication} options={{headerShown: false}}/>
            <Stack.Screen name="UserList" component={UserList} options={{headerShown: false}}/>
            <Stack.Screen name="AdminSettings" component={AdminSettings} options={{headerShown: false}}/>
            <Stack.Screen name="AdminUserList" component={AdminUserList} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RactNativeStatusBar.currentHeight,
    paddingTop: 10,
    backgroundColor: colors.BACKGROUND,
  }
});