import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodOrderCategoryItem = records => {
  try {
    const recordsArray = Array.isArray(records) ? records : [records];
    realm.write(() => {
      recordsArray.forEach(record => {
        const existingRecord = realm
          .objects('FoodOrderCategoryItem')
          .filtered(`foodOrder = "${record.foodOrder}"`)[0];
        if (!existingRecord) {
          const updateRecord = {
            ...record,
            localFoodOrderCategoryItemId: new Realm.BSON.ObjectId(),
          };
          realm.create('FoodOrder', updateRecord);
          showLog &&
            console.log(
              `food order category item with id ${updateRecord.localFoodOrderCategoryItemId} created`,
            );
        } else {
          showLog &&
            console.log(
              `food order category item with id ${record.localFoodOrderCategoryItemId} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding food order category item in realm/crud: ', error);
  }
};

export const updateFoodOrderCategory = updates => {
  try {
    realm.write(() => {
      updates.forEach(({primaryKey, updatedData}) => {
        const recordToUpdate = realm.objectForPrimaryKey(
          'FoodOrderCategoryItem',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedData).forEach(key => {
            recordToUpdate[key] = updatedData[key];
          });
        } else {
          showLog &&
            console.log(
              `food order category item with id ${primaryKey} does not exist`,
            );
        }
      });
    });
  } catch (error) {
    console.log(
      'Error updating food order category item in realm/crud: ',
      error,
    );
  }
};

export const deleteFoodOrderCategory = primaryKey => {
  try {
    realm.write(() => {
      const recordToDelete = realm.objects('FoodOrderCategoryItem', primaryKey);
      if (recordToDelete) {
        realm.delete(recordToDelete);
        showLog &&
          console.log(`food order category item with id ${primaryKey} deleted`);
      } else {
        showLog &&
          console.log(
            `food order category item with id ${primaryKey} does not exist`,
          );
      }
    });
  } catch (error) {
    console.log(
      'Error deleting food order category item in realm/crud: ',
      error,
    );
  }
};

export const fetchAllFoodOrderCategoryItems = () => {
  try {
    const foodOrderCategorieItems = realm.objects('FoodOrderCategoryItem');
    return foodOrderCategorieItems;
  } catch (error) {
    console.log(
      'Error fetching all food orders categories in realm/crud: ',
      error,
    );
  }
};

export const deleteManyFoodOrderCategories = primaryKeys => {
  try {
    realm.write(() => {
      primaryKeys.forEach(primaryKey => {
        const recordToDelete = realm.objects(
          'FoodOrderCategoryItem',
          primaryKey,
        );
        if (recordToDelete) {
          realm.delete(recordToDelete);
          showLog &&
            console.log(
              `food order category item with id ${primaryKey} deleted`,
            );
        } else {
          showLog &&
            console.log(
              `food order categories with id ${primaryKey} does not exist`,
            );
        }
      });
    });
  } catch (error) {
    console.log(
      'Error deleting many food order categories in realm/crud: ',
      error,
    );
  }
};
