import React from 'react';
import {SafeAreaView} from 'react-native';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-get-random-values';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  MainContextProvider,
  MainStackNavigation,
  // persistor,
  // store,
} from './src';

export const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        {/* <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>*/}

        <MainContextProvider>
          <MainStackNavigation />
        </MainContextProvider>
        {/* </PersistGate>
        </Provider> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
