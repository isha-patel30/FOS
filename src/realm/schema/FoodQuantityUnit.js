export const FoodQuantityUnitSchema = {
  name: 'FoodQuantityUnit',
  properties: {
    localFoodQuantityUnitId: 'objectId',
    unitName: 'string',
    unitShortName: 'string',
    serverFoodQuantityUnitId: 'string',
    isActive: 'int',
  },
  primaryKey: 'localFoodQuantityUnitId',
};
