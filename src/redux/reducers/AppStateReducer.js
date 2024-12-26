import * as actions from '../Types';

const initialState = {
  appState: null,
};

export const AppStateReducder = (state = initialState, action) => {
  switch (action.type) {
    case actions.APP_IN_FOREGROUND:
      return {
        ...state,
        appState: action.payload,
      };
    case actions.APP_IN_BACKGROUND:
      return {
        ...state,
        appState: action.payload,
      };
    default:
      return state;
  }
};
