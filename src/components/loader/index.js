import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {lottieIcons} from '../../theme';
import * as styles from './styles';

export const Loader = ({bgColor}) => {
  return (
    <View style={styles.mainView(bgColor)}>
      <View style={styles.lottieView()}>
        <LottieView
          source={lottieIcons.dottedLoader}
          autoPlay
          loop
          style={styles.lottieImage()}
        />
        <Text style={styles.lottieText()}>Please wait while loading</Text>
      </View>
    </View>
  );
};
