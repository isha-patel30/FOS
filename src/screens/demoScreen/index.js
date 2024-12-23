import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {fetchFoodCategories, fetchFoodItems} from '../../realm/crud';

export const DemoScreen = () => {
  useEffect(() => {
    fetchFoodItems();
    fetchFoodCategories();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text>DemoScreen</Text>
    </View>
  );
};
