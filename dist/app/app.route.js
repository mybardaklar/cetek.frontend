"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_controller_1 = __importDefault(require("./app.controller"));
const router = express_1.default.Router();
router.get("/", app_controller_1.default.Index);
router.get("/:link", app_controller_1.default.findAllProducts);
exports.default = router;
