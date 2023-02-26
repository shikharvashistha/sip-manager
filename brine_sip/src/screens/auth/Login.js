import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {light} from '../../theme/Theme';
import FastImage from 'react-native-fast-image';
import logo from '../../assets/png/brine.png';
import logofull from '../../assets/png/logofull.png';
import Input from '../../components/common/Input';
import Btn from '../../components/common/Button';
import {signinAction} from '../../actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetails} from '../../redux/reducers/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const VERTICAL_SPACE = 14;
const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state);
  console.log(user);

  const NavigateToSignup = () => {
    navigation.navigate('signup');
  };

  //   email change hanlder
  const onEmailChange = e => {
    setEmail(e);
  };
  // password change hanlder
  const onPasswordChange = e => {
    setPassword(e);
  };

  //   signin hanlder
  const signin = async () => {
    setLoading(true);
    const data = {email, password};
    try {
      const res = await signinAction({data});
      setError(null);
      console.log(res);
      if (!res?.data?.token) throw new Error('Session token not found');
      await AsyncStorage.setItem('token', res?.data?.token);
      dispatch(
        setUserDetails({
          userId: res?.data?.userID,
          email: email,
        }),
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || err.message);
      console.log(err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <FastImage
        style={styles.logo}
        source={logo}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={styles.title}>Welcome Back!</Text>
      {error ? (
        <Text style={{...styles.subtitle, color: light.danger}}>{error}</Text>
      ) : (
        <Text style={styles.subtitle}>Please sign in to your SIP account</Text>
      )}

      <Input label="Email" onChange={onEmailChange} />
      <Input label="Password" password onChange={onPasswordChange} />

      <Btn
        text="Sign In"
        bg={light.primarybtnbg}
        loading={loading}
        onPress={signin}
      />

      <Text style={{...styles.subtitle, ...styles.linkText}}>
        Don't have an account?{' '}
        <Text style={styles.hyperlink} onPress={NavigateToSignup}>
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: light.primarybg,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: light.inter_semibold,
    marginVertical: VERTICAL_SPACE,
  },
  logo: {
    marginVertical: VERTICAL_SPACE,
    width: 90,
    height: 90,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: light.inter_semibold,
    marginBottom: VERTICAL_SPACE,
    color: light.secondary,
  },
  linkText: {
    marginTop: VERTICAL_SPACE,
  },
  hyperlink: {
    color: light.primarybtnbg,
  },
});
export default Login;
