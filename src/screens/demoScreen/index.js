import React, {useEffect, useState} from 'react';
import {View, AppState} from 'react-native';
import {addFoodCategoryRecords, fetchSyncingDependencies} from '../../realm';
import {_foodQuantityUnitSync} from '../../services/api-services';
import Realm from 'realm';

export const DemoScreen = () => {
  return <View style={{flex: 1}}></View>;
};
