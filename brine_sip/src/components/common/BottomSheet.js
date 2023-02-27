import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {light} from '../../theme/Theme';

const {width, height} = Dimensions.get('screen');
const bottomSheet = height * 0.87;
const initialSheetPos = 0;

const BottomSheet = ({bottomSheetY}) => {
  const bottomNavRef = useRef(null);
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      console.log(event);
      ctx.translationY = bottomSheetY.value;
    },
    onActive: (event, ctx) => {
      const position = ctx.translationY + event.translationY;
      console.log(position);
      bottomSheetY.value = Math.max(position, -bottomSheet);
      if (position > -initialSheetPos) bottomSheetY.value = -initialSheetPos;
    },
    onEnd: (event, ctx) => {
      const endPos = ctx.translationY + event.translationY;
      if (ctx.translationY > endPos)
        bottomSheetY.value = withTiming(-bottomSheet);
      else bottomSheetY.value = withTiming(-initialSheetPos);
    },
  });
  const initialBottomSheet = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomSheetY.value}],
    };
  });

  useEffect(() => {
    bottomSheetY.value = withTiming(-initialSheetPos, {duration: 600});
  }, []);

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View
        ref={bottomNavRef}
        style={[styles.bottomContainer, initialBottomSheet]}>
        {/* <FlatList /> */}

        <Animated.View style={styles.handlerContainer}>
          <View style={styles.handler}></View>
        </Animated.View>
        {/* <Places /> */}
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  bottomContainer: {
    top: height,
    width: width,
    height: bottomSheet,
    backgroundColor: light.primarybg,
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 100,
    shadowColor: light.primarybg,
  },
  bottomNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingBottom: 7,
    paddingTop: 12,
  },
  handlerContainer: {
    width: '100%',
    paddingVertical: 6,
  },
  handler: {
    width: width * 0.2,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    marginTop: 15,
    height: 4,
    backgroundColor: light.secondary,
  },
});
export default BottomSheet;
