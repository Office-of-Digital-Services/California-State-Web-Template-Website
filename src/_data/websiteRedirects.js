const fs = require("fs");
const { parse } = require("csv-parse/sync");

module.exports = () => {
  const csvFilePath = `${__dirname}/websiteRedirects.csv`;

  // Read and parse CSV file at csvFilePath
  const fileData = fs.readFileSync(csvFilePath, "utf8");
  const iconDataCsv = parse(fileData, {
    columns: true,
    skip_empty_lines: true
  });

  const iconDataJson = [];

  // Build iconDataJson from parsed CSV data
  iconDataCsv.forEach(item => {
    iconDataJson.push({
      original_url: item.original_url,
      replacement_url: item.replacement_url
    });
  });

  return iconDataJson;
};
