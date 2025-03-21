export interface PermissionModel {
  id: number;
  contactId: number;
  sharedToId: number;
  allowUpdate: boolean;
  allowDelete: boolean;
}
