const express = require("express");
const userCtrl = require("../controller/index");
const router = express.Router();

router.post("/auth-user", userCtrl.authUser);
router.post("/create-user", userCtrl.createUser);
router.post("/borrow-request", userCtrl.borrowRequest);
router.post("/get-user", userCtrl.getUser);

module.exports = router;
