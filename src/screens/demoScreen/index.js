import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {fetchFoodCategories} from '../../realm';

export const DemoScreen = () => {
  useEffect(() => {
    fetchFoodCategories();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text>DemoScreen</Text>
    </View>
  );
};
