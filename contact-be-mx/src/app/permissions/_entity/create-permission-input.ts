export interface CreatePermissionDatabaseInput {
  contactId: number;
  sharedToId: number;
  allowUpdate?: boolean;
  allowDelete?: boolean;
}

export interface CreatePermissionApiInput {
  contactId: number;
  sharedToId?: number;
  sharedToUsername?: string;
  allowUpdate?: boolean;
  allowDelete?: boolean;
}
