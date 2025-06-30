import e from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUserIntoDB(req.body);
  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "User registration failed",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUserIntoDB(req.body);
  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "User login failed",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await authService.getProfileFromDB(userId);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User profile not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
  getProfile,
};
