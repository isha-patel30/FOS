export const modlesToBeSync = [
  {
    moduleName: 'FoodQuantityUnit',
    syncPeriodInMinutes: 2,
    syncFailureResetInMinutes: 4,
    priority: 1,
  },
  {
    moduleName: 'FoodCategory',
    syncPeriodInMinutes: 2,
    syncFailureResetInMinutes: 4,
    priority: 1,
  },
  {
    moduleName: 'FoodItem',
    syncPeriodInMinutes: 5,
    syncFailureResetInMinutes: 8,
    priority: 2,
  },
  {
    moduleName: 'FoodSupplier',
    syncPeriodInMinutes: 2,
    syncFailureResetInMinutes: 4,
    priority: 1,
  },
  {
    moduleName: 'Facility',
    syncPeriodInMinutes: 2,
    syncFailureResetInMinutes: 4,
    priority: 1,
  },
  {
    moduleName: 'FoodOrder',
    syncPeriodInMinutes: 5,
    syncFailureResetInMinutes: 8,
    priority: 3,
  },
];
