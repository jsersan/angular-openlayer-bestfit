# limpiar_blancos.py
input_file = "institutos_sorted.ts"
output_file = "institutos_sorted_sin_blancos.ts"

with open(input_file, "r", encoding="utf-8") as f:
    lineas = f.readlines()

lineas_sin_blancos = [l for l in lineas if l.strip() != ""]

with open(output_file, "w", encoding="utf-8") as f:
    f.writelines(lineas_sin_blancos)

print("Generado:", output_file)
