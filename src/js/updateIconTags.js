const fs = require('fs');
const { parse } = require('csv-parse/sync');
const process = require('process');

const jsonOutput = [];

// Uses command line parameter for filepath
const csvFilePath = process.argv[2];

const compareStrings = (a, b) => {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

fs.readFile(csvFilePath, 'utf8', (err, fileData) => {
  const records = parse(fileData, {
    columns: true,
    skip_empty_lines: true
  });

  records.forEach(item => {
    jsonOutput.push({
      "name": item['Name'],
      "tags": item['Tags']
    })
  });

  jsonOutput.sort((a, b) => compareStrings(a.name, b.name));
  const resultObject = {"icons":jsonOutput}

  fs.writeFile('iconSearchData.json', JSON.stringify(resultObject), 'utf8', () => console.log('Complete'));
})