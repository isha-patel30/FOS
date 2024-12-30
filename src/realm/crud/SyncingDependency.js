import {realm} from '../RealmServices';

export const addSyncingDependencyRecord = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          const existingRecord = realm.objectForPrimaryKey(
            'SyncingDependency',
            record.localModuleDependencyId,
          );
          if (existingRecord) {
            Object.keys(record).forEach(key => {
              if (key !== 'localModuleDependencyId') {
                existingRecord[key] = record[key];
              }
            });
          } else {
            realm.create('SyncingDependency', record);
          }
        });
      } else {
        const existingRecord = realm.objectForPrimaryKey(
          'SyncingDependency',
          records.localModuleDependencyId,
        );
        if (existingRecord) {
          Object.keys(records).forEach(key => {
            if (key !== 'localModuleDependencyId') {
              existingRecord[key] = records[key];
            }
          });
        } else {
          realm.create('SyncingDependency', records);
        }
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

export const deleteAllSyncingDependencyRecords = () => {
  try {
    realm.write(() => {
      const syncyingDependencies = realm.objects('SyncingDependency');
      if (syncyingDependencies) {
        realm.delete(syncyingDependencies);
        console.log('deleted all records');
      } else {
        console.log('No syncing dependency records to delete');
      }
    });
  } catch (error) {
    console.log('Error deleting all syncing dependency records:', error);
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
    if (syncyingDependencies) {
      // console.log('Syncing dependencies:', syncyingDependencies);
      return Array.from(syncyingDependencies);
    } else {
      console.log('No syncing dependencies found');
    }
  } catch (error) {
    console.log('Error fetching syncing dependencies:', error);
  }
};

export const fetchSyncingDependencyById = primaryKey => {
  try {
    const syncingDependency = realm.objectForPrimaryKey(
      'SyncingDependency',
      primaryKey,
    );
    return syncingDependency;
  } catch (error) {
    console.log('Error fetching syncing dependency by id:', error);
  }
};

export const fetchSyncingDependencyByModuleName = moduleName => {
  try {
    const results = realm
      .objects('SyncingDependency')
      .filtered(`moduleName == "${moduleName}"`);
    if (results) {
      return results.length > 0 ? results[0] : null;
    } else {
      console.log('No syncing dependency found for module name:', moduleName);
      return null;
    }
  } catch (error) {
    console.log('Error fetching syncing dependency by module name:', error);
  }
};
