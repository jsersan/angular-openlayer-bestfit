#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script para extraer TODOS los centros CPEIPS del archivo paste.txt
Genera centros-privados-euskadi.json listo para Angular/OpenLayers.
No usa pandas, solo librería estándar.
"""

import json

ARCHIVO_ENTRADA = "paste.txt"
ARCHIVO_SALIDA = "centros-privados-euskadi.json"

CAMPOS = [
    "CCEN", "NOM", "NOME", "DGENRC", "DGENRE", "GENR", "MUNI",
    "DMUNIC", "DMUNIE", "DTERRC", "DTERRE", "DEPE", "DTITUC",
    "DTITUE", "DOMI", "CPOS", "TEL1", "TFAX", "EMAIL", "PAGINA",
    "COORX", "COORY"
]

def parsear_linea(linea):
    partes = linea.rstrip("\n").split("\t")
    # Asegurar longitud mínima
    if len(partes) < 22:
        partes = partes + [""] * (22 - len(partes))
    d = {}
    d["CCEN"] = partes[0].strip()
    d["NOM"] = partes[1].strip()
    d["NOME"] = partes[2].strip()
    d["DGENRC"] = partes[3].strip()
    d["DGENRE"] = partes[4].strip()
    d["GENR"] = partes[5].strip()
    d["MUNI"] = partes[6].strip()
    d["DMUNIC"] = partes[7].strip()
    d["DMUNIE"] = partes[8].strip()
    d["DTERRC"] = partes[9].strip()
    d["DTERRE"] = partes[10].strip()
    d["DEPE"] = partes[11].strip()
    d["DTITUC"] = partes[12].strip()
    d["DTITUE"] = partes[13].strip()
    d["DOMI"] = partes[14].strip()
    d["CPOS"] = partes[15].strip()
    d["TEL1"] = partes[16].strip()
    d["TFAX"] = partes[17].strip()
    d["EMAIL"] = partes[18].strip()
    d["PAGINA"] = partes[19].strip()
    # Coordenadas originales en columnas 20 y 21
    def to_float(v):
        try:
            return float(v.replace(",", "."))
        except:
            return None
    d["COORX"] = to_float(partes[20].strip()) if len(partes) > 20 else None
    d["COORY"] = to_float(partes[21].strip()) if len(partes) > 21 else None
    return d

def main():
    centros = []
    with open(ARCHIVO_ENTRADA, "r", encoding="utf-8") as f:
        lineas = f.readlines()

    # Primera línea es cabecera
    for linea in lineas[1:]:
        if not linea.strip():
            continue
        datos = parsear_linea(linea)
        # Filtrar solo CPEIPS
        if datos.get("DGENRC") == "CPEIPS":
            centros.append(datos)

    with open(ARCHIVO_SALIDA, "w", encoding="utf-8") as f:
        json.dump(centros, f, ensure_ascii=False, indent=2)

    print("JSON generado:", ARCHIVO_SALIDA)
    print("Centros CPEIPS:", len(centros))

if __name__ == "__main__":
    main()
