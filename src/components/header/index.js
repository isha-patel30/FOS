import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import * as styles from './styles';
import {Button} from '../button';

export const Header = ({
  headerStyle,
  title,
  headerTitle,
  leftIcon,
  renderLeftIcon,
  leftIconPress,
  rightIcon,
  renderRightIcon,
  rightIconPress,
  showRightButton1,
  rightButtonProps1,
}) => {
  return (
    <View style={[styles.mainView(), headerStyle]}>
      {leftIcon && (
        <TouchableOpacity style={styles.iconView()} onPress={leftIconPress}>
          {renderLeftIcon()}
        </TouchableOpacity>
      )}
      <View style={styles.headerTextView(leftIcon)}>
        {title && <Text style={styles.headerText()}>{headerTitle}</Text>}
      </View>
      {showRightButton1 ? (
        <Button {...rightButtonProps1} />
      ) : (
        rightIcon && (
          <TouchableOpacity style={styles.iconView()} onPress={rightIconPress}>
            {rightIcon && renderRightIcon()}
          </TouchableOpacity>
        )
      )}
    </View>
  );
};
