import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {memo, useState, useEffect} from 'react';
import {getCryptoValues} from '../../actions/coinGeko';
import {layout, light} from '../../theme/Theme';
import FastImage from 'react-native-fast-image';

const Assets = memo(() => {
  const [data, setData] = useState();

  const getAssets = async () => {
    await getCryptoValues(setData);
  };

  useEffect(() => {
    getAssets();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.sub_heading}>Explore Assets</Text>
      <View style={styles.assets_wrapper}>
        {data?.map(item => (
          <View style={styles.asset_card} key={item.id}>
            <View style={styles.flex_row_center}>
              <FastImage
                source={{uri: item.image}}
                style={{width: 25, height: 25}}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.asset_card_heading}>
                {(item.symbol + '/usdc').toUpperCase()}
              </Text>
            </View>
            <View style={{...styles.flex_row_center, marginTop: 10}}>
              <Text style={{...styles.current_price}}>
                {item.current_price}
              </Text>
            </View>
            {item.price_change_percentage_24h < 0 ? (
              <Text style={styles.negitive_percentage}>
                {item.price_change_percentage_24h}%
              </Text>
            ) : (
              <Text style={styles.positive_percentage}>
                {item.price_change_percentage_24h}%
              </Text>
            )}
            <Text style={styles.label}>24H</Text>
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: layout.card_width,
    paddingHorizontal: layout.layout_spacing,
    paddingVertical: layout.component_vertical_spcaing,
    marginBotton: layout.component_vertical_spcaing,
    backgroundColor: light.dark,
    borderRadius: 20,
  },
  sub_heading: {
    fontFamily: light.text_semibold,
    color: light.primary,
    marginBottom: 10,
  },
  assets_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  asset_card: {
    width: (layout.card_width - 2 * layout.layout_spacing - 10) / 2,
    padding: 10,
    backgroundColor: light.primarybg,
    // marginRight: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  asset_card_heading: {
    fontFamily: light.text_semibold,
    marginHorizontal: 10,
    fontSize: 11,
    color: light.primary,
  },
  flex_row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  current_price: {
    fontSize: 14,
    fontFamily: light.text_semibold,
    color: light.primary,
  },
  label: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 10,
    paddingTop: 3,
    paddingHorizontal: 15,
    color: light.secondary,
    fontFamily: light.text_semibold,
    backgroundColor: light.card,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  negitive_percentage: {
    fontSize: 10,
    fontFamily: light.text_semibold,
    color: light.danger,
    marginTop: 5,
  },
  positive_percentage: {
    fontSize: 10,
    fontFamily: light.text_semibold,
    color: light.success,
    marginTop: 5,
  },
});

export default Assets;
