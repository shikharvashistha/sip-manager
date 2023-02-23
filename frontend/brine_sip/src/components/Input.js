import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {light} from '../theme/Theme';

const {width, height} = Dimensions.get('screen');

const CONTAINER_VERTICAL_SPACE = 10;
const LABLE_SPACE = 5;

const Input = ({label, type, onChange, password, focus, value}) => {
  const [isFocus, setFocus] = useState(false);

  const focusChange = () => {
    setFocus(e => !e);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          type={type}
          style={{
            ...styles.textInput,
            // borderWidth: isFocus ? 2.5 : 2,
            // borderColor: isFocus ? light.primarybtnbg : light.dark,
            // backgroundColor: isFocus ? light.primarybg : light.dark,
          }}
          secureTextEntry={password}
          autoFocus={focus}
          placeholder={label}
          onChangeText={onChange}
          placeholderTextColor={light.secondary}
          onFocus={focusChange}
          onBlur={focusChange}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    // height: 50,
    marginVertical: CONTAINER_VERTICAL_SPACE,
  },
  inputWrapper: {
    // backgroundColor: ,
  },
  label: {
    color: light.secondary,
    fontFamily: light.text_reg,
    fontSize: 12,
    margin: LABLE_SPACE,
  },
  textInput: {
    backgroundColor: light.dark,
    padding: 17,
    paddingTop: 16.5,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: light.text_semibold,
    borderColor: light.dark,
    fontSize: 14,
  },
});
export default Input;
