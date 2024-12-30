import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
  fetchSyncingDependencies,
  realm,
} from '../../realm';
import {useMainContext} from '../../contexts';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  const deviceType = DeviceInfo.getDeviceType();
  const {isConnected} = useMainContext();

  useEffect(() => {
    const initializeApp = async () => {
      _initializeSyncingDependencies();
      // await _syncDataForOffilneMode();

      if (isConnected) {
        await syncOfflineQueue();
        await _syncDataForOffilneMode();
      }

      // deleteAllSyncingDependencyRecords();
    };

    initializeApp();
  }, [isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="demoScreen" component={DemoScreen} /> */}
        <Stack.Screen
          name="foodOrderListScreen"
          component={FoodOrderListScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="addFoodOrderScreen"
          component={AddFoodOrderScreen}
          options={{
            orientation: deviceType === 'Tablet' ? 'all' : 'landscape',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
