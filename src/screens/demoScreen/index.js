import React, {useEffect, useState} from 'react';
import {View, AppState} from 'react-native';
import {addFoodCategoryRecords, fetchSyncingDependencies} from '../../realm';
import {_foodQuantityUnitSync} from '../../services/api-services';
import Realm from 'realm';

export const DemoScreen = () => {
  console.log('demoscreen');

  useEffect(() => {
    const foodQuantityUnitSync = () => {
      try {
        const response = _foodQuantityUnitSync(
          '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef',
          0,
        );
        return;
      } catch (error) {
        console.log('error in foodQuantityUnitSync', error);
      }
    };

    foodQuantityUnitSync();
  }, []);
  // const dispatch = useDispatch();
  // const {syncState} = useSelector(state => state.sync);

  // const syncDependenciesByPriority = async () => {
  //   const sortedDependencies = dependencies.sort(
  //     (a, b) => a.priority - b.priority,
  //   );
  //   for (const dependency of sortedDependencies) {
  //     await dispatch(syncStarted(dependency));

  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     const syncStartedAt = Date.now();
  //     dispatch(
  //       nextSync({
  //         moduleName: dependency.moduleName,
  //         syncStartedAt,
  //         syncPeriodInMinutes: dependency.syncPeriodInMinutes,
  //         syncFailureResetInMinutes: dependency.syncFailureResetInMinutes,
  //       }),
  //     );
  //     dispatch(
  //       syncTime({
  //         moduleName: dependency.moduleName,
  //         syncTime: syncStartedAt,
  //         syncPeriodInMinutes: dependency.syncPeriodInMinutes,
  //       }),
  //     );
  //   }
  // };

  // useEffect(() => {
  //   syncDependenciesByPriority();
  // }, []);

  useEffect(() => {
    addFoodCategoryRecords([
      {
        localCategoryId: new Realm.BSON.ObjectId(),
        categoryName: 'Fruits',
        serverCategoryId: 'FruitsServerId1',
        isActive: 1,
      },
      {
        localCategoryId: new Realm.BSON.ObjectId(),
        categoryName: 'Vegetables',
        serverCategoryId: 'VegetablesServerId1',
        isActive: 1,
      },
    ]);
  }, []);

  return <View style={{flex: 1}}></View>;
};
