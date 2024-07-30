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
const axios_1 = __importDefault(require("../lib/axios"));
class AppService {
    constructor(language) {
        this.siteLanguage = language;
        this.pageIDs = {
            SiteConfigurationSettings: this.siteLanguage === "tr" ? 276 : 407,
            HomeSettings: this.siteLanguage === "tr" ? 194 : 429,
        };
    }
    findConfigurationSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield axios_1.default.get(`/pages/${this.pageIDs.SiteConfigurationSettings}?_fields=acf&acf_format=standard`);
                return request.data.acf;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findHomePageSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield axios_1.default.get(`/pages/${this.pageIDs.HomeSettings}?_fields=acf&acf_format=standard`);
                return request.data.acf;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findSomeProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield axios_1.default.get(`/product_category?_fields=id,slug,name,description,count,lang,translations,acf&acf_format=standard&per_page=4&lang=${this.siteLanguage}`);
                return request.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    findSectoralNozzles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield axios_1.default.get(`/sectoral_nozzle?_fields=id,slug,title,acf,lang&acf_format=standard&lang=${this.siteLanguage}`);
                return request.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    findAllProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield axios_1.default.get(`/product_category?_fields=id,slug,name,description,count,lang,translations,acf&acf_format=standard&per_page=100&lang=${this.siteLanguage}`);
                return request.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = AppService;
