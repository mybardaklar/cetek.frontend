const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");

const AppRouter = require("./app/app.route");
const AppService = require("./app/app.service");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

i18next
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		backend: {
			loadPath: path.join(process.cwd(), "locales/{{lng}}/{{ns}}.json"),
		},
		detection: {
			order: ["querystring", "cookie"],
			caches: ["cookie"],
		},
		fallbackLng: "tr",
		preload: ["tr", "en"],
	});

// view engine setup
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18next));
app.use(express.static(path.join(process.cwd(), "public")));

(async () => {
	const appService = new AppService("tr");
	const configurationSettings = await appService.findConfigurationSettings();
	const someProductCategories = await appService.findSomeProductCategories();

	app.set("config", configurationSettings);
	app.locals.someProductCategories = someProductCategories;
})();

app.use(async (req, res, next) => {
	const appService = new AppService(res.locals.language);

	if (res.locals.language) {
		const configurationSettings = await appService.findConfigurationSettings();
		const someProductCategories = await appService.findSomeProductCategories();

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
});

app.use("/", AppRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
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

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));

module.exports = app;
