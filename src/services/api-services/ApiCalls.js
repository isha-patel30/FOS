import HttpCalls from './HttpCalls';
import {headersData} from './Services';
import {API_KEY} from '../../config';

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
