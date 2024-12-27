import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

import {
  AddFoodOrderScreen,
  DemoScreen,
  FoodOrderListScreen,
} from '../../screens';
import {
  _initializeSyncingDependencies,
  _syncDataForOffilneMode,
  syncOfflineQueue,
} from '../../services';
import {
  deleteAllSyncingDependencyRecords,
  deleteSyncingDependencyRecords,
  fetchSyncingDependencies,
} from '../../realm';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  const deviceType = DeviceInfo.getDeviceType();

  useEffect(() => {
    const initializeApp = async () => {
      console.log('initialize app');
      // _initializeSyncingDependencies();
      // await _syncDataForOffilneMode();

      // NetInfo.addEventListener(async state => {
      //   if (state.isConnected) {
      //     await syncOfflineQueue();
      //     await _syncDataForOffilneMode();
      //   }
      // });
      deleteAllSyncingDependencyRecords();
    };

    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {/* <Stack.Screen name="demoScreen" component={DemoScreen} /> */}
        <Stack.Screen
          name="foodOrderListScreen"
          component={FoodOrderListScreen}
        />
        <Stack.Screen
          name="addFoodOrderScreen"
          component={AddFoodOrderScreen}
          options={{
            orientation: deviceType === 'Tablet' ? 'all' : 'landscape',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
