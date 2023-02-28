import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {layout, light} from '../../../theme/Theme';
import Input from '../../../components/common/Input';
import Btn from '../../../components/common/Button';
import {addSip} from '../../../actions/sip';
import {useSelector} from 'react-redux';

const CreateSip = ({navigation}) => {
  const [SIPAmount, setSIPAmount] = useState(null);
  const [SIPName, setSIPName] = useState(null);
  const [SIPStartDate, setSIPStartDate] = useState(null);
  const [SIPEndDate, setSIPEndDate] = useState(null);
  const [bitcoin, setBitcoin] = useState(null);
  const [etherium, setEtherium] = useState(null);
  const [usdt, setUsdt] = useState(null);
  const [xrp, setXrp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {userId} = useSelector(state => state.user);

  const onAddSip = async () => {
    setLoading(true);
    let Assets = [];
    if (bitcoin)
      Assets.push({
        AssetName: 'BTC',
        AssetPercentage: parseInt(parseInt(bitcoin).toFixed(2)),
        AssetStatus: true,
      });
    if (etherium)
      Assets.push({
        AssetName: 'ETH',
        AssetPercentage: parseInt(parseInt(etherium).toFixed(2)),
        AssetStatus: true,
      });
    if (usdt)
      Assets.push({
        AssetName: 'USDT',
        AssetPercentage: parseInt(parseInt(usdt).toFixed(2)),
        AssetStatus: true,
      });
    if (xrp)
      Assets.push({
        AssetName: 'XRP',
        AssetPercentage: parseInt(parseInt(xrp).toFixed(2)),
        AssetStatus: true,
      });
    console.log(Assets);
    const data = {
      SIPAmount: parseInt(parseInt(SIPAmount).toFixed(2)),
      SIPName,
      SIPFrequency: 'Monthly',
      SIPStartDate,
      SIPEndDate,
      Assets,
    };
    console.log(data);
    try {
      const res = await addSip({data, userID: userId});
      console.log(res, 'ress');
      navigation.navigate('sip_home');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Add new SIP</Text>
      {error ? (
        <Text style={{...styles.subtitle, color: light.danger}}>{error}</Text>
      ) : (
        <Text style={styles.subtitle}>Please fill the form to add new sip</Text>
      )}
      <Input label="SIP name" onChange={setSIPName} value={SIPName} />
      <Input
        label="Total Investment / Month"
        onChange={setSIPAmount}
        value={SIPAmount}
      />
      <Input
        label="SIP Start date"
        placeholder="YYYY-MM-DD"
        value={SIPStartDate}
        onChange={setSIPStartDate}
      />
      <Input
        label="SIP end date"
        placeholder="YYYY-MM-DD"
        value={SIPEndDate}
        onChange={setSIPEndDate}
      />
      <Input
        label="Investment for Bitcoin (optional)"
        placeholder="BTC investment %"
        onChange={setBitcoin}
        value={bitcoin}
      />
      <Input
        label="Investment for Etherium (optional)"
        placeholder="ETH investment %"
        onChange={setEtherium}
        value={etherium}
      />
      <Input
        label="Investment for USDT (optional)"
        placeholder="USDT investment %"
        onChange={setUsdt}
        value={usdt}
      />
      <Input
        label="Investment for XRP (optional)"
        placeholder="XRP investment %"
        onChange={setXrp}
        value={xrp}
      />
      <Btn
        bg={light.primarybtnbg}
        borderRadius={10}
        text="Add Assets"
        loading={loading}
        onPress={onAddSip}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: layout.layout_spacing,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: light.inter_semibold,
    textAlign: 'center',
    color: light.primary,
    marginBottom: layout.component_vertical_spcaing,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: light.inter_semibold,
    marginBottom: layout.component_vertical_spcaing,
    color: light.secondary,
  },
});
export default CreateSip;
