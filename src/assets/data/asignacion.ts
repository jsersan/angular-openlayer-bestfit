export interface Asignacion {
  codcicl: number
  nom: string
  nomEuskera: string
  slugEuskera?: string // ⭐ NUEVO: slug para URL en euskera (sin sufijo de grado)
  abr: string
  familiaCodigo: string
  familia: string
  grado: 'Básico' | 'Medio' | 'Superior'
  modalidad: 'Presencial' | 'Dual' | 'Distancia'
  turno: 'Diurno' | 'Vespertino' | 'Nocturno' | 'Mixto'
  idiomas: ('ES' | 'EU' | 'EN')[]
  centros: number[]
  duracion?: number
}

export interface asignacionDetalle {
  grado: 'B' | 'M' | 'S'
  nombre: string
  codigoCentro: string
  nombreCentro: string
  modeloLing: string
}

// ⚠️ BLOQUE TEMPORAL SOLO PARA GENERAR familiaCodigo A PARTIR DE familia
// NO SE EJECUTA EN RUNTIME: úsalo una vez en Node para reescribir el fichero si quieres.
// Aquí solo sirve de documentación de cómo mapear nombres -> códigos.

const mapaFamiliaNombreACodigo: Record<string, string> = {
  'Actividades Físicas y Deportivas': 'AFD',
  'Administración y Gestión': 'ADG',
  Agraria: 'AGA',
  'Artes Gráficas': 'ARG',
  'Artes y Artesanías': 'AAN',
  'Comercio y Marketing': 'COM',
  'Edificación y Obra Civil': 'EOC',
  'Electricidad y Electrónica': 'ELE',
  'Energía y Agua': 'ENA',
  'Fabricación Mecánica': 'FME',
  'Hostelería y Turismo': 'HOT',
  'Imagen Personal': 'IMP',
  'Imagen y Sonido': 'IMS',
  'Industrias Alimentarias': 'INA',
  'Informática y Comunicaciones': 'IFC',
  'Instalación y Mantenimiento': 'IMA',
  'Madera, Mueble y Corcho': 'MMC',
  'Marítimo Pesquera': 'MAP',
  Química: 'QUI',
  Sanidad: 'SAN',
  'Seguridad y Medio Ambiente': 'SEA',
  'Servicios Socioculturales y a la Comunidad': 'SSC',
  'Textil, Confección y Piel': 'TCP',
  'Transporte y Mantenimiento de Vehículos': 'TMV'
}

// Cuando vayas creando/actualizando ciclos, pon siempre:
// familiaCodigo: mapaFamiliaNombreACodigo['Informática y Comunicaciones'],
// familia: 'Informática y Comunicaciones',

