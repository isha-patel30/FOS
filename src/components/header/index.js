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
  showRightButton2,
  rightButtonProps2,
}) => {
  return (
    <View
      style={[
        styles.mainView(showRightButton1 || showRightButton2),
        headerStyle,
      ]}>
      {leftIcon && (
        <TouchableOpacity style={styles.iconView()} onPress={leftIconPress}>
          {renderLeftIcon()}
        </TouchableOpacity>
      )}
      <View style={styles.headerTextView(leftIcon)}>
        {title && <Text style={styles.headerText()}>{headerTitle}</Text>}
      </View>
      {showRightButton1 && showRightButton2 ? (
        <View style={styles.headerBtnView()}>
          <Button {...rightButtonProps1} />
          <Button {...rightButtonProps2} />
        </View>
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
