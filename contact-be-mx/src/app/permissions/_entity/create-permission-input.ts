export interface CreatePermissionInput {
  contactId: number;
  sharedToId: number;
  allowUpdate?: boolean;
  allowDelete?: boolean;
}
