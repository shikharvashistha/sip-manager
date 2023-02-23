import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/user/Home';

function UserNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}

export default UserNav;
