export const FoodCategorySchema = {
  name: 'FoodCategory',
  properties: {
    localCategoryId: 'objectId',
    categoryName: 'string',
    serverCategoryId: 'string',
    isActive: 'int',
  },
  primaryKey: 'localCategoryId',
};
