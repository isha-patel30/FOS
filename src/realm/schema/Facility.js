export const FacilitySchema = {
  name: 'Facility',
  properties: {
    localFacilityId: 'objectId',
    serverFacilityId: 'string',
    facilityName: 'string',
    isOffice: 'bool',
    isCareHome: 'bool',
    isActive: 'int',
  },
  primaryKey: 'localFacilityId',
};
