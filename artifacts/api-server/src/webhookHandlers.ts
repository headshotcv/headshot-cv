import { db, jobsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getUncachableStripeClient } from "./stripeClient.js";
import { logger } from "./lib/logger.js";

export async function processWebhook(payload: Buffer, signature: string): Promise<void> {
  const stripe = await getUncachableStripeClient();

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET not set");
  }

  const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

  logger.info({ type: event.type }, "Stripe webhook received");

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const jobId = session.metadata?.jobId;

    if (!jobId) {
      logger.warn({ sessionId: session.id }, "No jobId in session metadata");
      return;
    }

    await db
      .update(jobsTable)
      .set({ status: "processing", stripePaymentIntentId: session.payment_intent ?? session.id })
      .where(eq(jobsTable.id, jobId));

    logger.info({ jobId }, "Job marked as processing after payment");
  }
}
