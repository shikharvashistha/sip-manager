import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Btn from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {light} from '../../theme/Theme';
import {clearUserDetails} from '../../redux/reducers/userSlice';
import {signoutAction} from '../../actions/auth';

const Home = () => {
  const user = useSelector(state => state);
  const dispatch = useDispatch();
  console.log(user);

  const signout = async () => {
    try {
      await signoutAction();
      dispatch(clearUserDetails());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.conatiner}>
      <Text>Home</Text>
      <Btn text="signout" onPress={signout} bg={light.primarybtnbg} />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
