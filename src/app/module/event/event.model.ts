import { model, Schema } from "mongoose";
import { IEvent } from "./event.interface";

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    attendeeCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Event = model<IEvent>("Event", eventSchema);
