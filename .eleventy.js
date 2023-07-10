//@ts-check
const defaultConfig = require("@11ty/eleventy/src/defaultConfig");
const CleanCSS = require("clean-css");

module.exports = function (
  /** @type {import("@11ty/eleventy").UserConfig} **/ eleventyConfig
) {
  // Copy `src/css/` to `_site/css`, `src/images/` to `_site/images`
  // Copy all static files that should appear in the website root
  // alternate CSS theme files are needed for color.html selector
  // Copy state tempate code files from NPM
  // fonts from state template need to be copied out since css is minified locally
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/css": "css",
    "src/root": "/",
    "node_modules/@cagovweb/state-template/dist": "state-template",
    "node_modules/@cagovweb/state-template/dist/fonts": "fonts"
  });

  eleventyConfig.addFilter(
    "cssmin",
    (/** @type {string} */ code) => new CleanCSS({}).minify(code).styles
  );

  //Start with default config, easier to configure 11ty later
  const config = defaultConfig(eleventyConfig);

  // allow nunjucks templating in .html files
  config.htmlTemplateEngine = "njk";
  config.markdownTemplateEngine = "njk";
  config.templateFormats = ["html", "njk", "11ty.js", "md"];

  config.dir = {
    // site content pages
    input: "pages",
    data: "../src/_data",
    // site structure pages (path is realtive to input directory)
    includes: "../src/_includes",
    layouts: "../src/_includes/layouts",
    // site final outpuut directory
    output: "_site"
  };

  return config;
};
