import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GroupChat from './screens/GroupChat';
import About from './screens/About';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#8a2be2',
          marginLeft: 50
        },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center'
      }}>
        <Stack.Screen name="GroupChat" component={GroupChat} options={{
          title: 'Homies',
        }} />
        <Stack.Screen name="About" component={About} options={{
          title: 'Homies',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;