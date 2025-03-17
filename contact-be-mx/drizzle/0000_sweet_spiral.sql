CREATE TABLE `contact_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ownerId` integer NOT NULL,
	`mobileNumberE164` text NOT NULL
);
