export const FoodCategorySchema = {
  name: 'FoodCategory',
  properties: {
    localCategoryId: 'string',
    categoryName: 'string',
    serverCategoryId: 'string',
  },
  primaryKey: 'localCategoryId',
};
