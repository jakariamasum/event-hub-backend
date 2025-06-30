import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidationSchema } from "./auth.validate";

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

export const authRoutes = router;
