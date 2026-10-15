import { jsonb, numeric, pgTable, serial, timestamp, varchar, text } from "drizzle-orm/pg-core";

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 190 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type OrderLine = {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 40 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 140 }).notNull(),
  email: varchar("email", { length: 190 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  pincode: varchar("pincode", { length: 12 }).notNull(),
  items: jsonb("items").$type<OrderLine[]>().notNull(),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull().default("Cash on Delivery"),
  paymentReference: varchar("payment_reference", { length: 80 }),
  status: varchar("status", { length: 40 }).notNull().default("Order placed"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
