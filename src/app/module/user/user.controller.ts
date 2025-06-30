import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersFromDB();
  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "No users found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await userService.findUserByEmailFromDB(email);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getUserByEmail,
};
