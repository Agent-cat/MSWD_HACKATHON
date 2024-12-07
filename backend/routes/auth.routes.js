const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authMiddleware, authController.me);
router.post("/send-otp", authController.sendVerificationOTP);
router.post("/verify-register", authController.verifyAndRegister);

module.exports = router;
