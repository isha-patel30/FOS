import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodOrder = records => {
  try {
    const recordsArray = Array.isArray(records) ? records : [records];
    realm.write(() => {
      recordsArray.forEach(record => {
        const existingRecord = realm
          .objects('FoodOrder')
          .filtered(`serverFoodOrderId = "${record.serverFoodOrderId}"`)[0];
        if (!existingRecord) {
          const updateRecord = {
            ...record,
            localFoodOrderId: new Realm.BSON.ObjectId(),
          };
          realm.create('FoodOrder', updateRecord);
          showLog &&
            console.log(
              `food order with id ${updateRecord.localFoodOrderId} created`,
            );
        } else {
          showLog &&
            console.log(
              `food order with id ${record.localFoodOrderId} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding food order in realm/crud: ', error);
  }
};

export const updateFoodOrder = updates => {
  try {
    realm.write(() => {
      updates.forEach(({primaryKey, updatedData}) => {
        const recordToUpdate = realm.objectForPrimaryKey(
          'FoodOrder',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedData).forEach(key => {
            recordToUpdate[key] = updatedData[key];
          });
        } else {
          showLog &&
            console.log(`food order with id ${primaryKey} does not exist`);
        }
      });
    });
  } catch (error) {
    console.log('Error updating food order in realm/crud: ', error);
  }
};

export const deleteFoodOrder = primaryKey => {
  try {
    realm.write(() => {
      const recordToDelete = realm.objects('FoodOrder', primaryKey);
      if (recordToDelete) {
        realm.delete(recordToDelete);
        showLog && console.log(`food order with id ${primaryKey} deleted`);
      } else {
        showLog &&
          console.log(`food order with id ${primaryKey} does not exist`);
      }
    });
  } catch (error) {
    console.log('Error deleting food order in realm/crud: ', error);
  }
};

export const fetchAllFoodOrders = () => {
  try {
    const foodOrders = realm.objects('FoodOrder');
    return Array.from(foodOrders);
  } catch (error) {
    console.log('Error fetching all food orders in realm/crud: ', error);
  }
};

export const deleteManyFoodOrders = primaryKeys => {
  try {
    realm.write(() => {
      primaryKeys.forEach(primaryKey => {
        const recordToDelete = realm.objects('FoodOrder', primaryKey);
        if (recordToDelete) {
          realm.delete(recordToDelete);
          showLog && console.log(`food order with id ${primaryKey} deleted`);
        } else {
          showLog &&
            console.log(`food order with id ${primaryKey} does not exist`);
        }
      });
    });
  } catch (error) {
    console.log('Error deleting many food orders in realm/crud: ', error);
  }
};

export const deleteAllFoodOrders = () => {
  try {
    const foodOrders = realm.objects('FoodOrder');
    if (foodOrders.length > 0) {
      realm.write(() => {
        realm.delete(foodOrders);
        console.log('deleted all records');
      });
    } else {
      showLog && console.log('food orders does not exists');
    }
  } catch (error) {
    console.log('Error deleting all food orders in realm/crud: ', error);
  }
};
