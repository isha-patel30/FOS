export const SyncingDependencySchema = {
  name: 'SyncingDependency',
  properties: {
    localModuleDependencyId: 'objectId',
    moduleName: 'string',
    syncPeriodInMinutes: 'int',
    syncFailureResetInMinutes: 'int',
    priority: 'int',
    lastSyncedAt: 'int?',
    nextSyncAt: 'int?',
    isSyncInProgress: 'bool',
    syncStartedAt: 'int?',
  },
  primaryKey: 'localModuleDependencyId',
};
