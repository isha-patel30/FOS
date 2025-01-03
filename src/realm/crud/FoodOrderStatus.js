import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = false;

export const addFoodOrderStatus = records => {
  try {
    realm.write(() => {
      records.forEach(record => {
        const existingRecord = realm
          .objects('FoodOrderStatus')
          .filtered(`statusCode == "${record.statusCode}"`)[0];
        if (!existingRecord) {
          const updateRecord = {
            ...record,
            localFoodOrderStatusId: new Realm.BSON.ObjectId(),
          };
          realm.create('FoodOrderStatus', updateRecord);
          showLog &&
            console.log(`Food order status with ${record?.statusCode} created`);
        } else {
          showLog &&
            console.log(
              `Food order status with ${record?.statusCode} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding food order', error);
  }
};

export const fetchFoodOrderStatus = () => {
  try {
    const foodOrderStatus = realm.objects('FoodOrderStatus');
    return foodOrderStatus;
  } catch (error) {
    console.log('Error fetching food order status', error);
  }
};
