import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Btn from '../../components/common/Button';
import {useDispatch, useSelector} from 'react-redux';
import {layout, light} from '../../theme/Theme';
import {clearUserDetails} from '../../redux/reducers/userSlice';
import {signoutAction} from '../../actions/auth';
import FastImage from 'react-native-fast-image';
import avatar from '../../assets/png/avatar.png';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import Assets from '../../components/home/Assets';
import {getWalletBalence} from '../../actions/wallet';
import SipCard from '../../components/home/SipCard';
import {amountFormatter} from '../../utils/textFormatter';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');
const LAYOUT_SPACING = 25;
const AVATAR_WIDTH_HEIGHT = 40;
const COMPONENT_VERITAL_SPACING = 20;
const CARD_WIDTH = width - 2 * LAYOUT_SPACING;

const Home = () => {
  const {email, userId} = useSelector(state => state.user);
  const [totalBalance, setTotalBalance] = useState(0);
  const [invested, setInvested] = useState(0);
  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();

  const [userName, setUserName] = useState();

  const initialFunction = async () => {
    try {
      const {data} = await getWalletBalence({userID: userId});
      console.log(data);
      setTotalBalance(data.walletBalance);
      setInvested(data.investedAmount);
      setCurrent(data.currentAssetValue);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const full_name = email.split('@')[0];
  //   const first_name = full_name.split('.')[0];
  //   if (first_name) setUserName(first_name);
  //   else setUserName(full_name);
  //   initialFunction();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      const full_name = email.split('@')[0];
      const first_name = full_name.split('.')[0];
      if (first_name) setUserName(first_name);
      else setUserName(full_name);
      initialFunction();
      console.log('focused');
      return () => initialFunction();
    }, []),
  );

  const signout = async () => {
    try {
      await signoutAction();
      dispatch(clearUserDetails());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.conatiner}>
      {/* header */}
      <View style={styles.header}>
        <FastImage
          source={avatar}
          style={styles.avatar}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.username}>Hi, {userName} 👋</Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}} //header height + bottom nav height 40+60
        showsVerticalScrollIndicator={false}>
        {/* account overview */}
        <View style={styles.account_overview}>
          <View>
            <Text style={styles.balance_lable}>Total Balance</Text>
            <View style={styles.flex_row_center}>
              <Text style={styles.total_balance}>
                {totalBalance.toFixed(2)}
              </Text>
              <Text style={styles.base_coin}>USDC</Text>
            </View>
          </View>
          <View style={styles.protfolio}>
            <View style={styles.porfolio_item_wrapper}>
              <Text style={styles.portfolio_heading}>Invested</Text>
              <View style={styles.flex_row_center}>
                <Text style={styles.portfolio_value}>
                  {invested.toFixed(2)}
                </Text>
                {current - invested >= 0 ? (
                  <Text style={styles.returns_profit}>
                    +
                    {invested === 0
                      ? (0).toFixed(2)
                      : amountFormatter((current - invested) / invested)}
                    %
                  </Text>
                ) : (
                  <Text style={styles.returns_loss}>
                    {invested === 0
                      ? (0).toFixed(2)
                      : amountFormatter((current - invested) / invested)}
                    %
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.porfolio_item_wrapper}>
              <Text style={styles.portfolio_heading}>Current</Text>
              <View style={styles.flex_row_center}>
                <Text style={styles.portfolio_value}>{current.toFixed(2)}</Text>

                {current - invested >= 0 ? (
                  <Text style={styles.returns_profit}>
                    +{amountFormatter(current - invested)}
                  </Text>
                ) : (
                  <Text style={styles.returns_loss}>
                    {amountFormatter(current - invested)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        {/* add balance to your wallet */}
        <LinearGradient
          colors={[light.secondarybg, light.titlesubstr2]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.balance_banner}>
          <Text style={styles.banner_title}>Add value to your wallet</Text>
          <Btn
            text="Deposit"
            bg={light.primary}
            btnWidth={CARD_WIDTH * 0.3}
            textColor={light.dark}
            btnMt={10}
            btnMb={10}
            btnPadding={10}
            borderRadius={10}
          />
        </LinearGradient>
        {/* sips */}
        <SipCard />
        {/* assets */}
        <Assets />
      </ScrollView>
      {/* <Btn text="signout" onPress={signout} bg={light.primarybtnbg} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    // flex: 1,
    paddingHorizontal: layout.layout_spacing,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: layout.component_vertical_spcaing,
  },
  avatar: {
    width: AVATAR_WIDTH_HEIGHT,
    height: AVATAR_WIDTH_HEIGHT,
    borderRadius: AVATAR_WIDTH_HEIGHT * 0.5,
  },
  username: {
    textTransform: 'capitalize',
    marginHorizontal: 17,
    fontFamily: light.inter_semibold,
    color: light.primary,
  },
  account_overview: {
    width: layout.card_width,
    // height: 210,
    backgroundColor: light.dark,
    borderRadius: 25,
    marginBottom: layout.component_vertical_spcaing,
    padding: layout.layout_spacing,
    justifyContent: 'center',
  },
  balance_lable: {
    fontFamily: light.text_semibold,
    color: light.primary,
  },
  total_balance: {
    fontFamily: light.text_semibold,
    color: light.primary,
    fontSize: 30,
    marginVertical: 5,
  },
  flex_row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_center_center: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  base_coin: {
    marginHorizontal: 10,
    fontFamily: light.inter_semibold,
    fontSize: 12,
    color: light.tertiary,
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
  balance_banner: {
    width: layout.card_width,
    backgroundColor: light.primarybtnbg,
    marginBottom: layout.component_vertical_spcaing,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.layout_spacing,
    paddingVertical: 10,
  },
  banner_title: {
    fontFamily: light.text_semibold,
    color: light.primary,
    width: layout.card_width * 0.5,
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
});

export default Home;
