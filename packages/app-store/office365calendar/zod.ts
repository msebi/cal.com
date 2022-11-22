import { z } from "zod";

export const appKeysSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
});

export const appDataSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
});