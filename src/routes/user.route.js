const express = require("express");
const { getUser, addUser, login } = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/user", validateToken, getUser);
router.post("/user", addUser);
router.get("/login", login);

module.exports = router;
