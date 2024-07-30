import express from "express";
import AppController from "./app.controller";

const router = express.Router();

router.get("/", AppController.home);
router.get("/:link", AppController.findAllProducts);

export default router;
