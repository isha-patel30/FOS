import React, {useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';

import {color, fonts, fontSize, IcBackArrow, size} from '../../theme';
import {Header, Loader, Screen} from '../../components';
import * as styles from './styles';

const data = [
  {key: '1', value: 'Mobiles', disabled: true},
  {key: '2', value: 'Appliances'},
  {key: '3', value: 'Cameras'},
  {key: '4', value: 'Computers', disabled: true},
  {key: '5', value: 'Vegetables'},
  {key: '6', value: 'Diary Products'},
  {key: '7', value: 'Drinks'},
];

export const AddEditFoodOrderScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRefresh = () => {};

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
            // handleAddEditOrderPress();
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
                <Text style={styles.labelTextTitle()}>Order Type</Text>
                <TouchableWithoutFeedback onPress={() => setShowDropdown(true)}>
                  <View style={styles.dropdownView()}></View>
                </TouchableWithoutFeedback>
                {/* <SelectList
                  data={data}
                  placeholder="Order Type"
                  search
                  maxHeight={size.moderateScale(170)}
                  onSelect={val => setSelectedOrderType(val)}
                  setSelected={val => setSelectedOrderType(val)}
                  searchPlaceholder="Search..."
                  boxStyles={styles.dropdownView()}
                /> */}
                <View style={styles.nameView()}>
                  <Text style={styles.labelTextTitle()}>Name</Text>
                  <Text style={styles.labelTextInfo()}>
                    Last Week - Food Order
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};
