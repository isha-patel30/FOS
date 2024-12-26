import {convertDateToTimeStamp} from '../../utils';
import * as actions from '../Types';

const initialState = {
  syncState: {},
  isConnected: null,
};

export const SyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.IS_CONNECTED:
      console.log('connected in reducer: ', action.payload);
      if (action.payload) {
        return {
          ...state,
          isConnected: action.payload,
          syncState: Object.keys(state.syncState).reduce((acc, moduleName) => {
            acc[moduleName] = {
              ...state.syncState[moduleName],
              isSyncInProgress: false,
              nextSyncAt: null,
            };
            return acc;
          }, {}),
        };
      } else {
        return {
          ...state,
          isConnected: action.payload,
        };
      }
    case actions.START_SYNC_TIME:
      if (state.isConnected) {
        console.log('Cannot start sync when connected to the network.');
        return state;
      } else {
        console.log('action.payloadddddddd: ', action.payload);
        return {
          ...state,
          syncState: {
            ...state.syncState,
            [action.payload.moduleName]: {
              ...(state.syncState[action.payload.moduleName] || {}),
              syncStartedAt: action.payload.syncStartedAt,
              isSyncInProgress: true,
              nextSyncAt: null,
            },
          },
        };
      }
    case actions.NEXT_SYNC_AT: {
      if (state.isConnected) {
        console.log(
          'Cannot update next sync time when connected to the network.',
        );
        return state;
      }
      const {syncStartedAt, syncPeriodInMinutes, moduleName} = action.payload;
      const syncElapsed = Date.now() - syncStartedAt;
      const syncPeriodInMillis = syncPeriodInMinutes * 60 * 1000;
      if (syncElapsed < syncPeriodInMillis) {
        const remainingTime = syncPeriodInMillis - syncElapsed;
        const nextSyncTime = syncStartedAt + remainingTime;
        return {
          ...state,
          syncState: {
            ...state.syncState,
            [moduleName]: {
              ...(state.syncState[moduleName] || {}),
              nextSyncAt: convertDateToTimeStamp(new Date(nextSyncTime)),
            },
          },
        };
      } else {
        return {
          ...state,
          syncState: {
            ...state.syncState,
            [moduleName]: {
              ...(state.syncState[moduleName] || {}),
              lastSyncedAt: convertDateToTimeStamp(new Date()),
              isSyncInProgress: false,
            },
          },
        };
      }
    }
    case actions.SYNC_TIME: {
      if (state.isConnected) {
        console.log('Cannot sync data when connected to the network.');
        return state;
      }
      const {moduleName, syncPeriodInMinutes} = action.payload;
      const module = state.syncState[moduleName] || {};
      const syncStartTime = module.syncStartedAt;
      const syncPeriodInMillis = syncPeriodInMinutes * 60 * 1000;
      if (Date.now() - syncStartTime < syncPeriodInMillis) {
        return {
          ...state,
          syncState: {
            ...state.syncState,
            [moduleName]: {
              ...(state.syncState[moduleName] || {}),
              isSyncInProgress: true,
            },
          },
        };
      } else {
        return {
          ...state,
          syncState: {
            ...state.syncState,
            [moduleName]: {
              ...(state.syncState[moduleName] || {}),
              lastSyncedAt: convertDateToTimeStamp(new Date()),
              isSyncInProgress: false,
            },
          },
        };
      }
    }
    default:
      return state;
  }
};
