import re

with open('institutos.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer el contenido entre los corchetes del array
m = re.search(r'export const institutos\s*=\s*\[\s*(.*)\s*\];?', content, re.DOTALL)
if not m:
    print("No se encontró el array 'institutos'")
    exit(1)

array_body = m.group(1)

# Separar cada bloque de centro por '},'
raw_blocks = [b.strip() for b in array_body.split('},') if b.strip()]

institutos = []
for b in raw_blocks:
    ccen_m = re.search(r'CCEN:\s*(\d+)', b)
    if not ccen_m:
        continue
    ccen = int(ccen_m.group(1))
    # reconstruir el bloque como objeto TS
    block_ts = b
    if not block_ts.startswith('{'):
        block_ts = '{\n' + block_ts
    if not block_ts.rstrip().endswith('}'):
        block_ts = block_ts.rstrip() + '\n}'
    institutos.append({'CCEN': ccen, 'ts': block_ts})

# Ordenar por CCEN
institutos.sort(key=lambda x: x['CCEN'])

if not institutos:
    print("No se encontró ningún CCEN, revisa el formato de institutos.ts")
    exit(1)

sorted_body = ',\n\n'.join([i['ts'] for i in institutos])
ts_code = f'export const institutos = [\n\n{sorted_body}\n\n];\n'

with open('institutos_sorted.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"✅ Archivo ordenado guardado: institutos_sorted.ts ({len(institutos)} institutos)")
print(f"Primer CCEN: {institutos[0]['CCEN']}")
print(f"Último CCEN: {institutos[-1]['CCEN']}")
