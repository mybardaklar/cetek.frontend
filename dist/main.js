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
const dotenv_1 = __importDefault(require("dotenv"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const i18next_1 = __importDefault(require("i18next"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const app_service_1 = __importDefault(require("./app/app.service"));
const app_route_1 = __importDefault(require("./app/app.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
i18next_1.default
    .use(i18next_fs_backend_1.default)
    .use(i18next_http_middleware_1.default.LanguageDetector)
    .init({
    backend: {
        loadPath: path_1.default.resolve(__dirname, "locales/{{lng}}/{{ns}}.json"),
    },
    detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"],
    },
    fallbackLng: "tr",
    preload: ["tr", "en"],
});
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "pug");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(i18next_http_middleware_1.default.handle(i18next_1.default));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const appService = new app_service_1.default("tr");
    const configurationSettings = yield appService.findConfigurationSettings();
    const someProductCategories = yield appService.findSomeProductCategories();
    app.set("config", configurationSettings);
    app.locals.someProductCategories = someProductCategories;
}))();
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const appService = new app_service_1.default(res.locals.language);
    if (res.locals.language) {
        const configurationSettings = yield appService.findConfigurationSettings();
        const someProductCategories = yield appService.findSomeProductCategories();
        app.set("config", configurationSettings);
        app.locals.someProductCategories = someProductCategories;
    }
    res.locals.PageProps = {
        titlePrefix: app.locals.settings.config.meta_title,
        title: "",
        metaDescription: "",
        metaKeywords: "",
    };
    next();
}));
app.use("/", app_route_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
