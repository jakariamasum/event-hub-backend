import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:email", userController.getUserByEmail);

export const userRoutes = router;
