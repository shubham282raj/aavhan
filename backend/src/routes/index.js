import { Router } from "express";
import user from "./user.js";
import auth from "./auth.js";

const router = Router();

router.use("/auth", auth);
router.use("/user", user);

export default router;
