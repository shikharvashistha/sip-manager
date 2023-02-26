import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {cardStyleSlideX, forFade} from './navStyles';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AuthNav from './AuthNav';
import UserNav from './UserNav';
import {light} from '../theme/Theme';

const Routes = () => {
  const {userId} = useSelector(state => state.user);
  console.log(userId);
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: light.primarybg,
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      {userId ? <UserNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default Routes;
