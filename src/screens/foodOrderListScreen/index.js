import React from 'react';
import {View, Text} from 'react-native';

import {Button, Header, Screen} from '../../components';
import {color, IcFilter, IcPlus} from '../../theme';
import * as styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const FoodOrderListScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Header
        title
        headerTitle="Food Orders"
        rightIcon
        renderRightIcon={() => <IcFilter fill={color.mostlyBlack} />}
      />
      <Screen loading={false} withScroll scrollStyle={styles.scrollScreen()}>
        <View style={styles.emptyView()}>
          <Text style={styles.emptyViewText()}>
            There are no records to display
          </Text>
          <Button
            btnText="Add Order"
            icon
            renderIcon={() => <IcPlus stroke={color.white} />}
            onPress={() => navigation.navigate('addFoodOrderScreen')}
          />
        </View>
      </Screen>
    </Screen>
  );
};
