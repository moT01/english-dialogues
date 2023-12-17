// this script takes the slim-json-files and removes some properties we don't
// need, and adds some properties we need for the scenes

const fs = require("fs");
const path = require("path");

const inputFolder = "./slim-json-files";
const outputFolder = "./words-json-files";

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

        const outputData = {
            text: jsonData.text,
            words: []
        }

        jsonData.segments.forEach(segment => {
            segment.words.forEach(word => {
                outputData.words.push(word);
            })
        });

        // Write the modified data to a new file
        const outputFilePath = path.join(outputFolder, file);
        fs.writeFile(
          outputFilePath,
          JSON.stringify(outputData, null, 2),
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
