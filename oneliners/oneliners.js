const fs = require("fs");
const {jsonData} = require('./json/1.1-5');

const initPositions = {
  Tom: { x: 50, y: 15, z: 1.2 },
  Maria: { x: 50, y: 0, z: 1.5 },
  Sophie: { x: 50, y: 0, z: 1.4 },
  Jake: { x: 50, y: 15, z: 1.2 },
  Brian: { x: 50, y: 15, z: 1.2 },
  Sarah: { x: 50, y: 0, z: 1.4 }
};

function generateMarkdown(object) {
  return `
# --scene--

\`\`\`json
{
  "setup": {
    "background": "company1-reception.png",
    "characters": [
      {
        "character": "${object.character}",
        "position": ${JSON.stringify(initPositions[object.character])},
        "opacity": 0
      }
    ],
    "audio": {
      "filename": "1.1-5.mp3",
      "startTime": 1,
      "startTimestamp": ${object.startTime},
      "finishTimestamp": ${object.finishTime}
    }
  },
  "commands": [
    {
      "character": "${object.character}",
      "opacity": 1,
      "startTime": 0
    },
    {
      "character": "${object.character}",
      "startTime": 1,
      "finishTime": ${ (object.finishTime - object.startTime + 1).toFixed(2) },
      "dialogue": {
        "text": "${object.dialogue.text}",
        "align": "center"
      }
    },
    {
      "character": "${object.character}",
      "opacity": 0,
      "startTime": ${ (object.finishTime - object.startTime + 1).toFixed(2) }
    }
  ]
}
\`\`\`
`;
}

for (let i = 0; i < jsonData.length; i++) {
  const object = jsonData[i];
  const markdownContent = generateMarkdown(object);
  const filename = `${i + 1}.md`; // Customize the filename as needed
  fs.writeFileSync(filename, markdownContent);
  console.log(`Markdown content for object ${i + 1} written to ${filename}`);
}
