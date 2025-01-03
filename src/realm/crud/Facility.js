import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = false;

export const addFacilityRecords = records => {
  try {
    realm.write(() => {
      records.forEach(record => {
        const existingRecord = realm
          .objects('Facility')
          .filtered(`serverFacilityId == "${record.serverFacilityId}"`);
        if (existingRecord.length === 0) {
          const updatedRecord = {
            ...record,
            localFacilityId: new Realm.BSON.ObjectId(),
          };
          realm.create('Facility', updatedRecord);
          console.log(
            `Facility with id ${updatedRecord.serverFacilityId} created`,
          );
        } else {
          showLog &&
            console.log(
              `Record with serverFacilityId ${record.serverFacilityId} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding facility records', error);
  }
};

export const updateFacilityRecords = updates => {
  try {
    realm.write(() => {
      updates.forEach(({primaryKey, updatedRecord}) => {
        const recordToUpdate = realm.objectForPrimaryKey(
          'Facility',
          primaryKey,
        );
        if (recordToUpdate) {
          Object.keys(updatedRecord).forEach(key => {
            recordToUpdate[key] = updatedRecord[key];
          });
        } else {
          console.log('No record to update');
        }
      });
    });
  } catch (error) {
    console.log('Error updating facility records', error);
  }
};

export const deleteFacilityRecord = primaryKeyValue => {
  try {
    realm.write(() => {
      const recordToDelete = realm.objectForPrimaryKey(
        'Facility',
        primaryKeyValue,
      );
      if (recordToDelete) {
        realm.delete(recordToDelete);
        showLog &&
          console.log(
            'Record with primaryKeyValue: ',
            primaryKeyValue,
            ' deleted',
          );
      } else {
        showLog && console.log('No record to delete');
      }
    });
  } catch (error) {
    console.log('Error deleting facility record', error);
  }
};

export const deleteAllFacilityRecords = () => {
  try {
    realm.write(() => {
      const records = realm.objects('Facility');
      if (records) {
        realm.delete(records);
        showLog && console.log('Deleted all facility records');
      } else {
        showLog && console.log('No records to delete');
      }
    });
  } catch (error) {
    console.log('Error deleting facility records', error);
  }
};

export const fetchFaciltyRecords = () => {
  try {
    const facilities = realm.objects('Facility');
    if (facilities) {
      return facilities;
    } else {
      showLog && console.log('No facility records found');
    }
  } catch (error) {
    console.log('Error fetching facility records', error);
  }
};
