import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {layout, light} from '../../theme/Theme';

const SipCard = () => {
  return (
    <View style={styles.sip_wapper}>
      <Text style={styles.sip_badge}>Default</Text>
      <Text style={styles.sip_name}>Investment Plan 1</Text>
      {/* <View style={styles.sip_card}></View> */}
      <Text style={styles.spi_subhead}>
        Max Investment (USDC) :{' '}
        <Text style={{...styles.text_white, fontSize: 14}}>50/M</Text>{' '}
      </Text>
      <View style={styles.sip_assets}>
        <FastImage
          source={{
            uri: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
          }}
          style={styles.sip_asset_logo}
          resizeMode={FastImage.resizeMode.contain}
        />
        <FastImage
          source={{
            uri: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850',
          }}
          style={styles.sip_asset_logo}
          resizeMode={FastImage.resizeMode.contain}
        />
        <FastImage
          source={{
            uri: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
          }}
          style={styles.sip_asset_logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.sip_props}>
        <View style={styles.protfolio}>
          <View style={styles.porfolio_item_wrapper}>
            <Text style={styles.portfolio_heading}>Invested</Text>
            <View style={styles.flex_row_center}>
              <Text style={styles.portfolio_value}>0</Text>
              <Text style={styles.returns_profit}>+0%</Text>
            </View>
          </View>
          <View style={styles.porfolio_item_wrapper}>
            <Text style={styles.portfolio_heading}>Current</Text>
            <View style={styles.flex_row_center}>
              <Text style={styles.portfolio_value}>0</Text>
              <Text style={styles.returns_profit}>+0</Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            ...styles.sip_inactive,
            ...styles.sip_activity_indicator,
          }}>
          Inactive
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sip_wapper: {
    marginBottom: layout.component_vertical_spcaing,
    width: layout.card_width,
    backgroundColor: light.card,
    // height: 200,
    borderRadius: 20,
    paddingHorizontal: layout.layout_spacing,
    paddingVertical: layout.component_vertical_spcaing,
  },
  sip_name: {
    fontFamily: light.text_semibold,
    color: light.primary,
    marginBottom: 5,
  },
  sip_card: {
    width: layout.card_width - 2 * layout.layout_spacing,
    backgroundColor: light.card,
    borderRadius: 10,
  },
  sip_assets: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row-reverse',
    margin: 10,
    padding: 10,
  },
  sip_asset_logo: {
    width: 30,
    height: 30,
    // backgroundColor: light.primarybg,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  sip_badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    paddingHorizontal: 20,
    fontSize: 11,
    fontFamily: light.text_semibold,
    backgroundColor: light.dark,
    color: light.tertiary,
    borderBottomLeftRadius: 10,
  },
  sip_props: {
    marginTop: 10,
  },
  spi_subhead: {
    fontFamily: light.text_semibold,
    color: light.secondary,
    fontSize: 12,
  },
  sip_activity_indicator: {
    fontFamily: light.text_semibold,
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: light.dark,
    width: 100,
    textAlign: 'center',
    marginTop: 10,
  },
  sip_inactive: {
    color: light.danger,
  },
  sip_active: {
    color: light.success,
  },
  protfolio: {
    flexDirection: 'row',
  },
  porfolio_item_wrapper: {
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
  returns_loss: {
    fontFamily: light.text_semibold,
    fontSize: 11,
    marginHorizontal: 4,
    color: light.danger,
  },
  portfolio_value: {
    fontFamily: light.text_semibold,
    fontSize: 15,
    color: light.primary,
  },
  text_white: {
    color: light.primary,
  },
  text_gold: {
    color: light.tertiary,
  },
  text_grey: {
    color: light.secondary,
  },
  flex_row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SipCard;
