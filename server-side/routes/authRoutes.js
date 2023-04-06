const express = require("express");
const { authController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", authController.register);
router.post("/login", authController.login);
router.post("/check-login", verifyToken, authController.checkLogin);
router.get("/user", verifyToken, checkRole, authController.fetchAllUser);
router.get("/user/:id", verifyToken, authController.fetchUser);
router.post("/verification", verifyToken, authController.verification);

module.exports = router;
