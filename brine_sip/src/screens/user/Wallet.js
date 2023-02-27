import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout, light} from '../../theme/Theme';
import Btn from '../../components/common/Button';
import {getCryptoValues} from '../../actions/coinGeko';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {getWalletBalence} from '../../actions/wallet';
import {useSelector} from 'react-redux';
import AssetCard from '../../components/home/AssetCard';

const Wallet = () => {
  const [data, setData] = useState();
  const {userId} = useSelector(state => state.user);
  const [totalBalance, setTotalBalance] = useState(0);
  const [invested, setInvested] = useState(0);
  const [current, setCurrent] = useState(0);

  const initialFunction = async () => {
    try {
      const {data} = await getWalletBalence({userID: userId});
      setData(data);
      setTotalBalance(data[0].Balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getAssets();
    initialFunction();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.wallet_amount_wrapper}>
        <Text style={styles.wallet_label}>Your Wallet</Text>
        <Text style={styles.wallet_amount}>
          {totalBalance.toFixed(2)} <Text style={styles.base_coin}>USDC</Text>
        </Text>
        <View style={styles.protfolio}>
          <View style={styles.porfolio_item_wrapper}>
            <Text style={styles.portfolio_heading}>Invested</Text>
            <View style={styles.flex_row_center}>
              <Text style={styles.portfolio_value}>{invested.toFixed(2)}</Text>
              <Text
                style={
                  current - invested >= 0
                    ? styles.returns_profit
                    : styles.returns_loss
                }>
                {invested === 0
                  ? (0).toFixed(2)
                  : (current - invested) / current}
                %
              </Text>
            </View>
          </View>
          <View style={styles.porfolio_item_wrapper}>
            <Text style={styles.portfolio_heading}>Current</Text>
            <View style={styles.flex_row_center}>
              <Text style={styles.portfolio_value}>{invested.toFixed(2)}</Text>
              <Text
                style={
                  current - invested >= 0
                    ? styles.returns_profit
                    : styles.returns_loss
                }>
                {invested === 0
                  ? (0).toFixed(2)
                  : (current - invested) / current}
                %
              </Text>
            </View>
          </View>
        </View>
        <Btn
          bg={light.primary}
          textColor={light.titlesubstr1}
          text="Deposit"
          btnPadding={10}
          btnMb={5}
          btnMt={10}
          btnWidth={layout.card_width * 0.85}
          borderRadius={9}
        />
      </View>
      <View style={styles.assets_wrapper}>
        <Text style={styles.asset_label}>Your Assets</Text>
        {data?.map(item => (
          <AssetCard item={item} key={item.AssetName} />
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: layout.layout_spacing,
  },
  wallet_amount_wrapper: {
    alignItems: 'center',
    // height: 150,
    width: layout.card_width,
    paddingVertical: layout.component_vertical_spcaing,
    justifyContent: 'center',
    backgroundColor: light.dark,
    borderRadius: 20,
    marginBottom: layout.component_vertical_spcaing,
  },
  wallet_amount: {
    fontSize: 30,
    fontFamily: light.text_bold,
    color: light.primary,
  },
  wallet_label: {
    fontFamily: light.text_semibold,
    color: light.secondary,
  },
  base_coin: {
    marginHorizontal: 10,
    fontFamily: light.inter_semibold,
    fontSize: 12,
    color: light.tertiary,
  },
  protfolio: {
    width: layout.card_width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  porfolio_item_wrapper: {
    marginVertical: 10,
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
  flex_row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assets_wrapper: {
    width: layout.card_width,
    backgroundColor: light.card,
    borderRadius: 20,
    padding: layout.component_vertical_spcaing,
  },
  asset_label: {
    fontFamily: light.text_semibold,
    marginBottom: 10,
    color: light.primary,
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
export default Wallet;
