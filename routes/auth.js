const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Register and Login routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Export the router to be used in app.js
module.exports = router;
