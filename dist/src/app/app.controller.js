"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_service_1 = __importDefault(require("./app.service"));
class AppController {
    static home(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const appService = new app_service_1.default(res.locals.language);
            return res.render("pages/Index/Index.page.pug", {
                homeSettings: yield appService.findHomePageSettings(),
                sectoralNozzles: yield appService.findSectoralNozzles(),
            });
        });
    }
    static findAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const appService = new app_service_1.default(res.locals.language);
            if (req.params.link === "urunler") {
                if (res.locals.language !== "tr")
                    return res.redirect("/products");
                return res.render("pages/ProductCategory/ProductCategory.page.pug", {
                    productCategories: yield appService.findAllProductCategories(),
                });
            }
            else if (req.params.link === "products") {
                if (res.locals.language !== "en")
                    return res.redirect("/urunler");
                return res.render("pages/ProductCategory/ProductCategory.page.pug", {
                    productCategories: yield appService.findAllProductCategories(),
                });
            }
            else if (req.params.link.includes("urunler")) {
            }
        });
    }
}
exports.default = AppController;
