import { Request, Response, NextFunction } from "express";
import AppService from "./app.service";

class AppController {
	static async home(req: Request, res: Response, next: NextFunction) {
		const appService = new AppService(res.locals.language);

		return res.render("pages/Index/Index.page.pug", {
			homeSettings: await appService.findHomePageSettings(),
			sectoralNozzles: await appService.findSectoralNozzles(),
		});
	}

	static async findAllProducts(req: Request, res: Response, next: NextFunction) {
		const appService = new AppService(res.locals.language);

		if (req.params.link === "urunler") {
			if (res.locals.language !== "tr") return res.redirect("/products");

			return res.render("pages/ProductCategory/ProductCategory.page.pug", {
				productCategories: await appService.findAllProductCategories(),
			});
		} else if (req.params.link === "products") {
			if (res.locals.language !== "en") return res.redirect("/urunler");

			return res.render("pages/ProductCategory/ProductCategory.page.pug", {
				productCategories: await appService.findAllProductCategories(),
			});
		} else if (req.params.link.includes("urunler")) {
		}
	}
}

export default AppController;
