#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Función para convertir a Title Case
function toTitleCase(str) {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(/([/-\s])/) // Separa por espacios, guiones y barras
    .map(word => {
      // Si es un separador o está vacío, no lo modificamos
      if (word === ' ' || word === '-' || word === '/' || word.length === 0) {
        return word;
      }
      // Convertimos la primera letra a mayúscula
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

// Función para procesar el archivo
function convertFile(inputFile, outputFile) {
  console.log('Leyendo archivo:', inputFile);
  
  // Leer el archivo
  const content = fs.readFileSync(inputFile, 'utf8');
  
  // Extraer el array de institutos usando una expresión regular más robusta
  const match = content.match(/export const institutos\s*=\s*(\[[\s\S]*\])/);
  
  if (!match) {
    console.error('No se pudo encontrar el array de institutos en el archivo');
    process.exit(1);
  }
  
  // Parsear el JSON
  let institutos;
  try {
    institutos = JSON.parse(match[1]);
  } catch (e) {
    console.error('Error al parsear el JSON:', e.message);
    process.exit(1);
  }
  
  console.log(`Procesando ${institutos.length} institutos...`);
  
  // Convertir DMUNIC y DMUNIE
  const institutosConvertidos = institutos.map((instituto, index) => {
    if (index % 50 === 0) {
      console.log(`Procesado ${index}/${institutos.length}...`);
    }
    
    return {
      ...instituto,
      DMUNIC: toTitleCase(instituto.DMUNIC),
      DMUNIE: toTitleCase(instituto.DMUNIE)
    };
  });
  
  // Generar el contenido del nuevo archivo
  const newContent = `export const institutos=${JSON.stringify(institutosConvertidos, null, 2)}\n`;
  
  // Escribir el archivo
  fs.writeFileSync(outputFile, newContent, 'utf8');
  
  console.log('✅ Conversión completada!');
  console.log('Archivo guardado en:', outputFile);
  console.log(`Total de institutos procesados: ${institutosConvertidos.length}`);
}

// Obtener argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Uso: node convert.js <archivo_entrada> [archivo_salida]');
  console.log('');
  console.log('Ejemplos:');
  console.log('  node convert.js institutos_modificado.ts');
  console.log('  node convert.js institutos_modificado.ts institutos_nuevo.ts');
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1] || inputFile.replace('.ts', '_converted.ts');

// Verificar que el archivo de entrada existe
if (!fs.existsSync(inputFile)) {
  console.error(`Error: El archivo ${inputFile} no existe`);
  process.exit(1);
}

// Ejecutar la conversión
convertFile(inputFile, outputFile);