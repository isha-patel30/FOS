import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MainContextProvider} from './src/contexts';
import {MainStackNavigation} from './src/navigation';

export const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1}}>
        <MainContextProvider>
          <MainStackNavigation />
        </MainContextProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
