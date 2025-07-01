import { FilterQuery } from "mongoose";
import AppError from "../../errors/AppError";
import { IEvent, PaginatedEvents } from "./event.interface";
import { Event } from "./event.model";
import moment from "moment";

const createEventIntoDB = async (payload: IEvent) => {
  try {
    console.log("Creating event with payload:", payload);
    const event = await Event.create(payload);
    return event;
  } catch (error) {
    throw new AppError(500, "Failed to create event");
  }
};

const getAllEventsFromDB = async (
  search: string,
  filter: string,
  page: number,
  limit: number
): Promise<PaginatedEvents> => {
  const query: FilterQuery<IEvent> = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const now = moment();

  const ranges: Record<string, [string, string]> = {
    today: [
      now.clone().startOf("day").format("YYYY-MM-DD"),
      now.clone().endOf("day").format("YYYY-MM-DD"),
    ],
    "current-week": [
      now.clone().startOf("week").format("YYYY-MM-DD"),
      now.clone().endOf("week").format("YYYY-MM-DD"),
    ],
    "last-week": [
      now.clone().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
      now.clone().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
    ],
    "current-month": [
      now.clone().startOf("month").format("YYYY-MM-DD"),
      now.clone().endOf("month").format("YYYY-MM-DD"),
    ],
    "last-month": [
      now.clone().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
      now.clone().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
    ],
  };

  if (filter !== "all" && ranges[filter]) {
    const [start, end] = ranges[filter];
    query.date = { $gte: start, $lte: end };
  }

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Event.countDocuments(query),
  ]);

  return {
    events,
    meta: {
      total,
      page,
      limit,
      pageCount: Math.ceil(total / limit),
    },
  };
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

const increaseEventAttendeeIntoDB = async (id: string, userId: string) => {
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { $inc: { attendeeCount: 1 }, $addToSet: { joinedUsers: userId } },
      { new: true }
    );
    if (!event) {
      throw new AppError(404, "Event not found");
    }
    return event;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(500, "Failed to increase event views");
  }
};

const getUsersEventsFromDB = async (userId: string) => {
  try {
    const events = await Event.find({ userId }).sort({
      createdAt: -1,
    });
    return events;
  } catch (error) {
    console.error("Error fetching user's events:", error);
    throw new AppError(500, "Failed to fetch user's events");
  }
};

export const eventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getEventByIdFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
  increaseEventAttendeeIntoDB,
  getUsersEventsFromDB,
};
