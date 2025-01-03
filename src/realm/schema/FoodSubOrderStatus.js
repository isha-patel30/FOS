export const FoodSubOrderStatusSchema = {
  name: 'FoodSubOrderStatus',
  properties: {
    localSubFoodOrderStatusId: 'objectId',
    statusText: 'string',
    statusCode: 'string',
    colorCode: 'string',
  },
  primaryKey: 'localSubFoodOrderStatusId',
};
