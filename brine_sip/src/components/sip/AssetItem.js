import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {layout, light} from '../../theme/Theme';

const AssetItem = ({item, sip}) => {
  return (
    <View style={styles.sip_asset}>
      <View style={styles.flex_row_between}>
        <View style={styles.flex_row_center}>
          <FastImage
            source={{
              uri: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
            }}
            style={styles.sip_asset_logo}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.asset_name}>{item.AssetName}</Text>
        </View>
        <View>
          <Text
            style={{
              ...styles.sip_subname,
              textAlign: 'right',
              fontSize: 10,
            }}>
            Investment (usdc)
          </Text>
          <Text
            style={{
              ...styles.sip_max_value,
              textAlign: 'right',
              fontSize: 12,
            }}>
            {item.AssetPercentage}% ={' '}
            {sip.SIPAmount * (item.AssetPercentage / 100)}/m
          </Text>
        </View>
      </View>
      <View style={{...styles.flex_row_between, ...styles.asset_item}}>
        <View>
          <Text style={styles.asset_value_lable}>Balance</Text>
          <Text style={styles.asset_value}>{item.AssetBalance}</Text>
        </View>
        <View>
          <Text style={{...styles.asset_value_lable, textAlign: 'right'}}>
            USDC
          </Text>
          <Text style={styles.asset_value}>{(0.000004).toFixed(6)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sip_asset: {
    paddingTop: layout.layout_spacing,
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
  portfolio_heading: {
    fontSize: 12,
    fontFamily: light.text_semibold,
    color: light.secondary,
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

export default AssetItem;
