import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
import { authRoutes } from "../module/auth/auth.route";
import { eventRoutes } from "../module/event/event.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/events",
    route: eventRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
