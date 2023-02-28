import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Sip from '../screens/user/Sip';
import CreateSip from '../screens/user/sip/CreateSip';
import {cardStyleSlideX} from './navStyles';

function SipRoutes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="sip_home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="sip_home"
        component={Sip}
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
        name="add_sip"
        component={CreateSip}
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

export default SipRoutes;
