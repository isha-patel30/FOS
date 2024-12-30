export const FoodOrderStatusSchema = {
  name: 'FoodOrderStatus',
  properties: {
    localFoodOrderStatusId: 'objectId',
    statusText: 'string',
    statusCode: 'string',
    colorCode: 'string',
  },
  primaryKey: 'localFoodOrderStatusId',
};
