import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodItemRecords = records => {
  try {
    realm.write(() => {
      records.forEach(record => {
        const FoodCategory = realm.objects('FoodCategory');
        const FoodQuantityUnit = realm.objects('FoodQuantityUnit');
        const existingRecord = realm
          .objects('FoodItem')
          .filtered(`serverItemId == "${record?.serverItemId}"`);
        const foodCategory = FoodCategory.filtered(
          `serverCategoryId == "${record.serverCategoryId}"`,
        )[0];
        const foodQuantityUnit = FoodQuantityUnit.filtered(
          `serverQuantityUnitId == "${record.serverQuantityUnitId}"`,
        )[0];
        if (existingRecord.length == 0) {
          const updatedRecord = {
            ...record,
            ...record,
            localItemId: new Realm.BSON.ObjectId(),
            foodCategory: foodCategory?.localCategoryId?.toString(),
            foodQuantityUnit:
              foodQuantityUnit?.localFoodQuantityUnitId?.toString(),
            portionQuantity: parseInt(record?.portionQuantity),
          };
          realm.create('FoodItem', updatedRecord);
        } else {
          showLog &&
            console.log(
              `Food item with id ${record?.serverItemId} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('error adding food item records', error);
  }
};

export const deleteFoodItemRecords = primaryKeyValues => {
  try {
    realm.write(() => {
      if (Array.isArray(primaryKeyValues)) {
        primaryKeyValues.forEach(key => {
          const recordToDelete = realm.objectForPrimaryKey('FoodItem', key);
          if (recordToDelete) {
            realm.delete(recordToDelete);
          } else {
            console.log('Record not found');
          }
        });
      } else {
        const recordToDelete = realm.objectForPrimaryKey(
          'FoodItem',
          primaryKeys,
        );
        if (recordToDelete) {
          realm.delete(recordToDelete);
        } else {
          console.log('Record not found');
        }
      }
    });
  } catch (error) {
    console.log('Error deleting the food item record', error);
  }
};

export const updateFoodItemRecords = updatedRecords => {
  try {
    realm.write(() => {
      if (Array.isArray(updatedRecords)) {
        updatedRecords.forEach(({primaryKeyValue, updatedData}) => {
          const recordToUpdate = realm.objectForPrimaryKey(
            'FoodItem',
            primaryKeyValue,
          );
          if (recordToUpdate) {
            Object.keys(updatedData).forEach(key => {
              recordToUpdate[key] = updatedData[key];
            });
          } else {
            console.log('No record found to update');
          }
        });
      } else {
        const {primaryKey, updatedData} = updates;
        const recordToUpdate = realm.objectForPrimaryKey(
          'FoodItem',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedData).forEach(key => {
            recordToUpdate[key] = updatedData[key];
          });
        } else {
          console.log('No record found to update');
        }
      }
    });
  } catch (error) {
    console.log('Error updating the food item record', error);
  }
};

export const fetchFoodItems = () => {
  try {
    const foodItems = realm.objects('FoodItem');
    return Array.from(foodItems);
  } catch (error) {
    console.log('Error fetching food items', error);
  }
};

export const deleteAllFoodItemsRecords = () => {
  try {
    realm.write(() => {
      const records = realm.objects('FoodItem');
      if (records) {
        realm.delete(records);
        showLog && console.log('deleted all records');
        console.log('deleted all records');
      } else {
        showLog && console.log('No food quantity records to delete');
      }
    });
  } catch (error) {
    console.log('Error deleting all food quantity records:', error);
  }
};

export const fetchFoodItemsByCategoryId = categoryId => {
  try {
    const foodItems = realm
      .objects('FoodItem')
      .filtered(`foodCategory == "${categoryId}"`);
    return Array.from(foodItems);
  } catch (error) {
    console.log('Error fetching food items', error);
  }
};
