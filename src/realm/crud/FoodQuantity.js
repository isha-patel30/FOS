import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = false;

export const addFoodQuantityUnitRecords = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          const existingRecord = realm
            .objects('FoodQuantityUnit')
            .filtered(
              `serverQuantityUnitId == "${record.serverQuantityUnitId}"`,
            );
          if (existingRecord.length === 0) {
            const updatedRecord = {
              ...record,
              localFoodQuantityUnitId: new Realm.BSON.ObjectId(),
            };
            realm.create('FoodQuantityUnit', updatedRecord);
          } else {
            showLog &&
              console.log(
                `Record with serverQuantityUnitId ${record.serverQuantityUnitId} already exists`,
              );
          }
        });
      } else {
        const existingRecord = realm
          .objects('FoodQuantityUnit')
          .filtered(
            `serverQuantityUnitId == "${records.serverQuantityUnitId}"`,
          );
        if (existingRecord.length === 0) {
          const updatedRecord = {
            ...records,
            localFoodQuantityUnitId: new Realm.BSON.ObjectId(),
          };
          realm.create('FoodQuantityUnit', updatedRecord);
        } else {
          showLog &&
            console.log(
              `Record with serverQuantityUnitId ${records.serverQuantityUnitId} already exists`,
            );
        }
      }
    });
  } catch (error) {
    console.log('Error adding Food quantity unit records', error);
  }
};

export const deleteFoodQuantityUnitRecords = primaryKeyValues => {
  try {
    realm.write(() => {
      if (Array.isArray(primaryKeyValues)) {
        primaryKeyValues.forEach(key => {
          const recordToDelete = realm.objectForPrimaryKey(
            'FoodQuantityUnit',
            key,
          );
          if (recordToDelete) {
            realm.delete(recordToDelete);
          } else {
            showLog && console.log('No record found for key');
          }
        });
      } else {
        const recordToDelete = realm.objectForPrimaryKey(
          'FoodQuantityUnit',
          primaryKeyValues,
        );
        if (recordToDelete) {
          realm.delete(recordToDelete);
        } else {
          showLog && console.log('No record to delete');
        }
      }
    });
  } catch (error) {
    console.log('Error deleting Food quantity unit records', error);
  }
};

export const deleteAllFoodQuantityUnitRecords = () => {
  try {
    realm.write(() => {
      const records = realm.objects('FoodQuantityUnit');
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

export const updateFoodQuantityUnitRecords = updates => {
  try {
    realm.write(() => {
      if (Array.isArray(updates)) {
        updates.forEach(({primaryKey, updatedData}) => {
          const recordToUpdate = realm.objectForPrimaryKey(
            'FoodQuantityUnit',
            primaryKey,
          );
          if (recordToUpdate) {
            Object.keys(updatedData).forEach(key => {
              recordToUpdate[key] = updatedData[key];
            });
          } else {
            showLog && console.log('No record to update');
          }
        });
      } else {
        const {primaryKey, updatedData} = updates;
        const recordToUpdate = realm.objectForPrimaryKey(
          'FoodQuantityUnit',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedData).forEach(key => {
            recordToUpdate[key] = updatedData[key];
          });
        } else {
          showLog && console.log('No record to update');
        }
      }
    });
  } catch (error) {
    console.log('Error updating Food quantity unit records', error);
  }
};

export const fetchFoodQuantiyUnits = () => {
  try {
    const foodQuanityUnits = realm.objects('FoodQuantityUnit');
    return Array.from(foodQuanityUnits);
  } catch (error) {
    console.log('Error fetching food quantities', error);
  }
};

export const deleteFoodQuantityUnitRecordsById = ids => {
  try {
    realm.write(() => {
      if (Array.isArray(ids)) {
        ids.forEach(id => {
          const recordToDelete = realm
            .objects('FoodQuantityUnit')
            .filtered(`serverQuantityUnitId == "${id.toString()}"`)[0];
          if (recordToDelete) {
            realm.delete(recordToDelete);
            showLog && console.log('record deleted');
          } else {
            showLog &&
              console.log(
                `No record found for serverQuantityUnitId id: "${id.toString()}"`,
              );
          }
        });
      } else {
        const recordToDelete = realm
          .objects('FoodQuantityUnit')
          .filtered(`serverQuantityUnitId == "${ids.toString()}"`)[0];
        if (recordToDelete) {
          realm.delete(recordToDelete);
          showLog && console.log('record deleted');
        } else {
          showLog &&
            console.log(
              `No record found for serverQuantityUnitId: ${ids.toString()}`,
            );
        }
      }
    });
  } catch (error) {
    console.log('Error deleting food quantity unit records', error);
  }
};
