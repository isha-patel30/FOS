import Realm from 'realm';

import HttpCalls from './HttpCalls';
import {headersData} from './Services';
import {API_KEY} from '../../config';
import {convertDateToTimeStamp, isNetworkConnected} from '../../utils';
import {
  addSyncingDependencyRecord,
  fetchSyncingDependencies,
  fetchSyncingDependencyByModuleName,
} from '../../realm';

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
export const _foodItemSync = async (userKey, id) => {
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

const syncModule = async moduleName => {
  console.log(`Syncing data for ${moduleName}`);
};

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
    {
      moduleName: 'FoodOrder',
      syncPeriodInMinutes: 5,
      syncFailureResetInMinutes: 8,
      priority: 3,
    },
  ];

  dependencies.forEach(dependency => {
    const existing = fetchSyncingDependencyByModuleName(dependency?.moduleName);
    if (!existing) {
      const newId = new Realm.BSON.ObjectId();
      addSyncingDependencyRecord({
        localModuleDependencyId: newId,
        moduleName: dependency?.moduleName,
        syncPeriodInMinutes: dependency?.syncPeriodInMinutes,
        syncFailureResetInMinutes: dependency?.syncFailureResetInMinutes,
        priority: dependency?.priority,
        lastSyncedAt: null,
        nextSyncAt: convertDateToTimeStamp(
          new Date(Date.now() + dependency?.syncPeriodInMinutes * 60 * 1000),
        ),
        isSyncInProgress: false,
        syncStartedAt: null,
      });
    } else {
      const existingId = existing.localModuleDependencyId.toString();
      console.log('Existing ID:', existingId);
      addSyncingDependencyRecord({
        localModuleDependencyId: existing?.localModuleDependencyId?.toString(),
        moduleName: dependency?.moduleName,
        syncPeriodInMinutes: dependency?.syncPeriodInMinutes,
        syncFailureResetInMinutes: dependency?.syncFailureResetInMinutes,
        priority: dependency?.priority,
        lastSyncedAt: existing?.lastSyncedAt || null,
        nextSyncAt:
          existing?.nextSyncAt ||
          convertDateToTimeStamp(
            new Date(Date.now() + dependency?.syncPeriodInMinutes * 60 * 1000),
          ),
        isSyncInProgress: false,
        syncStartedAt: null,
      });
    }
  });
};

export const _syncDataForOffilneMode = async () => {
  const connected = await isNetworkConnected();
  if (!connected) {
    console.log('Sync cannot start in offline mode');
    return;
  }

  const dependencies = fetchSyncingDependencies();
  const sortedDependencies = dependencies.sort(
    (a, b) => a.priority - b.priority,
  );
  for (const dependency of sortedDependencies) {
    if (!dependency.isSyncInProgress) {
      addSyncingDependencyRecord({
        ...dependency,
        isSyncInProgress: true,
        syncStartedAt: convertDateToTimeStamp(new Date()),
      });

      try {
        await syncModule(dependency.moduleName);
        addSyncingDependencyRecord([
          {
            ...dependency,
            lastSyncedAt: convertDateToTimeStamp(new Date()),
            nextSyncAt: convertDateToTimeStamp(
              new Date(Date.now() + dependency.syncPeriodInMinutes * 60 * 1000),
            ),
            isSyncInProgress: false,
            syncStartedAt: null,
          },
        ]);
      } catch (error) {
        console.error(`Sync failed for ${dependency.moduleName}:`, error);
        addSyncingDependencyRecord({
          ...dependency,
          isSyncInProgress: false,
        });
      }
    }
  }
};
