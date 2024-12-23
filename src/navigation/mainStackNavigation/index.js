import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {DemoScreen} from '../../screens';

const Stack = createStackNavigator();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="demoScreen" component={DemoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
