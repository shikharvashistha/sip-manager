import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {layout, light} from '../../theme/Theme';
import Btn from '../../components/common/Button';
import Card from '../../components/sip/Card';
import BottomSheet from '../../components/common/BottomSheet';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {getSips} from '../../actions/sip';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');
const bottomSheet = height * 0.87;
const initialSheetPos = bottomSheet * 0.36;

const Sip = ({navigation}) => {
  const bottomSheetY = useSharedValue(0);
  const {userId} = useSelector(state => state.user);
  const [data, setData] = useState(null);
  const initialFunction = async () => {
    try {
      const {data} = await getSips({userID: userId});
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      initialFunction();
      return () => initialFunction();
    }, []),
  );
  // const DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     title: 'Second Item',
  //   },
  // ];
  const onEdit = () => {
    bottomSheetY.value = withTiming(-bottomSheet);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.heading}>Your SIP's</Text>
            <Btn
              text="Add Plan"
              bg={light.dark}
              btnWidth={100}
              fontSize={12}
              btnPadding={10}
              borderRadius={10}
              btnMb={1}
              btnMt={1}
              onPress={() => {
                navigation.navigate('add_sip');
              }}
            />
          </View>
        )}
        renderItem={({item}) => <Card onEdit={onEdit} item={item} />}
        keyExtractor={item => item.SIPID}
        stickyHeaderIndices={[0]}
        bounces={false}
      />
      <BottomSheet bottomSheetY={bottomSheetY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: layout.layout_spacing,
    paddingTop: layout.component_vertical_spcaing,
  },
  heading: {
    fontSize: 16,
    fontFamily: light.text_semibold,
    color: light.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: layout.component_vertical_spcaing / 2,
    marginBottom: layout.component_vertical_spcaing / 2,
    backgroundColor: light.primarybg,
  },
});

export default Sip;