export const ciclos: Asignacion[] = [
  // INFORMÁTICA Y COMUNICACIONES - GRADO MEDIO (ACTUALIZADO)
  {
    codcicl: 230004,
    nom: 'Sistemas Microinformáticos y Redes',
    nomEuskera: 'Sistema Mikroinformatikoak eta Sareak',
    slugEuskera: 'sistema-mikroinformatikoak-eta-sareak', // ✅ YA CORRECTO
    abr: 'SMR',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // ARABA - Departamento Educación
      10349, // ✅ Samaniego-Laguardia
      10201, // ✅ Laudioalde
      10137, // ✅ Ciudad Jardín

      // BIZKAIA - Departamento Educación
      15628, // ✅ Zornotza
      14945, // ✅ Construcción Bizkaia
      15112, // ✅ Elorrieta-Erreka Mari
      15763, // ✅ Txurdinaga
      14422, // ✅ San Jorge

      // GIPUZKOA - Departamento Educación
      13556, // ✅ Izarraitz
      13020, // ✅ Miguel Altuna
      12982, // ✅ Xabier Zubiri-Manteo
      12053, // ✅ Uni Eibar-Ermua
      13534, // ✅ Innovación Social Hernani
      12108, // ✅ Plaiaundi
      12132, // ✅ Mutriku
      13023, // ✅ Tolosaldea

      // PRIVADOS - ARABA
      10248, // ✅ Egibide

      // PRIVADOS - BIZKAIA
      14615, // ✅ Almi
      14620, // ✅ Arangoya (solo 1º)
      14669, // ✅ Mikeldi
      14696, // ✅ San Luis
      15305, // ✅ Harrobia
      14837, // ✅ Txorierri (solo 1º)
      14747, // ✅ Ibaiondo
      14779, // ✅ Somorrostro

      // PRIVADOS - GIPUZKOA
      12345, // ✅ San Frantzisko Xabier
      12497 // ✅ Cebanc
    ],
    duracion: 2000
  },

  // INFORMÁTICA Y COMUNICACIONES - GRADO SUPERIOR
  {
    codcicl: 230002,
    nom: 'Administración de Sistemas Informáticos en Red',
    nomEuskera: 'Sareko Informatika Sistemen Administrazioa',
    slugEuskera: 'sareko-informatika-sistemen-administrazioa',
    abr: 'ASIR',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // ARABA - Departamento Educación
      10137, // ✅ Ciudad Jardín
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia)

      // BIZKAIA - Departamento Educación
      15112, // ✅ Elorrieta-Erreka Mari
      15763, // ✅ Txurdinaga

      // GIPUZKOA - Departamento Educación
      12982, // ✅ Xabier Zubiri-Manteo
      12053, // ✅ Uni Eibar-Ermua
      12468, // ✅ Don Bosco
      12108, // ✅ Plaiaundi
      13023, // ✅ Tolosaldea

      // PRIVADOS - ARABA
      10248, // ✅ Egibide

      // PRIVADOS - BIZKAIA
      14615, // ✅ Almi
      14669, // ✅ Mikeldi
      14696, // ✅ San Luis
      14718, // ✅ Zabalburu
      14837, // ✅ Txorierri
      14728, // ✅ Maristak Durango
      14747, // ✅ Ibaiondo (solo 1º)
      14779, // ✅ Somorrostro

      // PRIVADOS - GIPUZKOA
      12456, // ✅ Mondragon Goi Esk.
      12485, // ✅ Seim (vespertino)
      12479, // ✅ Centro de Estudios A.E.G.
      12490 // ✅ Nazaret
    ],
    duracion: 2000
  },
  {
    codcicl: 230001,
    nom: 'Desarrollo de Aplicaciones Multiplataforma',
    nomEuskera: 'Plataforma Anitzetako Aplikazioen Garapena',
    slugEuskera: 'plataforma-anitzeko-aplikazioak-garatzeko', // ✅ YA CORRECTO
    abr: 'DAM',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // ARABA - Departamento Educación
      10137, // ✅ Ciudad Jardín (solo 2º)
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia)

      // BIZKAIA - Departamento Educación
      15628, // ✅ Zornotza (solo 2º)
      15112, // ✅ Elorrieta-Erreka Mari
      15763, // ✅ Txurdinaga (solo 2º)
      15630, // ✅ Tartanga
      14422, // ✅ San Jorge

      // GIPUZKOA - Departamento Educación
      13556, // ✅ Izarraitz
      12982, // ✅ Xabier Zubiri-Manteo (solo 2º)
      12053, // ✅ Uni Eibar-Ermua
      12108, // ✅ Plaiaundi
      13023, // ✅ Tolosaldea
      13022, // ✅ Usurbil (solo 2º)

      // PRIVADOS - ARABA
      10248, // ✅ Egibide (incluye 3º)

      // PRIVADOS - BIZKAIA
      14615, // ✅ Almi
      14620, // ✅ Arangoya
      14631, // ✅ Ceinmark (vespertino)
      14669, // ✅ Mikeldi
      14779, // ✅ Somorrostro
      14786, // ✅ Ntra. Sra. de la Antigua

      // PRIVADOS - GIPUZKOA
      12485, // ✅ Seim
      12497, // ✅ Cebanc
      12581 // ✅ Goierri
    ],
    duracion: 2000
  },
  {
    codcicl: 230003,
    nom: 'Desarrollo de Aplicaciones Web',
    nomEuskera: 'Web Aplikazioen Garapena',
    slugEuskera: 'web-aplikazioen-garapeneko',
    abr: 'DAW',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // ARABA - Departamento Educación
      10137, // ✅ Ciudad Jardín
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia)

      // BIZKAIA - Departamento Educación
      15628, // ✅ Zornotza
      14945, // ✅ Construcción Bizkaia (solo 1º)
      14451, // ✅ Balmaseda
      15112, // ✅ Elorrieta-Erreka Mari (vespertino)
      15763, // ✅ Txurdinaga
      14422, // ✅ San Jorge

      // GIPUZKOA - Departamento Educación
      13020, // ✅ Miguel Altuna
      12982, // ✅ Xabier Zubiri-Manteo
      12053, // ✅ Uni Eibar-Ermua (solo 2º)
      12108, // ✅ Plaiaundi
      13022, // ✅ Usurbil (solo 1º)

      // PRIVADOS - ARABA
      10248, // ✅ Egibide

      // PRIVADOS - BIZKAIA
      14620, // ✅ Arangoya
      14631, // ✅ Ceinmark
      14696, // ✅ San Luis
      14718, // ✅ Zabalburu
      14747, // ✅ Ibaiondo
      14775, // ✅ Lea-Artibai
      14779, // ✅ Somorrostro

      // PRIVADOS - GIPUZKOA
      12479, // ✅ Centro de Estudios A.E.G.
      12490, // ✅ Nazaret
      12581 // ✅ Goierri (solo 2º)
    ],
    duracion: 2000
  },

  // COMERCIO Y MARKETING - GRADO MEDIO
  {
    codcicl: 10005,
    nom: 'Actividades Comerciales',
    nomEuskera: 'Merkataritza Jarduerak',
    slugEuskera: 'merkataritza-jardueretako',
    abr: 'AC',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10137, // ✅ Ciudad Jardín
      15628, // ✅ CIFP Zornotza (AÑADIDO según acco2_c.pdf)
      15112, // ✅ Elorrieta-Erreka Mari (AÑADIDO según acco2_c.pdf)
      15763, // ✅ Txurdinaga (AÑADIDO según acco2_c.pdf)
      12982, // ✅ Xabier Zubiri-Manteo
      12053, // ✅ Uni Eibar-Ermua
      13023, // ✅ Tolosaldea (AÑADIDO según acco2_c.pdf)
      // Privados
      14696, // ✅ San Luis (AÑADIDO según acco2_c.pdf)
      15069, // ✅ Fundación Peñascal (AÑADIDO según acco2_c.pdf)
      12544 // ✅ Elizaran
    ],
    duracion: 2000
  },

  // COMERCIO Y MARKETING - GRADO SUPERIOR
  {
    codcicl: 10006,
    nom: 'Comercio Internacional',
    nomEuskera: 'Nazioarteko Merkataritza',
    slugEuskera: 'nazioarteko-merkataritzako',
    abr: 'CI',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [
      // Departamento Educación
      10137, // ✅ Ciudad Jardín
      15112, // ✅ Elorrieta-Erreka Mari (AÑADIDO según coin3_c.pdf)
      14422, // ✅ San Jorge (AÑADIDO según coin3_c.pdf)
      12053, // ✅ Uni Eibar-Ermua
      12108, // ✅ Plaiaundi
      // Privados
      14669, // ✅ Mikeldi
      12497 // ✅ Cebanc
    ],
    duracion: 2000
  },
  {
    codcicl: 10007,
    nom: 'Gestión de Ventas y Espacios Comerciales',
    nomEuskera: 'Salmenten eta Espazio Komertzialen Kudeaketa',
    slugEuskera: 'salmenten-eta-espazio-komertzialen-kudeaketako',
    abr: 'GVEC',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10137, // ✅ Ciudad Jardín
      15763, // ✅ Txurdinaga (AÑADIDO según gvec3_c.pdf)
      12982, // ✅ Xabier Zubiri-Manteo
      // Privados
      14669, // ✅ Mikeldi
      14837, // ✅ Txorierri (AÑADIDO según gvec3_c.pdf)
      12462 // ✅ Oñati Gestio Heziketa
    ],
    duracion: 2000
  },
  {
    codcicl: 10008,
    nom: 'Marketing y Publicidad',
    nomEuskera: 'Marketina eta Publizitatea',
    slugEuskera: 'marketina-eta-publizitatearen',
    abr: 'MP',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10137, // ✅ Ciudad Jardín
      15763, // ✅ Txurdinaga (AÑADIDO según mapu3_c.pdf)
      12982, // ✅ Xabier Zubiri-Manteo
      // Privados
      10248, // ✅ Egibide
      14696, // ✅ San Luis (AÑADIDO según mapu3_c.pdf)
      15305, // ✅ Harrobia (AÑADIDO según mapu3_c.pdf)
      14779, // ✅ Somorrostro (CORREGIDO CPIFP según mapu3_c.pdf)
      14810, // ✅ Calasanz (AÑADIDO según mapu3_c.pdf)
      12497, // ✅ Cebanc (AÑADIDO según mapu3_c.pdf)
      12479, // ✅ Centro de Estudios A.E.G.
      12490 // ✅ Nazaret
    ],
    duracion: 2000
  },
  {
    codcicl: 10009,
    nom: 'Transporte y Logística',
    nomEuskera: 'Garraioa eta Logistika',
    slugEuskera: 'garraioa-eta-logistikako',
    abr: 'TL',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10137, // ✅ Ciudad Jardín
      15628, // ✅ Zornotza (AÑADIDO según trlo3_c.pdf)
      15666, // ✅ Repélega (AÑADIDO según trlo3_c.pdf)
      12053, // ✅ Uni Eibar-Ermua
      12108, // ✅ Plaiaundi
      // Privados
      14620, // ✅ Arangoya (AÑADIDO según trlo3_c.pdf)
      14718 // ✅ Zabalburu (CORREGIDO CPIFP según trlo3_c.pdf)
    ],
    duracion: 2000
  },
  // NUEVO CICLO MEDIO: Comercialización de Productos Alimentarios
  {
    codcicl: 100010, // ⚠️ Asignar código correcto
    nom: 'Comercialización de Productos Alimentarios',
    nomEuskera: 'Elikagaien Merkaturatzea',
    slugEuskera: 'elikagaien-merkaturatzea',
    abr: 'CPA',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      12229 // ✅ Politécnico Easo (según copa2_c.pdf)
    ],
    duracion: 2000
  },

  // ADMINISTRACIÓN Y GESTIÓN - GRADO MEDIO
  {
    codcicl: 10012,
    nom: 'Gestión Administrativa',
    nomEuskera: 'Administrazio Kudeaketa',
    slugEuskera: 'administrazio-kudeaketako',
    abr: 'GA',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10349, // Samaniego-Laguardia - AD
      10201, // Laudioalde - ABD
      10137, // Ciudad Jardín (Vitoria) - AD
      // Públicos Departamento Educación - BIZKAIA
      14069, // Barakaldo - AD
      14088, // Bidebieta (Basauri) - D
      15763, // Txurdinaga (Bilbao) - A (vespertino)
      15630, // Tartanga (Erandio) - AD
      14279, // Andra Mari (Galdakao) - D
      14950, // Iurreta - AD
      15080, // Carranza (Karrantza) - D (solo 1º)
      15624, // Lekeitio - D
      15108, // Mungia - ABD
      15666, // Repélega (Portugalete) - ABD
      // Públicos Departamento Educación - GIPUZKOA
      13556, // Izarraitz (Azkoitia) - D + I
      13020, // Miguel Altuna (Bergara) - D
      12982, // Xabier Zubiri-Manteo (Donostia) - AD
      12053, // Uni Eibar-Ermua - D
      13432, // Meka (Elgoibar) - D
      12108, // Plaiaundi (Irun) - AD
      13022, // Usurbil - ABD
      // Privados - ARABA
      10248, // Egibide (Vitoria) - AD
      // Privados - BIZKAIA
      14615, // Almi (Bilbao) - B
      14696, // San Luis (Bilbao) - A
      14635, // Sopeña-Bilbao - B
      14704, // Sta. María de Artagan (Bilbao) - A
      14728, // Maristak Durango - B
      14747, // Ibaiondo (Getxo) - A
      14779, // Somorrostro (Muskiz) - A
      14810, // Calasanz (Santurtzi) - A
      // Privados - GIPUZKOA
      12544, // Elizaran (Donostia) - A
      12497 // Cebanc (Donostia) - A
    ],
    duracion: 2000
  },

  // COMERCIO Y MARKETING - FP BÁSICA

  // ============================================
  // CICLOS DE FORMACIÓN PROFESIONAL BÁSICA
  // ============================================

  // SERVICIOS COMERCIALES - FP BÁSICA
  {
    codcicl: 30000002,
    nom: 'Servicios Comerciales',
    nomEuskera: 'Merkataritza Zerbitzuak',
    slugEuskera: 'merkataritza-zerbitzuetako',
    abr: 'SC-B',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos
      14890, // ✅ IMFPB Bituritxa-Barakaldo
      // Privados
      10214, // ✅ Bermar
      10248, // ✅ Egibide (AÑADIDO según seco1_c.pdf)
      14665, // ✅ María Inmaculada (AÑADIDO según seco1_c.pdf)
      15224, // ✅ E.P. Pastelería (AÑADIDO según seco1_c.pdf)
      15069, // ✅ Fundación Peñascal (AÑADIDO según seco1_c.pdf)
      14664, // ✅ Salesianos Deusto (AÑADIDO según seco1_c.pdf)
      14824, // ✅ San Viator (AÑADIDO según seco1_c.pdf)
      12544, // ✅ Elizaran
      13542, // ✅ Gureak
      12572, // ✅ Salesianos Urnieta (AÑADIDO según seco1_c.pdf)
      12593 // ✅ Urola Garaiko (AÑADIDO según seco1_c.pdf)
    ],
    duracion: 2000
  },

  // SERVICIOS ADMINISTRATIVOS - FP BÁSICA
  {
    codcicl: 10000001,
    nom: 'Servicios Administrativos',
    nomEuskera: 'Administrazio Zerbitzuak',
    slugEuskera: 'administrazio-zerbitzuetako',
    abr: 'SA-B',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación
      13432, // Meka (Elgoibar) - D
      13015, // Oñati - D (solo 1º,2º curso)
      // Privados
      14615, // Almi (Bilbao) - A
      14696, // San Luis (Bilbao) - A
      15226, // Margotu (Bilbao) - A (FPB específico)
      12544, // Elizaran (Donostia) - A
      13542, // Gureak (Donostia) - A (FPB específico) - incluye itinerario 3 años NEE
      12497 // Cebanc (Donostia) - A
    ],
    duracion: 2000
  },
  {
    codcicl: 23000002, // Código para Informática de Oficina FP Básica
    nom: 'Informática de Oficina',
    nomEuskera: 'Bulegoko Informatika',
    slugEuskera: 'bulegoko-informatikako',
    abr: 'IO-B',
    familiaCodigo: 'ADG',
    familia: 'Informática y Comunicaciones',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // DEPARTAMENTO EDUCACIÓN
      13556, // ✅ Izarraitz

      // OTROS PÚBLICOS (IMFPB)
      12677, // ✅ Eibar

      // PRIVADOS (CPFPB)
      10291, // ✅ Adsis Vitoria-Gasteiz
      14797, // ✅ Xabier Portugalete (solo 1º)
      13540 // ✅ Martutene
    ],
    duracion: 2000
  },

  // COCINA Y RESTAURACIÓN - FP BÁSICA
  {
    codcicl: 19000001,
    nom: 'Cocina y Restauración',
    nomEuskera: 'Sukaldaritza eta Jatetxea',
    slugEuskera: 'sukaldaritza-eta-gastronomiako', // ✅ YA CORRECTO
    abr: 'CR-B',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      12345,14890,14891,14960,15069,12491,12728, 14894,12677,13500,14340,14895,15794,15240,12581,14900,12680,14976,13536,12729,10256
    ],
    duracion: 2000
  },
    // COCINA Y RESTAURACIÓN - FP BÁSICA
    {
      codcicl: 19000002,
      nom: 'Actividades de Panadería y Pastelería',
      nomEuskera: 'Okintzako eta Pastelgintzako Jarduerak',
      slugEuskera: 'okintzako-eta-pastelgintzako-jarduerako', // ✅ YA CORRECTO
      abr: 'CR-B',
      familiaCodigo: 'HOT',
      familia: 'Hostelería y Turismo',
      grado: 'Básico',
      modalidad: 'Presencial',
      turno: 'Diurno',
      idiomas: ['ES', 'EU'],
      centros: [
        15069,15224,14901,15176,10248
      ],
      duracion: 2000
    },

  // ELECTRICIDAD Y ELECTRÓNICA - FP BÁSICA
  {
    codcicl: 16000001,
    nom: 'Electricidad y Electrónica',
    nomEuskera: 'Elektrizitatea eta Elektronika',
    slugEuskera: 'instalazio-elektriko-eta-automatikoen',
    abr: 'EE-B',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      12468, // ✅ Don Bosco (AÑADIDO según elel1_c.pdf)
      13534, // ✅ Innovación Social Hernani (ya estaba)
      // Otros Públicos
      14890, // ✅ Bituritxa-Barakaldo (ya estaba)
      14894, // ✅ Durango (AÑADIDO según elel1_c.pdf)
      // Privados
      10248, // ✅ Egibide (ya estaba)
      15226, // ✅ Margotu (AÑADIDO según elel1_c.pdf)
      15069, // ✅ Fundación Peñascal (ya estaba)
      14680, // ✅ Diego Berguices-Otxarkoaga (AÑADIDO según elel1_c.pdf)
      14728, // ✅ Maristak Durango (AÑADIDO según elel1_c.pdf)
      14845, // ✅ Esperanza Alhama (AÑADIDO según elel1_c.pdf)
      14779, // ✅ Somorrostro (ya estaba - CORREGIR CPIFP)
      14824, // ✅ San Viator (AÑADIDO según elel1_c.pdf)
      14828, // ✅ Maristas-San Miguel (AÑADIDO según elel1_c.pdf)
      12746, // ✅ La Salle-Berrozpe (AÑADIDO según elel1_c.pdf)
      12529, // ✅ Ortzadar (AÑADIDO según elel1_c.pdf)
      12728, // ✅ Adsis Donostia (AÑADIDO según elel1_c.pdf)
      13540 // ✅ Martutene (ya estaba)
    ],
    duracion: 2000
  },
  // NUEVO CICLO BÁSICO: Instalaciones Electrotécnicas y Mecánica
  {
    codcicl: 16000002, // ⚠️ Asignar código correcto
    nom: 'Instalaciones Electrotécnicas y Mecánica',
    nomEuskera: 'Instalazio Elektroteknikoak eta Mekanikoak',
    slugEuskera: 'instalazio-elektroteknikoak-eta-mekanikoak',
    abr: 'IEM-B',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10319, // ✅ Zaraobe (según ieme1_c.pdf)
      // Privados
      10248, // ✅ Egibide (según ieme1_c.pdf)
      14723 // ✅ Arratiako Zulaibar (según ieme1_c.pdf)
    ],
    duracion: 2000
  },

  // INFORMÁTICA Y COMUNICACIONES - FP BÁSICA
  {
    codcicl: 23000001,
    nom: 'Informática y Comunicaciones',
    nomEuskera: 'Informatika eta Komunikazioak',
    slugEuskera: 'informatika-eta-komunikazioetako',
    abr: 'IC-B',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // DEPARTAMENTO EDUCACIÓN
      14950, // ✅ Iurreta (solo 1º)
      13534, // ✅ Innovación Social Hernani (itinerario integrado)

      // OTROS PÚBLICOS (IMFPB)
      14891, // ✅ Basauri
      15240, // ✅ Mungia (solo 1º)
      14975, // ✅ Santurtzi

      // PRIVADOS (CPFPB)
      10248, // ✅ Egibide
      14680, // ✅ Diego Berguices-Otxarkoaga
      14779, // ✅ Somorrostro (itinerario integrado)
      13540, // ✅ Martutene
      12497, // ✅ Cebanc
      13500 // ✅ Centro Formación Mendibil
    ],
    duracion: 2000
  },

  // MANTENIMIENTO DE VIVIENDAS - FP BÁSICA
  {
    codcicl: 24000002,
    nom: 'Mantenimiento de Viviendas',
    nomEuskera: 'Etxebizitzen Mantentze-lanak',
    slugEuskera: 'etxebizitzen-mantentze-lanetako',
    abr: 'MV-B',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10296, // ✅ CIFP Construcción - AD

      // Otros Públicos - BIZKAIA
      14890, // ✅ IMFPB Bituritxa-Barakaldo - A
      14891, // ✅ IMFPB Basauri - A
      14894, // ✅ IMFPB Durango - A (solo 2º)
      15240, // ✅ IMFPB Mungia - B (solo 1º)

      // Otros Públicos - GIPUZKOA
      12677, // ✅ IMFPB Eibar - A
      12680, // ✅ IMFPB Pasaia - A

      // Privados - BIZKAIA
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga - A
      15794, // ✅ CPFPB Peñascal Markina - A
      14779, // ✅ CPIFP Somorrostro - A

      // Privados - GIPUZKOA
      12345 // ✅ CPEIPS San Frantzisko Xabier - A
    ],
    duracion: 2000
  },
  {
    codcicl: 24000003,
    nom: 'Mantenimiento de Viviendas - Fontanería - Calor | Refrigeración',
    nomEuskera:
      'Etxebizitzen Mantentze-lanak - Iturginitza - Beroa | Hozte-sistemak',
    slugEuskera: 'etxebizitzen-mantentze-lanetako',
    abr: 'MV-FCR',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - BIZKAIA
      15069 // ✅ CPIFP Fundación Peñascal - A (Itinerario 3 años +17)
    ],
    duracion: 2000
  },
  {
    codcicl: 24000004,
    nom: 'Mantenimiento de Viviendas - Refrigeración',
    nomEuskera: 'Etxebizitzen Mantentze-lanak - Hozte-sistemak',
    slugEuskera: 'etxebizitzen-mantentze-lanetako',
    abr: 'MV-R',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15666, // ✅ CIFP Repélega - AD

      // Privados - BIZKAIA
      14893 // ✅ CPFPB Adsis Bilbao - A
    ],
    duracion: 2000
  },
  // PELUQUERÍA Y ESTÉTICA - FP BÁSICA
  {
    codcicl: 20000001,
    nom: 'Peluquería y Estética',
    nomEuskera: 'Ile-apainketa eta Estetika',
    slugEuskera: 'ile-apainketa-eta-estetikako',
    abr: 'PE-B',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10351, // ✅ IES Laudio (según pees1_c.pdf - solo Peluquería)
      10258, // ✅ CEPA Ntra. Sra. del Carmen (según pees1_c.pdf - solo Peluquería)

      // Departamento Educación - GIPUZKOA
      13432, // ✅ CIFP Meka (Elgoibar) - aparece en listado general

      // Otros Públicos (IMFPB) - BIZKAIA
      14899, // ✅ IMFPB Portugalete (según pees1_c.pdf - solo Estética)
      14890, // ✅ IMFPB Bituritxa-Barakaldo (según pees1_c.pdf - solo Peluquería)
      14891, // ✅ IMFPB Basauri (según pees1_c.pdf - solo Peluquería)
      14894, // ✅ IMFPB Durango (según pees1_c.pdf - solo Peluquería 2º)
      14974, // ✅ IMFPB Ermua-Mallabia (según pees1_c.pdf - solo Peluquería)
      15240, // ✅ IMFPB Mungia (según pees1_c.pdf - solo Peluquería 1º)
      14975, // ✅ IMFPB Santurtzi (según pees1_c.pdf - solo Peluquería)
      14976, // ✅ IMFPB Sestao (según pees1_c.pdf - solo Peluquería)

      // Otros Públicos (IMFPB) - GIPUZKOA
      12729, // ✅ IMFPB Usurbil (según pees1_c.pdf - solo Peluquería)

      // Privados (CPFPB) - ARABA
      10291, // ✅ CPFPB Adsis Vitoria-Gasteiz (según pees1_c.pdf - solo Peluquería)

      // Privados (CPFPB/CPES) - BIZKAIA
      14621, // ✅ CPES Arce (según pees1_c.pdf - solo Peluquería 1º)
      14643, // ✅ CPES Fernando (según pees1_c.pdf - solo Peluquería)
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga (según pees1_c.pdf - solo Peluquería)
      14895, // ✅ CPFPB Adsis Leioa (según pees1_c.pdf - solo Peluquería)
      14779, // ✅ CPIFP Somorrostro (según pees1_c.pdf - solo Peluquería)
      14900, // ✅ CPFPB Meatzaldea (según pees1_c.pdf - solo Peluquería)
      15226, // ✅ CPFPB Margotu (según pees1_c.pdf - Peluquería | Estética)

      // Privados (CPFPB) - GIPUZKOA
      12940, // ✅ CPFPB Sustaker (según pees1_c.pdf - solo Peluquería)
      13500, // ✅ CPES Centro Formación Mendibil (según pees1_c.pdf - solo Peluquería)
      12566 // ✅ CPIFP Tolosako Inmakulada (según pees1_c.pdf - solo Peluquería)
    ],
    duracion: 2000
  },

  // MANTENIMIENTO DE VEHÍCULOS - FP BÁSICA
  {
    codcicl: 32000001,
    nom: 'Mantenimiento de Vehículos - Carrocería',
    nomEuskera: 'Ibilgailuen Mantentze-lanak - Karrozeria',
    slugEuskera: 'ibilgailuen-mantentze-lanetako',
    abr: 'MV-C',
    familiaCodigo: 'TMV',
    familia: 'Transporte y Mantenimiento de Vehículos',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // GIPUZKOA - Departamento Educación
      13255, // ✅ Aretxabaleta - AD (Itinerario Integrado, solo 1º)
      
      // OTROS PÚBLICOS
      12675, // ✅ IMFPB Andoain - A
      
      // PRIVADOS
      10291  // ✅ CPFPB Adsis Vitoria-Gasteiz - A
    ],
    duracion: 2000
  },
  
  // ✅ TÉCNICO BÁSICO EN MANTENIMIENTO DE VEHÍCULOS - Electromecánica (32000002)
  {
    codcicl: 32000002,
    nom: 'Mantenimiento de Vehículos - Electromecánica',
    nomEuskera: 'Ibilgailuen Mantentze-lanak - Elektromekanika',
    slugEuskera: 'ibilgailuen-mantentze-lanetako',
    abr: 'MV-E',
    familiaCodigo: 'TMV',
    familia: 'Transporte y Mantenimiento de Vehículos',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // ARABA - Departamento Educación
      10258, // ✅ CEPA Ntra. Sra. del Carmen - A
      
      // BIZKAIA - Departamento Educación
      14422, // ✅ San Jorge - AD
      
      // GIPUZKOA - Departamento Educación
      12468, // ✅ Don Bosco - D
      
      // OTROS PÚBLICOS
      14960, // ✅ IMFPB Bermeo - B (solo 2º)
      14974, // ✅ IMFPB Ermua-Mallabia - A
      
      // PRIVADOS
      14900, // ✅ CPFPB Meatzaldea - A
      14824, // ✅ San Viator - A
      12516, // ✅ Salesianos Donostia - A
      12529  // ✅ Ortzadar - AB (Itinerario 3 años, +17 años)
    ],
    duracion: 2000
  },
  
  // ✅ TÉCNICO BÁSICO EN MANTENIMIENTO DE VEHÍCULOS - Electromecánica | Carrocería (32000003)
  {
    codcicl: 32000003,
    nom: 'Mantenimiento de Vehículos - Electromecánica | Carrocería',
    nomEuskera: 'Ibilgailuen Mantentze-lanak - Elektromekanika | Karrozeria',
    slugEuskera: 'ibilgailuen-mantentze-lanetako',
    abr: 'MV-EC',
    familiaCodigo: 'TMV',
    familia: 'Transporte y Mantenimiento de Vehículos',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // PRIVADOS
      14680, // ✅ Diego Berguices-Otxarkoaga - A (Itinerario integrado FPB y GM)
      12581  // ✅ Goierri - B
    ],
    duracion: 2000
  },
  // CARPINTERÍA Y MUEBLE - FP BÁSICA
  {
    codcicl: 25000001,
    nom: 'Carpintería y Mueble',
    nomEuskera: 'Arotz- eta Altzari-lanak',
    slugEuskera: 'arotz-eta-altzari-lanetako',
    abr: 'CM-B',
    familiaCodigo: 'MMC',
    familia: 'Madera, Mueble y Corcho',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10319, // ✅ IES Zaraobe (Amurrio) - A
      10258, // ✅ CEPA Ntra. Sra. del Carmen (Vitoria) - A

      // Otros Públicos - BIZKAIA
      14890, // ✅ IMFPB Bituritxa-Barakaldo - A
      14894, // ✅ IMFPB Durango - A (solo 2º)

      // Privados - BIZKAIA
      15069, // ✅ CPIFP Fundación Peñascal - AB
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga - A
      14895, // ✅ CPFPB Adsis Leioa - A

      // Privados - GIPUZKOA
      12727 // ✅ CPFBP Deikagest Errenteria - A
    ],
    duracion: 2000
  },
  {
    codcicl: 250002,
    nom: 'Carpintería y Mueble',
    nomEuskera: 'Arotz- eta Altzari-lanak',
    slugEuskera: 'arotz-eta-altzari-lanetako',
    abr: 'CAM',
    familiaCodigo: 'MMC',
    familia: 'Madera, Mueble y Corcho',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15021, // ✅ IES Barrutialde (Arratzu) - D (solo 1º)

      // Departamento Educación - GIPUZKOA
      13556, // ✅ CIFP Izarraitz (Azkoitia) - D (solo 1º)
      12229, // ✅ CIFP Politécnico Easo (Donostia) - A (turno V - vespertino)

      // Privados - BIZKAIA
      15069, // ✅ CPIFP Fundación Peñascal - A (solo 2º)
      14680 // ✅ CPIFP Diego Berguices-Otxarkoaga - A (solo 1º)
    ],
    duracion: 2000
  },

  // REFORMA Y MANTENIMIENTO DE EDIFICIOS - FP BÁSICA
  {
    codcicl: 15000001,
    nom: 'Reforma y Mantenimiento de Edificios',
    nomEuskera: 'Eraikinen Erreforma eta Mantentzea',
    slugEuskera: 'eraikinen-erreforma-eta-mantentzea',
    abr: 'RME-B',
    familiaCodigo: 'EOC',
    familia: 'Edificación y Obra Civil',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      15069, // ✅ CPIFP Fundación Peñascal (Bilbao) - AB (solo 1º) (YA ESTABA)
      14895, // ✅ CPFPB Adsis Leioa - A (AÑADIDO - CORREGIR TIPO DE CENTRO)
      14894 // ✅ IMFPB Durango - A (solo 2º - Decoración de interiores) (AÑADIDO)
      // ELIMINAR: 15024 (NO aparece en el PDF)
    ],
    duracion: 2000
  },
  // AGRO-JARDINERÍA Y COMPOSICIONES FLORALES - FP BÁSICA
  {
    codcicl: 11000001,
    nom: 'Agro-Jardinería y Composiciones Florales',
    nomEuskera: 'Nekazaritza, Lorezaintza eta Lore Konposizioak',
    slugEuskera: 'nekazaritza-lorezaintza-eta-lore-konposizioen',
    abr: 'AJ-B',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10349, // Samaniego-Laguardia - A
      // Otros Públicos (IMFPB) - BIZKAIA
      14894, // IMFPB Durango - A (solo 1º curso)
      // Privados (CPFPB) - BIZKAIA
      15793 // Adsis Getxo - A
    ],
    duracion: 2000
  },
  {
    codcicl: 12000001,
    nom: 'Artes Gráficas',
    nomEuskera: 'Arte Grafikoak',
    slugEuskera: 'arte-grafikoak',
    abr: 'AG-B',
    familiaCodigo: 'ARG',
    familia: 'Artes Gráficas',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Otros Públicos (IMFPB) - BIZKAIA
      14891, // IMFPB Basauri - A
      // Privados - GIPUZKOA
      12572 // Salesianos Urnieta - A
    ],
    duracion: 2000
  },

  // ACTIVIDADES MARÍTIMO PESQUERAS - FP BÁSICA
  {
    codcicl: 26000001,
    nom: 'Actividades Marítimo Pesqueras',
    nomEuskera: 'Itsasoko eta Arrantzako Jarduerak',
    slugEuskera: 'itsasoko-eta-arrantzako-jarduerak',
    abr: 'AMP-B',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14205],
    duracion: 2000
  },
  {
    codcicl: 26000002,
    nom: 'Mantenimiento de Embarcaciones Deportivas y de Recreo',
    nomEuskera: 'Kirol eta Aisialdiko Itsasontzien Mantentze-lanak',
    slugEuskera: 'kirol-eta-aisialdiko-itsasontzien-mantentze-lanak',
    abr: 'MEDR-B',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12151, // ✅ CIFP Náutico Pesquero de Pasaia - AD

      // Otros Públicos - BIZKAIA
      14975 // ✅ IMFPB Santurtzi - A
    ],
    duracion: 2000
  },

  // ACTIVIDADES DOMÉSTICAS Y LIMPIEZA DE EDIFICIOS - FP BÁSICA
  {
    codcicl: 30000003,
    nom: 'Actividades Domésticas y Limpieza de Edificios',
    nomEuskera: 'Etxeko Lanak eta Eraikinen Garbiketa',
    slugEuskera: 'etxeko-lanak-eta-eraikinen-garbiketako',
    abr: 'AD-B',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      13255, // ✅ CIFP Aretxabaleta Lanbide Eskola - AD (AÑADIDO)
      
      // Privados - ARABA
      10244, // ✅ CPEIPS Paula Montal - A (AÑADIDO)
      10214, // ✅ CPFPB Bermar - A (YA ESTABA - CORREGIR TIPO DE CENTRO)
      
      // Privados - BIZKAIA
      14619, // ✅ CPEIPS Angeles Custodios - A (AÑADIDO)
      14665, // ✅ CPES María Inmaculada - A (AÑADIDO)
      14810, // ✅ CPIFP Calasanz Lanbide Ikastegia - A (AÑADIDO)
    ],
    duracion: 2000
  },

  // PANADERÍA, REPOSTERÍA Y CONFITERÍA - FP BÁSICA
  {
    codcicl: 22000001,
    nom: 'Actividades de Panadería-Pastelería',
    nomEuskera: 'Okintza, Gozogintza eta Konfiteria',
    slugEuskera: 'okintza-gozogintza-eta-konfiteriako',
    abr: 'PRC-B',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15176, // ✅ CIFP Hostelería/Ostalaritza (Galdakao) - AD

      // Otros Públicos - BIZKAIA
      14901, // ✅ IMFPB Erandio - A (AÑADIDO según papa1_c.pdf)

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide (Vitoria) - A (AÑADIDO según papa1_c.pdf)

      // Privados - BIZKAIA
      15224, // ✅ CPFPB E.P. Pastelería y Comercio - A (ya estaba)
      15069 // ✅ CPIFP Fundación Peñascal - A (ya estaba, incluye itinerario 3 años +17)
    ],
    duracion: 2000
  },

  // ✅ PLANTA QUÍMICA
  {
    codcicl: 340004,
    nom: 'Planta Química',
    nomEuskera: 'Lantegi Kimikoa',
    slugEuskera: 'lantegi-kimikoko',
    abr: 'PLQI',
    familiaCodigo: 'QUI',
    familia: 'Química',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco (Errenteria) - AD
      13023 // ✅ CIFP Tolosaldea (Tolosa) - D I
    ],
    duracion: 2000
  },
  // ✅ OPERACIONES DE LABORATORIO
  {
    codcicl: 340003,
    nom: 'Operaciones de Laboratorio',
    nomEuskera: 'Laborategiko Eragiketak',
    slugEuskera: 'laborategiko-eragiketetako',
    abr: 'OPLA',
    familiaCodigo: 'QUI',
    familia: 'Química',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10133, // ✅ IES Federico Baraibar (Vitoria) - A

      // Departamento Educación - BIZKAIA
      15112 // ✅ CIFP Elorrieta-Erreka Mari (Bilbao) - AD
    ],
    duracion: 2000
  },

  // ADMINISTRACIÓN Y GESTIÓN - GRADO SUPERIOR
  {
    codcicl: 10010,
    nom: 'Administración y Finanzas',
    nomEuskera: 'Administrazioa eta Finantzak',
    slugEuskera: 'administrazio-eta-finantzako',
    abr: 'AF',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10201, // Laudioalde (Laudio) - ABD (turno: M, grupos: 2)
      10137, // Ciudad Jardín (Vitoria) - AD (turno: M, grupos: 4)
      13613, // CIFP Aprendizajes Virtuales (Vitoria) - AD (turno: D - distancia)
      // Públicos Departamento Educación - BIZKAIA
      14069, // Barakaldo - AD + I (turno: MV, grupos: 4)
      14088, // Bidebieta (Basauri) - AD (turno: MN, grupos: 7, incluye 3º curso)
      15112, // Elorrieta-Erreka Mari (Bilbao) - D (turno: M, grupos: 2)
      15763, // Txurdinaga (Bilbao) - AD (turno: M, grupos: 4)
      15630, // Tartanga (Erandio) - B (turno: M, grupos: 2)
      14279, // Andra Mari (Galdakao) - AD (turno: M, grupos: 4)
      14950, // Iurreta - D (turno: M, grupos: 2)
      15666, // Repélega (Portugalete) - AD (turno: M, grupos: 4)
      // Públicos Departamento Educación - GIPUZKOA
      13556, // Izarraitz (Azkoitia) - D + I (turno: M, grupos: 2)
      13020, // Miguel Altuna (Bergara) - D + I (turno: M, grupos: 2)
      12982, // Xabier Zubiri-Manteo (Donostia) - AD + I (turno: M, grupos: 4)
      12053, // Uni Eibar-Ermua - ABD (turno: MV, grupos: 3)
      13432, // Meka (Elgoibar) - D + I (turno: M, grupos: 2)
      12108, // Plaiaundi (Irun) - AD (turno: MV, grupos: 4)
      12132, // Mutriku - D (turno: M, grupos: 2)
      13023, // Tolosaldea (Tolosa) - D + I (turno: M, grupos: 2)
      13022, // Usurbil - AD + I (turno: M, grupos: 4)
      12298, // Zumaia - D (turno: M, grupos: 2)
      // Privados - ARABA
      10248, // Egibide (Vitoria) - AD (turno: MN, grupos: 9, incluye 3º curso)
      // Privados - BIZKAIA
      14615, // Almi (Bilbao) - A (turno: M, grupos: 2)
      14669, // Mikeldi (Bilbao) - A (turno: M, grupos: 2)
      14696, // San Luis (Bilbao) - ABD (turno: M, grupos: 4)
      14635, // Sopeña-Bilbao - A (turno: M, grupos: 2)
      14704, // Sta. María de Artagan (Bilbao) - A (turno: M, grupos: 2)
      14718, // Zabalburu (Bilbao) - A (turno: M, grupos: 2)
      14728, // Maristak Durango - B (turno: M, grupos: 2)
      14747, // Ibaiondo (Getxo) - AD (turno: V, grupos: 1, solo 1º)
      14775, // Lea-Artibai (Markina-Xemein) - D (turno: M, grupos: 2)
      14779, // Somorrostro (Muskiz) - A (turno: M, grupos: 2)
      14797, // Xabier (Portugalete) - A (turno: M, grupos: 2)
      14810, // Calasanz (Santurtzi) - A (turno: M, grupos: 2)
      // Privados - GIPUZKOA
      12746, // La Salle-Berrozpe (Andoain) - B (turno: M, grupos: 2)
      12497, // Cebanc (Donostia) - B (turno: M, grupos: 2)
      12479, // Centro de Estudios A.E.G. (Donostia) - A (turno: M, grupos: 2)
      12490, // Nazaret (Donostia) - AD (turno: M, grupos: 4)
      12742, // Irungo La Salle (Irun) - A (turno: M, grupos: 2)
      12462, // Oñati Gestio Heziketa - B (turno: M, grupos: 2)
      12581 // Goierri (Ordizia) - D (turno: M, grupos: 2)
    ],
    duracion: 2000
  },
  {
    codcicl: 10011,
    nom: 'Asistencia a la Dirección',
    nomEuskera: 'Zuzendaritzarako Laguntza',
    slugEuskera: 'zuzendaritzarako-laguntzako',
    abr: 'AD',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10201, // Laudioalde (Laudio) - A (solo 2º curso)
      10137, // Ciudad Jardín (Vitoria) - A (1º,2º)
      // Públicos Departamento Educación - BIZKAIA
      14088, // Bidebieta (Basauri) - D (solo 2º)
      15112, // Elorrieta-Erreka Mari (Bilbao) - A (1º,2º)
      15763, // Txurdinaga (Bilbao) - AD (turno: V, 1º,2º - vespertino)
      14279, // Andra Mari (Galdakao) - D (solo 2º)
      // Públicos Departamento Educación - GIPUZKOA
      13020, // Miguel Altuna (Bergara) - D (solo 2º)
      13432, // Meka (Elgoibar) - D (solo 2º)
      // Privados - ARABA
      10248, // Egibide (Vitoria) - A (1º,2º)
      // Privados - BIZKAIA
      14669, // Mikeldi (Bilbao) - A (1º,2º)
      // Privados - GIPUZKOA
      12490, // Nazaret (Donostia) - A (1º,2º)
      12742 // Irungo La Salle (Irun) - A (solo 2º)
    ],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO MEDIO
  {
    codcicl: 20001,
    nom: 'Instalaciones Eléctricas y Automáticas',
    nomEuskera: 'Instalazio Elektriko eta Automatikoak',
    slugEuskera: 'instalazio-elektriko-eta-automatikoen',
    abr: 'IEA',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10201, // ✅ Laudioalde (AÑADIDO según inea2_c.pdf)
      13613, // ⚠️ CIFP Aprendizajes Virtuales (AÑADIDO según inea2_c.pdf - solo distancia)
      10138, // ✅ Mendizabala (ya estaba)
      14069, // ✅ Barakaldo (ya estaba)
      14088, // ✅ Bidebieta (ya estaba)
      15112, // ✅ Elorrieta-Erreka Mari (AÑADIDO según inea2_c.pdf)
      14205, // ✅ Emilio Campuzano (ya estaba)
      15630, // ✅ Tartanga (AÑADIDO según inea2_c.pdf)
      15108, // ✅ Mungia (AÑADIDO según inea2_c.pdf)
      14422, // ✅ San Jorge (AÑADIDO según inea2_c.pdf)
      13020, // ✅ Miguel Altuna (AÑADIDO según inea2_c.pdf)
      12229, // ✅ Politécnico Easo (AÑADIDO según inea2_c.pdf)
      12054, // ✅ Armería Eskola (AÑADIDO según inea2_c.pdf)
      13534, // ✅ Innovación Social Hernani (AÑADIDO según inea2_c.pdf)
      13021, // ✅ Bidasoa (AÑADIDO según inea2_c.pdf)
      13023, // ✅ Tolosaldea (AÑADIDO según inea2_c.pdf)
      13022, // ✅ Usurbil (AÑADIDO según inea2_c.pdf)
      // Privados
      10248, // ✅ Egibide (AÑADIDO según inea2_c.pdf)
      14680, // ✅ Diego Berguices (AÑADIDO según inea2_c.pdf)
      14634, // ✅ Jesuitak Politeknikoa (AÑADIDO según inea2_c.pdf)
      14664, // ✅ Salesianos Deusto (AÑADIDO según inea2_c.pdf)
      14728, // ✅ Maristak Durango (AÑADIDO según inea2_c.pdf)
      14845, // ✅ Esperanza Alhama (AÑADIDO según inea2_c.pdf)
      14775, // ✅ Lea-Artibai (AÑADIDO según inea2_c.pdf)
      14779, // ✅ Somorrostro (AÑADIDO según inea2_c.pdf)
      14824, // ✅ San Viator (AÑADIDO según inea2_c.pdf)
      14723, // ✅ Arratiako Zulaibar (AÑADIDO según inea2_c.pdf)
      12572, // ✅ Salesianos Urnieta (AÑADIDO según inea2_c.pdf)
      13380 // ✅ Oteitza Politeknikoa (AÑADIDO según inea2_c.pdf)
    ],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 1600001,
    nom: 'Automatización y Robótica Industrial',
    nomEuskera: 'Automatizazioa eta Robotika Industriala',
    slugEuskera: 'automatizaioa-eta-robotika-industriala',
    abr: 'ARI',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10201, // ✅ Laudioalde (AÑADIDO según auri3_c.pdf)
      13613, // ⚠️ CIFP Aprendizajes Virtuales (AÑADIDO según auri3_c.pdf - distancia)
      10138, // ✅ Mendizabala (AÑADIDO según auri3_c.pdf)
      14069, // ✅ Barakaldo (ya estaba)
      14088, // ✅ Bidebieta (AÑADIDO según auri3_c.pdf)
      14205, // ✅ Emilio Campuzano (AÑADIDO según auri3_c.pdf)
      14301, // ✅ Fadura (AÑADIDO según auri3_c.pdf)
      15666, // ✅ Repélega (AÑADIDO según auri3_c.pdf)
      13020, // ✅ Miguel Altuna (AÑADIDO según auri3_c.pdf)
      12229, // ✅ Politécnico Easo (ya estaba)
      12054, // ✅ Armería Eskola (AÑADIDO según auri3_c.pdf)
      13023, // ✅ Tolosaldea (ya estaba)
      13022, // ✅ Usurbil (AÑADIDO según auri3_c.pdf)
      // Privados
      10248, // ✅ Egibide (ya estaba)
      14664, // ✅ Salesianos Deusto (AÑADIDO según auri3_c.pdf)
      14837, // ✅ Txorierri (AÑADIDO según auri3_c.pdf)
      14728, // ✅ Maristak Durango (AÑADIDO según auri3_c.pdf)
      14775, // ✅ Lea-Artibai (AÑADIDO según auri3_c.pdf)
      14779, // ✅ Somorrostro (AÑADIDO según auri3_c.pdf)
      14723, // ✅ Arratiako Zulaibar (AÑADIDO según auri3_c.pdf)
      12456, // ✅ Mondragon Goi Esk. (AÑADIDO según auri3_c.pdf)
      12742, // ✅ Irungo La Salle (AÑADIDO según auri3_c.pdf)
      12581, // ✅ Goierri (AÑADIDO según auri3_c.pdf)
      12572, // ✅ Salesianos Urnieta (AÑADIDO según auri3_c.pdf)
      13380, // ✅ Oteitza Politeknikoa (AÑADIDO según auri3_c.pdf)
      12593 // ✅ Urola Garaiko (AÑADIDO según auri3_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 20004,
    nom: 'Sistemas Electrotécnicos y Automatizados',
    nomEuskera: 'Sistema Elektroteknikoak eta Automatizatuak',
    slugEuskera: 'sistema-elektroteknikoak-eta-automatizatuetako',
    abr: 'SEA',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10201, // ✅ Laudioalde (AÑADIDO según sela3_c.pdf)
      14069, // ✅ Barakaldo (ya estaba)
      15112, // ✅ Elorrieta-Erreka Mari (AÑADIDO según sela3_c.pdf)
      14205, // ✅ Emilio Campuzano (ya estaba)
      15630, // ✅ Tartanga (AÑADIDO según sela3_c.pdf)
      15108, // ✅ Mungia (AÑADIDO según sela3_c.pdf)
      14422, // ✅ San Jorge (AÑADIDO según sela3_c.pdf)
      12229, // ✅ Politécnico Easo (AÑADIDO según sela3_c.pdf)
      13534, // ✅ Innovación Social (AÑADIDO según sela3_c.pdf)
      13021, // ✅ Bidasoa (AÑADIDO según sela3_c.pdf)
      12132, // ✅ Mutriku (AÑADIDO según sela3_c.pdf)
      // Privados
      10248, // ✅ Egibide (AÑADIDO según sela3_c.pdf)
      14664, // ✅ Salesianos Deusto (AÑADIDO según sela3_c.pdf)
      14728, // ✅ Maristak Durango (AÑADIDO según sela3_c.pdf)
      14845, // ✅ Esperanza Alhama (AÑADIDO según sela3_c.pdf)
      14779, // ✅ Somorrostro (AÑADIDO según sela3_c.pdf)
      14824, // ✅ San Viator (AÑADIDO según sela3_c.pdf)
      12572 // ✅ Salesianos Urnieta (AÑADIDO según sela3_c.pdf)
    ],
    duracion: 2000
  },

  // FABRICACIÓN MECÁNICA - GRADO MEDIO (NUEVO)
  {
    codcicl: 180004,
    nom: 'Mecanizado',
    nomEuskera: 'Mekanizazioa',
    slugEuskera: 'mekanizazioko',
    abr: 'ME',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - Araba
      10319, // ✅ IES Zaraobe (Amurrio) - ABD (AÑADIDO)
      10201, // ✅ CIFP Laudioalde (Laudio) - AD (AÑADIDO)
      10138, // ✅ CIFP Mendizabala (Vitoria) - AD (AÑADIDO)
      // Departamento Educación - Bizkaia
      15021, // ✅ IES Barrutialde (Arratzu) - D (AÑADIDO)
      14069, // ✅ CIFP Barakaldo - A (YA ESTABA)
      14088, // ✅ CIFP Bidebieta (Basauri) - AD (AÑADIDO)
      15112, // ✅ CIFP Elorrieta-Erreka Mari (Bilbao) - ABD (AÑADIDO)
      14205, // ✅ CIFP Emilio Campuzano (Bilbao) - ABD (AÑADIDO)
      14301, // ✅ CIFP Fadura (Getxo) - ABD (AÑADIDO)
      14950, // ✅ CIFP Iurreta - D (AÑADIDO)
      15108, // ✅ IES Mungia - A (AÑADIDO)
      14422, // ✅ CIFP San Jorge (Santurtzi) - ABD (AÑADIDO)
      // Departamento Educación - Gipuzkoa
      13255, // ✅ CIFP Aretxabaleta - D, I (AÑADIDO)
      13556, // ✅ CIFP Izarraitz (Azkoitia) - AD, I (AÑADIDO)
      13020, // ✅ CIFP Miguel Altuna (Bergara) - AD (AÑADIDO)
      12229, // ✅ CIFP Politécnico Easo (Donostia) - AD (YA ESTABA)
      12054, // ✅ CIFP Armería Eskola (Eibar) - AD, I (AÑADIDO)
      12763, // ✅ CIFP Maq-Herram (Elgoibar) - AD (AÑADIDO)
      13534, // ✅ CIFP Innovación Social (Hernani) - ABD (AÑADIDO)
      13021, // ✅ CIFP Bidasoa (Irun) - D (AÑADIDO)
      13015, // ✅ IES Oñate - D, I (YA ESTABA)
      13023, // ✅ CIFP Tolosaldea (Tolosa) - D, I (YA ESTABA)
      13022, // ✅ CIFP Usurbil - AD, I (AÑADIDO)
      // Privados
      10248, // ✅ CPIFP Egibide (Vitoria) - AB (YA ESTABA)
      14664, // ✅ CPIFP Salesianos Deusto (Bilbao) - A (AÑADIDO)
      14837, // ✅ CPIFP Txorierri (Derio) - B (AÑADIDO)
      14728, // ✅ CPIFP Maristak Durango - B (AÑADIDO)
      14779, // ✅ CPIFP Somorrostro (Muskiz) - A (AÑADIDO)
      14824, // ✅ CPIFP San Viator (Sopuerta) - A (AÑADIDO)
      14723, // ✅ CPIFP Arratiako Zulaibar (Zeanuri) - D (AÑADIDO)
      12742, // ✅ CPIFP Irungo La Salle - A (AÑADIDO)
      12581, // ✅ CPIFP Goierri (Ordizia) - D (AÑADIDO)
      13380, // ✅ CPIFP Oteitza Politeknikoa (Zarautz) - D (AÑADIDO)
      12593 // ✅ CPIFP Urola Garaiko (Zumarraga) - B (AÑADIDO - solo 2º curso)
      // ELIMINAR: 14702, 14899, 15041, 15305, 12372, 12497, 13456, 14010, 14279, 15307
    ],
    duracion: 2000
  },
  {
    codcicl: 180005,
    nom: 'Soldadura y Calderería',
    nomEuskera: 'Soldadura eta Galdaragintza',
    slugEuskera: 'soldadura-eta-galdaragintza',
    abr: 'SC',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - Araba
      10201, // ✅ CIFP Laudioalde (Laudio) - A (AÑADIDO)
      10138, // ✅ CIFP Mendizabala (Vitoria) - A (AÑADIDO)
      // Departamento Educación - Bizkaia
      15628, // ✅ CIFP Zornotza (Amorebieta) - ABD (AÑADIDO)
      14945, // ✅ CIFP Construcción Bizkaia (Arrigorriaga) - A (AÑADIDO)
      14069, // ✅ CIFP Barakaldo - A (YA ESTABA)
      15112, // ✅ CIFP Elorrieta-Erreka Mari (Bilbao) - D (AÑADIDO)
      // Departamento Educación - Gipuzkoa
      13255, // ✅ CIFP Aretxabaleta - AD, I (AÑADIDO)
      13432, // ✅ CIFP Meka (Elgoibar) - D (AÑADIDO)
      12468, // ✅ CIFP Don Bosco (Errenteria) - AD, I (AÑADIDO)
      13023, // ✅ CIFP Tolosaldea (Tolosa) - D (YA ESTABA)
      // Privados
      10248, // ✅ CPIFP Egibide (Vitoria) - A (AÑADIDO)
      15069, // ✅ CPIFP Fundación Peñascal (Bilbao) - A (AÑADIDO)
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga (Bilbao) - A (AÑADIDO)
      14775, // ✅ CPIFP Lea-Artibai (Markina-Xemein) - A (AÑADIDO)
      14779, // ✅ CPIFP Somorrostro (Muskiz) - A (AÑADIDO)
      14828, // ✅ CPEIPS Maristas-San Miguel (Zalla) - A (AÑADIDO)
      12746, // ✅ CPIFP La Salle-Berrozpe (Andoain) - B (AÑADIDO)
      12581 // ✅ CPIFP Goierri (Ordizia) - D (AÑADIDO)
      // ELIMINAR: 14702, 12053, 12229, 13015, 14010, 15041, 14899
    ],
    duracion: 2000
  },
  // FABRICACIÓN MECÁNICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 180001,
    nom: 'Programación de la Producción en Fabricación Mecánica',
    nomEuskera: 'Fabrikazio Mekanikoko Ekoizpena Programatzea',
    slugEuskera: 'fabrikazio-mekanikoko-ekoizpena-programatzeko',
    abr: 'PPFM',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - Araba
      10201, // ✅ CIFP Laudioalde (Laudio) - ABD (AÑADIDO)
      13613, // ✅ CIFP Aprendizajes Virtuales (Vitoria) - A, Distancia (AÑADIDO)
      10138, // ✅ CIFP Mendizabala (Vitoria) - ABD (AÑADIDO)
      // Departamento Educación - Bizkaia
      15021, // ✅ IES Barrutialde (Arratzu) - BD (AÑADIDO)
      14069, // ✅ CIFP Barakaldo - A (YA ESTABA)
      14088, // ✅ CIFP Bidebieta (Basauri) - AD (AÑADIDO)
      15112, // ✅ CIFP Elorrieta-Erreka Mari (Bilbao) - ABD (AÑADIDO)
      14205, // ✅ CIFP Emilio Campuzano (Bilbao) - A, incluye 3º (AÑADIDO)
      14301, // ✅ CIFP Fadura (Getxo) - A (AÑADIDO)
      14950, // ✅ CIFP Iurreta - D (AÑADIDO)
      15108, // ✅ IES Mungia - ABD (AÑADIDO)
      14422, // ✅ CIFP San Jorge (Santurtzi) - A (AÑADIDO)
      // Departamento Educación - Gipuzkoa
      13556, // ✅ CIFP Izarraitz (Azkoitia) - D, I (AÑADIDO)
      13020, // ✅ CIFP Miguel Altuna (Bergara) - AD, I (AÑADIDO)
      12229, // ✅ CIFP Politécnico Easo (Donostia) - AD (YA ESTABA)
      12054, // ✅ CIFP Armería Eskola (Eibar) - AD, I (AÑADIDO)
      12763, // ✅ CIFP Maq-Herram (Elgoibar) - AD (AÑADIDO)
      13021, // ✅ CIFP Bidasoa (Irun) - AD (AÑADIDO)
      13023, // ✅ CIFP Tolosaldea (Tolosa) - D, I (YA ESTABA)
      13022, // ✅ CIFP Usurbil - AD (AÑADIDO)
      // Privados
      10248, // ✅ CPIFP Egibide (Vitoria) - AB, incluye 3º (YA ESTABA)
      14664, // ✅ CPIFP Salesianos Deusto (Bilbao) - B (AÑADIDO)
      14837, // ✅ CPIFP Txorierri (Derio) - D (AÑADIDO)
      14775, // ✅ CPIFP Lea-Artibai (Markina-Xemein) - D (AÑADIDO)
      14779, // ✅ CPIFP Somorrostro (Muskiz) - AB (AÑADIDO)
      14723, // ✅ CPIFP Arratiako Zulaibar (Zeanuri) - B (AÑADIDO)
      12746, // ✅ CPIFP La Salle-Berrozpe (Andoain) - D (AÑADIDO)
      12456, // ✅ CPIFP Mondragon Goi Esk. (Arrasate) - A (AÑADIDO)
      12742, // ✅ CPIFP Irungo La Salle - A (AÑADIDO)
      12581, // ✅ CPIFP Goierri (Ordizia) - D (AÑADIDO)
      13380, // ✅ CPIFP Oteitza Politeknikoa (Zarautz) - D (AÑADIDO)
      12593 // ✅ CPIFP Urola Garaiko (Zumarraga) - A (AÑADIDO)
      // ELIMINAR: 14702, 14899, 15041, 15305, 12053, 12497, 13015, 13456, 14010, 12372
    ],
    duracion: 2000
  },
  {
    codcicl: 180002,
    nom: 'Diseño en Fabricación Mecánica',
    nomEuskera: 'Fabrikazio Mekanikoko Diseinua',
    slugEuskera: 'fabrikazio-mekanikoko-diseinuko',
    abr: 'DFM',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      13613, // CIFP DE APRENDIZAJES VIRTUALES Y DIGITALIZADOS - Vitoria-Gasteiz
      10138, // CIFP MENDIZABALA LHII - Vitoria-Gasteiz
      15021, // IES BARRUTIALDE BHI - Arratzu
      14069, // CIFP BARAKALDO LHII - Barakaldo
      15112, // CIFP ELORRIETA-ERREKA MARI LHII - Bilbao
      14205, // CIFP EMILIO CAMPUZANO LHII - Bilbao
      13020, // CIFP MIGUEL ALTUNA LHII - Bergara
      12229, // CIFP POLITÉCNICO EASO POLITEKNIKOA LHII - Donostia/San Sebastián
      12054, // CIFP ARMERÍA ESKOLA LHII - Eibar
      12763, // CIFP MAQ.–HERRAM./MAKINA-ERREMINTA LHII - Elgoibar
      13534, // CIFP DE INNOVACIÓN SOCIAL LHII - Hernani
      13021, // CIFP BIDASOA LHII - Irun
      13023, // CIFP TOLOSALDEA LHII - Tolosa
      10248, // CPIFP EGIBIDE LHIPI - Vitoria-Gasteiz (Privada)
      14664, // CPIFP SALESIANOS DEUSTO-M. AUX.-SA LHIPI - Bilbao (Privada)
      14837, // CPIFP TXORIERRI S. COOP. LTDA. LHIPI - Derio (Privada)
      14728, // CPIFP MARISTAK DURANGO LHIPI - Durango (Privada)
      14779, // CPIFP SOMORROSTRO LHIPI - Muskiz (Privada)
      14723, // CPIFP ARRATIAKO ZULAIBAR LANBIDE IKASTEGIA LHIPI - Zeanuri (Privada)
      12746, // CPIFP LA SALLE-BERROZPE LHIPI - Andoain (Privada)
      12456, // CPIFP MONDRAGON GOI ESK.POLITEK., J.M.A.,S.COOP LHIPI - Arrasate/Mondragón (Privada)
      12581, // CPIFP GOIERRI LHIPI - Ordizia (Privada)
      13380 // CPIFP OTEITZA LIZEO POLITEKNIKOA LHIPI - Zarautz (Privada)
    ],
    duracion: 2000
  },
  // FABRICACIÓN MECÁNICA - GRADO BÁSICO (NUEVO)
  {
    codcicl: 18000001,
    nom: 'Fabricación de Elementos Metálicos',
    nomEuskera: 'Metalezko Elementuen Fabrikazioa',
    slugEuskera: 'metalezko-elementuen-fabrikazioa',
    abr: 'FEM',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14069, 14702, 14899, 15041, 12053, 12229, 12372, 12497, 13015, 13023,
      13432, 13456, 14010, 14279, 15037, 15307, 10248, 13536, 15069
    ],
    duracion: 2000
  },

  // INSTALACIÓN Y MANTENIMIENTO - GRADO BÁSICO
  {
    codcicl: 24000001,
    nom: 'Fabricación y Montaje',
    nomEuskera: 'Fabrikazioa eta Muntaketa',
    slugEuskera: 'fabrikazioa-eta-muntaketako',
    abr: 'FM',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14069, 14702, 15037, 15041, 12229, 12372, 13015, 13023, 14010, 14899,
      15307
    ],
    duracion: 2000
  },

  // INSTALACIÓN Y MANTENIMIENTO - GRADO MEDIO
  {
    codcicl: 240004,
    nom: 'Mantenimiento Electromecánico',
    nomEuskera: 'Mantentze-lan Elektromekanikoak',
    slugEuskera: 'mantentze-lan-elektromekanikoen',
    abr: 'ME',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10319, // ✅ IES Zaraobe - ABD (1º,2º)
      10201, // ✅ CIFP Laudioalde - A (1º,2º)
      10138, // ✅ CIFP Mendizabala - AD (1º,2º)

      // Departamento Educación - BIZKAIA
      15628, // ✅ CIFP Zornotza - ABD (1º,2º)
      14069, // ✅ CIFP Barakaldo - A (1º,2º)
      14205, // ✅ CIFP Emilio Campuzano - A (1º,2º, V)
      14279, // ✅ CIFP Andra Mari - AD (1º,2º)

      // Departamento Educación - GIPUZKOA
      13556, // ✅ CIFP Izarraitz - D (1º,2º)
      12054, // ✅ CIFP Armería Eskola - D (1º,2º)
      12763, // ✅ CIFP Maq-Herram - D (1º,2º)
      13534, // ✅ CIFP Innovación Social Hernani - D, I (1º,2º)
      13021, // ✅ CIFP Bidasoa - AD (1º,2º)
      13015, // ✅ IES Oñate - D (1º,2º)
      13022, // ✅ CIFP Usurbil - AD (solo 1º)

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - AB (1º,2º,3º)

      // Privados - BIZKAIA
      14664, // ✅ CPIFP Salesianos Deusto - B (1º,2º)
      14775, // ✅ CPIFP Lea-Artibai - D (1º,2º)
      14779, // ✅ CPIFP Somorrostro - A (1º,2º)

      // Privados - GIPUZKOA
      12746, // ✅ CPIFP La Salle-Berrozpe - B (1º,2º)
      12529, // ✅ CPES Ortzadar - B (1º,2º)
      12742, // ✅ CPIFP Irungo La Salle - B (1º,2º)
      12581, // ✅ CPIFP Goierri - D (1º,2º)
      12572, // ✅ CPIFP Salesianos Urnieta - B (1º,2º)
      12593 // ✅ CPIFP Urola Garaiko - B (1º,2º)
    ],
    duracion: 2000
  },

  // INSTALACIÓN Y MANTENIMIENTO - GRADO SUPERIOR
  {
    codcicl: 240001,
    nom: 'Mantenimiento de Instalaciones Térmicas y de Fluidos',
    nomEuskera: 'Instalazio Termikoen eta Fluidoen Mantentze-lanak',
    slugEuskera: 'instalazio-termikoen-eta-fluidoen-mantentze-lanetako',
    abr: 'MITF',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10296, // ✅ CIFP Construcción - ABD, I (1º,2º)

      // Departamento Educación - BIZKAIA
      15112, // ✅ CIFP Elorrieta-Erreka Mari - A (1º,2º)
      14441, // ✅ IES Saturnino de la Peña - A (1º,2º)

      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco - AD, I (1º,2º)
      13023, // ✅ CIFP Tolosaldea - D, I (1º,2º)
      13022, // ✅ CIFP Usurbil - AD (1º,2º)

      // Privados - BIZKAIA
      14680 // ✅ CPIFP Diego Berguices-Otxarkoaga - AB (1º,2º)
    ],
    duracion: 2000
  },
  {
    codcicl: 240002,
    nom: 'Mecatrónica Industrial',
    nomEuskera: 'Mekatronika Industriala',
    slugEuskera: 'mekatronika-industrialeko',
    abr: 'MI',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10319, // ✅ IES Zaraobe - ABD, I (1º,2º - solo 1 grupo)
      10201, // ✅ CIFP Laudioalde - A (1º,2º)
      10138, // ✅ CIFP Mendizabala - AD (1º,2º)

      // Departamento Educación - BIZKAIA
      15628, // ✅ CIFP Zornotza - AD (1º,2º)
      14069, // ✅ CIFP Barakaldo - AD (1º,2º, MV)
      14279, // ✅ CIFP Andra Mari - AD, I (1º,2º)

      // Departamento Educación - GIPUZKOA
      13556, // ✅ CIFP Izarraitz - D, I (1º,2º)
      13020, // ✅ CIFP Miguel Altuna - D, I (1º,2º)
      12054, // ✅ CIFP Armería Eskola - AD, I (1º,2º)
      12763, // ✅ CIFP Maq-Herram - D, I (1º,2º)
      12468, // ✅ CIFP Don Bosco - AD, I (1º,2º)
      13023, // ✅ CIFP Tolosaldea - D, I (1º,2º)

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - AB (1º,2º,3º)

      // Privados - BIZKAIA
      14664, // ✅ CPIFP Salesianos Deusto - A (1º,2º)
      14775, // ✅ CPIFP Lea-Artibai - D (1º,2º)
      14779, // ✅ CPIFP Somorrostro - A (1º,2º)

      // Privados - GIPUZKOA
      12456, // ✅ CPIFP Mondragon Goi Esk. - D (1º,2º)
      12581, // ✅ CPIFP Goierri - D (1º,2º)
      13380, // ✅ CPIFP Oteitza Politeknikoa - D (1º,2º)
      12593 // ✅ CPIFP Urola Garaiko - D (1º,2º)
    ],
    duracion: 2000
  },
  // ✅ INSTALACIONES DE PRODUCCIÓN DE CALOR (inpc2_c.pdf)
  {
    codcicl: 240005,
    nom: 'Instalaciones de Producción de Calor',
    nomEuskera: 'Bero-Produkzioko Instalazioak',
    slugEuskera: 'bero-produkzioko-instalazioen',
    abr: 'IPC',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10296, // ✅ CIFP Construcción - A (1º,2º)

      // Departamento Educación - BIZKAIA
      15666, // ✅ CIFP Repélega - A (1º,2º)

      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco - AD, I (1º,2º)
      13022, // ✅ CIFP Usurbil - ABD (solo 1º)

      // Privados - BIZKAIA
      15069, // ✅ CPIFP Fundación Peñascal - A (solo 1º)
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga - A (solo 1º)
      14775, // ✅ CPIFP Lea-Artibai - D (1º,2º)
      14828 // ✅ CPEIPS Maristas-San Miguel - A (solo 1º)
    ],
    duracion: 2000
  },
  {
    codcicl: 240006,
    nom: 'Instalaciones Frigoríficas y de Climatización',
    nomEuskera: 'Instalazio Frigorifiko eta Klimatizaziokoak',
    slugEuskera: 'instalazio-frigorifiko-eta-klimatizaziokoen',
    abr: 'IFC',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10296, // ✅ CIFP Construcción - A (1º,2º)

      // Departamento Educación - BIZKAIA
      15666, // ✅ CIFP Repélega - A (1º,2º)

      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco - AD, I (1º,2º)
      13022, // ✅ CIFP Usurbil - B (solo 2º)

      // Privados - BIZKAIA
      15069, // ✅ CPIFP Fundación Peñascal - A (solo 2º)
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga - A (solo 2º)
      14828 // ✅ CPEIPS Maristas-San Miguel - A (solo 2º)
    ],
    duracion: 2000
  },
  {
    codcicl: 240007,
    nom: 'Desarrollo de Proyectos de Instalaciones Térmicas y de Fluidos',
    nomEuskera: 'Instalazio Termiko eta Fluidoen Proiektuen Garapena',
    slugEuskera: 'instalazio-termiko-eta-fluidoen-proiektuen-garapeneko',
    abr: 'DPITF',
    familiaCodigo: 'IMA',
    familia: 'Instalación y Mantenimiento',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15666 // ✅ CIFP Repélega - A (1º,2º)
    ],
    duracion: 2000
  },
  {
    codcicl: 290001,
    nom: 'Educación y Control Ambiental',
    nomEuskera: 'Ingurumen Hezkuntza eta Kontrola',
    slugEuskera: 'ingurumen-hezkuntza-eta-kontroleko',
    abr: 'ECA',
    familiaCodigo: 'SEA',
    familia: 'Seguridad y Medio Ambiente',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo Politeknikoa (Donostia) - BD (según edca3_c.pdf)
      
      // Privados - ARABA
      10248, // ✅ CPIFP Egibide (Vitoria) - A (según edca3_c.pdf)
      
      // Privados - BIZKAIA
      14837, // ✅ CPIFP Txorierri S. Coop. Ltda. (Derio) - B (según edca3_c.pdf)
    ],
    duracion: 2000
  },
  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO MEDIO
  // ✅ TÉCNICO EN ELECTROMECÁNICA DE VEHÍCULOS AUTOMÓVILES (320005)
{
  codcicl: 320005,
  nom: 'Electromecánica de Vehículos Automóviles',
  nomEuskera: 'Automobilen Elektromekanika',
  slugEuskera: 'automobilen-elektromekanikako',
  abr: 'EVA',
  familiaCodigo: 'TMV',
  familia: 'Transporte y Mantenimiento de Vehículos',
  grado: 'Medio',
  modalidad: 'Presencial',
  turno: 'Diurno',
  idiomas: ['ES', 'EU'],
  centros: [
    // ARABA - Departamento Educación
    10138, // ✅ Mendizabala - AD
    
    // BIZKAIA - Departamento Educación
    14088, // ✅ Bidebieta - D
    14205, // ✅ Emilio Campuzano - ABD (1º,2º,3)
    14200, // ✅ Eskurtze - A
    14301, // ✅ Fadura - AD
    14950, // ✅ Iurreta - D
    14422, // ✅ San Jorge - AD
    
    // GIPUZKOA - Departamento Educación
    13255, // ✅ Aretxabaleta - D, I
    13432, // ✅ Meka - D, I
    12468, // ✅ Don Bosco - AD, I
    
    // PRIVADOS
    10248, // ✅ Egibide - A
    14779, // ✅ Somorrostro - AB
    14824, // ✅ San Viator - A
    12529  // ✅ Ortzadar - B
  ],
  duracion: 2000
},
  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO MEDIO (ACTUALIZADO)
  // ✅ TÉCNICO EN CARROCERÍA (320004)
{
  codcicl: 320004,
  nom: 'Carrocería',
  nomEuskera: 'Karrozeria',
  slugEuskera: 'karrozeriako',
  abr: 'C',
  familiaCodigo: 'TMV',
  familia: 'Transporte y Mantenimiento de Vehículos',
  grado: 'Medio',
  modalidad: 'Presencial',
  turno: 'Diurno',
  idiomas: ['ES', 'EU'],
  centros: [
    // ARABA - Departamento Educación
    10138, // ✅ Mendizabala - A
    
    // BIZKAIA - Departamento Educación
    14088, // ✅ Bidebieta - D
    14301, // ✅ Fadura - A
    
    // GIPUZKOA - Departamento Educación
    13255, // ✅ Aretxabaleta - D
    13432, // ✅ Meka - D, I
    12468, // ✅ Don Bosco - AD
    
    // PRIVADOS
    14680, // ✅ Diego Berguices-Otxarkoaga - A
    14824, // ✅ San Viator - A
    12593  // ✅ Urola Garaiko - B (solo 1º)
  ],
  duracion: 2000
},
  {
    codcicl: 320006,
    nom: 'Mantenimiento de Material Rodante Ferroviario',
    nomEuskera: 'Trenbideko Material Mugikorraren Mantentze-lanak',
    slugEuskera: 'trenbideko-material-mugikorraren-mantentze-lanetako',
    abr: 'MMRF',
    familiaCodigo: 'TMV',
    familia: 'Transporte y Mantenimiento de Vehículos',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14069, 12497], // Se añade 12497
    duracion: 2000
  },
  // ✅ TÉCNICO EN CONDUCCIÓN DE VEHÍCULOS DE TRANSPORTE POR CARRETERA (320007) - NUEVO
{
  codcicl: 320007,
  nom: 'Conducción de Vehículos de Transporte por Carretera',
  nomEuskera: 'Errepideko Garraioko Ibilgailuen Gidatzea',
  slugEuskera: 'errepideko-garraioko-ibilgailuen-gidatzea',
  abr: 'CVTC',
  familiaCodigo: 'TMV',
  familia: 'Transporte y Mantenimiento de Vehículos',
  grado: 'Medio',
  modalidad: 'Presencial',
  turno: 'Vespertino', // ⚠️ IMPORTANTE: Solo turno vespertino
  idiomas: ['ES', 'EU'],
  centros: [
    // GIPUZKOA - Departamento Educación
    12108  // ✅ Plaiaundi - A (turno V)
  ],
  duracion: 2000
},
// ✅ TÉCNICO EN ELECTROMECÁNICA DE MAQUINARIA (320008) - NUEVO
{
  codcicl: 320008,
  nom: 'Electromecánica de Maquinaria',
  nomEuskera: 'Makinen Elektromekanika',
  slugEuskera: 'makinen-elektromekanikako',
  abr: 'EMQ',
  familiaCodigo: 'TMV',
  familia: 'Transporte y Mantenimiento de Vehículos',
  grado: 'Medio',
  modalidad: 'Presencial',
  turno: 'Diurno',
  idiomas: ['ES', 'EU'],
  centros: [
    // BIZKAIA - Departamento Educación
    14088, // ✅ Bidebieta - ABD
    
    // GIPUZKOA - Departamento Educación
    13432  // ✅ Meka - D
  ],
  duracion: 2000
},

  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO SUPERIOR
  // ✅ TÉCNICO SUPERIOR EN AUTOMOCIÓN (320001)
{
  codcicl: 320001,
  nom: 'Automoción',
  nomEuskera: 'Automozioa',
  slugEuskera: 'automozioko',
  abr: 'A',
  familiaCodigo: 'TMV',
  familia: 'Transporte y Mantenimiento de Vehículos',
  grado: 'Superior',
  modalidad: 'Presencial',
  turno: 'Diurno',
  idiomas: ['ES', 'EU'],
  centros: [
    // ARABA - Departamento Educación
    10138, // ✅ Mendizabala - AD
    
    // BIZKAIA - Departamento Educación
    14088, // ✅ Bidebieta - AD
    14200, // ✅ Eskurtze - AD
    14950, // ✅ Iurreta - D
    14422, // ✅ San Jorge - AD (solo 1º)
    
    // GIPUZKOA - Departamento Educación
    13255, // ✅ Aretxabaleta - D, I
    13432, // ✅ Meka - D, I
    12468, // ✅ Don Bosco - AD, I
    
    // PRIVADOS
    10248, // ✅ Egibide - A
    14386, // ✅ Ikasauto - A
    14779, // ✅ Somorrostro - AB
    14824, // ✅ San Viator - A
    12593  // ✅ Urola Garaiko - D (solo 1º)
  ],
  duracion: 2000
},// ✅ TÉCNICO SUPERIOR EN MANTENIMIENTO AEROMECÁNICO DE AVIONES CON MOTOR DE TURBINA (320002)
{
  codcicl: 320002,
  nom: 'Mantenimiento Aeromecánico de Aviones con Motor de Turbina',
  nomEuskera: 'Turbina Motorra duten Hegazkinen Mantentze Aeromekanikoa',
  slugEuskera: 'turbina-motorra-duten-hegazkinen-mantentze-aeromekanikoko',
  abr: 'MAAMT',
  familiaCodigo: 'TMV',
  familia: 'Transporte y Mantenimiento de Vehículos',
  grado: 'Superior',
  modalidad: 'Presencial',
  turno: 'Diurno',
  idiomas: ['ES', 'EU'],
  centros: [
    // PRIVADOS - ARABA
    10248  // ✅ Egibide - A (solo 1º)
  ],
  duracion: 2000
},
  {
    codcicl: 320003,
    nom: 'Mantenimiento de Sistemas Electrónicos y Aviónicos en Aeronaves',
    nomEuskera:
      'Hegazkinetako Sistema Elektroniko eta Avionikoen Mantentze-lanak',
    slugEuskera:
      'hegazkinetako-sistema-elektroniko-eta-avionikoen-mantentze-lanetako',
    abr: 'MSEAA',
    familiaCodigo: 'TMV',
    familia: 'Transporte y Mantenimiento de Vehículos',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14069],
    duracion: 2000
  },

  // HOSTELERÍA Y TURISMO - GRADO MEDIO
  {
    codcicl: 190006,
    nom: 'Cocina y Gastronomía',
    nomEuskera: 'Sukaldaritza eta Gastronomia',
    slugEuskera: 'sukaldaritza-eta-gastronomiako',
    abr: 'CG',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15069,15235,12491,15176,14340,10256,10248,13070],
    duracion: 2000
  },
  {
    codcicl: 190005,
    nom: 'Servicios en Restauración',
    nomEuskera: 'Jatetxe Zerbitzuak',
    slugEuskera: 'sukaldaritza-eta-jatetxeko',
    abr: 'SR',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15069,15325,12491,15176,14340,10256,10248],
    duracion: 2000
  },

  // HOSTELERÍA Y TURISMO - GRADO SUPERIOR
  {
    codcicl: 190002,
    nom: 'Dirección de Cocina',
    nomEuskera: 'Sukaldaritza Zuzendaritza',
    slugEuskera: 'sukaldaritza-zuzendaritzako',
    abr: 'DC',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15325,12491,15176,14340,10256,10248],
    duracion: 2000
  },
  {
    codcicl: 190003,
    nom: 'Dirección de Servicios de Restauración',
    nomEuskera: 'Jatetxe Zerbitzuen Zuzendaritza',
    slugEuskera: 'jatetxe-zerbitzuen-zuzendaritzako',
    abr: 'DSR',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15325,14340,13022,10256],
    duracion: 2000
  },
  {
    codcicl: 190001,
    nom: 'Gestión de Alojamientos Turísticos',
    nomEuskera: 'Ostatu Turistikoen Kudeaketa',
    slugEuskera: 'ostatu-turistikoen-kudeaketako',
    abr: 'GAT',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12982,12491,15234],
    duracion: 2000
  },
  {
    codcicl: 190004,
    nom: 'Agencias de Viajes y Gestión de Eventos',
    nomEuskera: 'Bidaia Agentziak eta Ekitaldi Kudeaketa',
    slugEuskera: 'bidaia-agentzietako-eta-ekitaldien-kudeaketako',
    abr: 'AVGE',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15112,14631,14635,12982],
    duracion: 2000
  },
  {
    codcicl: 60007,
    nom: 'Guía, Información y Asistencias Turísticas',
    nomEuskera: 'Gida, Informazio eta Turismo Laguntzak',
    slugEuskera: 'gida-informazio-eta-turismo-laguntzako',
    abr: 'GIAT',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [15112,14635,14631,12982, 10134],
    duracion: 2000
  },

  // IMAGEN PERSONAL - GRADO MEDIO
  {
    codcicl: 200004,
    nom: 'Peluquería y Cosmética Capilar',
    nomEuskera: 'Ile-apainketa eta Kosmetika Kapilarra',
    slugEuskera: 'ile-apainketa-eta-kosmetika-kapilarreko',
    abr: 'PCC',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo (según pcoc2_c.pdf)
      14422, // ✅ CIFP San Jorge (Santurtzi) (según pcoc2_c.pdf)

      // Departamento Educación - GIPUZKOA
      12291, // ✅ CIFP Monte Albertia (Zarautz) (según pcoc2_c.pdf)

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide (según pcoc2_c.pdf)

      // Privados - BIZKAIA
      14621, // ✅ CPES Arce (según pcoc2_c.pdf)
      14643, // ✅ CPES Fernando (según pcoc2_c.pdf)
      14648, // ✅ CPES Hermanos Larrinaga (según pcoc2_c.pdf)
      14635, // ✅ CPES Sopeña-Bilbao (según pcoc2_c.pdf)

      // Privados - GIPUZKOA
      12756, // ✅ CPES C. Estud. de Pelu. y Est. Beta (Donostia) (según pcoc2_c.pdf)
      13500 // ✅ CPES Centro Formación Mendibil (Irun) (según pcoc2_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 200003,
    nom: 'Estética y Belleza',
    nomEuskera: 'Estetika eta Edertasuna',
    slugEuskera: 'estetika-eta-edertasuneko',
    abr: 'EB',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10351, // ✅ IES Laudio (según esbe2_c.pdf)
      10138, // ✅ CIFP Mendizabala (según esbe2_c.pdf)

      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo (según esbe2_c.pdf)

      // Departamento Educación - GIPUZKOA
      12291, // ✅ CIFP Monte Albertia (Zarautz) (según esbe2_c.pdf)

      // Privados - BIZKAIA
      14621, // ✅ CPES Arce (según esbe2_c.pdf)
      14648, // ✅ CPES Hermanos Larrinaga (según esbe2_c.pdf)

      // Privados - GIPUZKOA
      12756, // ✅ CPES C. Estud. de Pelu. y Est. Beta (Donostia) (según esbe2_c.pdf)
      13500 // ✅ CPES Centro Formación Mendibil (Irun) (según esbe2_c.pdf)
    ],
    duracion: 2000
  },
  // IMAGEN PERSONAL - GRADO SUPERIOR
  {
    codcicl: 70003,
    nom: 'Estética Integral y Bienestar',
    nomEuskera: 'Estetika Integral eta Ongizatea',
    slugEuskera: 'estetika-integral-eta-ongizatearen',
    abr: 'EIB',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo (según esib3_c.pdf)

      // Departamento Educación - GIPUZKOA
      12291, // ✅ CIFP Monte Albertia (Zarautz) (según esib3_c.pdf)

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide (según esib3_c.pdf)

      // Privados - BIZKAIA
      14621 // ✅ CPES Arce (según esib3_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 200001,
    nom: 'Estilismo y Dirección de Peluquería',
    nomEuskera: 'Ile-apainketako Estilismoa eta Zuzendaritza',
    slugEuskera: 'ile-apainketako-estilismoa-eta-zuzendaritzako',
    abr: 'EDP',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10138, // ✅ CIFP Mendizabala (según edpe3_c.pdf)

      // Departamento Educación - BIZKAIA
      14422, // ✅ CIFP San Jorge (Santurtzi) (según edpe3_c.pdf)

      // Departamento Educación - GIPUZKOA
      12291 // ✅ CIFP Monte Albertia (Zarautz) (según edpe3_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 70005,
    nom: 'Caracterización y Maquillaje Profesional',
    nomEuskera: 'Karakterizazioa eta Makillaje Profesionala',
    slugEuskera: 'karakterizazioa-eta-makillaje-profesionaleko',
    abr: 'CMP',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14422, // ✅ CIFP San Jorge (Santurtzi) (según camp3_c.pdf)

      // Departamento Educación - GIPUZKOA
      12291 // ✅ CIFP Monte Albertia (Zarautz) (según camp3_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 200002,
    nom: 'Asesoría de Imagen Personal y Corporativa',
    nomEuskera: 'Irudi Pertsonal eta Korporatiboaren Aholkularitza',
    slugEuskera: 'irudi-pertsonal-eta-korporatiboaren-aholkularitzako',
    abr: 'AIPC',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10138, // ✅ CIFP Mendizabala (según aipc3_c.pdf)

      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo (según aipc3_c.pdf)

      // Departamento Educación - GIPUZKOA
      12291, // ✅ CIFP Monte Albertia (Zarautz) (según aipc3_c.pdf)

      // Privados - BIZKAIA
      14622 // ✅ CPES Armengol (según aipc3_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 70006,
    nom: 'Termalismo y Bienestar',
    nomEuskera: 'Termalismoaren eta Ongizatea',
    slugEuskera: 'termalismoaren-eta-ongizatearen',
    abr: 'TB',
    familiaCodigo: 'IMP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12291 // ✅ CIFP Monte Albertia (Zarautz) (según tebi3_c.pdf)
    ],
    duracion: 2000
  },

  // INDUSTRIAS ALIMENTARIAS - GRADO MEDIO (ACTUALIZADO)
  {
    codcicl: 220003,
    nom: 'Panadería, Repostería y Confitería',
    nomEuskera: 'Okintza, Gozogintza eta Konfiteria',
    slugEuskera: 'okintza-gozogintza-eta-konfiteriako',
    abr: 'PRC',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10256, // ✅ CIFP Hostelería (Vitoria) - ABD (AÑADIDO según parc2_c.pdf)

      // Departamento Educación - BIZKAIA
      15176, // ✅ CIFP Hostelería/Ostalaritza (Galdakao) - ABD (AÑADIDO turno MV)
      14340, // ✅ CIFP Escuela de Hostelería (Leioa) - A (AÑADIDO según parc2_c.pdf)

      // Privados - GIPUZKOA
      12491 // ✅ CPES C.D.E.A. (Donostia) - A (AÑADIDO según parc2_c.pdf)

      // ELIMINADOS: 10254, 13456 (NO aparecen en el PDF)
    ],
    duracion: 2000
  },
  {
    codcicl: 22000002, // ✅ NUEVO CICLO
    nom: 'Industrias Alimentarias - Carnicería - Charcutería',
    nomEuskera: 'Elikagaien Industriak - Haragigintza - Haragijatorriak',
    slugEuskera: 'elikagaien-industriak-haragigintza-haragijatorriak',
    abr: 'INAL-B',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14340, // ✅ CIFP Escuela de Hostelería (Leioa) - A (solo 1º)

      // Privados - BIZKAIA
      15069 // ✅ CPIFP Fundación Peñascal - A
    ],
    duracion: 2000
  },

  {
    codcicl: 220004, // ✅ NUEVO CICLO
    nom: 'Aceites de Oliva y Vinos',
    nomEuskera: 'Oliba Olioak eta Ardoak',
    slugEuskera: 'oliba-olioak-eta-ardoak',
    abr: 'ACOV',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10349 // ✅ IES Samaniego-Laguardia - AD (solo 1º)
    ],
    duracion: 2000
  },

  {
    codcicl: 220005, // ✅ NUEVO CICLO
    nom: 'Elaboración de Productos Alimenticios',
    nomEuskera: 'Elikagai Produktuen Lantzea',
    slugEuskera: 'elikagai-produktuen-lantzea',
    abr: 'ELPA',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14340, // ✅ CIFP Escuela de Hostelería (Leioa) - A (solo 1º)

      // Departamento Educación - GIPUZKOA
      12040, // ✅ CIFP Fraisoro Eskola (Zizurkil) - D

      // Privados - BIZKAIA
      14775 // ✅ CPIFP Lea-Artibai (Markina) - B (solo 1º)
    ],
    duracion: 2000
  },

  // INDUSTRIAS ALIMENTARIAS - GRADO SUPERIOR (NUEVO)
  {
    codcicl: 220001,
    nom: 'Vitivinicultura',
    nomEuskera: 'Mahasigintza eta Ardogintza',
    slugEuskera: 'mahasigintza-eta-ardogintza',
    abr: 'VV',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10108 // ✅ Instituto Agrario Arkaute (ya estaba correcto)
    ],
    duracion: 2000
  },

  {
    codcicl: 220002, // ✅ NUEVO CICLO
    nom: 'Procesos y Calidad en la Industria Alimentaria',
    nomEuskera: 'Elikagaien Industriako Prozesuak eta Kalitatea',
    slugEuskera: 'elikagaien-industriako-prozesuak-eta-kalitatea',
    abr: 'PCIA',
    familiaCodigo: 'INA',
    familia: 'Industrias Alimentarias',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco (Errenteria) - AD I

      // Privados - BIZKAIA
      14775 // ✅ CPIFP Lea-Artibai (Markina) - B
    ],
    duracion: 2000
  },

  // MADERA, MUEBLE Y CORCHO - GRADO SUPERIOR (NUEVO)
  {
    codcicl: 250001,
    nom: 'Diseño y Amueblamiento',
    nomEuskera: 'Diseinua eta Altzariak',
    slugEuskera: 'zura-eta-altzarien-ekoizpenaren-diseinua-eta-kudeaketako',
    abr: 'DGPM',
    familiaCodigo: 'MMC',
    familia: 'Madera, Mueble y Corcho',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      13556, // ✅ CIFP Izarraitz (Azkoitia) - D (solo 1º)
      12229, // ✅ CIFP Politécnico Easo (Donostia) - AD
      13021, // ✅ CIFP Bidasoa (Irun) - ABD

      // Privados - BIZKAIA
      15069 // ✅ CPIFP Fundación Peñascal - AD (solo 1º)
    ],
    duracion: 2000
  },
  {
    codcicl: 250003,
    nom: 'Instalación y Amueblamiento',
    nomEuskera: 'Instalazioa eta Altzariak',
    slugEuskera: 'instalazioa-eta-altzarietako',
    abr: 'INAM',
    familiaCodigo: 'MMC',
    familia: 'Madera, Mueble y Corcho',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10296, // ✅ CIFP Construcción (Vitoria) - A

      // Departamento Educación - BIZKAIA
      15021, // ✅ IES Barrutialde (Arratzu) - D (solo 2º)
      14069, // ✅ CIFP Barakaldo - A

      // Departamento Educación - GIPUZKOA
      13556, // ✅ CIFP Izarraitz (Azkoitia) - D (solo 2º)
      12229, // ✅ CIFP Politécnico Easo (Donostia) - D
      13021, // ✅ CIFP Bidasoa (Irun) - ABD I (inglés)

      // Privados - BIZKAIA
      15069, // ✅ CPIFP Fundación Peñascal - A (solo 1º)
      14680 // ✅ CPIFP Diego Berguices-Otxarkoaga - AB (solo 2º)
    ],
    duracion: 2000
  },

  // MARÍTIMO PESQUERA - GRADO MEDIO (NUEVO)
  {
    codcicl: 260003,
    nom: 'Mantenimiento y Control de la Maquinaria de Buques y Embarcaciones',
    nomEuskera: 'Ontzi eta Itsasontzien Makinen Mantentze-lanak eta Kontrola',
    slugEuskera: 'ontzi-eta-itsasontzien-makinen-mantentze-lanak-eta-kontrola',
    abr: 'MCMBE',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14601, // ✅ CIFP Náutico Pesquera (Bermeo) - A

      // Departamento Educación - GIPUZKOA
      12151, // ✅ CIFP Náutico Pesquero de Pasaia - A

      // Privados - BIZKAIA
      14781 // ✅ CPES Ntra. Sra. de la Antigua (Ondarroa) - B
    ],
    duracion: 2000
  },
  // MARÍTIMO PESQUERA - GRADO SUPERIOR (NUEVO)
  {
    codcicl: 26000001,
    nom: 'Actividades Marítimo Pesqueras',
    nomEuskera: 'Itsasoko eta Arrantzako Jarduerak',
    slugEuskera: 'itsasoko-eta-arrantzako-jarduerak',
    abr: 'AMP-B',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14601, // ✅ CIFP Náutico Pesquera (Bermeo) - AD

      // Departamento Educación - GIPUZKOA
      12151, // ✅ CIFP Náutico Pesquero de Pasaia - AD

      // Privados - BIZKAIA
      14781 // ✅ CPES Ntra. Sra. de la Antigua (Ondarroa) - B
    ],
    duracion: 2000
  },
  // SANIDAD - GRADO MEDIO
  // ============================================
  // SANIDAD - ACTUALIZACIONES COMPLETAS
  // ============================================

  // SANIDAD - GRADO MEDIO

  // ✅ CUIDADOS AUXILIARES DE ENFERMERÍA (en2_c.pdf)
  {
    codcicl: 80001,
    nom: 'Cuidados Auxiliares de Enfermería',
    nomEuskera: 'Erizaintzako Laguntza Lanak',
    slugEuskera: 'erizaintzako-laguntza-lanetako',
    abr: 'CAE',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10349, // ✅ IES Samaniego-Laguardia - AD
      10134, // ✅ IES Francisco de Vitoria - AD

      // Departamento Educación - BIZKAIA
      15628, // ✅ CIFP Zornotza - AD
      14069, // ✅ CIFP Barakaldo - AD
      14088, // ✅ CIFP Bidebieta - AD (turno MN, incluye 3º)
      14301, // ✅ CIFP Fadura - AD
      15623, // ✅ IES Ondarroa - D

      // Departamento Educación - GIPUZKOA
      13255, // ✅ CIFP Aretxabaleta - D I
      13556, // ✅ CIFP Izarraitz - AD
      12229, // ✅ CIFP Politécnico Easo - AD
      13432, // ✅ CIFP Meka - AD
      12108, // ✅ CIFP Plaiaundi - AD
      12286, // ✅ IES J.M. Iparragirre - ABD

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - AB (turno MN, incluye 3º)

      // Privados - BIZKAIA
      14619, // ✅ CPEIPS Angeles Custodios - AB
      14615, // ✅ CPES Almi - A
      15326, // ✅ CPES Bagabiltza (Bilbao) - A
      14633, // ✅ CPES Cruz Roja - AB
      14665, // ✅ CPES María Inmaculada - A
      14680, // ✅ CPIFP Diego Berguices-Otxarkoaga - B
      14810, // ✅ CPIFP Calasanz - A
      15385, // ✅ CPES Bagabiltza (Sestao) - A
      15337, // ✅ CPES Bagabiltza (Zalla) - AB

      // Privados - GIPUZKOA
      12345, // ✅ CPEIPS San Frantzisko Xabier - A
      12544, // ✅ CPES Elizaran - BD
      12490, // ✅ CPIFP Nazaret - D
      12432, // ✅ CPEIPS Aratz Ikastola - A
      12566 // ✅ CPIFP Tolosako Inmakulada - D
    ],
    duracion: 2000
  },
  // ✅ FARMACIA Y PARAFARMACIA (fapa2_c.pdf)
  {
    codcicl: 280004,
    nom: 'Farmacia y Parafarmacia',
    nomEuskera: 'Farmazia eta Parafarmazia',
    slugEuskera: 'farmazia-eta-parafarmazia',
    abr: 'FP',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10134, // ✅ IES Francisco de Vitoria - A

      // Departamento Educación - BIZKAIA
      14339, // ✅ IES Jose Miguel Barandiaran - AD
      14398, // ✅ IES Juan Antonio Zunzunegui - A

      // Departamento Educación - GIPUZKOA
      12108, // ✅ CIFP Plaiaundi - AD

      // Privados - BIZKAIA
      14619, // ✅ CPEIPS Angeles Custodios - A
      14620, // ✅ CPES Arangoya - B (solo 1º)
      14810, // ✅ CPIFP Calasanz - B

      // Privados - GIPUZKOA
      12566 // ✅ CPIFP Tolosako Inmakulada - D
    ],
    duracion: 2000
  },
  // ✅ EMERGENCIAS SANITARIAS (emsa2_c.pdf)
  {
    codcicl: 280005,
    nom: 'Emergencias Sanitarias',
    nomEuskera: 'Osasun Larrialdiak',
    slugEuskera: 'osasun-larrialdietako',
    abr: 'ES',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia) - A
      10134, // ✅ IES Francisco de Vitoria - AD I

      // Departamento Educación - BIZKAIA
      14301, // ✅ CIFP Fadura - AD

      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo - AD

      // Privados - BIZKAIA
      14633, // ✅ CPES Cruz Roja - A
      14810, // ✅ CPIFP Calasanz - BD

      // Privados - GIPUZKOA
      12345 // ✅ CPEIPS San Frantzisko Xabier - B
    ],
    duracion: 2000
  },
  // ✅ DOCUMENTACIÓN Y ADMINISTRACIÓN SANITARIAS (dads3_c.pdf)
  {
    codcicl: 280006,
    nom: 'Documentación y Administración Sanitarias',
    nomEuskera: 'Osasun Dokumentazioa eta Administrazioa',
    slugEuskera: 'osasun-dokumentazioa-eta-administrazioko',
    abr: 'DAS',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14301, // ✅ CIFP Fadura - A

      // Privados - BIZKAIA
      14619, // ✅ CPEIPS Angeles Custodios - D
      14810, // ✅ CPIFP Calasanz - A
    
      // Privados - GIPUZKOA
      12490, // ✅ CPIFP Nazaret - D
      12566 // ✅ CPIFP Tolosako Inmakulada - D
    ],
    duracion: 2000
  },
  // ✅ LABORATORIO CLÍNICO Y BIOMÉDICO (lacb3_c.pdf)
  {
    codcicl: 80003,
    nom: 'Laboratorio Clínico y Biomédico',
    nomEuskera: 'Laboratorio Kliniko eta Biomedikoa',
    slugEuskera: 'laboratorio-kliniko-eta-biomedikoko',
    abr: 'LCB',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga - AD (turno MV)

      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo - AD I (turno V)
      12108, // ✅ CIFP Plaiaundi - AD

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - A

      // Privados - BIZKAIA
      14633, // ✅ CPES Cruz Roja - B
      14634, // ✅ CPIFP Jesuitak Politeknikoa - B (turno V)
      14718, // ✅ CPIFP Zabalburu - B
      14810 // ✅ CPIFP Calasanz - B
    ],
    duracion: 2000
  },
  // ✅ DIETÉTICA (di3_c.pdf)
  {
    codcicl: 80012,
    nom: 'Dietética',
    nomEuskera: 'Dietetika',
    slugEuskera: 'dietetikako',
    abr: 'DIE',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10134, // ✅ IES Francisco de Vitoria - A

      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo - AD
      14339, // ✅ IES Jose Miguel Barandiaran - AD

      // Departamento Educación - GIPUZKOA
      13432, // ✅ CIFP Meka - D
      12108, // ✅ CIFP Plaiaundi - A

      // Privados - BIZKAIA
      14615, // ✅ CPES Almi - AB (solo 1º)
      14633, // ✅ CPES Cruz Roja - A

      // Privados - GIPUZKOA
      12497, // ✅ CPIFP Cebanc - B
      13656 // ✅ CEPS Gainberri Kirol Heziketa - D (solo 1º)
    ],
    duracion: 2000
  },
  // SANIDAD - GRADO SUPERIOR
  // ✅ ANATOMÍA PATOLÓGICA Y CITODIAGNÓSTICO (anpa3_c.pdf)
  {
    codcicl: 80004,
    nom: 'Anatomía Patológica y Citodiagnóstico',
    nomEuskera: 'Anatomia Patologikoa eta Zitodiagnostikoa',
    slugEuskera: 'anatomia-patologikoa-eta-zitodiagnostikoko',
    abr: 'APCD',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo - D I

      // Privados - BIZKAIA
      14620, // ✅ CPES Arangoya - A
      14634 // ✅ CPIFP Jesuitak Politeknikoa - B
    ],
    duracion: 2000
  },
  // ✅ IMAGEN PARA EL DIAGNÓSTICO Y MEDICINA NUCLEAR (idmn3_c.pdf)
  {
    codcicl: 80005,
    nom: 'Imagen para el Diagnóstico y Medicina Nuclear',
    nomEuskera: 'Diagnostikorako Irudia eta Mediku Nuklearra',
    slugEuskera: 'diagnostikorako-irudia-eta-mediku-nuklearreko',
    abr: 'IDMN',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - BIZKAIA
      14810, // ✅ CPIFP Calasanz - A

      // Privados - GIPUZKOA
      12566 // ✅ CPIFP Tolosako Inmakulada - D
    ],
    duracion: 2000
  },
  // ✅ RADIOTERAPIA Y DOSIMETRÍA (rado3_c.pdf)
  {
    codcicl: 80006,
    nom: 'Radioterapia y Dosimetría',
    nomEuskera: 'Erradioterapia eta Dosimetria',
    slugEuskera: 'erradioterapia-eta-dosimetriako',
    abr: 'RD',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga - A (turno V)

      // Privados - BIZKAIA
      14810, // ✅ CPIFP Calasanz - B (turno V)

      // Privados - GIPUZKOA
      12566 // ✅ CPIFP Tolosako Inmakulada - D (solo 1º)
    ],
    duracion: 2000
  },
  // ✅ HIGIENE BUCODENTAL (higb3_c.pdf)
  {
    codcicl: 280007,
    nom: 'Higiene Bucodental',
    nomEuskera: 'Aho-Higienea',
    slugEuskera: 'aho-higieneko',
    abr: 'HB',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10134, // ✅ IES Francisco de Vitoria - AD

      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo - AD

      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo - AD

      // Privados - BIZKAIA
      14619 // ✅ CPEIPS Angeles Custodios - B
    ],
    duracion: 2000
  },
  // ✅ PRÓTESIS DENTALES (prde3_c.pdf)
  {
    codcicl: 280008,
    nom: 'Prótesis Dentales',
    nomEuskera: 'Hortz-Protesiak',
    slugEuskera: 'hortz-protesiako',
    abr: 'PD',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10134 // ✅ IES Francisco de Vitoria - D
    ],
    duracion: 2000
  },
  // ✅ AUDIOLOGÍA PROTÉSICA (aupr3_c.pdf)
  {
    codcicl: 80009,
    nom: 'Audiología Protésica',
    nomEuskera: 'Audiologia Protesikoa',
    slugEuskera: 'audiologia-protesikoko',
    abr: 'AP',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - GIPUZKOA
      12566 // ✅ CPIFP Tolosako Inmakulada - D,
      ,14339
    ],
    duracion: 2000
  },
  // ✅ ORTOPRÓTESIS Y PRODUCTOS DE APOYO (opap3_c.pdf) - NUEVO CICLO
  {
    codcicl: 280009,
    nom: 'Ortoprótesis y Productos de Apoyo',
    nomEuskera: 'Ortoprotesiak eta Laguntza Produktuak',
    slugEuskera: 'ortoprotesiak-eta-laguntza-produktuak',
    abr: 'OPA',
    familiaCodigo: 'SAN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - A
      14339,
      // Privados - GIPUZKOA
      12593 // ✅ CPIFP Urola Garaiko - A (solo 2º)
    ],
    duracion: 2000
  },
  // SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD - GRADO BÁSICO (ACTUALIZADO)
  {
    codcicl: 30000001,
    nom: 'Servicios Comerciales',
    nomEuskera: 'Merkataritza Zerbitzuak',
    slugEuskera: 'merkataritza-zerbitzuetako',
    abr: 'SC',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14615, 14669, 15037, 12544, 13015, 13432, 13542], // Se añade 15037
    duracion: 2000
  },

  // SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD - GRADO MEDIO (ACTUALIZADO)
  {
    codcicl: 300004,
    nom: 'Atención a Personas en Situación de Dependencia',
    nomEuskera: 'Mendekotasun Egoeran dauden Pertsonen Arreta',
    slugEuskera: 'mendekotasun-egoeran-dauden-pertsonen-arretako',
    abr: 'APSD',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10319, // ✅ IES Zaraobe - AD (AÑADIDO)
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia) - AD (AÑADIDO)
      10134, // ✅ IES Francisco de Vitoria - A (AÑADIDO)
      
      // Departamento Educación - BIZKAIA
      14200, // ✅ IES Eskurtze - AD (AÑADIDO)
      14320, // ✅ IES Gernika - D (AÑADIDO)
      14950, // ✅ CIFP Iurreta - D (AÑADIDO)
      
      // Departamento Educación - GIPUZKOA
      12740, // ✅ IES Leizaran - D (AÑADIDO)
      13255, // ✅ CIFP Aretxabaleta - B (AÑADIDO)
      13556, // ✅ CIFP Izarraitz - D (AÑADIDO)
      12229, // ✅ CIFP Politécnico Easo - D (AÑADIDO)
      13432, // ✅ CIFP Meka - D (AÑADIDO)
      12108, // ✅ CIFP Plaiaundi - AD (MV) (AÑADIDO)
      
      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - A (AÑADIDO)
      
      // Privados - BIZKAIA
      15476, // ✅ CPES Bagabiltza (Balmaseda) - A (solo 1º) (AÑADIDO)
      14633, // ✅ CPES Cruz Roja - D (AÑADIDO)
      14665, // ✅ CPES María Inmaculada - A (AÑADIDO)
      14775, // ✅ CPIFP Lea-Artibai - D (solo 1º) (AÑADIDO)
      14779, // ✅ CPIFP Somorrostro - A (AÑADIDO)
      14810, // ✅ CPIFP Calasanz - A (AÑADIDO)
      14824, // ✅ CPIFP San Viator - B (AÑADIDO)
      14723, // ✅ CPIFP Arratiako Zulaibar - B (AÑADIDO)
      
      // Privados - GIPUZKOA
      12380, // ✅ CPEIPS Mariaren Lagundia Ikastola - D (AÑADIDO)
      12497, // ✅ CPIFP Cebanc - AD (solo 1º) (AÑADIDO)
      12581, // ✅ CPIFP Goierri - B (AÑADIDO)
      12566, // ✅ CPIFP Tolosako Inmakulada - D (AÑADIDO)
    ],
    duracion: 2000
  },

  // SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD - GRADO SUPERIOR
  {
    codcicl: 300002,
    nom: 'Educación Infantil',
    nomEuskera: 'Haur Hezkuntza',
    slugEuskera: 'haur-hezkuntzako',
    abr: 'EI',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10134, // ✅ IES Francisco de Vitoria - D (AÑADIDO)
      
      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo - D I (AÑADIDO)
      14200, // ✅ IES Eskurtze - D I (AÑADIDO)
      14320, // ✅ IES Gernika - D (AÑADIDO)
      14301, // ✅ CIFP Fadura - D (AÑADIDO)
      15623, // ✅ IES Ondarroa - D (AÑADIDO)
      
      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo Politeknikoa - D (V - vespertino) (AÑADIDO)
      13432, // ✅ CIFP Meka - D (AÑADIDO)
      12108, // ✅ CIFP Plaiaundi - D (AÑADIDO)
      12282, // ✅ IES Oianguren - D (AÑADIDO)
      
      // Privados - ARABA
      10229, // ✅ CPEIPS Carmelitas-Sagrado Corazón - A (AÑADIDO)
      10228, // ✅ CPEIPS Presentación de Maria - D (AÑADIDO)
      
      // Privados - BIZKAIA
      14620, // ✅ CPES Arangoya - A (AÑADIDO)
      14665, // ✅ CPES María Inmaculada - AB (AÑADIDO)
      15220, // ✅ CPES Ibaizabal Koop. E. Ikastola - D (AÑADIDO)
      14810, // ✅ CPIFP Calasanz Lanbide Ikastegia - D (AÑADIDO)
      14824, // ✅ CPIFP San Viator - B (AÑADIDO)
    ],
    duracion: 2000
  },
  {
    codcicl: 300007, // 
    nom: 'Formación para la Movilidad Segura y Sostenible',
    nomEuskera: 'Mugikortasun Seguru eta Jasangarrirako Prestakuntza',
    slugEuskera: 'mugikortasun-seguru-eta-jasangarrirako-prestakuntzako',
    abr: 'FMSS',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Vespertino', // IMPORTANTE: Solo turno vespertino
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10137, // ✅ CIFP Ciudad Jardín - A (V)
      
      // Departamento Educación - BIZKAIA
      15112, // ✅ CIFP Elorrieta-Erreka Mari - D (V)
      
      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco - D (M) ⚠️ MATUTINO, NO VESPERTINO
    ],
    duracion: 2000
  },
  {
    codcicl: 300001,
    nom: 'Integración Social',
    nomEuskera: 'Gizarte Integrazioa',
    slugEuskera: 'gizarte-integrazioko',
    abr: 'IS',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10319, // ✅ IES Zaraobe - AD (AÑADIDO)
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia) - AD (AÑADIDO)
      10134, // ✅ IES Francisco de Vitoria - AD (AÑADIDO)
      
      // Departamento Educación - BIZKAIA
      15763, // ✅ CIFP Txurdinaga - AD (V) (AÑADIDO)
      15630, // ✅ CIFP Tartanga - AD (AÑADIDO)
      15623, // ✅ IES Ondarroa - D (AÑADIDO)
      
      // Departamento Educación - GIPUZKOA
      12740, // ✅ IES Leizaran - AD (AÑADIDO)
      13556, // ✅ CIFP Izarraitz - D I (AÑADIDO)
      12229, // ✅ CIFP Politécnico Easo - D (AÑADIDO)
      13432, // ✅ CIFP Meka - D (AÑADIDO)
      12108, // ✅ CIFP Plaiaundi - AD (MV) (AÑADIDO)
      
      // Privados - ARABA
      10248, // ✅ CPIFP Egibide - A (AÑADIDO)
      
      // Privados - BIZKAIA
      14633, // ✅ CPES Cruz Roja - B (AÑADIDO)
      14696, // ✅ CPES San Luis - D (AÑADIDO)
      14704, // ✅ CPES Sta. María de Artagan - B (AÑADIDO)
      15220, // ✅ CPES Ibaizabal Koop. E. Ikastola - D (AÑADIDO)
      14810, // ✅ CPIFP Calasanz - B (AÑADIDO)
      14723, // ✅ CPIFP Arratiako Zulaibar - B (AÑADIDO)
      
      // Privados - GIPUZKOA
      12380, // ✅ CPEIPS Mariaren Lagundia Ikastola - D (AÑADIDO)
      12490, // ✅ CPIFP Nazaret - AD (AÑADIDO)
      12566, // ✅ CPIFP Tolosako Inmakulada - D (AÑADIDO)
    ],
    duracion: 2000
  },
  {
    codcicl: 300003,
    nom: 'Promoción de Igualdad de Género',
    nomEuskera: 'Generoko Berdintasuna Sustatzea',
    slugEuskera: 'generoko-berdintasuna-sustatzearen',
    abr: 'PIG',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10248, 13015, 15037, 15307],
    duracion: 2000
  },
  {
    codcicl: 300006,
    nom: 'Mediación Comunicativa',
    nomEuskera: 'Komunikazio Bitartekaritza',
    slugEuskera: 'komunikazio-bitartekaritzan',
    abr: 'MC',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10134, // ✅ IES Francisco de Vitoria - D (AÑADIDO)
      
      // Departamento Educación - BIZKAIA
      14069, // ✅ CIFP Barakaldo - D (V) (AÑADIDO)
      
      // Departamento Educación - GIPUZKOA
      13432, // ✅ CIFP Meka - D (AÑADIDO)
    ],
    duracion: 2000
  },
  {
    codcicl: 90003,
    nom: 'Animación Sociocultural y Turística',
    nomEuskera: 'Animazio Soziokultural eta Turistikoa',
    slugEuskera: 'animazio-soziokultural-eta-turistikoko',
    abr: 'ASCT',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15188, // ✅ IES Ibarrekolanda - D (AÑADIDO)
      14441, // ✅ IES Saturnino de la Peña - ABD (AÑADIDO)
      
      // Departamento Educación - GIPUZKOA
      13534, // ✅ CIFP de Innovación Social - D (YA ESTABA)
    ],
    duracion: 2000
  },
  // EDIFICACIÓN Y OBRA CIVIL - GRADO MEDIO
  {
    codcicl: 150003,
    nom: 'Obras de Interior, Decoración y Rehabilitación',
    nomEuskera: 'Barne-lanak, Dekorazioa eta Birgaitze-lanak',
    slugEuskera: 'barne-lanak-dekorazioa-eta-birgaitze-lanetako',
    abr: 'OIDR',
    familiaCodigo: 'EOC',
    familia: 'Edificación y Obra Civil',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10296, // ✅ CIFP Construcción (Vitoria) - A (AÑADIDO)
      14945, // ✅ CIFP Construcción Bizkaia (Arrigorriaga) - A (AÑADIDO)
      13532 // ✅ CIFP Des. Sostenible (Lasarte-Oria) - ABD (AÑADIDO)
      // ELIMINAR: 15307 (NO aparece en el PDF)
    ],
    duracion: 2000
  },
  {
    codcicl: 150004, // ⚠️ Asignar código correcto
    nom: 'Construcción',
    nomEuskera: 'Eraikuntza',
    slugEuskera: 'eraikuntzako',
    abr: 'CONS',
    familiaCodigo: 'EOC',
    familia: 'Edificación y Obra Civil',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10296, // ✅ CIFP Construcción (Vitoria) - A
      14945, // ✅ CIFP Construcción Bizkaia (Arrigorriaga) - A
      13532 // ✅ CIFP Des. Sostenible (Lasarte-Oria) - ABD
    ],
    duracion: 2000
  },

  // EDIFICACIÓN Y OBRA CIVIL - GRADO SUPERIOR
  {
    codcicl: 100002,
    nom: 'Proyectos de Obra Civil',
    nomEuskera: 'Obra Zibileko Proiektuak',
    slugEuskera: 'obra-zibileko-proiektuen',
    abr: 'POC',
    familiaCodigo: 'EOC',
    familia: 'Edificación y Obra Civil',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10296, // ✅ CIFP Construcción (Vitoria) - AD, I (AÑADIDO)
      14069, // ✅ CIFP Barakaldo - A (AÑADIDO)
      15112, // ✅ CIFP Elorrieta-Erreka Mari (Bilbao) - D (AÑADIDO)
      13532 // ✅ CIFP Des. Sostenible (Lasarte-Oria) - D (AÑADIDO)
      // ELIMINAR: 12053, 12229, 15305, 15414 (NO aparecen en el PDF)
    ],
    duracion: 2000
  },
  {
    codcicl: 100004,
    nom: 'Proyectos de Edificación',
    nomEuskera: 'Eraikuntza Proiektuak',
    slugEuskera: 'eraikuntza-proiektuen',
    abr: 'POC',
    familiaCodigo: 'EOC',
    familia: 'Edificación y Obra Civil',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14945,
      14205,
      12229,
      10296, // ✅ CIFP Construcción (Vitoria) - AD, I (AÑADIDO)
      14069, // ✅ CIFP Barakaldo - A (AÑADIDO)

    ],
    duracion: 2000
  },
  {
    codcicl: 100003, // ⚠️ Asignar código correcto
    nom: 'Organización y Control de Obras de Construcción',
    nomEuskera: 'Eraikuntza Obren Antolaketa eta Kontrola',
    slugEuskera: 'eraikuntza-obren-antolaketa-eta-kontroleko',
    abr: 'OCOC',
    familiaCodigo: 'EOC',
    familia: 'Edificación y Obra Civil',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10296, // ✅ CIFP Construcción (Vitoria) - AD, I
      14945, // ✅ CIFP Construcción Bizkaia (Arrigorriaga) - A
      13532 // ✅ CIFP Des. Sostenible (Lasarte-Oria) - AD
    ],
    duracion: 2000
  },
  // ENERGÍA Y AGUA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 170001,
    nom: 'Eficiencia Energértica y Energía Solar Térmica',
    nomEuskera: 'Energia Eraginkortasuna eta Eguzki Energia Termikoa',
    slugEuskera: 'energia-eraginkortasuna-eta-eguzki-energia-termikoen',
    abr: 'EEEST',
    familiaCodigo: 'ENA',
    familia: 'Energí­a y Agua',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10296, 15763, 15666, 13022,
      // Privados
      14775, 14828
    ],
    duracion: 2000
  },
  {
    codcicl: 170002,
    nom: 'Energías Renovables',
    nomEuskera: 'Energia Berriztagarriak',
    slugEuskera: 'energia-berriztagarrien',
    abr: 'ER',
    familiaCodigo: 'ENA',
    familia: 'Energía y Agua',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10296, 15763, 14422, 13022,
      // Privados
      14779
    ],
    duracion: 2000
  },
  // ENERGÍA Y AGUA - GRADO MEDIO (NUEVO)
  {
    codcicl: 170003,
    nom: 'Redes y Estaciones de Tratamiento de Aguas',
    nomEuskera: 'Sareak eta Ur-Tratamendurako Estazioak',
    slugEuskera: 'sareak-eta-ur-tratamendurako-estazioen',
    abr: 'RETA',
    familiaCodigo: 'ENA',
    familia: 'Energía y Agua',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12229],
    duracion: 2000
  },

  // ENERGÍA Y AGUA - GRADO BÁSICO (NUEVO)
  {
    codcicl: 17000001,
    nom: 'Mantenimiento de Vehículos y Motores',
    nomEuskera: 'Ibilgailu eta Motorren Mantentze Lanaren Oinarrizko Zikloa',
    slugEuskera: 'ibilgailu-eta-motorren-mantentze-lanaren',
    abr: 'MVM',
    familiaCodigo: 'ENA',
    familia: 'Energía y Agua',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14279],
    duracion: 2000
  },

  // ARTES Y ARTESANÍAS - GRADO BÁSICO
  {
    codcicl: 12000002,
    nom: 'Artesanía en Cuero',
    nomEuskera: 'Larrugintzako Artisautza',
    slugEuskera: 'larrugintzako-artisautza',
    abr: 'AC',
    familiaCodigo: 'AAN',
    familia: 'Artes y Artesanías',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10078],
    duracion: 2000
  },

  // ARTES Y ARTESANÍAS - GRADO MEDIO
  {
    codcicl: 120006,
    nom: 'Ebanistería', // ✅ CORREGIR NOMBRE EN ESPAÑOL
    nomEuskera: 'Ebanisteria',
    slugEuskera: 'ebanisteriako', // ✅ CORREGIDO
    abr: 'E',
    familiaCodigo: 'AAN',
    familia: 'Artes y Artesanías',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12053],
    duracion: 2000
  },
  // ARTES Y ARTESANÍAS - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 12004,
    nom: 'Amueblamiento', // ✅ CORREGIR NOMBRE EN ESPAÑOL
    nomEuskera: 'Altzarigintza',
    slugEuskera: 'altzarigintzako', // ✅ YA CORRECTO
    abr: 'A',
    familiaCodigo: 'AAN',
    familia: 'Artes y Artesanías',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12053],
    duracion: 2000
  },
  {
    codcicl: 120015,
    nom: 'Modelismo de Indumentaria',
    nomEuskera: 'Jantzigintza Modelismoa',
    slugEuskera: 'jantzigintza-modelismoko',
    abr: 'MI',
    familiaCodigo: 'AAN',
    familia: 'Artes y Artesanías',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15112],
    duracion: 2000
  },

  // ARTES GRÁFICAS - GRADO MEDIO
  {
    codcicl: 120001,
    nom: 'Impresión Gráfica',
    nomEuskera: 'Inprimaketa Grafikoa',
    slugEuskera: 'inprimaketa-grafikoko',
    abr: 'IG',
    familiaCodigo: 'ARG',
    familia: 'Artes Gráficas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10138, // Mendizabala (Vitoria) - A
      // Públicos Departamento Educación - BIZKAIA
      14205, // Emilio Campuzano (Bilbao) - AD (turno: MN, incluye 3º curso)
      // Privados - GIPUZKOA
      12572 // Salesianos Urnieta - B
    ],
    duracion: 2000
  },

  {
    codcicl: 120002,
    nom: 'Postimpresión y Acabados Gráficos',
    nomEuskera: 'Postinprimaketa eta Akabera Grafikoak',
    slugEuskera: 'postinprimaketa-eta-akabera-grafikoen',
    abr: 'PAG',
    familiaCodigo: 'ARG',
    familia: 'Artes Gráficas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Vespertino', // IMPORTANTE: Solo turno vespertino
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - BIZKAIA
      14205 // Emilio Campuzano (Bilbao) - AD (turno: V)
    ],
    duracion: 2000
  },
  // ARTES GRÁFICAS - GRADO SUPERIOR
  {
    codcicl: 120003,
    nom: 'Preimpresión Digital',
    nomEuskera: 'Aurre-inprimaketa Digitala',
    slugEuskera: 'aurre-inprimaketa-digitala',
    abr: 'PRID',
    familiaCodigo: 'ARG',
    familia: 'Artes Gráficas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - BIZKAIA
      14205, // Emilio Campuzano (Bilbao) - AD
      // Privados - GIPUZKOA
      12498 // Ceinpro (Donostia) - AB
    ],
    duracion: 2000
  },
  {
    codcicl: 120004,
    nom: 'Diseño y Edición de Publicaciones Impresas y Multimedia',
    nomEuskera: 'Argitalpen Inprimatu eta Multimedia Diseinua eta Edizioa',
    slugEuskera: 'argitalpen-inprimatu-eta-multimedia-diseinua-eta-edizioko',
    abr: 'DEPIM',
    familiaCodigo: 'ARG',
    familia: 'Artes Gráficas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10138, // Mendizabala (Vitoria) - AD
      // Públicos Departamento Educación - BIZKAIA
      14205, // Emilio Campuzano (Bilbao) - A (turno: NV - nocturno/vespertino, incluye 3º)
      // Privados - GIPUZKOA
      12498, // Ceinpro (Donostia) - AB (turno: MV - matutino/vespertino)
      12572 // Salesianos Urnieta - A
    ],
    duracion: 2000
  },
  {
    codcicl: 120005,
    nom: 'Diseño y Gestión de la Producción Gráfica',
    nomEuskera: 'Ekoizpen Grafikoaren Diseinua eta Kudeaketa',
    slugEuskera: 'ekoizpen-grafikoaren-diseinua-eta-kudeaketako',
    abr: 'DGPG',
    familiaCodigo: 'ARG',
    familia: 'Artes Gráficas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10138, // Mendizabala (Vitoria) - A (solo 2º curso)
      // Públicos Departamento Educación - BIZKAIA
      14205 // Emilio Campuzano (Bilbao) - AD
    ],
    duracion: 2000
  },
  // IMAGEN Y SONIDO - GRADO SUPERIOR
  {
    codcicl: 130001,
    nom: 'Iluminación, Captación y Tratamiento de Imagen',
    nomEuskera: 'Argitze, Irudiaren Kaptura eta Tratamendua',
    slugEuskera: 'argitze-irudiaren-kaptura-eta-tratamenduaren',
    abr: 'ICTI',
    familiaCodigo: 'IMS',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - GIPUZKOA
      12394 // ✅ CPES Escuela Cine y Video (Andoain) - A
    ],
    duracion: 2000
  },
  {
    codcicl: 210002,
    nom: 'Realización de Proyectos Audiovisuales y Espectáculos',
    nomEuskera: 'Ikus-entzunezkoen eta Ikuskizunen Proiektuen Errealizazioa',
    slugEuskera: 'ikus-entzunezkoen-eta-ikuskizunen-proiektuen-errealizazioko',
    abr: 'RPAE',
    familiaCodigo: 'IMS',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10138, // ✅ CIFP Mendizabala (Vitoria) - AD I

      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga (Erandio) - D I

      // Privados - GIPUZKOA
      12394 // ✅ CPES Escuela Cine y Video (Andoain) - AD
    ],
    duracion: 2000
  },
  {
    codcicl: 130002,
    nom: 'Sonido para Audiovisuales y Espectáculos',
    nomEuskera: 'Ikus-entzunezkoetarako eta Ikuskizunetarako Soinua',
    slugEuskera: 'ikus-entzunezkoetarako-eta-ikuskizunetarako-soinuaren',
    abr: 'SAE',
    familiaCodigo: 'IMS',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga (Erandio) - D I

      // Privados - GIPUZKOA
      12394 // ✅ CPES Escuela Cine y Video (Andoain) - A
    ],
    duracion: 2000
  },
  {
    codcicl: 130003,
    nom: 'Producción de Audiovisuales y Espectáculos',
    nomEuskera: 'Ikus-entzunezkoen eta Ikuskizunen Ekoizpena',
    slugEuskera: 'ikus-entzunezkoen-eta-ikuskizunen-ekoizpeneko',
    abr: 'PAE',
    familiaCodigo: 'IMS',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga (Erandio) - D (vespertino)

      // Privados - GIPUZKOA
      12394 // ✅ CPES Escuela Cine y Video (Andoain) - B
    ],
    duracion: 2000
  },
  {
    codcicl: 130004,
    nom: 'Animaciones 3D, Juegos y Entornos Interactivos',
    nomEuskera: '3D Animazioak, Jokoak eta Ingurune Interaktiboak',
    slugEuskera: '3d-animazioak-jokoak-eta-ingurune-interaktiboen',
    abr: 'A3DJEI',
    familiaCodigo: 'IMS',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      13613, // ✅ CIFP Aprendizajes Virtuales (Distancia)

      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga (Erandio) - A I

      // Privados - BIZKAIA
      15305, // ✅ CPIFP Harrobia (Bilbao) - D
      14747, // ✅ CPES Ibaiondo (Getxo) - AD (solo 1º)

      // Privados - GIPUZKOA
      12394, // ✅ CPES Escuela Cine y Video (Andoain) - A
      12498 // ✅ CPIFP Ceinpro (Donostia) - AB
    ],
    duracion: 2000
  },

  // IMAGEN Y SONIDO - GRADO MEDIO

  {
    codcicl: 210005,
    nom: 'Vídeo, Disc-Jockey y Sonido',
    nomEuskera: 'Bideoa, Disc-Jockey eta Soinua',
    slugEuskera: 'bideoa-disc-jockey-eta-soinuko',
    abr: 'VDJS',
    familiaCodigo: 'IMS',
    familia: 'Imagen y Sonido',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - GIPUZKOA
      12394 // ✅ CPES Escuela Cine y Video (Andoain) - B
    ],
    duracion: 2000
  },

  // ACTIVIDADES FÍSICAS Y DEPORTIVAS - GRADO BÁSICO
  {
    codcicl: 140011,
    nom: 'Acceso e Instalación en Instalaciones Deportivas',
    nomEuskera: 'Kirol-Instalazioetan Sarbidea eta Kontserbazioa',
    slugEuskera: 'kirol-instalazioetan-sarbidea-eta-kontserbazioa', // ✅ CORREGIDO
    abr: 'GMNTL',
    familiaCodigo: 'AFD',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 14899],
    duracion: 2000
  },

  // ============================================
  // ACTIVIDADES FÍSICAS Y DEPORTIVAS - GRADO MEDIO
  // ============================================

  {
    codcicl: 140001,
    nom: 'Guía en el Medio Natural y de Tiempo Libre',
    nomEuskera: 'Natura Inguruneko eta Aisialdiko Gida',
    slugEuskera: 'natura-inguruneko-eta-aisialdiko-gidako',
    abr: 'GMNTL',
    familiaCodigo: 'AFD',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10138, // Mendizabala (Vitoria) - D
      // Públicos Departamento Educación - BIZKAIA
      15307, // Fray Juan de Zumarraga (Durango) - D
      // Públicos Departamento Educación - GIPUZKOA
      12229, // Politécnico Easo (Donostia) - B
      13015, // Oñate - D
      13023, // Tolosaldea (Tolosa) - D + I
      // Privados - ARABA
      10254, // Apostólico San José (Iruña Oka) - D
      // Privados - BIZKAIA
      15305, // Harrobia (Bilbao) - D
      // Privados - GIPUZKOA
      13656 // Gainberri Kirol Heziketa (Tolosa) - D
    ],
    duracion: 2000
  },

  // ============================================
  // ACTIVIDADES FÍSICAS Y DEPORTIVAS - GRADO SUPERIOR
  // ============================================

  {
    codcicl: 140002,
    nom: 'Enseñanza y Animación Sociodeportiva',
    nomEuskera: 'Gizarte-kirol Irakaskuntza eta Animazioa',
    slugEuskera: 'gizarte-kirol-irakaskuntza-eta-animazioko',
    abr: 'EASD',
    familiaCodigo: 'AFD',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10138, // Mendizabala (Vitoria) - D
      // Públicos Departamento Educación - BIZKAIA
      14010, // Dolores Ibarruri (Abanto) - A
      14069, // Barakaldo - A
      15307, // Fray Juan de Zumarraga (Durango) - D
      14301, // Fadura (Getxo) - D
      // Públicos Departamento Educación - GIPUZKOA
      12229, // Politécnico Easo (Donostia) - D
      12053, // Uni Eibar-Ermua - D
      13023, // Tolosaldea (Tolosa) - D + I
      // Privados - ARABA
      10221, // Urkide (Vitoria) - A
      // Privados - BIZKAIA
      14669, // Mikeldi (Bilbao) - B
      // Privados - GIPUZKOA
      12345, // San Frantzisko Xabier (Arrasate) - D
      12372, // Zurriola Ikastola (Donostia) - D
      13656 // Gainberri Kirol Heziketa (Tolosa) - D
    ],
    duracion: 2000
  },
  {
    codcicl: 140003,
    nom: 'Acondicionamiento Físico',
    nomEuskera: 'Gorputz Prestakuntza',
    slugEuskera: 'gorputz-prestakuntzako',
    abr: 'AF',
    familiaCodigo: 'AFD',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - BIZKAIA
      14010, // Dolores Ibarruri (Abanto) - D
      // Públicos Departamento Educación - GIPUZKOA
      12229, // Politécnico Easo (Donostia) - D
      12053, // Uni Eibar-Ermua - A
      13015, // Oñate - D
      13023, // Tolosaldea (Tolosa) - D + I
      // Privados - ARABA
      10254, // Apostólico San José (Iruña Oka) - D
      // Privados - BIZKAIA
      14669, // Mikeldi (Bilbao) - B
      15305, // Harrobia (Bilbao) - D
      // Privados - GIPUZKOA
      13656 // Gainberri Kirol Heziketa (Tolosa) - B
    ],
    duracion: 2000
  },

  // ============================================
  // ACTIVIDADES FÍSICAS Y DEPORTIVAS - FP BÁSICA
  // ============================================

  {
    codcicl: 14000001, // Código para Acceso y Conservación en Instalaciones Deportivas
    nom: 'Acceso y Conservación en Instalaciones Deportivas',
    nomEuskera: 'Kirol Instalazioetara Sarbidea eta Kontserbazioa',
    slugEuskera: 'kirol-instalazioetara-sarbidea-eta-kontserbazioa',
    abr: 'ACID-B',
    familiaCodigo: 'AFD',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Otros Públicos (IMFPB)
      14899, // IMFPB Portugalete - AB (solo 1º curso)
      // Privados
      15305 // Harrobia (Bilbao) - D (1º,2º)
    ],
    duracion: 2000
  },

  // AGRARIA - GRADO MEDIO
  {
    codcicl: 110003,
    nom: 'Producción Agroecológica',
    nomEuskera: 'Ekoizpen Agroekologikoa',
    slugEuskera: 'ekoizpen-agroekologikoko',
    abr: 'PA',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10108, // Instituto Agrario Arkaute (Vitoria) - A
      // Públicos Departamento Educación - BIZKAIA
      14949 // Escuela Agraria Derio - AD
    ],
    duracion: 2000
  },
  {
    codcicl: 110004,
    nom: 'Producción Agropecuaria',
    nomEuskera: 'Ekoizpen Agropekuarioa',
    slugEuskera: 'ekoizpen-agroprekarioko',
    abr: 'PA',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      12040, // Fraisoro Eskola (Zizurkil) - D
      // Privados - BIZKAIA
    ],
    duracion: 2000
  },
  // AGRARIA - GRADO SUPERIOR
  {
    codcicl: 110005,
    nom: 'Gestión Forestal y del Medio Natural',
    nomEuskera: 'Baso eta Ingurune Naturalaren Kudeaketa',
    slugEuskera: 'baso-eta-ingurune-naturalaren-kudeaketako',
    abr: 'GFMN',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10745, // Murgia (Zuia) - A
      // Públicos Departamento Educación - BIZKAIA
      14949, // Escuela Agraria Derio - D
      // Públicos Departamento Educación - GIPUZKOA
      12040, // Fraisoro Eskola (Zizurkil) - D
      // Privados - BIZKAIA
      14824 // San Viator (Sopuerta) - AD
    ],
    duracion: 2000
  },
  {
    codcicl: 110002,
    nom: 'Jardinería y Floristería',
    nomEuskera: 'Lorezaintza eta Loredenda',
    slugEuskera: 'lorezaintza-eta-loredenda',
    abr: 'JF',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10108, // Instituto Agrario Arkaute (Vitoria) - A
      // Públicos Departamento Educación - BIZKAIA
      14949, // Escuela Agraria Derio - A
      // Públicos Departamento Educación - GIPUZKOA
      12040 // Fraisoro Eskola (Zizurkil) - D
    ],
    duracion: 2000
  },

  // AGRARIA - GRADO SUPERIOR

  {
    codcicl: 110006,
    nom: 'Paisajismo y Medio Rural',
    nomEuskera: 'Paisajismoa eta Landa Ingurunea',
    slugEuskera: 'paisajismoa-eta-landa-inguruneko',
    abr: 'PMR',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10108, // Instituto Agrario Arkaute (Vitoria) - A
      // Públicos Departamento Educación - BIZKAIA
      14949 // Escuela Agraria Derio - A
    ],
    duracion: 2000
  },

  // MARÍTIMO-PESQUERA - GRADO MEDIO
  {
    codcicl: 260004,
    nom: 'Navegación y Pesca de Litoral',
    nomEuskera: 'Nabigazioa eta Itsasertzerako Arrantza',
    slugEuskera: 'nabigazioa-eta-itsasertzerako-arrantzako',
    abr: 'NPL',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14601, // ✅ CIFP Náutico Pesquera (Bermeo) - A

      // Departamento Educación - GIPUZKOA
      12151, // ✅ CIFP Náutico Pesquero de Pasaia - A

      // Privados - BIZKAIA
      14781 // ✅ CPES Ntra. Sra. de la Antigua (Ondarroa) - B
    ],
    duracion: 2000
  },
  {
    codcicl: 260005,
    nom: 'Operaciones Subacuáticas e Hiperbáricas',
    nomEuskera: 'Urpeko eta Hiperbariko Eragiketak',
    slugEuskera: 'urpeko-eta-hiperbariko-eragiketak',
    abr: 'OSHI',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12151 // ✅ CIFP Náutico Pesquero de Pasaia - AD I (prueba específica)
    ],
    duracion: 2000
  },
  {
    codcicl: 160002,
    nom: 'Mantenimiento y Control de la Maquinaria de Buques y Embarcaciones',
    nomEuskera: 'Ontzi eta Itsasontzien Makinen Mantentze-lanak eta Kontrola',
    slugEuskera: 'ontzi-eta-itsasontzien-makinen-mantentze-lanak-eta-kontrola',
    abr: 'MCMBE',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13533, 14601],
    duracion: 2000
  },

  // MARÍTIMO-PESQUERA - GRADO SUPERIOR
  {
    codcicl: 260008,
    nom: 'Transporte Marítimo y Pesca de Altura',
    nomEuskera: 'Itsas Garraioa eta Urruneko Arrantza',
    slugEuskera: 'itsas-garraioa-eta-urruneko-arrantzako',
    abr: 'TMPA',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [
      // Departamento Educación - BIZKAIA
      14601, // ✅ CIFP Náutico Pesquera (Bermeo) - A

      // Departamento Educación - GIPUZKOA
      12151, // ✅ CIFP Náutico Pesquero de Pasaia - A I

      // Privados - BIZKAIA
      14781 // ✅ CPES Ntra. Sra. de la Antigua (Ondarroa) - A
    ],
    duracion: 2000
  },
  {
    codcicl: 260007,
    nom: 'Organización del Mantenimiento de Maquinaria de Buques y Embarcaciones',
    nomEuskera: 'Ontzi eta Itsasontzien Makinen Mantentze-lanen Antolaketa',
    slugEuskera: 'ontzi-eta-itsasontzien-makinen-mantentze-lanen-antolaketako',
    abr: 'OMMBE',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [
      // Departamento Educación - BIZKAIA
      14601, // ✅ CIFP Náutico Pesquera (Bermeo) - A

      // Departamento Educación - GIPUZKOA
      12151, // ✅ CIFP Náutico Pesquero de Pasaia - AD I

      // Privados - BIZKAIA
      14781 // ✅ CPES Ntra. Sra. de la Antigua (Ondarroa) - A
    ],
    duracion: 2000
  },
  {
    codcicl: 260006,
    nom: 'Acuicultura',
    nomEuskera: 'Akuikultura',
    slugEuskera: 'akuikulturako',
    abr: 'ACU',
    familiaCodigo: 'MAP',
    familia: 'Marítimo Pesquera',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      13533 // ✅ CIFP Kardala (Mutriku) - ABD
    ],
    duracion: 2000
  },

  // QUÍMICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 340001,
    nom: 'Laboratorio de Análisis y Control de Calidad',
    nomEuskera: 'Analisiaren eta Kalitate Kontrolaren Laborategia',
    slugEuskera: 'analisiaren-eta-kalitate-kontrolaren-laborategiko',
    abr: 'LACC',
    familiaCodigo: 'QUI',
    familia: 'Química',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15112, // ✅ CIFP Elorrieta-Erreka Mari (Bilbao) - A
      15763, // ✅ CIFP Txurdinaga (Bilbao) - AD
      14422, // ✅ CIFP San Jorge (Santurtzi) - A

      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco (Errenteria) - AD I

      // Privados - ARABA
      10248, // ✅ CPIFP Egibide (Vitoria) - A

      // Privados - BIZKAIA
      14634, // ✅ CPIFP Jesuitak Politeknikoa (Bilbao) - A
      14718 // ✅ CPIFP Zabalburu (Bilbao) - A
    ],
    duracion: 2000
  },
  // ✅ FABRICACIÓN DE PRODUCTOS FARMACÉUTICOS, BIOTECNOLÓGICOS Y AFINES (fppb3_c.pdf)
  {
    codcicl: 340005,
    nom: 'Fabricación de Productos Farmacéuticos, Biotecnológicos y Afines',
    nomEuskera:
      'Produktu Farmazeutiko, Bioteknologiko eta Afinaren Fabrikazioa',
    slugEuskera:
      'produktu-farmazeutiko-bioteknologiko-eta-afinaren-fabrikazioa',
    abr: 'FPPBA',
    familiaCodigo: 'QUI',
    familia: 'Química',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14422, // ✅ CIFP San Jorge (Santurtzi) - AD

      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco (Errenteria) - AD I

      // Privados - BIZKAIA
      14633 // ✅ CPES Cruz Roja (Bilbao) - B
    ],
    duracion: 2000
  },

  {
    codcicl: 340002,
    nom: 'Química Industrial',
    nomEuskera: 'Kimika Industriala',
    slugEuskera: 'kimika-industrialeko',
    abr: 'QI',
    familiaCodigo: 'QUI',
    familia: 'Química',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - GIPUZKOA
      12468, // ✅ CIFP Don Bosco (Errenteria) - AD
      13023, // ✅ CIFP Tolosaldea (Tolosa) - D I

      // Privados - BIZKAIA
      14634 // ✅ CPIFP Jesuitak Politeknikoa (Bilbao) - B
    ],
    duracion: 2000
  },

  // MODALIDAD DUAL
  {
    codcicl: 10003001,
    nom: 'Desarrollo de Aplicaciones Multiplataforma (DUAL)',
    nomEuskera: 'Plataforma Anitzeko Aplikazioen Garapena (DUALA)',
    slugEuskera: 'plataforma-anitzeko-aplikazioak-garatzeko',
    abr: 'DAM-D',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Dual',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10137, 14634, 15112],
    duracion: 2000
  },
  {
    codcicl: 10010001,
    nom: 'Administración y Finanzas (DUAL)',
    nomEuskera: 'Administrazioa eta Finantzak (DUALA)',
    slugEuskera: 'administrazio-eta-finantzako',
    abr: 'AF-D',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Dual',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10137, 14088, 14950],
    duracion: 2000
  },
  {
    codcicl: 30003001,
    nom: 'Programación de la Producción en Fabricación Mecánica (DUAL)',
    nomEuskera: 'Fabrikazio Mekanikoko Ekoizpenaren Programazioa (DUALA)',
    slugEuskera: 'fabrikazio-mekanikoko-ekoizpenaren-programazioko',
    abr: 'PPFM-D',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Dual',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12054, 13020, 14950],
    duracion: 2000
  },
  {
    codcicl: 180003,
    nom: 'Construcciones Metálicas',
    nomEuskera: 'Metalezko Eraikuntzak',
    slugEuskera: 'metalezko-eraikuntzetako',
    abr: 'CM',
    familiaCodigo: 'FME',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10138, // CIFP MENDIZABALA LHII - Vitoria-Gasteiz
      15628, // CIFP ZORNOTZA LHII - Amorebieta-Etxano
      14069, // CIFP BARAKALDO LHII - Barakaldo
      13255, // CIFP ARETXABALETA LANBIDE ESKOLA LHII - Aretxabaleta
      13432, // CIFP MEKA LHII - Elgoibar
      12468, // CIFP DON BOSCO LHII - Errenteria
      13023, // CIFP TOLOSALDEA LHII - Tolosa
      14779, // CPIFP SOMORROSTRO LHIPI - Muskiz (Privada)
      12581 // CPIFP GOIERRI LHIPI - Ordizia (Privada)
    ],
    duracion: 2000
  },
  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 1600002,
    nom: 'Sistemas de Telecomunicaciones e Informáticos',
    nomEuskera: 'Telekomunikazio eta Sistema Informatikoak',
    slugEuskera: 'telekomunikazio-eta-sistema-informatikoen',
    abr: 'STI',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      14069, // ✅ Barakaldo (ya estaba)
      14205, // ✅ Emilio Campuzano (ya estaba)
      15630, // ✅ Tartanga (AÑADIDO según stei3_c.pdf)
      14279, // ✅ Andra Mari (AÑADIDO según stei3_c.pdf)
      14422, // ✅ San Jorge (AÑADIDO según stei3_c.pdf)
      12054, // ✅ Armería Eskola (AÑADIDO según stei3_c.pdf)
      13021, // ✅ Bidasoa (AÑADIDO según stei3_c.pdf)
      // Privados
      10248, // ✅ Egibide (ya estaba)
      14718, // ✅ Zabalburu (AÑADIDO según stei3_c.pdf - CORREGIR CPIFP)
      14837, // ✅ Txorierri (AÑADIDO según stei3_c.pdf)
      14779 // ✅ Somorrostro (AÑADIDO según stei3_c.pdf)
    ],
    duracion: 2000
  },
  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR
  {
    codcicl: 20005,
    nom: 'Mantenimiento Electrónico',
    nomEuskera: 'Mantentze-lan Elektronikoak',
    slugEuskera: 'mantentze-lan-elektronikoen',
    abr: 'ME',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      14205, // ✅ Emilio Campuzano (AÑADIDO según mael3_c.pdf - turno V)
      15630, // ✅ Tartanga (AÑADIDO según mael3_c.pdf)
      14950, // ✅ Iurreta (ya estaba)
      12054, // ✅ Armería Eskola (AÑADIDO según mael3_c.pdf)
      12468, // ✅ Don Bosco (AÑADIDO según mael3_c.pdf)
      13021, // ✅ Bidasoa (AÑADIDO según mael3_c.pdf)
      // Privados
      10248, // ✅ Egibide (ya estaba)
      14634, // ✅ Jesuitak Politeknikoa (AÑADIDO según mael3_c.pdf)
      14664, // ✅ Salesianos Deusto (AÑADIDO según mael3_c.pdf)
      14779, // ✅ Somorrostro (AÑADIDO según mael3_c.pdf)
      14824, // ✅ San Viator (AÑADIDO según mael3_c.pdf)
      12746 // ✅ La Salle-Berrozpe (AÑADIDO según mael3_c.pdf)
    ],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO MEDIO
  {
    codcicl: 1600004,
    nom: 'Instalaciones de Telecomunicaciones',
    nomEuskera: 'Telekomunikazio Instalazioak',
    slugEuskera: 'telekomunikazio-instalazioen',
    abr: 'IT',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación
      10138, // ✅ Mendizabala (AÑADIDO según inte2_c.pdf)
      14205, // ✅ Emilio Campuzano (ya estaba)
      14279, // ✅ Andra Mari (AÑADIDO según inte2_c.pdf)
      14301, // ✅ Fadura (AÑADIDO según inte2_c.pdf)
      14950, // ✅ Iurreta (AÑADIDO según inte2_c.pdf)
      14422, // ✅ San Jorge (ya estaba)
      12468, // ✅ Don Bosco (ya estaba)
      13021, // ✅ Bidasoa (AÑADIDO según inte2_c.pdf)
      // Privados
      14779 // ✅ Somorrostro (ya estaba)
    ],
    duracion: 2000
  },
  // NUEVO CICLO SUPERIOR: Electromedicina Clínica
  {
    codcicl: 1600003, // ⚠️ Asignar código correcto
    nom: 'Electromedicina Clínica',
    nomEuskera: 'Elektromedikuntza Klinikoa',
    slugEuskera: 'elektromedikuntza-klinikoa',
    abr: 'EMC',
    familiaCodigo: 'ELE',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      15666 // ✅ Repélega (según emcl3_c.pdf)
    ],
    duracion: 2000
  },

  // MODALIDAD A DISTANCIA - EJEMPLOS
  {
    codcicl: 10010002,
    nom: 'Administración y Finanzas (DISTANCIA)',
    nomEuskera: 'Administrazioa eta Finantzak (URRUTIRA)',
    slugEuskera: 'administrazio-eta-finantzako',
    abr: 'AF-DIST',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Distancia',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10618],
    duracion: 2000
  },
  // INFORMÁTICA Y COMUNICACIONES - GRADO BÁSICO
  {
    codcicl: 10004002,
    nom: 'Desarrollo de Aplicaciones Web (DISTANCIA)',
    nomEuskera: 'Web Aplikazioen Garapena (URRUTIRA)',
    slugEuskera: 'web-aplikazioen-garapeneko',
    abr: 'DAW-DIST',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Distancia',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10618, 13613],
    duracion: 2000
  },
  {
    codcicl: 90001001,
    nom: 'Educación Infantil (DISTANCIA)',
    nomEuskera: 'Haur Hezkuntza (URRUTIRA)',
    slugEuskera: 'haur-hezkuntzako',
    abr: 'EI-DIST',
    familiaCodigo: 'SSC',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Distancia',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10618, 13613],
    duracion: 2000
  },
  {
    codcicl: 10012001,
    nom: 'Gestión Administrativa (DISTANCIA)',
    nomEuskera: 'Administrazio Kudeaketa (URRUTIRA)',
    slugEuskera: 'administrazio-kudeaketako',
    abr: 'GA-DIST',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Medio',
    modalidad: 'Distancia',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10618, 13613],
    duracion: 2000
  },

  // TURNO VESPERTINO - EJEMPLOS
  {
    codcicl: 10010003,
    nom: 'Administración y Finanzas (VESPERTINO)',
    nomEuskera: 'Administrazioa eta Finantzak (ARRATSALDEKOA)',
    slugEuskera: 'administrazio-eta-finantzako',
    abr: 'AF-VESP',
    familiaCodigo: 'ADG',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Vespertino',
    idiomas: ['ES', 'EU'],
    centros: [15112],
    duracion: 2000
  },
  {
    codcicl: 10003002,
    nom: 'Desarrollo de Aplicaciones Multiplataforma (VESPERTINO)',
    nomEuskera: 'Plataforma Anitzeko Aplikazioen Garapena (ARRATSALDEKOA)',
    slugEuskera: 'plataforma-anitzeko-aplikazioen-garapeneko',
    abr: 'DAM-VESP',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Vespertino',
    idiomas: ['ES', 'EU'],
    centros: [15112],
    duracion: 2000
  },

  // CICLOS EN INGLÉS - EJEMPLOS
  {
    codcicl: 10004003,
    nom: 'Desarrollo de Aplicaciones Web (INGLÉS)',
    nomEuskera: 'Web Aplikazioen Garapena (INGELESEZ)',
    slugEuskera: 'web-aplikazioen-garapeneko',
    abr: 'DAW-EN',
    familiaCodigo: 'IFC',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['EN', 'ES'],
    centros: [12229],
    duracion: 2000
  },
  {
    codcicl: 10006001,
    nom: 'Comercio Internacional (INGLÉS)',
    nomEuskera: 'Nazioarteko Merkataritza (INGELESEZ)',
    slugEuskera: 'nazioarteko-merkataritzako',
    abr: 'CI-EN',
    familiaCodigo: 'COM',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['EN', 'ES'],
    centros: [10137, 12053],
    duracion: 2000
  },
  {
    codcicl: 60005001,
    nom: 'Gestión de Alojamientos Turísticos (INGLÉS)',
    nomEuskera: 'Turismo Ostatuen Kudeaketa (INGELESEZ)',
    slugEuskera: 'ostatu-turistikoen-kudeaketako',
    abr: 'GAT-EN',
    familiaCodigo: 'HOT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['EN', 'ES', 'EU'],
    centros: [12982],
    duracion: 2000
  },
  {
    codcicl: 11000002,
    nom: 'Aprovechamientos Forestales',
    nomEuskera: 'Baso Ustiaketako',
    slugEuskera: 'baso-ustiaketako',
    abr: 'APFO-B',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10745 // Murgia (Zuia) - A
    ],
    duracion: 2000
  },
  {
    codcicl: 11000003,
    nom: 'Actividades Agropecuarias',
    nomEuskera: 'Nekazaritza eta Abeltzaintza Jarduerak',
    slugEuskera: 'nekazaritza-eta-abeltzaintza-jarduerak',
    abr: 'ACAG-B',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10108, // Instituto Agrario Arkaute (Vitoria) - AD
      // Públicos Departamento Educación - GIPUZKOA
      12040 // Fraisoro Eskola (Zizurkil) - D
    ],
    duracion: 2000
  },
  {
    codcicl: 290003,
    nom: 'Emergencias y Protección Civil',
    nomEuskera: 'Larrialdiak eta Babes Zibila',
    slugEuskera: 'larrialdiak-eta-babes-zibilako',
    abr: 'EPC',
    familiaCodigo: 'SEA',
    familia: 'Seguridad y Medio Ambiente',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10745, // ✅ CIFP Murgia (Zuia) - D (según epci2_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 110001,
    nom: 'Aprovechamiento y Conservación del Medio Natural',
    nomEuskera: 'Natura Ingurunearen Ustiaketa eta Kontserbazioa',
    slugEuskera: 'natura-ingurunearen-ustiaketa-eta-kontserbazioaren',
    abr: 'ACMN',
    familiaCodigo: 'AGA',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Públicos Departamento Educación - ARABA
      10745 // Murgia (Zuia) - A
    ],
    duracion: 2000
  },
  // SEGURIDAD Y MEDIO AMBIENTE - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 290002,
    nom: 'Coordinación de Emergencias y Protección Civil',
    nomEuskera: 'Larrialdien eta Babes Zibilaren Koordinazioa',
    slugEuskera: 'larrialdien-eta-babes-zibilaren-koordinazioko',
    abr: 'CEPC',
    familiaCodigo: 'SEA',
    familia: 'Seguridad y Medio Ambiente',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14279],
    duracion: 2000
  },
  {
    codcicl: 240003,
    nom: 'Prevención de Riesgos Profesionales',
    nomEuskera: 'Lanbide-arriskuen Prebentzioa',
    slugEuskera: 'lanbide-arriskuen-prebentzioaren',
    abr: 'PRP',
    familiaCodigo: 'SEA',
    familia: 'Seguridad y Medio Ambiente',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - ARABA
      10296, // ✅ CIFP Construcción (Vitoria) - A (solo 1º según prpr3_c.pdf)
      
      // Departamento Educación - BIZKAIA
      14945, // ✅ CIFP Construcción Bizkaia (Arrigorriaga) - ABD (solo 1º según prpr3_c.pdf)
      
      // Departamento Educación - GIPUZKOA
      12229, // ✅ CIFP Politécnico Easo Politeknikoa (Donostia) - (solo 1º según prpr3_c.pdf)
      
      // Privados - BIZKAIA
      14779, // ✅ CPIFP Somorrostro (Muskiz) - A (solo 1º según prpr3_c.pdf)
    ],
    duracion: 2000
  },
  {
    codcicl: 290004,
    nom: 'Química y Salud Ambiental',
    nomEuskera: 'Kimika eta Osasun Ingurumena',
    slugEuskera: 'kimika-eta-osasun-ingurumeneko',
    abr: 'QSA',
    familiaCodigo: 'SEA',
    familia: 'Seguridad y Medio Ambiente',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      15630, // ✅ CIFP Tartanga (Erandio) - B (según qsam3_c.pdf)
      
      // Privados - BIZKAIA
      14779, // ✅ CPIFP Somorrostro (Muskiz) - BD (según qsam3_c.pdf)
    ],
    duracion: 2000
  },
  // TEXTIL, CONFECCIÓN Y PIEL - GRADO MEDIO
  {
    codcicl: 310003,
    nom: 'Confección y Moda',
    nomEuskera: 'Jantzigintza eta Moda',
    slugEuskera: 'jantzigintza-eta-modako',
    abr: 'CM',
    familiaCodigo: 'TCP',
    familia: 'Textil, Confección y Piel',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15069, 
              13500 
    ],
    duracion: 2000
  },
  {
    codcicl: 31000001,
    nom: 'Arreglo y Reparación de Artículos Textiles y de Piel',
    nomEuskera: 'Ehungintza eta Larru Artikuluen Konponketa',
    slugEuskera: 'ehungintza-eta-larru-artikuluen-konponketa',
    abr: 'ARATP-B',
    familiaCodigo: 'TCP',
    familia: 'Textil, Confección y Piel',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - BIZKAIA
      15069 
    ],
    duracion: 2000
  },
  {
    codcicl: 31000002,
    nom: 'Tapicería y Cortinaje',
    nomEuskera: 'Tapizeria eta Gortinagintza',
    slugEuskera: 'tapizeria-eta-gortinagintza',
    abr: 'TC-B',
    familiaCodigo: 'TCP',
    familia: 'Textil, Confección y Piel',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Privados - BIZKAIA
      15069 
    ],
    duracion: 2000
  },
  {
    codcicl: 310004,
    nom: 'Calzado y Complementos de Moda',
    nomEuskera: 'Oinetakoak eta Modako Osagarriak',
    slugEuskera: 'oinetakoak-eta-modako-osagarrien',
    abr: 'CCM',
    familiaCodigo: 'TCP',
    familia: 'Textil, Confección y Piel',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15112],
    duracion: 2000
  },
  {
    codcicl: 310001,
    nom: 'Patronaje y Moda',
    nomEuskera: 'Patroigintza eta Moda',
    slugEuskera: 'patroigintza-eta-modako',
    abr: 'PM',
    familiaCodigo: 'TCP',
    familia: 'Textil, Confección y Piel',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14069, 12479],
    duracion: 2000
  },
  {
    codcicl: 310002,
    nom: 'Vestuario a Medida y de Espectáculos',
    nomEuskera: 'Neurrira eta Ikuskizunetarako Jantziak',
    slugEuskera: 'neurrira-eta-ikuskizunetarako-jantzietako',
    abr: 'VME',
    familiaCodigo: 'TCP',
    familia: 'Textil, Confección y Piel',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      // Departamento Educación - BIZKAIA
      14069, 
      
      // Privados - GIPUZKOA
      12479 
    ],
    duracion: 2000
  }
]

