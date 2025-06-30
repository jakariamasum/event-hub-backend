import AppError from "../../errors/AppError";
import { IEvent } from "./event.interface";
import { Event } from "./event.model";

const createEventIntoDB = async (payload: IEvent) => {
  try {
    const event = await Event.create(payload);
    return event;
  } catch (error) {
    throw new AppError(500, "Failed to create event");
  }
};

const getAllEventsFromDB = async () => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return events;
  } catch (error) {
    throw new AppError(500, "Failed to fetch events");
  }
};

const getEventByIdFromDB = async (id: string) => {
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new AppError(404, "Event not found");
    }
    return event;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(500, "Failed to fetch event");
  }
};
const updateEventIntoDB = async (id: string, payload: Partial<IEvent>) => {
  try {
    const event = await Event.findByIdAndUpdate(id, payload, { new: true });
    if (!event) {
      throw new AppError(404, "Event not found");
    }
    return event;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(500, "Failed to update event");
  }
};

const deleteEventFromDB = async (id: string) => {
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      throw new AppError(404, "Event not found");
    }
    return event;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(500, "Failed to delete event");
  }
};

export const eventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getEventByIdFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
};
