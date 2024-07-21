require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");
const axiosInstance = require("./lib/axios");

const indexRouter = require("./routes/Index.route");

const app = express();

i18next
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		backend: {
			loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
		},
		detection: {
			order: ["querystring", "cookie"],
			caches: ["cookie"],
		},
		fallbackLng: "tr",
		preload: ["tr", "en"],
	});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18next));
app.use(express.static(path.join(__dirname, "public")));

(async () => {
	const websiteSettings = await getWebsiteSettings("tr");
	const someProductCategories = await getSomeProductCategories("tr");

	app.set("websiteSettings", websiteSettings);
	app.locals.someProductCategories = someProductCategories;
})();

app.use(async (req, res, next) => {
	if (req.query.lng) {
		const websiteSettings = await getWebsiteSettings(req.query.lng);
		const someProductCategories = await getSomeProductCategories(req.query.lng);

		app.set("websiteSettings", websiteSettings);
		app.locals.someProductCategories = someProductCategories;
	}

	res.locals.PageProps = {
		titlePrefix: app.locals.settings.websiteSettings.meta_title,
		title: "",
		metaDescription: "",
		metaKeywords: "",
	};

	next();
});

app.use("/", indexRouter);

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

async function getWebsiteSettings(language) {
	const pageID = language === "tr" ? 276 : 407;

	try {
		const request = await axiosInstance.get(`/pages/${pageID}?_fields=acf&acf_format=standard`);

		return request.data.acf;
	} catch (error) {
		console.error(error);
	}
}

async function getSomeProductCategories(language) {
	try {
		const request = await axiosInstance.get(
			`/product_category?_fields=slug,title,acf,lang&per_page=4&acf_format=standard&lang=${language}`,
		);

		return request.data;
	} catch (error) {
		console.error(error);
	}
}

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
