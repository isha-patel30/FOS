export const FoodOrderCategoryItemSchema = {
  name: 'FoodOrderCategoryItem',
  properties: {
    localFoodOrderCategoryItemId: 'objectId?',
    foodOrder: 'string?',
    foodOrderCategory: 'string?',
    displayOrder: 'int?',
    foodItem: 'string?',
    requestedItemPortionCount: 'int?',
    isRequestAccepted: 'bool?',
    orderedItemPortionCount: 'int?',
    orderFromSupplier: 'int?',
    orderedItemPortionQuantity: 'int?',
    orderedItemQuantityUnit: 'int?',
  },
  primaryKey: 'localFoodOrderCategoryItemId',
};
