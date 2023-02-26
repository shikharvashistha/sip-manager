import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Btn from '../../components/common/Button';
import {signoutAction} from '../../actions/auth';
import {clearUserDetails} from '../../redux/reducers/userSlice';
import {useDispatch} from 'react-redux';
import {light} from '../../theme/Theme';

const Profile = () => {
  const dispatch = useDispatch();

  const signout = async () => {
    try {
      await signoutAction();
      dispatch(clearUserDetails());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Btn text="signout" onPress={signout} bg={light.primarybtnbg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Profile;
