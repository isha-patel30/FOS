export const FoodQuantityUnitSchema = {
  name: 'FoodQuantityUnit',
  properties: {
    localFoodQuantityUnitId: 'string',
    unitName: 'string',
    unitShortName: 'string',
    serverFoodQuantityUnitId: 'string',
  },
  primaryKey: 'localFoodQuantityUnitId',
};
