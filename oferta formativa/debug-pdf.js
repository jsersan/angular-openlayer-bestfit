const fs = require('fs');

(async () => {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync('./pdfs/acag1_c.pdf');
  
  const data = await pdfParse(dataBuffer);
  
  // Guardar el texto completo para analizarlo
  fs.writeFileSync('texto-extraido.txt', data.text, 'utf-8');
  
  console.log('✓ Texto guardado en texto-extraido.txt');
  console.log('Primeros 1000 caracteres:');
  console.log(data.text.substring(0, 1000));
})();