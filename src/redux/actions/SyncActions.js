import * as actions from '../Types';

export const networkIsConnected = connected => {
  console.log('connected in action: ', connected);
  return {
    type: actions.IS_CONNECTED,
    payload: connected,
  };
};

export const syncStarted = module => {
  return {
    type: actions.START_SYNC_TIME,
    payload: module,
  };
};

export const syncInProgress = module => {
  return {
    type: actions.SYNC_IN_PROGRESS,
    payload: module,
  };
};

export const syncTime = module => {
  return {
    type: actions.SYNC_TIME,
    payload: module,
  };
};

export const nextSync = module => {
  return {
    type: actions.NEXT_SYNC_AT,
    payload: module,
  };
};
