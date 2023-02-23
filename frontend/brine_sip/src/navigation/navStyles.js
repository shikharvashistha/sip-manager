import {Animated} from 'react-native';
export const cardStyleSlideX = ({current, next, inverted, layouts}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        })
      : 0,
  );
  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [layouts.screen.width, 0, -layouts.screen.width],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
        // {
        //   scale: progress.interpolate({
        //     inputRange: [0, 1, 2],
        //     outputRange: [0.8, 1, 0.5],
        //   }),
        // },
      ],
    },
  };
};

export const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
