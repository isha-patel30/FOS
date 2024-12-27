import {isNetworkConnected} from '../../utils';

const offlineQueue = [];

export const addToOfflineQueue = (moduleName, data) => {
  offlineQueue.push({
    moduleName,
    data,
  });
};

export const syncOfflineQueue = async () => {
  const connected = isNetworkConnected();
  if (!connected) {
    console.log('Still offline. Retrying later.');
    return;
  }

  while (offlineQueue.length > 0) {
    const {moduleName, data} = offlineQueue.shift();
    try {
      console.log(`Syncing offline data for ${moduleName}:`, data);
    } catch (error) {
      console.error(`Failed to sync offline data for ${moduleName}:`, error);
      offlineQueue.unshift({moduleName, data});
      break;
    }
  }
};
