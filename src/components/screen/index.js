import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Loader} from '../loader';
import {color} from '../../theme';
import * as styles from './styles';

export const Screen = ({
  children,
  withScroll,
  style,
  bgColor,
  scrollStyle,
  scrollRef,
  onScrolling,
  keyboardShouldPersistTaps = 'handled',
  extraScrollHeight = 0,
  loading,
  translucent,
  scrollEnabled,
  refreshControl,
}) => {
  if (withScroll) {
    return (
      <SafeAreaView style={styles.mainContainer(bgColor)}>
        <StatusBar
          translucent={translucent}
          backgroundColor={bgColor ?? color.white}
          barStyle={bgColor ? 'light-content' : 'dark-content'}
        />
        {loading && <Loader bgColor={bgColor ?? color.customBlack(0.6)} />}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
          contentContainerStyle={scrollStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={onScrolling}
          innerRef={scrollRef}
          refreshControl={refreshControl}
          scrollEventThrottle={16}
          extraScrollHeight={extraScrollHeight}
          scrollEnabled={scrollEnabled}
          enableOnAndroid={true}
          alwaysBounceVertical={false}>
          <View style={styles.full()}>{children}</View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container(bgColor)}>
          <StatusBar
            translucent={translucent}
            backgroundColor={bgColor ?? color.white}
            barStyle={bgColor ? 'light-content' : 'dark-content'}
          />
          {loading && <Loader bgColor={bgColor ?? color.customBlack(0.6)} />}
          <View style={styles.container(style)}>{children}</View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};
