const express = require("express");
const router = express.Router();

const AppController = require("./app.controller");

router.get("/", AppController.home);
router.get("/:link", AppController.findAllProducts);

module.exports = router;
