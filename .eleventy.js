const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
 // Markdown onfigurarion
 const md = new markdownIt({
  html: true
 });

 // Copy `src/fonts/` to `_site/fonts`, `src/images/` to `_site/images`
 eleventyConfig.addPassthroughCopy({
  "src/fonts": "fonts",
  "src/images": "images",
  "src/scss/custom": "css/custom"
 });


 // site crawler
 eleventyConfig.addPassthroughCopy('robots.txt');

 // site icon
 eleventyConfig.addPassthroughCopy('favicon.ico');

 // sitemap
 eleventyConfig.addPassthroughCopy('sitemap.xml');

 // web.config
 eleventyConfig.addPassthroughCopy('web.config');

 // Markdown rendering onfigurarion
 eleventyConfig.addPairedShortcode("markdown", (content) => {
  return md.render(content);
 });

 return {
  dir: {
   // site content pages
   input: "pages",
   data: "../src/_data",
   // site structure pages (path is realtive to input directory)
   includes: "../src/_includes",
   layouts: "../src/_includes/layouts",
   // site final outpuut directory
   output: "_site",
  },
 };
};