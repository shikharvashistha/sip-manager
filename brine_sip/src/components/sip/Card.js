import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {layout, light} from '../../theme/Theme';
import FastImage from 'react-native-fast-image';
import AssetItem from './AssetItem';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Btn from '../common/Button';

const Card = () => {
  const assetRef = useRef(null);
  const cardRef = useRef(null);
  const [assetsHeight, setAssetsHeight] = useState(null);
  const [flag, setFlag] = useState(0);

  const asset_height = useSharedValue(200);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: asset_height.value,
    };
  });
  useEffect(() => {
    if (assetRef?.current) {
      assetRef.current?.measureLayout(
        cardRef.current,
        (x, y, width, height) => {
          setAssetsHeight(height);
          console.log(height);
        },
      );
    }
  }, [assetRef?.current]);
  return (
    <TouchableWithoutFeedback
      style={styles.tochable}
      onPress={() => {
        asset_height.value =
          asset_height.value === 200
            ? withTiming(200 + (assetsHeight || 0))
            : withTiming(200);
      }}>
      <Animated.View style={[styles.plan_card, animatedStyle]} ref={cardRef}>
        <View style={styles.sip_details}>
          <Text style={styles.sip_name}>SIP Plan 1</Text>
          <Text style={styles.sip_subname}>
            Total investment (usdc) :{' '}
            <Text style={styles.sip_max_value}>100/m</Text>
          </Text>
          <View style={styles.protfolio}>
            <View style={styles.porfolio_item_wrapper}>
              <Text style={styles.portfolio_heading}>Invested</Text>
              <View style={styles.flex_row_center}>
                <Text style={styles.portfolio_value}>100.45</Text>
                <Text style={styles.returns_profit}>+300%</Text>
              </View>
            </View>
            <View style={styles.porfolio_item_wrapper}>
              <Text style={styles.portfolio_heading}>Current</Text>
              <View style={styles.flex_row_center}>
                <Text style={styles.portfolio_value}>300.34</Text>
                <Text style={styles.returns_profit}>+200</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.sip_assets} ref={assetRef}>
          <AssetItem />
          <AssetItem />
          <AssetItem />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  tochable: {
    borderRadius: 20,
  },
  plan_card: {
    width: layout.card_width,
    backgroundColor: light.card,
    borderRadius: 20,
    height: 200,
    overflow: 'hidden',
    marginBottom: layout.component_vertical_spcaing,
  },
  sip_details: {
    padding: layout.layout_spacing,
    height: 200,
  },
  sip_assets: {
    paddingHorizontal: layout.layout_spacing,
    paddingBottom: layout.layout_spacing,
    borderRadius: 20,
    backgroundColor: light.dark,
  },
  sip_asset_logo: {
    width: 30,
    height: 30,
  },
  sip_name: {
    fontFamily: light.text_semibold,
    color: light.primary,
    marginBottom: 5,
  },
  sip_subname: {
    fontFamily: light.text_semibold,
    fontSize: 13,
    color: light.secondary,
  },
  sip_max_value: {
    fontFamily: light.text_semibold,
    color: light.primary,
    fontSize: 14,
  },
  asset_name: {
    fontFamily: light.text_semibold,
    marginHorizontal: 10,
    fontSize: 14,
    color: light.primary,
  },
  protfolio: {
    width: layout.card_width,
    flexDirection: 'row',
  },
  porfolio_item_wrapper: {
    marginVertical: 10,
    marginRight: 20,
  },
  portfolio_heading: {
    fontSize: 12,
    fontFamily: light.text_semibold,
    color: light.secondary,
  },
  returns_profit: {
    fontFamily: light.text_semibold,
    fontSize: 11,
    marginHorizontal: 4,
    color: light.success,
  },
  portfolio_value: {
    fontFamily: light.text_semibold,
    fontSize: 15,
    color: light.primary,
  },
  flex_row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_row_between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  asset_value: {
    fontFamily: light.text_semibold,
    fontSize: 12,
    color: light.primary,
  },
  asset_value_lable: {
    fontFamily: light.text_semibold,
    fontSize: 11,
    color: light.secondary,
  },
  asset_item: {
    marginTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: light.card,
  },
});
export default Card;