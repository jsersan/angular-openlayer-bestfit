const fs = require('fs');
const path = require('path');

const pdfDir = './pdfs';
const asignacionPath = './asignacion.ts';
const institutosPath = './institutos.ts';

async function extractTextFromPDF(filePath) {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

function parseDatos(text) {
  const ciclos = [];
  const institutosMap = new Map();
  
  const lines = text.split('\n').map(l => l.trim());
  
  for (let i = 0; i < lines.length; i++) {
    // Buscar línea que dice exactamente "Grado"
    if (lines[i] === 'Grado' && i + 1 < lines.length) {
      const grado = lines[i - 1]; // El grado está ANTES de "Grado"
      
      if ((grado === 'B' || grado === 'M' || grado === 'S') && i + 1 < lines.length) {
        // Buscar nombre del ciclo (siguiente línea después de "Grado")
        let nombreCiclo = '';
        if (i + 1 < lines.length && lines[i + 1].includes('TÉCNICO')) {
          nombreCiclo = lines[i + 1].replace(/\s*-\s*$/, '').replace(/\s*\]\s*$/, '').trim();
        }
        
        if (!nombreCiclo) continue;
        
        // Buscar hacia adelante: centro, código, modelo, teléfono
        let nombreCentro = '';
        let codigoCentro = '';
        let modeloLing = '';
        let telefono = '';
        
        for (let j = i + 2; j < Math.min(i + 30, lines.length); j++) {
          const line = lines[j];
          
          // Buscar tipo de centro
          if (!nombreCentro && /CIFP|IES|CPES|CPIFP|CPEPS|CPEIPS|CPFPB|IMFPB/.test(line)) {
            nombreCentro = line
              .replace(/^\[/, '')
              .replace(/\]$/, '')
              .replace(/CIFP\s+/g, '')
              .replace(/IES\s+/g, '')
              .replace(/CPES\s+/g, '')
              .replace(/CPIFP\s+/g, '')
              .replace(/CPEPS\s+/g, '')
              .replace(/CPEIPS\s+/g, '')
              .replace(/CPFPB\s+/g, '')
              .replace(/IMFPB\s+/g, '')
              .trim();
            
            // Si la siguiente línea tiene LHII o similar, es parte del nombre
            if (j + 1 < lines.length && /LHII?|BHIP|LHIPI|OLHIP|OLHUI|HLBHIP|LBHIP/.test(lines[j + 1])) {
              const nextPart = lines[j + 1]
                .replace(/^\[/, '')
                .replace(/\]$/, '')
                .replace(/\s*LHII?\s*$/g, '')
                .replace(/\s*BHIP\s*$/g, '')
                .replace(/\s*LHIPI\s*$/g, '')
                .replace(/\s*OLHIP\s*$/g, '')
                .replace(/\s*OLHUI\s*$/g, '')
                .replace(/\s*HLBHIP\s*$/g, '')
                .replace(/\s*LBHIP\s*$/g, '')
                .trim();
              if (nextPart) {
                nombreCentro = nextPart;
              }
            }
          }
          
          // Buscar código (6 dígitos entre corchetes)
          if (!codigoCentro) {
            const codigoMatch = line.match(/\[?(\d{6})\]?/);
            if (codigoMatch) {
              codigoCentro = codigoMatch[1];
            }
          }
          
          // Buscar modelo lingüístico
          if (!modeloLing && /^\[?([AD]{1,3})\]?$/.test(line)) {
            const modeloMatch = line.match(/^\[?([AD]{1,3})\]?$/);
            if (modeloMatch) {
              modeloLing = modeloMatch[1];
            }
          }
          
          // Buscar teléfono
          if (!telefono) {
            const telMatch = line.match(/\[?(\d{9})\]?/);
            if (telMatch && telMatch[1] !== codigoCentro) {
              telefono = telMatch[1];
            }
          }
          
          // Si tenemos todo, salir
          if (nombreCentro && codigoCentro && modeloLing && telefono) {
            break;
          }
        }
        
        // Guardar si tenemos datos mínimos
        if (nombreCiclo && codigoCentro && nombreCentro && modeloLing) {
          ciclos.push({
            grado,
            nombre: nombreCiclo.toUpperCase(),
            codigoCentro,
            nombreCentro: nombreCentro.toUpperCase(),
            modeloLing
          });
          
          if (!institutosMap.has(codigoCentro)) {
            institutosMap.set(codigoCentro, {
              codigo: codigoCentro,
              nombre: nombreCentro.toUpperCase(),
              telefono: telefono || '',
              modeloLing
            });
          }
        }
      }
    }
  }
  
  return { ciclos, institutos: Array.from(institutosMap.values()) };
}

function writeAsignacion(ciclos) {
  const content = `// Archivo generado automáticamente desde PDFs
export const asignacion = [
${ciclos.map(c => 
  `  { grado: '${c.grado}', nombre: '${c.nombre.replace(/'/g, "\\'")}', codigoCentro: '${c.codigoCentro}', nombreCentro: '${c.nombreCentro.replace(/'/g, "\\'")}', modeloLing: '${c.modeloLing}' }`
).join(',\n')}
];
`;
  fs.writeFileSync(asignacionPath, content, 'utf-8');
}

function writeInstitutos(institutos) {
  const content = `// Archivo generado automáticamente desde PDFs
export const institutos = [
${institutos.map(i => 
  `  { codigo: '${i.codigo}', nombre: '${i.nombre.replace(/'/g, "\\'")}', telefono: '${i.telefono}', modeloLing: '${i.modeloLing}' }`
).join(',\n')}
];
`;
  fs.writeFileSync(institutosPath, content, 'utf-8');
}

async function main() {
  console.log('🔍 Buscando archivos PDF...');
  
  if (!fs.existsSync(pdfDir)) {
    console.error(`❌ Error: La carpeta ${pdfDir} no existe`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf'));
  
  if (files.length === 0) {
    console.error(`❌ Error: No se encontraron archivos PDF en ${pdfDir}`);
    process.exit(1);
  }
  
  console.log(`📁 Encontrados ${files.length} archivos PDF\n`);

  let allCiclos = [];
  let allInstitutosMap = new Map();

  for (const file of files) {
    console.log(`📄 Procesando: ${file}`);
    const filePath = path.join(pdfDir, file);
    
    try {
      const text = await extractTextFromPDF(filePath);
      const { ciclos, institutos } = parseDatos(text);

      console.log(`   ✓ Ciclos encontrados: ${ciclos.length}`);
      console.log(`   ✓ Institutos encontrados: ${institutos.length}`);

      allCiclos = allCiclos.concat(ciclos);

      institutos.forEach((inst) => {
        if (!allInstitutosMap.has(inst.codigo)) {
          allInstitutosMap.set(inst.codigo, inst);
        }
      });
    } catch (error) {
      console.error(`   ❌ Error procesando ${file}:`, error.message);
    }
    
    console.log('');
  }

  console.log('💾 Guardando resultados...');
  writeAsignacion(allCiclos);
  writeInstitutos(Array.from(allInstitutosMap.values()));

  console.log('\n✅ Proceso completado:');
  console.log(`   - Total ciclos: ${allCiclos.length}`);
  console.log(`   - Total institutos: ${allInstitutosMap.size}`);
  console.log(`   - Archivos actualizados: ${asignacionPath}, ${institutosPath}`);
}

main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});