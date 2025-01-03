import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DeviceInfo from 'react-native-device-info';

import {
  AddEditFoodOrderScreen,
  AddFoodOrderScreen,
  DemoScreen,
  FoodOrderListScreen,
} from '../../screens';
import {
  _initializeSyncingDependencies,
  _syncAllModulesWhenAppIsInstalled,
  _syncDataForOffilneMode,
  syncOfflineQueue,
} from '../../services';
import {
  deleteAllFacilityRecords,
  deleteAllFoodCategories,
  deleteAllFoodItemsRecords,
  deleteAllFoodQuantityUnitRecords,
  deleteAllSyncingDependencyRecords,
  deleteFoodCategoryRecords,
  fetchFoodQuantiyUnits,
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
      // _syncAllModulesWhenAppIsInstalled();
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
        <Stack.Screen
          name="addEditFoodOrderScreen"
          component={AddEditFoodOrderScreen}
          options={{
            orientation: deviceType === 'Tablet' ? 'all' : 'landscape',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
