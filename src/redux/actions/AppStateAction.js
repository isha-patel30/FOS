import * as actions from '../Types';

export const setAppInForeground = status => {
  return {
    type: actions.APP_IN_FOREGROUND,
    payload: status,
  };
};

export const setAppInBackground = status => {
  return {
    type: actions.APP_IN_BACKGROUND,
    payload: status,
  };
};
