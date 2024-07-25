const axiosInstance = require("../lib/axios");

async function getHomeSettings(language) {
	const pageID = language === "tr" ? 194 : 429;

	try {
		const request = await axiosInstance.get(`/pages/${pageID}?_fields=acf&acf_format=standard`);

		return request.data.acf;
	} catch (error) {
		console.error(error);
	}
}

class IndexController {
	static async list(req, res, next) {
		return res.render("pages/Index/Index.page.pug", {
			title: "Express",
			homeSettings: await getHomeSettings(res.locals.language),
		});
	}
}

module.exports = IndexController;
