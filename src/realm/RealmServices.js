import Realm from 'realm';
import {
  FacilitySchema,
  FoodCategorySchema,
  FoodItemSchema,
  FoodOrderCategoryItemSchema,
  FoodOrderCategorySchema,
  FoodOrderSchema,
  FoodOrderStatusSchema,
  FoodOrderTypeSchema,
  FoodQuantityUnitSchema,
  FoodSubOrderStatusSchema,
  SyncingDependencySchema,
} from './schema';

export const realm = new Realm({
  schema: [
    FoodItemSchema,
    FoodCategorySchema,
    FoodQuantityUnitSchema,
    SyncingDependencySchema,
    FoodSubOrderStatusSchema,
    FoodOrderStatusSchema,
    FoodOrderTypeSchema,
    FacilitySchema,
    FoodOrderSchema,
    FoodOrderCategorySchema,
    FoodOrderCategoryItemSchema,
  ],
  schemaVersion: 10,
});
