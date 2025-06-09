CREATE TABLE `groups` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`publish_date` text,
	`url` text
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`id` integer PRIMARY KEY NOT NULL,
	`image` text,
	`product_id` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`price` integer,
	`publisher` text,
	`publish_date` text,
	`url` text,
	`desc` text,
	`image` text,
	`group_id` integer,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE no action
);
