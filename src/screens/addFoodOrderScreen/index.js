import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

import {
  _foodCategorySync,
  _foodItemSync,
  _foodQuantityUnitSync,
} from '../../services';
import {
  addFoodCategoryRecords,
  addFoodItemRecords,
  addFoodQuantityUnitRecords,
  deleteAllFoodItemsRecords,
  deleteFoodQuantityUnitRecordsById,
  fetchFoodCategories,
  fetchFoodItems,
  fetchFoodQuantiyUnits,
} from '../../realm';
import {
  color,
  IcBackArrow,
  IcCheckBoxActive,
  IcCheckBoxInactive,
  IcMinus,
  IcPlus,
  size,
} from '../../theme';
import {useMainContext} from '../../contexts';
import {Header, Screen} from '../../components';
import * as styles from './styles';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export const AddFoodOrderScreen = () => {
  const navigation = useNavigation();

  const {isConnected} = useMainContext();

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foodQuantityUnits, setFoodQuantityUnits] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [foodItemQuantities, setFoodItemQuantities] = useState({});

  const fetchFoodQuantityUnitsData = async () => {
    setLoading(true);
    try {
      if (isConnected) {
        const response = await _foodQuantityUnitSync(
          '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
          0,
        );
        if (response.status == 1) {
          setFoodQuantityUnits(response?.addEditQuantityUnits);
          addFoodQuantityUnitRecords(response?.addEditQuantityUnits);
          // deleteFoodQuantityUnitRecordsById(response?.deleteQuantityUnits);
        } else {
          console.log('response for food quantity: ', response.message);
        }
      } else {
        const foodQuantityUnits = fetchFoodQuantiyUnits();
        return setFoodQuantityUnits(foodQuantityUnits);
      }
    } catch (error) {
      console.log('Error fetching foood quantity units: ', error);
    } finally {
    }
  };

  const fetchFoodCategoriesData = async () => {
    setLoading(true);
    try {
      if (isConnected) {
        const response = await _foodCategorySync(
          '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
        );
        if (response.status == 1) {
          setFoodCategories(response?.addEditCategories);
          addFoodCategoryRecords(response?.addEditCategories);
        } else {
          console.log('response for food category: ', response.message);
        }
      } else {
        const foodCategories = fetchFoodCategories();
        console.log('foodCategories: ', foodCategories);
        setFoodCategories(foodCategories);
      }
    } catch (error) {
      console.log('Error fetching food categories: ', error);
    }
  };

  const fetchFoodItemsData = async () => {
    setLoading(true);
    try {
      if (isConnected) {
        const response = await _foodItemSync(
          '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
        );
        if (response.status == 1) {
          const foodItemsFromResponse = response?.addEditItems;
          setFoodItems(foodItemsFromResponse);
          addFoodItemRecords(foodItemsFromResponse);
        } else {
          console.log('response for food item: ', response.message);
        }
      } else {
        const foodItems = fetchFoodItems();
        console.log('foodItems: ', foodItems);
        setFoodItems(foodItems);
      }
    } catch (error) {
      console.log('Error fetching food items: ', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckbox = itemId => {
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = new Set(prevCheckedItems);
      if (newCheckedItems.has(itemId)) {
        newCheckedItems.delete(itemId);
        setFoodItemQuantities(prevFoodItemQuantities => {
          const updatedQuantities = {...prevFoodItemQuantities};
          delete updatedQuantities[itemId];
          return updatedQuantities;
        });
      } else {
        newCheckedItems.add(itemId);
        setFoodItemQuantities(prevFoodItemQuantity => {
          const currentQuantity = prevFoodItemQuantity[itemId] || 0;
          if (currentQuantity == 0) {
            return {
              ...prevFoodItemQuantity,
              [itemId]: 1,
            };
          }
          return prevFoodItemQuantity;
        });
      }
      return newCheckedItems;
    });
  };

  const handleIncrementFoodItem = itemId => {
    setFoodItemQuantities(prevFoodItemQuantity => {
      const currentQuantity = prevFoodItemQuantity[itemId] || 0;
      if (currentQuantity == 0) {
        setCheckedItems(prevCheckedItems => {
          const newCheckedItems = new Set(prevCheckedItems);
          newCheckedItems.add(itemId);
          return newCheckedItems;
        });
      }
      return {
        ...prevFoodItemQuantity,
        [itemId]: currentQuantity + 1,
      };
    });
  };

  const handleDecrementFoodItem = itemId => {
    setFoodItemQuantities(prevFoodItemQuantity => {
      const currentQuantity = prevFoodItemQuantity[itemId] || 0;
      const newQuantity = Math.max(currentQuantity - 1, 0);
      if (newQuantity == 0) {
        setCheckedItems(prevCheckedItems => {
          const newCheckedItems = new Set(prevCheckedItems);
          newCheckedItems.delete(itemId);
          return newCheckedItems;
        });
      }
      return {
        ...prevFoodItemQuantity,
        [itemId]: newQuantity,
      };
    });
  };

  const calculateTotalCategoryQuantity = categoryId => {
    if (isConnected) {
      return foodItems
        .filter(item => item?.serverCategoryId == categoryId)
        .reduce(
          (total, item) =>
            total + (foodItemQuantities[item?.serverItemId] || 0),
          0,
        );
    } else {
      return foodItems
        .filter(item => item?.foodCategory == categoryId)
        .reduce(
          (total, item) =>
            total + (foodItemQuantities[item?.serverItemId] || 0),
          0,
        );
    }
  };

  const calculateTotalSelectedQuanity = () => {
    return Array.from(checkedItems).reduce((total, itemId) => {
      return total + (foodItemQuantities[itemId] || 0);
    }, 0);
  };

  const handleRefresh = () => {
    fetchFoodQuantityUnitsData();
    fetchFoodCategoriesData();
    fetchFoodItemsData();
  };

  useEffect(() => {
    fetchFoodQuantityUnitsData();
    fetchFoodCategoriesData();
    fetchFoodItemsData();
  }, [isConnected]);

  useEffect(() => {
    fetchFoodQuantiyUnits();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title
        headerTitle="Add Food Orders"
        headerStyle={styles.header()}
        leftIcon
        renderLeftIcon={() => <IcBackArrow fill={color.primary} />}
        leftIconPress={() => navigation.goBack()}
        showRightButton1
        rightButtonProps1={{
          btnText: 'Save As Draft',
        }}
        showRightButton2
        rightButtonProps2={{
          btnText: 'Save',
        }}
      />
      <Screen loading={loading}>
        {isConnected ? (
          <ScrollView
            contentContainerStyle={styles.scrollStyle()}
            refreshControl={
              <RefreshControl
                colors={[color.primary, color.secondary]}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.orderTable()}>
              <View style={styles.orderTableHeader()}>
                {/* <Dropdown
                style={styles.dropdownView()}
                data={data}
                placeholder="Order Type"
                placeholderStyle={{
                  color: color.darkGray,
                  fontFamily: fonts.myriadProSemiboldSemiExtended,
                  fontSize: fontSize.littleMedium,
                }}
                search
                labelFieldabelField="label"
                valueField="value"
                maxHeight={size.moderateScale(100)}
                value={value}
                onChangeText={txt => setValue(txt)}
                itemTextStyle={{color: color.mostlyBlack}}
              /> */}
                <View style={styles.nameView()}>
                  <Text style={styles.labelTextTitle()}>Name</Text>
                  <Text style={styles.labelTextInfo()}>
                    Last Week - Food Order
                  </Text>
                </View>
              </View>
              <View style={styles.orderTableBody()}>
                <View style={styles.tableHeader()}>
                  <View style={styles.itemsViewHeader()}>
                    <Text style={styles.tableTitle()}>Items</Text>
                  </View>
                  <View style={styles.portionViewHeader()}>
                    <Text style={styles.tableTitle()}>Portion</Text>
                  </View>
                </View>
                {foodCategories
                  .filter((foodCategory, index) =>
                    foodItems.some(
                      item =>
                        item?.serverCategoryId ==
                        foodCategory?.serverCategoryId,
                    ),
                  )
                  .map((foodCategory, index) => {
                    const itemsInCategory = foodItems.filter(
                      item =>
                        item?.serverCategoryId ===
                        foodCategory?.serverCategoryId,
                    );

                    const totalQuantity = calculateTotalCategoryQuantity(
                      foodCategory?.serverCategoryId,
                    );
                    return (
                      <View
                        style={styles.tableBody()}
                        key={
                          foodCategory?.serverCategoryId + index?.toString()
                        }>
                        <View style={styles.subHeader()}>
                          <Text style={styles.categoryText()}>
                            {foodCategory?.categoryName}
                          </Text>
                          <Text style={styles.categoryItemCount()}>
                            {totalQuantity}
                          </Text>
                        </View>
                        {itemsInCategory.map((item, index) => {
                          return (
                            <View
                              style={styles.listItem()}
                              key={item?.serverItemId + index?.toString()}>
                              <View style={styles.itemsViewBody()}>
                                <TouchableOpacity
                                  style={styles.checkBoxView()}
                                  onPress={() =>
                                    toggleCheckbox(item?.serverItemId)
                                  }>
                                  {checkedItems.has(item?.serverItemId) ? (
                                    <IcCheckBoxActive />
                                  ) : (
                                    <IcCheckBoxInactive />
                                  )}
                                  {/* <IcCheckBoxActive /> */}
                                </TouchableOpacity>
                                <View style={styles.itemDetails()}>
                                  <Text style={styles.foodItem()}>
                                    {item?.itemName}
                                  </Text>
                                  <Text style={styles.foodDetailItem()}>
                                    {checkedItems.has(item?.serverItemId) &&
                                    foodItemQuantities[item?.serverItemId] > 0
                                      ? `${
                                          foodItemQuantities[item?.serverItemId]
                                        } portion(s) of ${item?.itemName} is ${
                                          foodItemQuantities[
                                            item?.serverItemId
                                          ] * item?.portionQuantity
                                        } ${item?.unitName}`
                                      : null}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.portionViewBody()}>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleDecrementFoodItem(item?.serverItemId)
                                  }>
                                  <IcMinus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                                <View style={styles.quantityTextView()}>
                                  <Text style={styles.quantityText()}>
                                    {foodItemQuantities[item?.serverItemId] ||
                                      0}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleIncrementFoodItem(item?.serverItemId)
                                  }>
                                  <IcPlus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                <View style={styles.tableBottomView()}>
                  <View style={styles.totalQuantityView()}>
                    <Text style={styles.tableTitle()}>Total Quantity</Text>
                  </View>
                  <View style={styles.totalPortionView()}>
                    <Text style={styles.tableBottomText()}>
                      {calculateTotalSelectedQuanity()}
                    </Text>
                    <Text style={styles.tableBottomText()}>Portion</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollStyle()}
            refreshControl={
              <RefreshControl
                colors={[color.primary, color.secondary]}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.orderTable()}>
              <View style={styles.orderTableHeader()}>
                <View style={styles.nameView()}>
                  <Text style={styles.labelTextTitle()}>Name</Text>
                  <Text style={styles.labelTextInfo()}>
                    Last Week - Food Order
                  </Text>
                </View>
              </View>
              <View style={styles.orderTableBody()}>
                <View style={styles.tableHeader()}>
                  <View style={styles.itemsViewHeader()}>
                    <Text style={styles.tableTitle()}>Items</Text>
                  </View>
                  <View style={styles.portionViewHeader()}>
                    <Text style={styles.tableTitle()}>Portion</Text>
                  </View>
                </View>
                {foodCategories
                  .filter((foodCategory, index) =>
                    foodItems.some(
                      item =>
                        item?.foodCategory === foodCategory?.serverCategoryId,
                    ),
                  )
                  .map((foodCategory, index) => {
                    const itemsInCategory = foodItems.filter(
                      item =>
                        item?.foodCategory === foodCategory?.serverCategoryId,
                    );

                    const totalQuantity = calculateTotalCategoryQuantity(
                      foodCategory?.serverCategoryId,
                    );

                    return (
                      <View
                        style={styles.tableBody()}
                        key={
                          foodCategory?.serverCategoryId + index?.toString()
                        }>
                        <View style={styles.subHeader()}>
                          <Text style={styles.categoryText()}>
                            {foodCategory?.categoryName}
                          </Text>
                          <Text style={styles.categoryItemCount()}>
                            {totalQuantity}
                          </Text>
                        </View>
                        {itemsInCategory.map((item, index) => {
                          const foodUnit = foodQuantityUnits.filter(
                            (unit, index) =>
                              unit?.serverQuantityUnitId ==
                              item?.foodQuantityUnit,
                          );
                          return (
                            <View
                              style={styles.listItem()}
                              key={item?.serverItemId + index?.toString()}>
                              <View style={styles.itemsViewBody()}>
                                <TouchableOpacity
                                  style={styles.checkBoxView()}
                                  onPress={() =>
                                    toggleCheckbox(item?.serverItemId)
                                  }>
                                  {checkedItems.has(item?.serverItemId) ? (
                                    <IcCheckBoxActive />
                                  ) : (
                                    <IcCheckBoxInactive />
                                  )}
                                </TouchableOpacity>
                                <View style={styles.itemDetails()}>
                                  <Text style={styles.foodItem()}>
                                    {item?.itemName}
                                  </Text>
                                  <Text style={styles.foodDetailItem()}>
                                    {checkedItems.has(item?.serverItemId) &&
                                    foodItemQuantities[item?.serverItemId] > 0
                                      ? `${
                                          foodItemQuantities[item?.serverItemId]
                                        } portion(s) of ${item?.itemName} is ${
                                          foodItemQuantities[
                                            item?.serverItemId
                                          ] * item?.portionQuantity
                                        } ${foodUnit[0]?.unitName}`
                                      : null}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.portionViewBody()}>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleDecrementFoodItem(item?.serverItemId)
                                  }>
                                  <IcMinus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                                <View style={styles.quantityTextView()}>
                                  <Text style={styles.quantityText()}>
                                    {foodItemQuantities[item?.serverItemId] ||
                                      0}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleIncrementFoodItem(item?.serverItemId)
                                  }>
                                  <IcPlus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                <View style={styles.tableBottomView()}>
                  <View style={styles.totalQuantityView()}>
                    <Text style={styles.tableTitle()}>Total Quantity</Text>
                  </View>
                  <View style={styles.totalPortionView()}>
                    <Text style={styles.tableBottomText()}>
                      {calculateTotalSelectedQuanity()}
                    </Text>
                    <Text style={styles.tableBottomText()}>Portion</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Screen>
    </View>
  );
};
