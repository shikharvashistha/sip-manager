import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout, light} from '../../theme/Theme';
import FastImage from 'react-native-fast-image';
import {getCryptoValues} from '../../actions/coinGeko';

const AssetCard = ({item}) => {
  const [data, setData] = useState();
  const getAssets = async () => {
    await getCryptoValues(setData, 'bitcoin');
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <>
      {data ? (
        <View style={styles.asset_item}>
          <View style={styles.asset_sub_item}>
            <View style={styles.flex_row_center}>
              <FastImage
                source={{uri: data[0].image}}
                style={{width: 30, height: 30}}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.asset_card_heading}>{data[0].symbol}</Text>
            </View>
            {data[0].price_change_percentage_24h < 0 ? (
              <Text style={styles.negitive_percentage}>
                {data[0].price_change_percentage_24h}%
              </Text>
            ) : (
              <Text style={styles.positive_percentage}>
                +{data[0].price_change_percentage_24h}%
              </Text>
            )}
          </View>
          <View style={{...styles.asset_sub_item, marginTop: 10}}>
            <View>
              <Text style={styles.asset_value_lable}>Balance</Text>
              <Text style={styles.asset_value}>{item.Balance.toFixed(6)}</Text>
            </View>
            <View>
              <Text style={{...styles.asset_value_lable, textAlign: 'right'}}>
                USDC
              </Text>
              <Text style={styles.asset_value}>
                {(item.Balance * data[0].current_price).toFixed(3)}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  flex_row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  asset_item: {
    width: layout.card_width - 2 * layout.component_vertical_spcaing,
    // height: 100,
    backgroundColor: light.primarybg,
    borderRadius: 10,
    marginVertical: 5,
    padding: layout.component_vertical_spcaing,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignContent: 'baseline',
  },
  asset_sub_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignContent: 'center',
  },
  asset_card_heading: {
    fontFamily: light.text_semibold,
    marginHorizontal: 10,
    fontSize: 14,
    color: light.primary,
    textTransform: 'uppercase',
  },

  negitive_percentage: {
    fontSize: 10,
    marginVertical: 10,
    fontFamily: light.text_semibold,
    color: light.danger,
  },
  positive_percentage: {
    fontSize: 10,
    marginVertical: 10,
    fontFamily: light.text_semibold,
    color: light.success,
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
});

export default AssetCard;
