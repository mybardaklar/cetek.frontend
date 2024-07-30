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

async function getSectoralNozzles(language) {
	try {
		const request = await axiosInstance.get(
			`/sectoral_nozzle?_fields=id,slug,title,acf,lang&acf_format=standard&lang=${language}`,
		);

		return request.data;
	} catch (error) {
		console.error(error);
	}
}

async function getAllProductCategories(language) {
	try {
		const request = await axiosInstance.get(
			`/product_category?_fields=slug,title,acf,lang&acf_format=standard&lang=${language}&per_page=100`,
		);

		return request.data;
	} catch (error) {
		console.error(error);
	}
}

async function getProductCategoryBySlug(slug, language) {
	try {
		const request = await axiosInstance.get(
			`/product_category?_fields=slug,title,acf,lang&acf_format=standard&lang=${language}&slug=${slug}`,
		);

		return request.data[0];
	} catch (error) {
		console.error(error);
	}
}

class IndexController {
	static async list(req, res, next) {
		return res.render("pages/Index/Index.page.pug", {
			title: "Express",
			homeSettings: await getHomeSettings(res.locals.language),
			sectoralNozzles: await getSectoralNozzles(res.locals.language),
		});
	}

	static async getProducts(req, res, next) {
		if (req.params.link === "urunler") {
			if (res.locals.language !== "tr") return res.redirect("/products");

			return res.render("pages/ProductCategory/ProductCategory.page.pug", {
				title: "Express",
				homeSettings: await getHomeSettings(res.locals.language),
				sectoralNozzles: await getSectoralNozzles(res.locals.language),
				productCategories: await getAllProductCategories(res.locals.language),
			});
		} else if (req.params.link === "products") {
			if (res.locals.language !== "en") return res.redirect("/urunler");

			return res.render("pages/ProductCategory/ProductCategory.page.pug", {
				title: "Express",
				homeSettings: await getHomeSettings(res.locals.language),
				sectoralNozzles: await getSectoralNozzles(res.locals.language),
				productCategories: await getAllProductCategories(res.locals.language),
			});
		} else if (req.params.link.includes("urunler")) {
		}

		/* try {
			if (req.params.link.includes("urunler")) {
				console.log(req.params.link);
				const request = await axiosInstance(categoryRequestLink);
				// console.log(request);

				return res.render("pages/Products/Products.page.pug", {
					title: "Express",
					homeSettings: await getHomeSettings(res.locals.language),
					sectoralNozzles: await getSectoralNozzles(res.locals.language),
				});
			} else {
				return next(404);
			}
		} catch (error) {
			console.log(error);
			return next(404);
		} */
	}
}

module.exports = IndexController;
