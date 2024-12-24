import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {MainStackNavigation} from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from '@realm/react';

import {MainContextProvider} from './src/contexts';
import {store} from './src/redux';

console.log(store.getState());

export const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <RealmProvider>
            <MainContextProvider>
              <MainStackNavigation />
            </MainContextProvider>
          </RealmProvider>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
