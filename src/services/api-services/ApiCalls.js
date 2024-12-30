import Realm from 'realm';

import HttpCalls from './HttpCalls';
import {headersData} from './Services';
import {API_KEY} from '../../config';
import {convertDateToTimeStamp, isNetworkConnected} from '../../utils';
import {
  addSyncingDependencyRecord,
  fetchFoodCategories,
  fetchFoodItems,
  fetchFoodQuantiyUnits,
  fetchSyncingDependencies,
  fetchSyncingDependencyByModuleName,
} from '../../realm';

const userKey = '866b102764982f2cc13da3860c2beb243decf6e132abf9b24432bfd2ef';

/**
 * FoodQuantityUnit Calls
 */

// food quantity sync call
export const _foodQuantityUnitSync = async (userKey, timestamp) => {
  let {_api_calls} = HttpCalls;

  let params = {
    apikey: API_KEY,
    type: 'application/json',
    reqFrom: 'supnl',
    suKey: userKey,
    tzstr: 'Europe/London',
  };

  let body = {
    lastSyncedAt: timestamp,
  };

  let headers = await headersData(params);
  return _api_calls('POST', '/appFoodQuantityUnits/performSync', headers, body);
};

// food quantity unit detail call
export const _foodQuantityUnitDetail = async (userKey, id) => {
  let {_api_calls} = HttpCalls;

  let params = {
    apikey: API_KEY,
    type: 'application/json',
    reqFrom: 'supnl',
    suKey: userKey,
    tzstr: 'Europe/London',
  };

  let body = {
    quantityUnitId: id,
  };

  let headers = await headersData(params);
  return _api_calls('POST', '/appFoodQuantityUnits/detail', headers, body);
};

/**
 * FoodCategory Calls
 */

// food category sync call
export const _foodCategorySync = async (userKey, timestamp) => {
  let {_api_calls} = HttpCalls;
  let params = {
    apikey: API_KEY,
    type: 'application/json',
    reqFrom: 'supnl',
    suKey: userKey,
    tzstr: 'Europe/London',
  };

  let body = {
    lastSyncedAt: timestamp,
  };

  let headers = await headersData(params);
  return _api_calls('POST', '/appFoodCategories/performSync', headers, body);
};

// food category detail call
export const _foodCategoryDetail = async (userKey, id) => {
  let {_api_calls} = HttpCalls;

  let params = {
    apikey: API_KEY,
    type: 'application/json',
    reqFrom: 'supnl',
    suKey: userKey,
    tzstr: 'Europe/London',
  };

  let body = {
    categoryId: id,
  };

  let headers = await headersData(params);
  return _api_calls('POST', '/appFoodCategories/detail', headers, body);
};

/**
 * FoodItems Calls
 */

// food item sync call
export const _foodItemSync = async (userKey, timestamp) => {
  let {_api_calls} = HttpCalls;
  let params = {
    apikey: API_KEY,
    type: 'application/json',
    reqFrom: 'supnl',
    suKey: userKey,
    tzstr: 'Europe/London',
  };

  let body = {
    lastSyncedAt: timestamp,
  };

  let headers = await headersData(params);
  return _api_calls('POST', '/appFoodItems/performSync', headers, body);
};

// food item detail call
export const _foodItemDetail = async (userKey, id) => {
  let {_api_calls} = HttpCalls;

  let params = {
    apikey: API_KEY,
    type: 'application/json',
    reqFrom: 'supnl',
    suKey: userKey,
    tzstr: 'Europe/London',
  };

  let body = {
    itemId: id,
  };

  let headers = await headersData(params);
  return _api_calls('POST', '/appFoodItems/detail', headers, body);
};

/**
 * Syncing Dependencies
 */

