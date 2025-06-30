import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidationSchema } from "./auth.validate";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post(
  "/register",
  validateRequest(authValidationSchema.signUpSchemaValidation),
  authController.registerUser
);
router.post(
  "/login",
  validateRequest(authValidationSchema.sinInSchemaValidation),
  authController.loginUser
);

router.get("/me", authMiddleware, authController.getProfile);

export const authRoutes = router;
