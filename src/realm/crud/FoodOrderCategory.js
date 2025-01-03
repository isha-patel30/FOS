import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodOrderCategory = records => {
  try {
    const recordsArray = Array.isArray(records) ? records : [records];
    realm.write(() => {
      recordsArray.forEach(record => {
        const updateRecord = {
          ...record,
          localFoodOrderCategoryId: new Realm.BSON.ObjectId(),
        };
        // console.log('updated records: ', updateRecord);
        realm.create('FoodOrderCategory', updateRecord);
        // console.log(`food OrderCategory with ${record.foodOrder} created`);
      });
    });
  } catch (error) {
    console.log('Error adding food order category', error);
  }
};

export const fetchAllFoodOrderCategory = () => {
  try {
    const foodOrderCategories = realm.objects('FoodOrderCategory');
    // console.log('foodOrderCategories: ', foodOrderCategories);
    return Array.from(foodOrderCategories);
  } catch (error) {
    console.log('Error fetching all food order category', error);
  }
};
