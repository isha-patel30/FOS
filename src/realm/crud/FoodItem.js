import {realm} from '../RealmServices';

export const addFoodItemRecords = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          realm.create('FoodItem', record);
        });
      } else {
        realm.create('FoodItem', records);
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
    console.log('foodItems in realm/crud: ', Array.from(foodItems));
    return Array.from(foodItems);
  } catch (error) {
    console.log('Error fetching food items', error);
  }
};
