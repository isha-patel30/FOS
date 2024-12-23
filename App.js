import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MainContextProvider} from './src/contexts';
import {MainStackNavigation} from './src/navigation';
import {RealmProvider} from '@realm/react';

export const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <RealmProvider>
          <MainContextProvider>
            <MainStackNavigation />
          </MainContextProvider>
        </RealmProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
