import Realm from 'realm';
import {realm} from '../RealmServices';

const showLog = false;

export const addFoodOrderType = records => {
  try {
    realm.write(() => {
      records.forEach(record => {
        const existingRecord = realm
          .objects('FoodOrderType')
          .filtered(`typeCode == "${record.typeCode}"`)[0];

        if (!existingRecord) {
          const updateRecord = {
            ...record,
            localFoodOrderTypeId: new Realm.BSON.ObjectId(),
          };
          showLog && console.log('updated: ', updateRecord);
          realm.create('FoodOrderType', updateRecord);
          console.log(`food order type with ${record?.typeText} is created`);
        } else {
          showLog &&
            console.log(
              `food order type with ${updateRecord?.localFoodOrderTypeId} already exist`,
            );
        }
      });
    });
  } catch (error) {
    console.log('Error adding food order type', error);
  }
};

export const fetchFoodOrderType = () => {
  try {
    const foodOrderType = realm.objects('FoodOrderType');
    return foodOrderType;
  } catch (error) {
    console.log('Error fetching food order type', error);
  }
};
