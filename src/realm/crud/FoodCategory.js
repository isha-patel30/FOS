import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = false;

export const addFoodCategoryRecords = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          const existingRecord = realm
            .objects('FoodCategory')
            .filtered(`serverCategoryId == "${record.serverCategoryId}"`);
          if (existingRecord.length === 0) {
            const updatedRecord = {
              ...record,
              localCategoryId: new Realm.BSON.ObjectId(),
            };
            realm.create('FoodCategory', updatedRecord);
          } else {
            showLog &&
              console.log(
                `Record with serverCategoryId ${record.serverCategoryId} already exists`,
              );
          }
        });
      } else {
        const existingRecord = realm
          .objects('FoodCategory')
          .filtered(`serverCategoryId == "${records.serverCategoryId}"`);
        if (existingRecord.length === 0) {
          const updatedRecord = {
            ...records,
            localCategoryId: new Realm.BSON.ObjectId(),
          };
          realm.create('FoodCategory', updatedRecord);
        } else {
          showLog &&
            console.log(
              `Record with serverCategoryId ${records.serverCategoryId} already exists`,
            );
        }
      }
    });
  } catch (error) {
    console.log('Error adding food category records', error);
  }
};

export const deleteFoodCategoryRecords = primaryKeyValues => {
  try {
    realm.write(() => {
      if (Array.isArray(primaryKeyValues)) {
        primaryKeyValues.forEach(key => {
          const recordToDelete = realm.objectForPrimaryKey('FoodCategory', key);
          if (recordToDelete) {
            realm.delete(recordToDelete);
          } else {
            console.log('No record found for key');
          }
        });
      } else {
        const recordToDelete = realm.objectForPrimaryKey(
          'FoodCategory',
          primaryKeyValues,
        );
        if (recordToDelete) {
          realm.delete(recordToDelete);
        } else {
          console.log('No record to delete');
        }
      }
    });
  } catch (error) {
    console.log('Error deleting food category records', error);
  }
};

export const updateFoodCategoryRecords = updates => {
  try {
    realm.write(() => {
      if (Array.isArray(updates)) {
        updates.forEach(({primaryKey, updatedData}) => {
          const recordToUpdate = realm.objectForPrimaryKey(
            'FoodCategory',
            primaryKey,
          );
          if (recordToUpdate) {
            Object.keys(updatedData).forEach(key => {
              recordToUpdate[key] = updatedData[key];
            });
          } else {
            console.log('No record to update');
          }
        });
      } else {
        const {primaryKey, updatedData} = updates;
        const recordToUpdate = realm.objectForPrimaryKey(
          'FoodCategory',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedData).forEach(key => {
            recordToUpdate[key] = updatedData[key];
          });
        } else {
          console.log('No record to update');
        }
      }
    });
  } catch (error) {
    console.log('Error updating food category records', error);
  }
};

export const fetchFoodCategories = () => {
  try {
    const foodCategories = realm.objects('FoodCategory');
    showLog && console.log('foodCategories in realm/crud: ', foodCategories);
    return Array.from(foodCategories);
  } catch (error) {
    console.log('Error fetching food categories', error);
  }
};
export const deleteAllFoodCategories = () => {
  try {
    realm.write(() => {
      const records = realm.objects('FoodCategory');
      if (records) {
        realm.delete(records);
        showLog && console.log('deleted all records');
      } else {
        showLog && console.log('No food quantity records to delete');
      }
    });
  } catch (error) {
    console.log('Error fetching food categories', error);
  }
};
