import z from "zod";

export const createCheckoutSessionSchema = z.object({
  cartId: z.uuid(),
});

export type CreateCheckoutSessionSchema = z.infer<
  typeof createCheckoutSessionSchema
>;