export const _initializeSyncingDependencies = () => {
  const dependencies = [
    {
      moduleName: 'FoodQuantityUnit',
      syncPeriodInMinutes: 2,
      syncFailureResetInMinutes: 4,
      priority: 1,
    },
    {
      moduleName: 'FoodCategory',
      syncPeriodInMinutes: 2,
      syncFailureResetInMinutes: 4,
      priority: 1,
    },
    {
      moduleName: 'FoodItem',
      syncPeriodInMinutes: 5,
      syncFailureResetInMinutes: 8,
      priority: 2,
    },
  ];

  dependencies.forEach(dependency => {
    const existing = fetchSyncingDependencyByModuleName(dependency?.moduleName);
    const lastSyncedAt = existing?.lastSyncedAt || 0;
    if (!existing) {
      addSyncingDependencyRecord({
        localModuleDependencyId: new Realm.BSON.ObjectId(),
        moduleName: dependency?.moduleName,
        syncPeriodInMinutes: dependency?.syncPeriodInMinutes,
        syncFailureResetInMinutes: dependency?.syncFailureResetInMinutes,
        priority: dependency?.priority,
        lastSyncedAt: lastSyncedAt,
        nextSyncAt: convertDateToTimeStamp(
          new Date(Date.now() + dependency?.syncPeriodInMinutes * 60 * 1000),
        ),
        isSyncInProgress: false,
        syncStartedAt: convertDateToTimeStamp(new Date()),
      });
    } else {
      addSyncingDependencyRecord({
        localModuleDependencyId: existing?.localModuleDependencyId,
        moduleName: dependency?.moduleName,
        syncPeriodInMinutes: dependency?.syncPeriodInMinutes,
        syncFailureResetInMinutes: dependency?.syncFailureResetInMinutes,
        priority: dependency?.priority,
        lastSyncedAt: existing?.lastSyncedAt || 0,
        nextSyncAt:
          existing?.nextSyncAt ||
          convertDateToTimeStamp(
            new Date(Date.now() + dependency?.syncPeriodInMinutes * 60 * 1000),
          ),
        isSyncInProgress: false,
        syncStartedAt: convertDateToTimeStamp(new Date()),
      });
    }
  });
};

export const _syncDataForOffilneMode = async userKey => {
  const connected = await isNetworkConnected();
  if (!connected) {
    const foodQuantityUnitLastSync =
      fetchSyncingDependencyByModuleName('FoodQuantityUnit')?.lastSyncedAt;
    const foodCategoryLastSync =
      fetchSyncingDependencyByModuleName('FoodCategory')?.lastSyncedAt;
    const foodItemLastSync =
      fetchSyncingDependencyByModuleName('FoodItem')?.lastSyncedAt;
    addSyncingDependencyRecord({
      moduleName: 'FoodQuantityUnit',
      lastSyncedAt: foodQuantityUnitLastSync || 0,
      isSyncInProgress: false,
    });
    addSyncingDependencyRecord({
      moduleName: 'FoodCategory',
      lastSyncedAt: foodCategoryLastSync || 0,
      isSyncInProgress: false,
    });
    addSyncingDependencyRecord({
      moduleName: 'FoodItem',
      lastSyncedAt: foodItemLastSync || 0,
      isSyncInProgress: false,
    });
    return;
  }

  // const dependencies = fetchSyncingDependencies();
  // const sortedDependencies = dependencies.sort(
  //   (a, b) => a.priority - b.priority,
  // );
  // for (const dependency of sortedDependencies) {
  //   if (!dependency.isSyncInProgress) {
  //     addSyncingDependencyRecord({
  //       ...dependency,
  //       isSyncInProgress: true,
  //       syncStartedAt: convertDateToTimeStamp(new Date()),
  //     });

  //     try {
  //       const syncDuration = dependency.syncPeriodInMinutes * 60 * 1000;
  //       setTimeout(() => {
  //         addSyncingDependencyRecord({
  //           ...dependency,
  //           lastSyncedAt: convertDateToTimeStamp(new Date()),
  //           nextSyncAt: convertDateToTimeStamp(
  //             new Date(dependency?.syncStartedAt + syncDuration),
  //           ),
  //           isSyncInProgress: false,
  //           syncStartedAt: convertDateToTimeStamp(new Date()),
  //         });
  //       }, syncDuration);
  //     } catch (error) {
  //       console.error(`Sync failed for ${dependency.moduleName}:`, error);
  //       addSyncingDependencyRecord({
  //         ...dependency,
  //         isSyncInProgress: false,
  //       });
  //     }
  //   }
  // }
};
