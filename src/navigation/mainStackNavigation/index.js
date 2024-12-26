import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {DemoScreen} from '../../screens';
import {networkIsConnected} from '../../redux';

const Stack = createStackNavigator();

export const MainStackNavigation = () => {
  console.log('mainStck');

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
