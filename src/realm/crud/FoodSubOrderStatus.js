import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = true;

export const addFoodSubOrderStatus = records => {
  try {
    realm.write(() => {
      records.forEach(record => {
        const existingRecord = realm
          .objects('FoodSubOrderStatus')
          .filtered(`statusCode == "${record.statusCode}"`)[0];
        if (!existingRecord) {
          const updateRecord = {
            ...record,
            localSubFoodOrderStatusId: new Realm.BSON.ObjectId(),
          };
          showLog && console.log('updated: ', updateRecord);
          realm.create('FoodSubOrderStatus', updateRecord);
        } else {
          showLog &&
            console.log(
              `Food order sub status with ${record.statusCode} already exists`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding food sub order status', error);
  }
};

export const fetchFoodSubOrderStatus = () => {
  try {
    const foodOrderSubStatus = realm.objects('FoodSubOrderStatus');
    return foodOrderSubStatus;
  } catch (error) {
    console.log('Error fetching food sub order status', error);
  }
};
