import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {light} from '../theme/Theme';

const {width, height} = Dimensions.get('screen');
const BTN_TOP_SPACING = 20;
const BTN_BOTTOM_SPACING = 20;

const Btn = ({text, bg, onPress, loading}) => {
  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        style={{...styles.btn, backgroundColor: bg, opacity: loading ? 0.6 : 1}}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btnText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: width * 0.8,
    textAlign: 'center',
    padding: 10,
    alignItems: 'center',
    marginTop: BTN_TOP_SPACING,
    marginBottom: BTN_BOTTOM_SPACING,
    padding: 17,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 14,
    fontFamily: light.text_semibold,
  },
});

export default Btn;
