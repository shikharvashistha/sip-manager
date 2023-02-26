import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {light} from '../../theme/Theme';

const {width, height} = Dimensions.get('screen');
const BTN_TOP_SPACING = 20;
const BTN_BOTTOM_SPACING = 20;

const Btn = ({
  text,
  bg,
  onPress,
  loading,
  btnWidth,
  textColor,
  btnPadding,
  btnMt,
  btnMb,
  borderRadius,
}) => {
  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        style={{
          ...styles.btn,
          backgroundColor: bg,
          opacity: loading ? 0.6 : 1,
          width: btnWidth || width * 0.8,
          padding: btnPadding || 17,
          marginTop: btnMt || BTN_TOP_SPACING,
          marginBottom: btnMb || BTN_BOTTOM_SPACING,
          borderRadius: borderRadius || 15,
        }}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{...styles.btnText, color: textColor || light.primary}}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontFamily: light.text_semibold,
  },
});

export default Btn;
