CREATE TABLE "contact_inquiries" (
	"id" serial PRIMARY KEY,
	"name" varchar(120) NOT NULL,
	"email" varchar(190) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(24) DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY,
	"email" varchar(190) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"order_number" varchar(40) NOT NULL UNIQUE,
	"customer_name" varchar(140) NOT NULL,
	"email" varchar(190) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"pincode" varchar(12) NOT NULL,
	"items" jsonb NOT NULL,
	"total" numeric(12,2) NOT NULL,
	"payment_method" varchar(40) DEFAULT 'Cash on Delivery' NOT NULL,
	"payment_reference" varchar(80),
	"status" varchar(40) DEFAULT 'Confirmed' NOT NULL,
	"payment_status" varchar(40) DEFAULT 'Due on delivery' NOT NULL,
	"courier" varchar(120),
	"tracking_number" varchar(120),
	"estimated_delivery" varchar(10),
	"history" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
