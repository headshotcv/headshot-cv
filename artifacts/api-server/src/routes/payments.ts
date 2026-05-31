import { Router } from "express";
import { db } from "@workspace/db";
import { jobsTable } from "@workspace/db";
import { eq, count, sql } from "drizzle-orm";
import { CreateCheckoutBody } from "@workspace/api-zod";
import { getUncachableStripeClient } from "../stripeClient.js";
import { logger } from "../lib/logger.js";

const router = Router();

router.post("/api/payments/create-checkout", async (req, res) => {
  const parsed = CreateCheckoutBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { jobId } = parsed.data;

  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, jobId));
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const stripe = await getUncachableStripeClient();

  const baseUrl = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
    : "http://localhost:80";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: 499,
          product_data: {
            name: "HeadshotCV — Photo LinkedIn professionnelle",
            description: "Transformation IA de votre selfie en photo LinkedIn pro",
            images: [],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&job_id=${jobId}`,
    cancel_url: `${baseUrl}/upload`,
    metadata: { jobId },
  });

  logger.info({ jobId, sessionId: session.id }, "Stripe checkout session created");

  return res.json({
    url: session.url ?? "",
    sessionId: session.id,
  });
});

router.get("/api/payments/stats", async (_req, res) => {
  const [totalRow] = await db.select({ count: count() }).from(jobsTable);
  const [completedRow] = await db
    .select({ count: count() })
    .from(jobsTable)
    .where(eq(jobsTable.status, "completed"));
  const [processingRow] = await db
    .select({ count: count() })
    .from(jobsTable)
    .where(eq(jobsTable.status, "processing"));

  return res.json({
    totalJobs: totalRow?.count ?? 0,
    completedJobs: completedRow?.count ?? 0,
    processingJobs: processingRow?.count ?? 0,
  });
});

export default router;
