import { z } from "zod";

const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Event title is required"),
    name: z.string().min(1, "Name is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    attendeeCount: z.number().default(0),
  }),
});
const updateEventSchema = z.object({
  body: z.object({
    _id: z.string().min(1, "Event ID is required"),
    title: z.string().optional(),
    name: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    attendeeCount: z.number().optional(),
  }),
});

export const eventValidationSchema = {
  createEventSchema,
  updateEventSchema,
};
