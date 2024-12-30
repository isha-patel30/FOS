export const FoodOrderTypeSchema = {
  name: 'FoodOrderType',
  properties: {
    localFoodOrderTypeId: 'objectId',
    typeText: 'string',
    typeCode: 'string',
    hasMealPlanAssociation: 'bool',
    colorCode: 'string',
  },
  primaryKey: 'localFoodOrderTypeId',
};
