const axiosInstance = require("../lib/axios");

class AppService {
	constructor(language) {
		this.siteLanguage = language;
		this.pageIDs = {
			SiteConfigurationSettings: this.siteLanguage === "tr" ? 276 : 407,
			HomeSettings: this.siteLanguage === "tr" ? 194 : 429,
		};
	}

	async findConfigurationSettings() {
		try {
			const request = await axiosInstance.get(
				`/pages/${this.pageIDs.SiteConfigurationSettings}?_fields=acf&acf_format=standard`,
			);

			return request.data.acf;
		} catch (error) {
			console.log(error);
		}
	}

	async findHomePageSettings() {
		try {
			const request = await axiosInstance.get(
				`/pages/${this.pageIDs.HomeSettings}?_fields=acf&acf_format=standard`,
			);

			return request.data.acf;
		} catch (error) {
			console.log(error);
		}
	}

	async findSomeProductCategories() {
		try {
			const request = await axiosInstance.get(
				`/product_category?_fields=id,slug,name,description,count,lang,translations,acf&acf_format=standard&per_page=4&lang=${this.siteLanguage}`,
			);

			return request.data;
		} catch (error) {
			console.error(error);
		}
	}

	async findSectoralNozzles() {
		try {
			const request = await axiosInstance.get(
				`/sectoral_nozzle?_fields=id,slug,title,acf,lang&acf_format=standard&lang=${this.siteLanguage}`,
			);

			return request.data;
		} catch (error) {
			console.error(error);
		}
	}

	async findAllProductCategories() {
		try {
			const request = await axiosInstance.get(
				`/product_category?_fields=id,slug,name,description,count,lang,translations,acf&acf_format=standard&per_page=100&lang=${this.siteLanguage}`,
			);

			return request.data;
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = AppService;
