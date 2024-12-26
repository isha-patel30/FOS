export const FoodItemSchema = {
  name: 'FoodItem',
  properties: {
    localItemId: 'objectId',
    itemName: 'string',
    foodCategory: 'FoodCategory',
    portionQuantity: 'int',
    foodQuantityUnit: 'FoodQuantityUnit',
    serverItemId: 'string',
    isActive: 'int',
  },
  primaryKey: 'localItemId',
};
