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
  _foodOrderSaveRequest,
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
  fetchFoodOrderType,
  fetchFoodItemsByCategoryId,
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
  const [foodOrderType, setFoodOrderType] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectedFoodCategory, setSelectedFoodCategory] = useState([]);
  const [foodItemQuantities, setFoodItemQuantities] = useState({});
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

  const toggleCheckbox = (catIndex, foodIndex) => {
    const foodItem =
      showFoodCategoryItemTableData[catIndex]?.foodItems[foodIndex];
    console.log('foodItem pressed: ', foodItem);
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = new Set(prevCheckedItems);
      if (newCheckedItems.has(foodItem.localItemId)) {
        newCheckedItems.delete(foodItem.localItemId);
      } else {
        newCheckedItems.add(foodItem.localItemId);
      }
      console.log('newCheckedItems: ', newCheckedItems);
      //   setFoodItemQuantities(prevFoodItemQuantities => {
      //     const updatedQuantities = {...prevFoodItemQuantities};

      //     if (newCheckedItems.has(foodItem.localItemId)) {
      //   newCheckedItems.delete(foodItem.localItemId);
      // } else {
      //   newCheckedItems.add(foodItem.localItemId);
      // }

      //     return updatedQuantities;
      //   });

      // if (foodItem && newCheckedItems.has(foodItem.localItemId)) {
      //   newCheckedItems.delete(foodItem.localItemId);
      //   setFoodItemQuantities(prevFoodItemQuantities => {
      //     const updatedQuantities = {...prevFoodItemQuantities};
      //     delete updatedQuantities[foodItem.localItemId];
      //     return updatedQuantities;
      //   });
      // } else if (foodItem) {
      //   newCheckedItems.add(foodItem.localItemId);
      //   setFoodItemQuantities(prevFoodItemQuantities => {
      //     const updatedQuantities = {...prevFoodItemQuantities};
      //     updatedQuantities[foodItem.localItemId] = 1; // Set initial quantity to 1
      //     return updatedQuantities;
      //   });
      // }
      return newCheckedItems;
    });
  };

  const updatedSelectedCategories = newCheckedItems => {
    const updatedSelectedCategoryIds = foodCategories
      .filter(category => {
        return foodItems.some(
          item =>
            item.serverCategoryId == category.serverCategoryId &&
            newCheckedItems.has(item.serverItemId),
        );
      })
      .map(category => category.serverCategoryId);
    setSelectedFoodCategory(updatedSelectedCategoryIds);
  };

  const handleIncrementFoodItem = (catIndex, foodIndex) => {
    const category = showFoodCategoryItemTableData[catIndex];
    const foodItem = category.foodItems[foodIndex];

    const currFoodItemQty = foodItem.requestedPortionCount;
    const updFoodItemQty = currFoodItemQty + 1;

    if (updFoodItemQty <= 10) {
      //store 10 to config
      foodItem.requestedPortionCount = updFoodItemQty;

      var foodItemIsItemSelected = updFoodItemQty > 0 ? true : false;
      foodItem.isItemSelected = foodItemIsItemSelected;
      foodItem.requestedPortionQuantityString = updFoodItemQty + ' Portions';

      //call recalculate function here and set in setShow... the string which needs to be generate
      // recalculate();
    }

    setFoodItemQuantities(prevQuantities => {
      const updatedQuantities = {...prevQuantities};
      const currentQuantity = updatedQuantities[foodItem.localItemId] || 0;
      updatedQuantities[foodItem.localItemId] = currentQuantity + 1;
      setCheckedItems(prevCheckedItems => {
        const newCheckedItems = new Set(prevCheckedItems);
        if (!newCheckedItems.has(foodItem?.localItemId)) {
          newCheckedItems.add(foodItem.localItemId);
        }
        return newCheckedItems;
      });
      return updatedQuantities;
    });
  };

  const handleDecrementFoodItem = (catIndex, foodIndex) => {
    const category = showFoodCategoryItemTableData[catIndex];
    const foodItem = category.foodItems[foodIndex];
    setFoodItemQuantities(prevQuantities => {
      const updatedQuantities = {...prevQuantities};
      const currentQuantity = updatedQuantities[foodItem.localItemId] || 0;

      if (currentQuantity > 0) {
        updatedQuantities[foodItem.localItemId] = currentQuantity - 1;
      }
      if (updatedQuantities[foodItem.localItemId] < 1) {
        setCheckedItems(prevCheckedItems => {
          const newCheckedItems = new Set(prevCheckedItems);
          newCheckedItems.delete(foodItem.localItemId);
          return newCheckedItems;
        });
      }

      return updatedQuantities;
    });
    // setFoodItemQuantities(prevFoodItemQuantity => {
    //   const currentQuantity = prevFoodItemQuantity[itemId] || 0;
    //   const newQuantity = Math.max(currentQuantity - 1, 0);
    //   if (newQuantity == 0) {
    //     setCheckedItems(prevCheckedItems => {
    //       const newCheckedItems = new Set(prevCheckedItems);
    //       newCheckedItems.delete(itemId);
    //       return newCheckedItems;
    //     });
    //   }
    //   return {
    //     ...prevFoodItemQuantity,
    //     [itemId]: newQuantity,
    //   };
    // });
  };

  const calculateCategoryTotalPortions = catIndex => {
    const category = showFoodCategoryItemTableData[catIndex];
    const totalPortions = category.foodItems.reduce((total, foodItem) => {
      return total + (foodItemQuantities[foodItem?.localItemId] || 0);
    }, 0);
    return totalPortions;
  };

  const fetchFilteredData = () => {
    const filtered = foodCategories
      .map(category => {
        const itemsInCategory = foodItems.filter(
          item => item.foodCategory === category.localCategoryId.toString(),
        );
        itemsInCategory.forEach(item => {
          item.requestedPortionQuantityString = '';
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
          return (
            categoryTotal + (foodItemQuantities[foodItem?.localItemId] || 0)
          );
        },
        0,
      );
      return total + categoryTotal;
    }, 0);
  };

  const handleAddEditOrderPress = async () => {
    console.log('selected categories: ', selectedFoodCategory);
    console.log('selected food items: ', checkedItems);
    console.log('food order type: ', selectedFoodOrderType?.typeCode);

    // const saveFoodOrderData = {
    //   serverOrderId: '',
    //   serverFoodOrderTypeCode: selectedFoodOrderType?.typeCode,
    //   serverFoodOrderStatusCode: '',
    //   totalRequestedPortionCount: totalRequestedPortionCount,
    //   orderCategories: [
    //     {
    //       serverFoodOrderCategoryId: '',
    //       displayOrder: '',
    //       serverFoodCategoryId: '',
    //       totalRequestedPortionCount: 0,
    //       orderCategoryItems: [
    //         {
    //           serverOrderCategoryItemId: '',
    //           displayOrder: '',
    //           serverFoodItemId: '',
    //           requestedItemPortionCount: 0,
    //         },
    //       ],
    //     },
    //   ],
    // };
    // setLoading(true);
    // try {
    //   const response = await _foodOrderSaveRequest(
    //     '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
    //     saveFoodOrderData,
    //   );
    //   console.log('response for save food order', response);
    // } catch (error) {
    //   console.log('Error adding/editing food order:', error);
    // }
  };

  // const preloadAllData = () => {
  //   let newFoodCategoryObj = [];
  //   foodCategories.map((category, index) => {
  //     const foodCategoryItems = fetchFoodItemsByCategoryId(
  //       category?.localCategoryId,
  //     );
  //     let newFoodItemsArr = [];
  //     foodCategoryItems.map(item => {
  //       newFoodItemsArr.push({
  //         serverOrderCategoryItemId: '',
  //         displayOrder: '',
  //         serverFoodItemId: item?.serverItemId,
  //         requestedItemPortionCount: 0,
  //       });
  //       console.log('foodCategoryItems::: ', foodCategoryItems);
  //     });
  //     newFoodCategoryArr.push({
  //       serverFoodOrderCategoryId: '',
  //       displayOrder: '',
  //       serverFoodCategoryId: category?.serverCategoryId,
  //       totalRequestedPortionCount: 0,
  //       orderCategoryItems: newFoodItemsArr,
  //     });
  //     setFoodCategoryItemsWithFoodItems(newFoodCategoryArr);
  //     console.log('new categoey arr: ', newFoodCategoryArr);
  //     // console.log('food category item: ', foodCategoryItemsWithFoodItems);
  //   });
  // };

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
    console.log('Final structured data:', dataStructure);
  };

  const handleRefresh = () => {
    fetchFoodQuantityUnitsData();
    fetchFoodCategoriesData();
    fetchFoodItemsData();
    fetchFoodOrderTypeFromLocal();
    preloadAllData();
  };

  useEffect(() => {
    fetchFoodQuantityUnitsData();
    fetchFoodCategoriesData();
    fetchFoodItemsData();
    fetchFoodOrderTypeFromLocal();
    preloadAllData();
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
            handleAddEditOrderPress();
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
                                  {console.log(
                                    'checkedItems: ',
                                    checkedItems.has(foodItem?.localItemId),
                                  )}
                                  {checkedItems.has(foodItem?.localItemId) ? (
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
                                    {/* {(foodItemQuantities[
                                      foodItem?.localItemId
                                    ] || 0) > 0 && category.formattedString == "" ?
                                      
                                    } */}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.portionViewBody()}>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleDecrementFoodItem(
                                      catIndex,
                                      // foodItem?.localItemId,
                                      foodIndex,
                                    )
                                  }>
                                  <IcMinus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                                <View style={styles.quantityTextView()}>
                                  <Text style={styles.quantityText()}>
                                    {foodItemQuantities[
                                      foodItem?.localItemId
                                    ] || 0}
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
