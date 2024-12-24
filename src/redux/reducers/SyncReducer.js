import {convertDateToTimeStamp} from '../../utils';
import * as actions from '../Types';

const initialState = {
  syncState: {},
};

export const syncReducer = (state = initialState, action) => {
  switch (action) {
    case actions.START_SYNC_TIME:
      return {
        ...state,
        syncState: {
          ...state.syncState,
          [action.payload.moduleName]: {
            ...(state.syncState[action.payload.moduleName] || {}),
            syncStartedAt: convertDateToTimeStamp(new Date()),
            isSyncInProgress: true,
          },
        },
      };
    case actions.NEXT_SYNC_AT:
      const syncStartedAt = action.payload.syncStartedAt;
      const syncPeriodInMinutes = action.payload.syncPeriodInMinutes;
      const nextSyncTime = syncStartedAt + syncPeriodInMinutes * 60 * 1000;
      return {
        ...state,
        syncState: {
          ...state.syncState,
          [action.payload.moduleName]: {
            ...(state.syncState[action.payload.moduleName] || {}),
            nextSyncAt: convertDateToTimeStamp(new Date(nextSyncTime)),
          },
        },
      };
    case actions.SYNC_TIME:
      const module = state.syncState[action.payload.moduleName] || {};
      const syncStartTime = module.syncStartedAt;
      const syncPeriod = action.payload.syncPeriodInMinutes;
      const lastSyncTime =
        syncStartTime !== null ? syncStartTime + syncPeriod * 60 * 1000 : null;
      return {
        ...state,
        syncState: {
          ...state.syncState,
          [action.payload.moduleName]: {
            ...(state.syncState[action.payload.moduleName] || {}),
            lastSyncTime: lastSyncTime !== null,
            isSyncInProgress: false,
          },
        },
      };
    default:
      return state;
  }
};
