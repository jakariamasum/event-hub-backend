import { z } from "zod";

const signUpSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    photoURL: z.string().url().optional(),
  }),
});

const sinInSchemaValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const authValidationSchema = {
  signUpSchemaValidation,
  sinInSchemaValidation,
};
