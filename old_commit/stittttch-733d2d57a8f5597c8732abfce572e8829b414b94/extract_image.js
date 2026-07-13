const fs = require('fs');
const path = require('path');

const transcriptPath = "C:\\Users\\esraa\\.gemini\\antigravity-ide\\brain\\89bcf345-26d2-4ccc-93e1-f2344df35d55\\.system_generated\\logs\\transcript.jsonl";
const outputPath = "c:\\Users\\esraa\\Downloads\\stittttch-repo-clone\\stitch-main\\public\\gallery-card.jpg";

const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('data:image/jpeg;base64,')) {
    const match = lines[i].match(/data:image\/jpeg;base64,([a-zA-Z0-9+/=]+)/);
    if (match && match[1]) {
      const buffer = Buffer.from(match[1], 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log('Successfully extracted and saved image to', outputPath);
      process.exit(0);
    }
  }
}
console.log('Image not found in transcript.');
