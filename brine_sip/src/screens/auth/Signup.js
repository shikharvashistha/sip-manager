import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {light} from '../../theme/Theme';
import Input from '../../components/common/Input';
import Btn from '../../components/common/Button';
import Back from '../../assets/svg/back.svg';
import {signupAction} from '../../actions/auth';
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../../redux/reducers/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');
const VERTICAL_SPACE = 14;

const Signup = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfrimPassword] = useState('');

  const dispatch = useDispatch();

  const NavigateToSignin = () => {
    navigation.navigate('signin');
  };
  const navigateBack = () => {
    navigation.goBack();
  };

  const nameChangeHandler = e => {
    setName(e);
  };
  const emailChangeHandler = e => {
    setEmail(e);
  };
  const passwordChangeHandler = e => {
    setPassword(e);
  };
  const confrimPasswordChangeHandler = e => {
    setConfrimPassword(e);
  };

  const signup = async e => {
    try {
      setLoading(true);
      const data = {email, password, confirm_password};

      const res = await signupAction({data});
      setError(null);
      console.log(res, 'asdasd');
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
      <TouchableOpacity style={styles.backBtn} onPress={navigateBack}>
        <Back width={16} height={16} />
      </TouchableOpacity>

      <Text style={styles.title}>Create new account</Text>
      {error ? (
        <Text style={{...styles.subtitle, color: light.danger}}>{error}</Text>
      ) : (
        <Text style={styles.subtitle}>Please fill the fields to continue</Text>
      )}

      <Input label="Name" onChange={nameChangeHandler} value={name} />
      <Input label="Email" onChange={emailChangeHandler} value={email} />
      <Input
        label="Password"
        password
        onChange={passwordChangeHandler}
        value={password}
      />
      <Input
        label="Confrim Password"
        password
        value={confirm_password}
        onChange={confrimPasswordChangeHandler}
      />

      <Btn
        text="Sign Up"
        bg={light.primarybtnbg}
        loading={loading}
        onPress={signup}
      />

      <Text style={{...styles.subtitle, ...styles.linkText}}>
        have an account?{' '}
        <Text style={styles.hyperlink} onPress={NavigateToSignin}>
          Sign In
        </Text>
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: light.primarybg,
    // justifyContent: 'center',
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
  hyperlink: {
    color: light.primarybtnbg,
  },
  linkText: {
    marginTop: VERTICAL_SPACE,
  },
  backBtn: {
    padding: 10,
    borderRadius: 10,
    // width: 40,

    borderWidth: 3,
    borderColor: light.dark,
    alignSelf: 'flex-start',
    marginLeft: width * 0.1,
  },
});
export default Signup;
