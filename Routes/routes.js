const registerContoller = require("../Controller/register.js");
const loginContoller = require("../Controller/login.js");
const changepwdController = require("../Controller/changepassword.js");
const profileController = require("../Controller/profiles.js");
const { verifyToken } = require("../MiddleWare/authtoken.js");

const express = require("express");
const router = express.Router();

//Register API endpoint
router.post("/api/register", registerContoller.post_register);

// Login API endpoint
router.post("/api/login", loginContoller.post_login);

// Change password API endpoint
router.post(
  "/api/actions/changepassword",
  verifyToken,
  changepwdController.post_changepassword
);

//Get user profile API endpoint
router.get("/api/profiles", profileController.get_profile);

module.exports = router;
