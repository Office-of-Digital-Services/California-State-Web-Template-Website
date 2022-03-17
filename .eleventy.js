const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
	// Markdown onfigurarion
	const md = new markdownIt({
		html: true
	});

	// Copy `src/fonts/` to `_site/fonts`
	eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
	// Copy `src/images/` to `_site/images`
	eleventyConfig.addPassthroughCopy({ "src/images": "images" });

	// Markdown rendering onfigurarion
	eleventyConfig.addPairedShortcode("markdown", (content) => {
		return md.render(content);
	});

	return {
		dir: {
			// site content pages
			input: "pages",
			// site structure pages (path is realtive to input directory)
			includes: "../src/_includes",
			layouts: "../src/_includes/layouts",
			// site final outpuut directory
			output: "_site",
		},
	};
};
