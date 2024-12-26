export const SyncingDependencySchema = {
  name: 'SyncingDependency',
  properties: {
    localModuleDependencyId: 'objectId',
    moduleName: 'string',
    syncPeriodInMinutes: 'int',
    syncFailureResetInMinutes: 'int',
    priority: 'int',
    lastSyncedAt: 'date?',
    nextSyncAt: 'date?',
    isSyncInProgress: 'bool',
    syncStartedAt: 'date?',
  },
  primaryKey: 'localModuleDependencyId',
};
