import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { eventValidationSchema } from "./event.validate";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { eventControllers } from "./event.controller";

const router = Router();

router.post(
  "/create-event",
  authMiddleware,
  validateRequest(eventValidationSchema.createEventSchema),
  eventControllers.createEvent
);
router.get("/", authMiddleware, eventControllers.getAllEvents);
router.get("/:id", authMiddleware, eventControllers.getEventById);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(eventValidationSchema.updateEventSchema),
  eventControllers.updateEvent
);
router.delete("/:id", authMiddleware, eventControllers.deleteEvent);

router.put("/join/:id", authMiddleware, eventControllers.increaseEventAttendee);
router.get("/my-events/all", authMiddleware, eventControllers.getUsersEvents);

export const eventRoutes = router;
