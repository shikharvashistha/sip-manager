import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/user/Home';
import {light} from '../theme/Theme';
import Icons from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from '../screens/user/Profile';
import Wallet from '../screens/user/Wallet';
import Sip from '../screens/user/Sip';
import SipRoutes from './SipRoutes';

function UserNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: light.primarybg,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: light.secondary,
        tabBarActiveTintColor: light.primarybtnbg,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({color, size}) => (
            <IonIcons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="sip"
        component={SipRoutes}
        options={{
          tabBarIcon: ({color, size}) => (
            <MIcons name="dialer-sip" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default UserNav;