// Cuando vayas creando/actualizando ciclos, pon siempre:
// familiaCodigo: mapaFamiliaNombreACodigo['Informática y Comunicaciones'],
// familia: 'Informática y Comunicaciones',

// Funciones auxiliares para filtrar y buscar ciclos
export const filtrarCiclos = {
  porGrado: (grado: 'Básico' | 'Medio' | 'Superior') =>
    ciclos.filter(ciclo => ciclo.grado === grado),

  porFamilia: (familia: string) =>
    ciclos.filter(ciclo => ciclo.familia === familia),

  porModalidad: (modalidad: 'Presencial' | 'Dual' | 'Distancia') =>
    ciclos.filter(ciclo => ciclo.modalidad === modalidad),

  porTurno: (turno: 'Diurno' | 'Vespertino' | 'Nocturno' | 'Mixto') =>
    ciclos.filter(ciclo => ciclo.turno === turno),

  porIdioma: (idioma: 'ES' | 'EU' | 'EN') =>
    ciclos.filter(ciclo => ciclo.idiomas.includes(idioma)),

  porCentro: (codigoCentro: number) =>
    ciclos.filter(ciclo => ciclo.centros.includes(codigoCentro)),

  disponiblesEnIngles: () =>
    ciclos.filter(ciclo => ciclo.idiomas.includes('EN')),

  modalidadDual: () => ciclos.filter(ciclo => ciclo.modalidad === 'Dual'),

  aDistancia: () => ciclos.filter(ciclo => ciclo.modalidad === 'Distancia'),

  buscarPorTexto: (texto: string) =>
    ciclos.filter(
      ciclo =>
        ciclo.nom.toLowerCase().includes(texto.toLowerCase()) ||
        ciclo.nomEuskera.toLowerCase().includes(texto.toLowerCase()) ||
        ciclo.abr.toLowerCase().includes(texto.toLowerCase())
    )
}

// Obtener todas las familias profesionales disponibles
export const familiasProfesionales = [
  ...new Set(ciclos.map(c => c.familiaCodigo))
].sort()

// Estadísticas de la oferta formativa
export const estadisticas = {
  totalCiclos: ciclos.length,
  porGrado: {
    basico: ciclos.filter(c => c.grado === 'Básico').length,
    medio: ciclos.filter(c => c.grado === 'Medio').length,
    superior: ciclos.filter(c => c.grado === 'Superior').length
  },
  porModalidad: {
    presencial: ciclos.filter(c => c.modalidad === 'Presencial').length,
    dual: ciclos.filter(c => c.modalidad === 'Dual').length,
    distancia: ciclos.filter(c => c.modalidad === 'Distancia').length
  },
  totalFamilias: familiasProfesionales.length,
  ciclosEnIngles: ciclos.filter(c => c.idiomas.includes('EN')).length
}

export default ciclos
