export const FoodQuantityUnitSchema = {
  name: 'FoodQuantityUnit',
  properties: {
    localFoodQuantityUnitId: 'objectId',
    unitName: 'string',
    unitShortName: 'string',
    serverQuantityUnitId: 'string',
    isActive: 'int',
  },
  primaryKey: 'localFoodQuantityUnitId',
};
