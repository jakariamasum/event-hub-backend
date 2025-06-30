import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { eventServices } from "./event.service";

const createEvent = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.userId = req.user.id;
  const result = await eventServices.createEventIntoDB(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Failed to create event",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const { search = "", filter = "all", page = 1, limit = 10 } = req.query;

  const result = await eventServices.getAllEventsFromDB(
    req.query.search as string,
    req.query.filter as string,
    Number(page),
    Number(limit)
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Events fetched successfully",
    data: result,
  });
});

const getEventById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.getEventByIdFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Event not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event fetched successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.updateEventIntoDB(id, req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Event not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventServices.deleteEventFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Event not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

const increaseEventAttendee = catchAsync(async (req, res) => {
  const eventId = req.params.id;
  const result = await eventServices.increaseEventAttendeeIntoDB(
    eventId,
    req.user.id
  );
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Event not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event views increased successfully",
    data: result,
  });
});

const getUsersEvents = catchAsync(async (req, res) => {
  const userId = req.user.id;
  console.log("Fetching events for user:", userId);
  const result = await eventServices.getUsersEventsFromDB(userId);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "No events found for this user",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User's events fetched successfully",
    data: result,
  });
});

export const eventControllers = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  increaseEventAttendee,
  getUsersEvents,
};
