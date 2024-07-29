import { Router } from "express";
import user from "./user.js";
import auth from "./auth.js";
import { mail } from "./mail.js";

const router = Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/mail", mail);

export default router;
