import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  addFoodCategoryRecords,
  addFoodItemRecords,
  addFoodOrderStatus,
  addFoodOrderType,
  addFoodQuantityUnitRecords,
  addFoodSubOrderStatus,
  deleteAllFoodItemsRecords,
  fetchFoodItems,
} from '../../realm';
import {color, IcFilter, IcPlus, IcRefresh} from '../../theme';
import * as data from '../../json';
import {Button, Header, Screen} from '../../components';
import * as styles from './styles';
import {
  _facilitySync,
  _foodCategorySync,
  _foodItemSync,
  _foodQuantityUnitSync,
} from '../../services';

export const FoodOrderListScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const initializeFoodOrderType = async () => {
    setLoading(true);
    try {
      await addFoodOrderType(data?.foodOrderType);
    } catch (error) {
      console.log('Error initializing food order type: ', error);
    } finally {
      setLoading(false);
    }
  };
  const initializeFoodSubOrderStatus = async () => {
    setLoading(true);
    try {
      await addFoodSubOrderStatus(data?.foodSubOrderStatus);
    } catch (error) {
      console.log('Error initializing food sub order status: ', error);
    }
  };
  const initializeFoodOrderStatus = async () => {
    setLoading(true);
    try {
      await addFoodOrderStatus(data?.foodOrderStatus);
    } catch (error) {
      console.log('Error initializing food sub order status: ', error);
    }
  };

  const handleRefreshCategory = async () => {
    setLoading(true);
    try {
      const foodCategoryResponse = await _foodCategorySync(
        '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
        0,
      );
      if (foodCategoryResponse.status === 1) {
        addFoodCategoryRecords(foodCategoryResponse?.addEditCategories);
        await performFoodQuantitySync();
        // console.log('foodCategoryResponse:', foodCategoryResponse);
      } else {
        ToastAndroid.show('No data found', ToastAndroid.SHORT);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const performFoodQuantitySync = async () => {
    setLoading(true);
    try {
      const foodQuantityUnitResponse = await _foodQuantityUnitSync(
        '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
        0,
      );
      if (foodQuantityUnitResponse.status === 1) {
        addFoodQuantityUnitRecords(
          foodQuantityUnitResponse?.addEditQuantityUnits,
        );
        await performFoodItemSync();
      } else {
        ToastAndroid.show('No data found', ToastAndroid.SHORT);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const performFoodItemSync = async () => {
    setLoading(true);
    try {
      const foodItemResponse = await _foodItemSync(
        '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
        0,
      );
      if (foodItemResponse.status === 1) {
        addFoodItemRecords(foodItemResponse?.addEditItems);
        // console.log('foodItemResponse:: ', foodItemResponse?.addEditItems);
      } else {
        ToastAndroid.show('No data found', ToastAndroid.SHORT);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const performFacilitySync = async () => {
    setLoading(true);
    try {
      const facilityResponse = await _facilitySync(
        '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
      );
      if (facilityResponse.status === 1) {
        console.log(
          'facilityResponse: ',
          facilityResponse?.accessibleFacilities,
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Header
        title
        headerTitle="Food Orders"
        // rightIcon
        // renderRightIcon={() => <IcRefresh />}
        // renderRightIcon={() => <IcRefresh />}
        rightIcon
        renderRightIcon={() => <IcRefresh stroke={color.secondary} />}
        rightIconPress={handleRefreshCategory}
      />
      <Screen loading={loading} withScroll scrollStyle={styles.scrollScreen()}>
        <TouchableOpacity
          style={styles.refreshIconView()}
          onPress={performFacilitySync}>
          <Text style={styles.bodyText()}>Refresh Facility</Text>
          <IcRefresh stroke={color.white} />
        </TouchableOpacity>
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
