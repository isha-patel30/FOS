export const FoodItemSchema = {
  name: 'FoodItem',
  properties: {
    localItemId: 'string',
    itemName: 'string',
    foodCategory: 'FoodCategory',
    portionQuantity: 'int',
    foodQuantityUnit: 'FoodQuantityUnit',
    serverItemId: 'string',
  },
  primaryKey: 'localItemId',
};
