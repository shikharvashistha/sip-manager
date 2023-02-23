import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import {cardStyleSlideX} from './navStyles';

function AuthNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="signin"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="signin"
        component={Login}
        options={{
          gestureHandler: true,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          },
          cardStyleInterpolator: cardStyleSlideX,
        }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{
          gestureHandler: true,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          },
          cardStyleInterpolator: cardStyleSlideX,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNav;
