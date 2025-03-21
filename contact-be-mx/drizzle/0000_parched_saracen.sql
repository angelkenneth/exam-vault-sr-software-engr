CREATE TABLE `contact_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ownerId` integer NOT NULL,
	`mobileNumberE164` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `permission_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contactId` integer NOT NULL,
	`sharedToId` integer NOT NULL,
	`allowUpdate` integer DEFAULT false NOT NULL,
	`allowDelete` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`contactId`) REFERENCES `contact_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permission_table_contactId_sharedToId_unique` ON `permission_table` (`contactId`,`sharedToId`);