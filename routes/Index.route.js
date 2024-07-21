const express = require("express");
const router = express.Router();
const IndexContoller = require("../controllers/Index.controller");

router.get("/", IndexContoller.list);

module.exports = router;
