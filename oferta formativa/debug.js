const fs = require('fs');

(async () => {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync('./pdfs/acag1_c.pdf');
  const data = await pdfParse(dataBuffer);
  
  const lines = data.text.split('\n');
  
  console.log('=== PRIMERAS 50 LÍNEAS ===\n');
  for (let i = 0; i < Math.min(50, lines.length); i++) {
    console.log(`${i}: [${lines[i]}]`);
  }
})();