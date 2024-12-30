export const FoodItemSchema = {
  name: 'FoodItem',
  properties: {
    localItemId: 'objectId',
    itemName: 'string',
    foodCategory: 'string',
    portionQuantity: 'int',
    foodQuantityUnit: 'string',
    serverItemId: 'string',
    isActive: 'int',
  },
  primaryKey: 'localItemId',
};
