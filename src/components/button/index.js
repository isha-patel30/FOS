import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import * as styles from './styles';

export const Button = ({
  btnText,
  btnStyle,
  icon,
  renderIcon,
  onPress,
  btnTextStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainView(), btnStyle]}
      onPress={onPress}
      activeOpacity={0.7}>
      {icon && <View style={styles.iconView()}>{renderIcon()}</View>}
      <Text style={[styles.btnText(), btnTextStyle]}>{btnText}</Text>
    </TouchableOpacity>
  );
};
