const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');



interface Ciclo {
  grado: string;
  nombre: string;
  codigoCentro: string;
  nombreCentro: string;
  modeloLing: string;
}

interface Instituto {
  codigo: string;
  nombre: string;
  telefono?: string;
  modeloLing?: string;
}

const pdfDir = './pdfs';
const asignacionPath = './asignacion.ts';
const institutosPath = './institutos.ts';

async function extractTextFromPDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

function parseDatos(text: string): { ciclos: Ciclo[]; institutos: Instituto[] } {
  const ciclos: Ciclo[] = [];
  const institutosMap = new Map<string, Instituto>();

  // Expresión regular simplificada - adapta según formato real
  const regex = /Grado\s*([BMS])[\s\S]*?([\w\sÁÉÍÓÚÑ\-]+?)-[\s\S]*?(\d{6})\s+([\w\sÁÉÍÓÚÑ\-]+)[\s\S]*?([AD]{1,2})[\s\S]*?tfno\.\s*(\d{9})?/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const [, grado, nombreCicloRaw, codigoCentro, nombreCentroRaw, modeloLing, telefono] = match;

    const nombreCiclo = nombreCicloRaw.trim().toUpperCase();
    const nombreCentro = nombreCentroRaw.trim().toUpperCase();

    ciclos.push({
      grado,
      nombre: nombreCiclo,
      codigoCentro,
      nombreCentro,
      modeloLing,
    });

    if (!institutosMap.has(codigoCentro)) {
      institutosMap.set(codigoCentro, {
        codigo: codigoCentro,
        nombre: nombreCentro,
        telefono,
        modeloLing,
      });
    }
  }

  return { ciclos, institutos: Array.from(institutosMap.values()) };
}

function writeAsignacion(ciclos: Ciclo[]) {
  const content = `export const asignacion = [\n${ciclos
    .map(
      (c) =>
        `  { grado: '${c.grado}', nombre: '${c.nombre}', codigoCentro: '${c.codigoCentro}', nombreCentro: '${c.nombreCentro}', modeloLing: '${c.modeloLing}' }`
    )
    .join(',\n')}\n];\n`;
  fs.writeFileSync(asignacionPath, content, 'utf-8');
}

function writeInstitutos(institutos: Instituto[]) {
  const content = `export const institutos = [\n${institutos
    .map(
      (i) =>
        `  { codigo: '${i.codigo}', nombre: '${i.nombre}', telefono: '${i.telefono || ''}', modeloLing: '${i.modeloLing || ''}' }`
    )
    .join(',\n')}\n];\n`;
  fs.writeFileSync(institutosPath, content, 'utf-8');
}

async function main() {
  const files = fs.readdirSync(pdfDir).filter((f) => f.endsWith('.pdf'));

  let allCiclos: Ciclo[] = [];
  let allInstitutosMap = new Map<string, Instituto>();

  for (const file of files) {
    const filePath = path.join(pdfDir, file);
    const text = await extractTextFromPDF(filePath);
    const { ciclos, institutos } = parseDatos(text);

    allCiclos = allCiclos.concat(ciclos);

    institutos.forEach((inst) => {
      if (!allInstitutosMap.has(inst.codigo)) {
        allInstitutosMap.set(inst.codigo, inst);
      }
    });
  }

  writeAsignacion(allCiclos);
  writeInstitutos(Array.from(allInstitutosMap.values()));

  console.log('Archivos actualizados correctamente.');
}

main().catch(console.error);
