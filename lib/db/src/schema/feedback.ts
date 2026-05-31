import { pgTable, text, integer, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const feedbackTable = pgTable("feedback", {
  id: serial("id").primaryKey(),
  jobId: text("job_id").notNull().unique(),
  rating: integer("rating").notNull(),
  easeOfUse: integer("ease_of_use"),
  photoQuality: integer("photo_quality"),
  cvQuality: integer("cv_quality"),
  priceFeeling: text("price_feeling"),
  wouldRecommend: boolean("would_recommend"),
  hadIssue: boolean("had_issue"),
  issueText: text("issue_text"),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFeedbackSchema = createInsertSchema(feedbackTable).omit({
  id: true,
  createdAt: true,
});
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedbackTable.$inferSelect;
