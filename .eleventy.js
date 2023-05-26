//@ts-check
const markdownIt = require("markdown-it");
const defaultConfig = require("@11ty/eleventy/src/defaultConfig");

module.exports = function (
  /** @type {import("@11ty/eleventy").UserConfig} **/ userConfig
) {
  // Markdown configurarion
  const md = new markdownIt({
    html: true
  });

  // Copy `src/fonts/` to `_site/fonts`, `src/images/` to `_site/images`
  userConfig.addPassthroughCopy({
    "src/fonts": "fonts",
    "src/images": "images",
    "src/scss/custom": "css/custom"
  });

  // Copy all static files that should appear in the website root
  userConfig.addPassthroughCopy({ "src/root": "/" });

  // Markdown rendering onfigurarion
  userConfig.addPairedShortcode("markdown", content => {
    return md.render(content);
  });

  //Start with default config, easier to configure 11ty later
  const config = defaultConfig(userConfig);

  // allow nunjucks templating in .html files
  config.htmlTemplateEngine = "njk";
  config.markdownTemplateEngine = "njk";
  config.templateFormats = ["html", "njk", "11ty.js"];

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
