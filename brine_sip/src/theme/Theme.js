import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const light = {
  primary: '#f7fffe',
  secondary: '#808191',
  tertiary: '#FFDF00',
  divider: '#071e26',
  card: '#242731',
  light: '#f7fffe',
  dark: '#191b20',
  success: '#4fbf67',
  danger: '#ff7a68',
  dangertint: '#ff6666',
  primarytext: '#f7fffe',
  primarybg: '#1f2128',
  secondarybg: '#6c5dd3',
  titlesubstr1: '#1b1b1b',
  titlesubstr2: '#00B2FF',
  primarybtnbg: '#6c5dd3',
  primarybtntext: '#f7fffe',
  primaryinputbg: '#EFEFEF',
  shadow: '#cfcfcf',
  select: '#eeeeee',
  primaryinputplaceholder: 'rgba(0, 0, 0, 0.47)',
  text_reg: 'text-reg',
  text_semibold: 'text-semibold',
  text_bold: 'text-bold',
  text_extrabold: 'text-extrabold',
  text_black: 'text-black',
  text_thin: 'text-thin',
  text_light: 'text-light',
  inter_reg: 'inter-reg',
  inter_semibold: 'inter-semibold',
  inter_bold: 'inter-bold',
  inter_extrabold: 'inter-extrabold',
  inter_black: 'inter-black',
  inter_thin: 'inter-thin',
  inter_light: 'inter-light',
};

export const layout = {
  layout_spacing: 25,
  component_vertical_spcaing: 20,
  card_width: width - 2 * 25,
};
