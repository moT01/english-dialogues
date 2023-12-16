// this script removes the unneeded props from original-json-files
// trims the whitespace from strings,
// fixes the decimals to two places,
// and renames some of the keys to match what a # --scene-- needs

const fs = require("fs");
const path = require("path");

const inputFolder = "./original-json-files";
const outputFolder = "./slim-json-files";

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(inputFolder, file);

    // Read the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);

        // Extract the required data
        const modifiedData = {
          text: jsonData.text.trim(),
          segments: jsonData.segments.map((segment) => ({
            text: segment.text.trim(),
            startTime: parseFloat(segment.start.toFixed(2)),
            finishTime: parseFloat(segment.end.toFixed(2)),
            words: segment.words.map(word => ({
              startTime: word.start,
              finishTime: word.end,
              word: word.word.trim(),
            })),
          })),
        };

        // Write the modified data to a new file
        const outputFilePath = path.join(outputFolder, file);
        fs.writeFile(
          outputFilePath,
          JSON.stringify(modifiedData, null, 2),
          (err) => {
            if (err) {
              console.error(`Error writing file ${outputFilePath}:`, err);
            } else {
              console.log(`File ${outputFilePath} processed successfully.`);
            }
          }
        );
      } catch (jsonError) {
        console.error(`Error parsing JSON in file ${file}:`, jsonError);
      }
    });
  });
});
