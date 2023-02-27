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
  btnMl,
  btnMr,
  borderRadius,
  fontSize,
  borderWidth,
  borderColor,
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
          padding: btnPadding === 0 ? 0 : btnPadding || 17,
          marginTop: btnMt === 0 ? 0 : btnMt || BTN_TOP_SPACING,
          marginBottom: btnMb === 0 ? 0 : btnMb || BTN_BOTTOM_SPACING,
          marginLeft: btnMl || 0,
          marginRight: btnMr || 0,
          borderRadius: borderRadius || 15,
          borderWidth: borderWidth || 0,
          borderColor: borderColor || 'transparent',
        }}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              ...styles.btnText,
              color: textColor || light.primary,
              fontSize: fontSize || 14,
            }}>
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
    fontFamily: light.text_semibold,
  },
});

export default Btn;
