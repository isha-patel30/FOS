import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodItemRecords = records => {
  try {
    realm.write(() => {
      const FoodCategory = realm.objects('FoodCategory');
      const FoodQuantityUnit = realm.objects('FoodQuantityUnit');

      if (!FoodCategory || !FoodQuantityUnit) {
        throw new Error(
          'FoodCategory or FoodQuantityUnit schema is not defined or loaded properly',
        );
      }
      if (Array.isArray(records)) {
        records.forEach(record => {
          const existingRecord = realm
            .objects('FoodItem')
            .filtered(`serverItemId == "${record.serverItemId}"`);
          if (existingRecord.length === 0) {
            const foodCategory = FoodCategory.filtered(
              `serverCategoryId == "${record.serverCategoryId}"`,
            )[0];
            const foodQuantityUnit = FoodQuantityUnit.filtered(
              `serverQuantityUnitId == "${record.serverQuantityUnitId}"`,
            )[0];

            if (!foodCategory || !foodQuantityUnit) {
              console.log(
                'Missing related categories or units for this food item.',
              );
            }

            const updatedRecord = {
              ...record,
              localItemId: new Realm.BSON.ObjectId(),
              foodCategory: foodCategory
                ? foodCategory.serverCategoryId
                : record.serverCategoryId,
              foodQuantityUnit: foodQuantityUnit
                ? foodQuantityUnit.serverQuantityUnitId
                : record.serverQuantityUnitId,
              portionQuantity: parseInt(record.portionQuantity),
            };
            realm.create('FoodItem', updatedRecord);
          } else {
            showLog &&
              console.log(
                `Record with serverItemId ${record.serverItemId} already exists in foodItem`,
              );
          }
        });
      } else {
        const existingRecord = realm
          .objects('FoodItem')
          .filtered(`serverItemId == "${records.serverItemId}"`);
        if (existingRecord.length === 0) {
          const foodCategory = FoodCategory.filtered(
            `serverCategoryId == "${records.serverCategoryId}"`,
          )[0];
          const foodQuantityUnit = FoodQuantityUnit.filtered(
            `serverQuantityUnitId == "${records.serverQuantityUnitId}"`,
          )[0];

          if (!foodCategory || !foodQuantityUnit) {
            console.log(
              'Missing related categories or units for this food item.',
            );
          }
          const updatedRecord = {
            ...records,
            localItemId: new Realm.BSON.ObjectId(),
            foodCategory: foodCategory
              ? foodCategory.serverCategoryId
              : records.serverCategoryId,
            foodQuantityUnit: foodQuantityUnit
              ? foodQuantityUnit.serverQuantityUnitId
              : records.serverQuantityUnitId,
            portionQuantity: parseInt(records.portionQuantity),
          };
          realm.create('FoodItem', updatedRecord);
        } else {
          showLog &&
            console.log(
              `Record with serverItemId ${records.serverItemId} already exists in foodItems`,
            );
        }
      }
    });
  } catch (error) {
    console.log('Error adding the food item record', error);
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
    console.log('foodItems in realm/crud: ', foodItems);
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
      } else {
        showLog && console.log('No food quantity records to delete');
      }
    });
  } catch (error) {
    console.log('Error deleting all food quantity records:', error);
  }
};
