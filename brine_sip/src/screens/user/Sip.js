import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {layout, light} from '../../theme/Theme';
import Btn from '../../components/common/Button';
import Card from '../../components/sip/Card';

const Sip = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '5869a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
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
            />
          </View>
        )}
        renderItem={({item}) => <Card />}
        keyExtractor={item => item.id}
        stickyHeaderIndices={[0]}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: layout.layout_spacing,
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
