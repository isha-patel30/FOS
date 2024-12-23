import {realm} from '../RealmServices';

export const addFoodCategoryRecords = records => {
  try {
    realm.write(() => {
      if (Array.isArray(records)) {
        records.forEach(record => {
          realm.create('FoodCategory', record);
        });
      } else {
        realm.create('FoodCategory', records);
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
    console.log('foodCategories in realm/crud: ', Array.from(foodCategories));
    return Array.from(foodCategories);
  } catch (error) {
    console.log('Error fetching food categories', error);
  }
};
