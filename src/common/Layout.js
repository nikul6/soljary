import { Dimensions,Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
    Platform
  },
  isSmallDevice: width < 375,
};