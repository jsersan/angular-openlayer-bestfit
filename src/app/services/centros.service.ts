import { Injectable } from '@angular/core';


import { institutos } from '../../assets/data/institutos'; 
import { ciclos } from '../../assets/data/asignacion';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  getCentros() {
    // Usamos la variable 'institutos'
    return institutos;
  }

  getCiclos() {
    return ciclos;
  }

  // Métodos de filtrado reutilizables (opcional, ejemplo):
  getProvincias(): string[] {
    // Usamos 'institutos' en lugar de 'centros'
    return Array.from(new Set(institutos.map(c => c.DTERRC))).sort();
  }

  getTiposCentro(): string[] {
    return Array.from(new Set(institutos.map(c => c.DGENRC))).sort();
  }

  getMunicipios(provincia: string): string[] {
    if (!provincia) return [];
    return Array.from(new Set(institutos.filter(c => c.DTERRC === provincia).map(c => c.DMUNIC))).sort();
  }
}