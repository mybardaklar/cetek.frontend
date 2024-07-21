/** @type {import('postcss-load-config').Config} */
module.exports = () => {
	return {
		plugins: [
			require("tailwindcss"),
			require("autoprefixer"),
			require("postcss-sort-media-queries"),
		],
	};
};
