import {realm} from '../RealmServices';

export const addFoodQuantityUnitRecords = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          realm.create('FoodQuantityUnit', Array.from(record));
        });
      } else {
        console.log('Food quantity unit record: ', records);
        realm.create('FoodQuantityUnit', Array.from(records));
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
            console.log('No record found for key');
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
          console.log('No record to delete');
        }
      }
    });
  } catch (error) {
    console.log('Error deleting Food quantity unit records', error);
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
            console.log('No record to update');
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
          console.log('No record to update');
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
    console.log(foodQuanityUnits);
    return Array.from(foodQuanityUnits);
  } catch (error) {
    console.log('Error fetching food quantities', error);
  }
};
