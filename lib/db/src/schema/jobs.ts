import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const jobsTable = pgTable("jobs", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default("pending_payment"),
  style: text("style").notNull().default("classique"),
  imageDataUrl: text("image_data_url"),
  resultDataUrl: text("result_data_url"),
  cvData: jsonb("cv_data"),
  cvTemplate: text("cv_template").notNull().default("classique"),
  cvPdfDataUrl: text("cv_pdf_data_url"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeSessionId: text("stripe_session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertJobSchema = createInsertSchema(jobsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobsTable.$inferSelect;
