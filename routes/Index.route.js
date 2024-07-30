const express = require("express");
const router = express.Router();
const IndexContoller = require("../controllers/Index.controller");

router.get("/", IndexContoller.list);
router.get("/:link", IndexContoller.getProducts);

module.exports = router;
