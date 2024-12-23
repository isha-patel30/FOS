import Realm from 'realm';
import {
  FoodCategorySchema,
  FoodItemSchema,
  FoodQuantityUnitSchema,
  SyncingDependencySchema,
} from './schema';

export const realm = new Realm({
  schema: [
    FoodItemSchema,
    FoodCategorySchema,
    FoodQuantityUnitSchema,
    SyncingDependencySchema,
  ],
});
