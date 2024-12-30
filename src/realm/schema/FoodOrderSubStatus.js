export const FoodOrderSubStatusSchema = {
  name: 'FoodOrderSubStatus',
  properties: {
    localFoodSubOrderStatusId: 'objectId',
    statusText: 'string',
    statusCode: 'string',
    colorCode: 'string',
  },
  primaryKey: 'localFoodSubOrderStatusId',
};
