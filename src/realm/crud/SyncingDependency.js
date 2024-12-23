import {realm} from '../RealmServices';

export const addSyncingDependencyRecord = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          realm.create('SyncingDependency', record);
        });
      } else {
        realm.create('SyncingDependency', records);
      }
    });
  } catch (error) {
    console.log('Error adding syncing dependency record:', error);
  }
};

export const deleteSyncingDependencyRecords = primaryKeyValues => {
  try {
    realm.write(() => {
      if (Array.isArray(primaryKeyValues)) {
        primaryKeyValues.forEach(primaryKey => {
          const recordToDelete = realm.objectForPrimaryKey(
            'SyncingDependency',
            primaryKey,
          );
          if (recordToDelete) {
            realm.delete(recordToDelete);
          } else {
            console.log('No record found to delete');
          }
        });
      } else {
        const recordToDelete = realm.objectForPrimaryKey(
          'SyncingDependency',
          primaryKeyValues,
        );
        if (recordToDelete) {
          realm.delete(recordToDelete);
        } else {
          console.log('No records to delete');
        }
      }
    });
  } catch (error) {
    console.log('Error in delete syncing dependency records:', error);
  }
};

export const updateSyncingDependencyRecords = updates => {
  try {
    realm.write(() => {
      if (Array.isArray(updates)) {
        updates.forEach(({primaryKey, updatedData}) => {
          const recordToUpdate = realm.objectForPrimaryKey(
            'SyncingDependency',
            primaryKey,
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
          'SyncingDependency',
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
    console.log('Error updating syncing dependency records:', error);
  }
};

export const fetchSyncingDependencies = () => {
  try {
    const syncyingDependencies = realm.objects('SyncingDependency');
    console.log(
      'syncyingDependencies in realm/crud: ',
      Array.from(syncyingDependencies),
    );
    return Array.from(syncyingDependencies);
  } catch (error) {
    console.log('Error fetching syncing dependencies:', error);
  }
};
