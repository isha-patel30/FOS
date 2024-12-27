import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

import {Button, Header} from '../../components';
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
import * as styles from './styles';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

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

  const [value, setValue] = useState('');

  return (
    <View style={{flex: 1}}>
      <Header
        title
        headerTitle="Add Food Orders"
        headerStyle={styles.header()}
        leftIcon
        renderLeftIcon={() => <IcBackArrow fill={color.primary} />}
        leftIconPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.scrollStyle()}
          showsVerticalScrollIndicator={false}>
          <View style={styles.buttonView()}>
            <Button btnText="Save As Draft" />
            <Button btnText="Submit" />
          </View>
          <View style={styles.orderTable()}>
            <View style={styles.orderTableHeader()}>
              <Dropdown
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
              <View style={styles.tableBody()}>
                <View style={styles.subHeader()}>
                  <Text style={styles.categoryText()}>Category One</Text>
                  <Text style={styles.categoryItemCount()}>0</Text>
                </View>
                <View style={styles.listItem()}>
                  <View style={styles.itemsViewBody()}>
                    <View style={styles.checkBoxView()}>
                      <IcCheckBoxActive />
                    </View>
                    <View style={styles.itemDetails()}>
                      <Text style={styles.foodItem()}>Avocado Jell</Text>
                      <Text style={styles.foodDetailItem()}>
                        1 portion(s) of Avocado jell is 21 Kilogram{' '}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.portionViewBody()}>
                    <TouchableOpacity style={styles.iconview()}>
                      <IcMinus
                        width={size.moderateScale(15)}
                        height={size.moderateScale(15)}
                      />
                    </TouchableOpacity>
                    <View style={styles.quantityTextView()}>
                      <Text style={styles.quantityText()}>10</Text>
                    </View>
                    <TouchableOpacity style={styles.iconview()}>
                      <IcPlus
                        width={size.moderateScale(15)}
                        height={size.moderateScale(15)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.tableBody()}>
                <View style={styles.subHeader()}>
                  <Text style={styles.categoryText()}>Liquid</Text>
                  <Text style={styles.categoryItemCount()}>0</Text>
                </View>
                <View style={styles.listItem()}>
                  <View style={styles.itemsViewBody()}>
                    <View style={styles.checkBoxView()}>
                      <IcCheckBoxInactive />
                    </View>
                    <View style={styles.itemDetails()}>
                      <Text style={styles.foodItem()}>Avocado Jell</Text>
                      <Text style={styles.foodDetailItem()}>
                        {/* 1 portion(s) of Avocado jell is 21 Kilogram{' '} */}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.portionViewBody()}>
                    <TouchableOpacity style={styles.iconview()}>
                      <IcMinus
                        width={size.moderateScale(15)}
                        height={size.moderateScale(15)}
                      />
                    </TouchableOpacity>
                    <View style={styles.quantityTextView()}>
                      <Text style={styles.quantityText()}></Text>
                    </View>
                    <TouchableOpacity style={styles.iconview()}>
                      <IcPlus
                        width={size.moderateScale(15)}
                        height={size.moderateScale(15)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.tableBottomView()}>
                <View style={styles.totalQuantityView()}>
                  <Text style={styles.tableTitle()}>Total Quantity</Text>
                </View>
                <View style={styles.totalPortionView()}>
                  <Text style={styles.tableBottomText()}>Portion</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
