const fs = require('fs');
const { parse } = require('csv-parse/sync');

const iconCsvToJson = () => {

 const compareStrings = (a, b) => {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();
  return (a < b) ? -1 : (a > b) ? 1 : 0;
 }

 /* 
 Will contain array of icon objects.
 Example:
 {"name":"accessibility", "tags":"inclusive, equity, disability, disabled, access, accessible"}
 */
 const iconDataJson = [];

 /*
   Location of CSV file with Name and Tags columns.
   Example:
   Name,Tags
   accessibility,"inclusive, equity, disability, disabled, access, accessible"
 */
 const csvFilePath = `${__dirname}/iconSearchData.csv`;

 // Read and parse CSV file at csvFilePath
 const fileData = fs.readFileSync(csvFilePath, 'utf8');
 const iconDataCsv = parse(fileData, {
  columns: true,
  skip_empty_lines: true
 });

 // Build iconDataJson from parsed CSV data
 iconDataCsv.forEach(item => {
  iconDataJson.push({
   "name": item['Name'],
   "tags": item['Tags']
  })
 });

 // Sort JSON data alphabetically
 iconDataJson.sort((a, b) => compareStrings(a.name, b.name));

 return {
  "icons": iconDataJson
 }
}

module.exports = iconCsvToJson;
