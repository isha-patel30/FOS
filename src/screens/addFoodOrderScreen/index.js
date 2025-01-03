import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

import {
  _foodCategorySync,
  _foodItemSync,
  _foodOrderSaveRequest,
  _foodQuantityUnitSync,
} from '../../services';
import {
  fetchFoodCategories,
  fetchFoodItems,
  fetchFoodQuantiyUnits,
  fetchFoodOrderType,
  fetchFoodItemsByCategoryId,
  fetchFaciltyRecords,
  fetchFoodOrderStatus,
  fetchAllFoodOrders,
  addFoodOrder,
  deleteAllFoodOrders,
  fetchAllFoodOrderCategory,
  addFoodOrderCategory,
  addFoodOrderCategoryItem,
} from '../../realm';
import {
  color,
  fonts,
  fontSize,
  IcBackArrow,
  IcCheckBoxActive,
  IcCheckBoxInactive,
  IcMinus,
  IcPlus,
  size,
} from '../../theme';
import {useMainContext} from '../../contexts';
import {Header, Loader, Screen} from '../../components';
import * as styles from './styles';
import {index} from 'realm';

export const AddFoodOrderScreen = () => {
  const navigation = useNavigation();

  const {isConnected} = useMainContext();

  const [selectedFoodOrderType, setSelectedFoodOrderType] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foodQuantityUnits, setFoodQuantityUnits] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [foodOrderType, setFoodOrderType] = useState([]);
  const [foodOrderStatus, setFoodOrderStatus] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);
  const [foodOrderCategories, setFoodOrderCategories] = useState([]);
  const [foodCategoryItemsWithFoodItems, setFoodCategoryItemsWithFoodItems] =
    useState({
      orderCategories: [],
    });
  const [showFoodCategoryItemTableData, setShowFoodCategoryItemTableData] =
    useState([]);

  const fetchFoodQuantityUnitsData = async () => {
    setLoading(true);
    try {
      const foodQuantityUnits = fetchFoodQuantiyUnits();
      // console.log('food quantity from local db: ', foodQuantityUnits);
      return setFoodQuantityUnits(foodQuantityUnits);
    } catch (error) {
      console.log('Error fetching foood quantity units: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodCategoriesData = async () => {
    setLoading(true);
    try {
      const foodCategories = fetchFoodCategories();
      // console.log('food categories from local db: ', foodCategories);
      setFoodCategories(foodCategories);
    } catch (error) {
      console.log('Error fetching food categories: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodItemsData = async () => {
    setLoading(true);
    try {
      {
        const foodItems = fetchFoodItems();
        // console.log('food items from local db: ', foodItems);
        setFoodItems(foodItems);
      }
    } catch (error) {
      console.log('Error fetching food items: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodOrderTypeFromLocal = async () => {
    setLoading(true);
    try {
      const response = fetchFoodOrderType();
      setFoodOrderType(response);
    } catch (error) {
      console.log('Error fetching food order type: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilityDataFromLocal = async () => {
    setLoading(true);
    try {
      const facilities = await fetchFaciltyRecords();
      if (facilities.length > 0) {
        setFacilities(facilities);
      }
    } catch (error) {
      console.log('Error fetching facility data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodOrderStatusDataFromLocal = async () => {
    setLoading(true);
    try {
      const foodOrderStatus = await fetchFoodOrderStatus();
      if (foodOrderStatus.length > 0) {
        setFoodOrderStatus(foodOrderStatus);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodOrderFromLocal = async () => {
    setLoading(true);
    try {
      const foodOrders = fetchAllFoodOrders();
      if (foodOrders.length > 0) {
        setFoodOrders(foodOrders);
      }
    } catch (error) {
      console.log('error fetching food orders: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodOrderCategoryFromLocal = async () => {
    try {
      const foodOrderCategories = await fetchAllFoodOrderCategory();
      if (foodOrderCategories.length > 0) {
        setFoodOrderCategories(foodOrderCategories);
      }
    } catch (error) {
      console.log('first');
    }
  };

  const toggleCheckbox = (catIndex, foodIndex) => {
    setShowFoodCategoryItemTableData(prevState => {
      const updatedState = [...prevState]; // Create a shallow copy of the state
      const category = {...updatedState[catIndex]}; // Copy the category
      const foodItem = {...category.foodItems[foodIndex]}; // Copy the food item
      console.log('foodItem: ', foodItem);
      if (foodItem.isItemSelected) {
        foodItem.isItemSelected = false;
        foodItem.requestedItemPortionCount = 0;
        foodItem.requestedPortionQuantityString = '';
      } else {
        foodItem.isItemSelected = true;
        if (foodItem.requestedItemPortionCount === 0) {
          foodItem.requestedItemPortionCount = 1;
          const portionCount =
            foodItem.requestedItemPortionCount * foodItem.portionQuantity;
          foodItem.requestedPortionQuantityString = `${foodItem.requestedItemPortionCount} portion(s) of ${foodItem.itemName} is ${portionCount} ${foodItem.quantityUnitName}(s)`;
        }
      }

      category.foodItems[foodIndex] = foodItem;
      updatedState[catIndex] = category;
      return updatedState;
    });
  };

  const handleIncrementFoodItem = (catIndex, foodIndex) => {
    setShowFoodCategoryItemTableData(prevState => {
      const updatedState = [...prevState];
      const category = {...updatedState[catIndex]};
      const foodItem = {...category.foodItems[foodIndex]};

      const currFoodItemQty = foodItem?.requestedItemPortionCount || 0;
      const updFoodItemQty = currFoodItemQty + 1;

      if (updFoodItemQty <= 10) {
        foodItem.requestedItemPortionCount = updFoodItemQty;
        foodItem.isItemSelected = true;
        const portionCount = updFoodItemQty * foodItem.portionQuantity;
        foodItem.requestedPortionQuantityString = `${updFoodItemQty} portion(s) of ${foodItem.itemName} is ${portionCount} ${foodItem.quantityUnitName}`;
      }

      category.foodItems[foodIndex] = foodItem;
      updatedState[catIndex] = category;
      return updatedState;
    });
  };

  const handleDecrementFoodItem = (catIndex, foodIndex) => {
    setShowFoodCategoryItemTableData(prevState => {
      const updatedState = [...prevState];
      const category = {...updatedState[catIndex]};
      const foodItem = {...category.foodItems[foodIndex]};

      const currFoodItemQty = foodItem.requestedItemPortionCount || 0;
      const updFoodItemQty = currFoodItemQty - 1;

      if (updFoodItemQty >= 0) {
        foodItem.requestedItemPortionCount = updFoodItemQty;
        foodItem.isItemSelected = updFoodItemQty > 0;

        if (updFoodItemQty === 0) {
          foodItem.requestedPortionQuantityString = '';
        } else {
          const portionCount = updFoodItemQty * foodItem.portionQuantity;

          foodItem.requestedPortionQuantityString = `${updFoodItemQty} portion(s) of ${foodItem.itemName} is ${portionCount} ${foodItem.quantityUnitName}`;
        }
      }

      category.foodItems[foodIndex] = foodItem; // Update the food item in the category
      updatedState[catIndex] = category; // Update the category in the state
      return updatedState;
    });
  };

  const calculateCategoryTotalPortions = catIndex => {
    const category = showFoodCategoryItemTableData[catIndex];
    const totalPortions = category.foodItems.reduce((total, foodItem) => {
      return total + foodItem?.requestedItemPortionCount;
    }, 0);
    if (category.totalRequestedPortionCount === undefined) {
      category.totalRequestedPortionCount = 0;
    }
    category.totalRequestedPortionCount = totalPortions;
    return totalPortions;
  };

  const fetchFilteredData = () => {
    const filtered = foodCategories
      .map(category => {
        const itemsInCategory = foodItems.filter(
          item => item.foodCategory === category.localCategoryId.toString(),
        );
        itemsInCategory.forEach(item => {
          const foodQuantityUnit = foodQuantityUnits.find(unitDetail => {
            return (
              unitDetail?.localFoodQuantityUnitId.toString() ===
              item?.foodQuantityUnit.toString()
            );
          });
          item.isItemSelected = false;
          item.requestedItemPortionCount = 0;
          item.requestedPortionQuantityString = '';
          item.quantityUnitName = foodQuantityUnit?.unitName;
        });

        if (itemsInCategory.length > 0) {
          return {
            ...category,
            foodItems: itemsInCategory,
          };
        }
        return null;
      })
      .filter(Boolean);
    setShowFoodCategoryItemTableData(filtered);
  };

  const calculateTotalSelectedQuanity = () => {
    return showFoodCategoryItemTableData.reduce((total, category) => {
      const categoryTotal = category.foodItems.reduce(
        (categoryTotal, foodItem) => {
          return categoryTotal + (foodItem?.requestedItemPortionCount || 0);
        },
        0,
      );
      return total + categoryTotal;
    }, 0);
  };

  const saveFoodOrderLocally = async () => {
    const selectedFoodOrderStatus = foodOrderStatus.filter(
      orderStatus => orderStatus.statusCode == 'DRFT',
    );
    const saveLocalFoodOrder = {
      serverFoodOrderId: '',
      foodOrderId: 0,
      facility: facilities[0].localFacilityId.toString(),
      foodOrderType: selectedFoodOrderType?.typeCode,
      foodOrderStatus: selectedFoodOrderStatus[0].statusCode,
      totalRequestedPortionCount: calculateTotalSelectedQuanity(),
      totalOrderedPortionCount: 0,
      isRejected: false,
      rejectionReason: '',
      isCancelled: false,
      cancellationReason: '',
      isSyncPending: true,
      lastSyncedAt: new Date(),
      isSyncInProgress: false,
      syncStartedAt: new Date(),
    };
    setLoading(true);
    try {
      if (calculateTotalSelectedQuanity() > 0) {
        addFoodOrder(saveLocalFoodOrder);
        if (foodOrders.length > 0) {
          foodOrders.forEach(order => {
            showFoodCategoryItemTableData
              .filter(category => category.totalRequestedPortionCount > 0)
              .map((filteredCategory, filterCatIndex) => {
                console.log('filteredCategory: ', filteredCategory);
                const saveLocalFoodOrderCategory = {
                  foodOrder: order.localFoodOrderId.toString(),
                  displayOrder: filterCatIndex + 1,
                  foodCategory: filteredCategory.localCategoryId.toString(),
                  totalRequestedPortionCount:
                    filteredCategory.totalRequestedPortionCount,
                  totalOrderedPortionCount: 0,
                };
                addFoodOrderCategory(saveLocalFoodOrderCategory);
                const filteredFoodItems = filteredCategory.foodItems.filter(
                  filteredFoodItem =>
                    filteredFoodItem.requestedItemPortionCount > 0,
                );
                filteredFoodItems.map((filteredItem, filteredItemIndex) => {
                  console.log('filteredItem: ', filteredItem);
                  const saveFoodOrderCategoryItemLocally = {
                    foodOrder: order.localFoodOrderId.toString(),
                    foodOrderCategory:
                      filteredCategory.localCategoryId.toString(),
                    displayOrder: filteredItemIndex + 1,
                    foodItem: filteredItem.localItemId.toString(),
                    requestedItemPortionCount:
                      filteredItem.requestedItemPortionCount,
                    isRequestAccepted: false,
                    orderedItemPortionCount: 0,
                    orderFromSupplier: 0,
                    orderedItemPortionQuantity: 0,
                    orderedItemQuantityUnit: filteredItem.quantityUnitName,
                  };
                  addFoodOrderCategoryItem(saveFoodOrderCategoryItemLocally);
                });
              });
          });
        }
      } else {
        ToastAndroid.show(
          'Please add atleast one food item',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('Error adding food order to locally: ', error);
    } finally {
      setLoading(false);
    }
    // console.log('dataOnLocal: ', saveLocalFoodOrder);
    // const categoryWithPortionMoreThan0 = showFoodCategoryItemTableData
    //   .filter(category => category.totalRequestedPortionCount > 0)
    //   .map(filteredCategory => {});
    // console.log('categroy: ', categoryWithPortionMoreThan0);
  };

  const preloadAllData = () => {
    let dataStructure = {
      serverOrderId: '',
      serverFoodOrderTypeCode: selectedFoodOrderType?.typeCode,
      serverFoodOrderStatusCode: '',
      totalRequestedPortionCount: 0,
      orderCategories: [],
    };
    const newOrderCategories = foodCategories.map(category => {
      const foodCategoryItems = fetchFoodItemsByCategoryId(
        category?.localCategoryId,
      );
      const orderCategoryItems = foodCategoryItems.map(item => ({
        serverOrderCategoryItemId: '',
        displayOrder: '',
        serverFoodItemId: item?.serverItemId,
        requestedItemPortionCount: 0,
      }));
      console.log('order category items: ', orderCategoryItems);
      return {
        serverFoodOrderCategoryId: '',
        displayOrder: '',
        serverFoodCategoryId: category?.serverCategoryId,
        totalRequestedPortionCount: 0,
        orderCategoryItems: orderCategoryItems,
      };
    });
    dataStructure.orderCategories = newOrderCategories;
    setFoodCategoryItemsWithFoodItems(dataStructure);
    // console.log('Final structured data:', dataStructure);
  };

  const handleRefresh = () => {
    fetchFoodQuantityUnitsData();
    fetchFoodCategoriesData();
    fetchFoodItemsData();
    fetchFoodOrderTypeFromLocal();
    fetchFacilityDataFromLocal();
    fetchFoodOrderStatusDataFromLocal();
    fetchFoodOrderFromLocal();
    fetchFoodOrderCategoryFromLocal();
    // preloadAllData();
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    fetchFilteredData();
  }, [foodItems, foodCategories]);

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
          btnText: 'Draft',
        }}
        showRightButton2
        rightButtonProps2={{
          btnText: 'Save',
          onPress: () => {
            saveFoodOrderLocally();
          },
        }}
      />
      <View style={{flex: 1}}>
        {loading ? (
          <Loader />
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
                <Dropdown
                  style={styles.dropdownView()}
                  data={foodOrderType}
                  placeholder="Order Type"
                  placeholderStyle={{
                    color: color.darkGray,
                    fontFamily: fonts.myriadProSemiboldSemiExtended,
                    fontSize: fontSize.littleMedium,
                  }}
                  selectedTextStyle={{
                    color: color.mostlyBlack,
                    fontFamily: fonts.myriadProSemiboldSemiExtended,
                    fontSize: fontSize.littleMedium,
                  }}
                  search
                  searchPlaceholder="Search..."
                  labelField="typeText"
                  valueField="typeCode"
                  maxHeight={size.moderateScale(100)}
                  value={selectedFoodOrderType?.typeCode}
                  onChangeText={txt => setSearchValue(txt)}
                  onChange={item => setSelectedFoodOrderType(item)}
                  itemTextStyle={{color: color.mostlyBlack}}
                  containerStyle={{
                    height: size.moderateScale(160),
                  }}
                  itemContainerStyle={{
                    borderBottomColor: color.borderColor,
                    borderBottomWidth: size.moderateScale(1),
                    marginVertical: size.moderateScale(5),
                  }}
                />
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
                {showFoodCategoryItemTableData &&
                  showFoodCategoryItemTableData?.map((category, catIndex) => {
                    return (
                      <View
                        style={styles.tableBody()}
                        key={category?.localCategoryId + catIndex?.toString()}>
                        <View style={styles.subHeader()}>
                          <Text style={styles.categoryText()}>
                            {category?.categoryName}
                          </Text>
                          <Text style={styles.categoryItemCount()}>
                            {calculateCategoryTotalPortions(catIndex)}
                          </Text>
                        </View>
                        {category.foodItems.map((foodItem, foodIndex) => {
                          return (
                            <View
                              style={styles.listItem()}
                              key={
                                foodItem?.localItemId + foodIndex?.toString()
                              }>
                              <View style={styles.itemsViewBody()}>
                                <TouchableOpacity
                                  style={styles.checkBoxView()}
                                  onPress={() =>
                                    toggleCheckbox(catIndex, foodIndex)
                                  }>
                                  {foodItem?.isItemSelected ? (
                                    <IcCheckBoxActive />
                                  ) : (
                                    <IcCheckBoxInactive />
                                  )}
                                </TouchableOpacity>
                                <View style={styles.itemDetails()}>
                                  <Text style={styles.foodItem()}>
                                    {foodItem?.itemName}
                                  </Text>
                                  <Text style={styles.foodDetailItem()}>
                                    {foodItem?.requestedPortionQuantityString}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.portionViewBody()}>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleDecrementFoodItem(catIndex, foodIndex)
                                  }>
                                  <IcMinus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                                <View style={styles.quantityTextView()}>
                                  <Text style={styles.quantityText()}>
                                    {foodItem.requestedItemPortionCount}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleIncrementFoodItem(
                                      catIndex,
                                      foodIndex,
                                      // foodItem?.localItemId,
                                    )
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
      </View>
    </View>
  );
};
