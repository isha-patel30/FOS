export const FoodOrderCategorySchema = {
  name: 'FoodOrderCategory',
  properties: {
    localFoodOrderCategoryId: 'objectId?',
    foodOrder: 'string?',
    displayOrder: 'int?',
    foodCategory: 'string?',
    totalRequestedPortionCount: 'int?',
    totalOrderedPortionCount: 'int?',
  },
  primaryKey: 'localFoodOrderCategoryId',
};
