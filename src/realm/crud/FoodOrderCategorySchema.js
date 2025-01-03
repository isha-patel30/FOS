import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodOrderCategory = records => {
  try {
    realm.write(() => {
      records.forEach(record => {
        const existingRecord = realm
          .objects('FoodOrderCategory')
          .filtered(
            `localFoodOrderCategoryId = "${record.localFoodOrderCategoryId}"`,
          )[0];
        if (!existingRecord) {
          const updateRecord = {
            ...record,
            localFoodOrderCategoryId: new Realm.BSON.ObjectId(),
          };
          realm.create('FoodOrder', updateRecord);
          showLog &&
            console.log(
              `food order category with id ${updateRecord.localFoodOrderCategoryId} created`,
            );
        } else {
          showLog &&
            console.log(
              `food order category with id ${updateRecord.localFoodOrderCategoryId} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding food order category in realm/crud: ', error);
  }
};

export const updateFoodOrderCategory = updates => {
  try {
    realm.write(() => {
      updates.forEach(({primaryKey, updatedData}) => {
        const recordToUpdate = realm.objectForPrimaryKey(
          'FoodOrderCategory',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedData).forEach(key => {
            recordToUpdate[key] = updatedData[key];
          });
        } else {
          showLog &&
            console.log(
              `food order category with id ${primaryKey} does not exist`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error updating food order category in realm/crud: ', error);
  }
};

export const deleteFoodOrderCategory = primaryKey => {
  try {
    realm.write(() => {
      const recordToDelete = realm.objects('FoodOrderCategory', primaryKey);
      if (recordToDelete) {
        realm.delete(recordToDelete);
        showLog &&
          console.log(`food order category with id ${primaryKey} deleted`);
      } else {
        showLog &&
          console.log(
            `food order category with id ${primaryKey} does not exist`,
          );
      }
    });
  } catch (error) {
    console.log('Error deleting food order category in realm/crud: ', error);
  }
};

export const fetchAllFoodOrderCategories = () => {
  try {
    const foodOrderCategories = realm.objects('FoodOrderCategory');
    return foodOrderCategories;
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
        const recordToDelete = realm.objects('FoodOrderCategory', primaryKey);
        if (recordToDelete) {
          realm.delete(recordToDelete);
          showLog &&
            console.log(`food order category with id ${primaryKey} deleted`);
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
