import { StatusBar } from 'expo-status-bar';
import { StatusBar as RactNativeStatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import Initial from './src/screens/Initial/Initial'
import SignIn from './src/screens/SignIn/SignIn';

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
      <StatusBar style='light' backgroundColor='#212529' />
      <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Initial" component={Initial} options={{headerShown: false}} />
                <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RactNativeStatusBar.currentHeight,
    paddingTop: 10,
    backgroundColor: '#212529',
  }
});