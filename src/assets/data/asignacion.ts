export interface Asignacion {
  codcicl: number
  nom: string
  nomEuskera: string
  abr: string
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

export const ciclos: Asignacion[] = [
// INFORMÁTICA Y COMUNICACIONES - GRADO MEDIO (ACTUALIZADO)
{
  codcicl: 230004,
  nom: "Sistemas Microinformáticos y Redes",
  nomEuskera: "Sistema Mikroinformatikoak eta Sareak",
  abr: "SMR",
  familia: "Informática y Comunicaciones",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [10137, 10248, 12053, 12108, 12345, 12497, 12648, 12982, 13456, 14010, 14069, 14151, 14279, 14421, 15041, 15201, 15305, 15307, 15392, 15414, 15628],
  duracion: 2000
},

  // INFORMÁTICA Y COMUNICACIONES - GRADO SUPERIOR
  {
    codcicl: 230002,
    nom: "Administración de Sistemas Informáticos en Red",
    nomEuskera: "Sareko Informatika Sistemen Administrazioa",
    abr: "ASIR",
    familia: "Informática y Comunicaciones",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10137, 10248, 12053, 12108, 12345, 12497, 12648, 12982, 13023, 13456, 14010, 14069, 14151, 14279, 14421, 14899, 15041, 15201, 15305, 15307, 15392, 15414],
    duracion: 2000
  },
  {
    codcicl: 230001,
    nom: "Desarrollo de Aplicaciones Multiplataforma",
    nomEuskera: "Plataforma Anitzetako Aplikazioen Garapena",
    abr: "DAM",
    familia: "Informática y Comunicaciones",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10137, 10248, 12053, 12345, 12497, 12648, 12982, 13023, 13542, 14010, 14069, 14279, 14421, 14899, 15041, 15201, 15305, 15414, 15392, 15628],
    duracion: 2000
  },
  {
    codcicl: 230003,
    nom: "Desarrollo de Aplicaciones Web",
    nomEuskera: "Web Aplikazioen Garapena",
    abr: "DAW",
    familia: "Informática y Comunicaciones",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10137, 10248, 12053, 12108, 12345, 12497, 12648, 12982, 13023, 13542, 14010, 14069, 14151, 14279, 14421, 14899, 15041, 15201, 15305, 15307, 15392, 15414, 15628],
    duracion: 2000
  },

  // COMERCIO Y MARKETING - GRADO MEDIO
  {
    codcicl: 10005,
    nom: 'Actividades Comerciales',
    nomEuskera: 'Merkataritza Jarduerak',
    abr: 'AC',
    familia: 'Comercio y Marketing',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10137, 12053, 12544, 12648, 12982, 14696, 15069, 15112, 15268, 15763
    ],
    duracion: 2000
  },

  // COMERCIO Y MARKETING - GRADO SUPERIOR
  {
    codcicl: 10006,
    nom: 'Comercio Internacional',
    nomEuskera: 'Nazioarteko Merkataritza',
    abr: 'CI',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [10137, 12053, 12108, 12497, 14422, 14669],
    duracion: 2000
  },
  {
    codcicl: 10007,
    nom: 'Gestión de Ventas y Espacios Comerciales',
    nomEuskera: 'Salmenten eta Espazio Komertzialen Kudeaketa',
    abr: 'GVEC',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10137, 12462, 12586, 12982, 14669, 14837, 15763],
    duracion: 2000
  },
  {
    codcicl: 10008,
    nom: 'Marketing y Publicidad',
    nomEuskera: 'Marketina eta Publizitatea',
    abr: 'MP',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10137, 10248, 12479, 12490, 12497, 12982, 14696, 14779, 14810, 15305,
      15763
    ],
    duracion: 2000
  },
  {
    codcicl: 10009,
    nom: 'Transporte y Logística',
    nomEuskera: 'Garraioa eta Logistika',
    abr: 'TL',
    familia: 'Comercio y Marketing',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10137, 12053, 12108, 14620, 14718, 15666],
    duracion: 2000
  },

  // ADMINISTRACIÓN Y GESTIÓN - GRADO MEDIO
  {
    codcicl: 10012,
    nom: 'Gestión Administrativa',
    nomEuskera: 'Administrazio Kudeaketa',
    abr: 'GA',
    familia: 'Administración y Gestión',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10137, 10349, 12225, 12544, 13020, 13432, 13556, 14069, 14747, 14950,
      15108, 15112, 15624, 15630, 15666
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
  nom: "Servicios Comerciales",
  nomEuskera: "Merkataritza Zerbitzuak",
  abr: "SC-B",
  familia: "Comercio y Marketing",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [10214, 13542, 14615, 14669, 15037, 12544, 13015, 13432, 14890, 14898, 15224,15069], // Bermar, Gureak, Almi, Mikeldi, Bituritxa-Barakaldo, Mungia
  duracion: 2000
},

// SERVICIOS ADMINISTRATIVOS - FP BÁSICA
{
  codcicl: 10000001,
  nom: "Servicios Administrativos",
  nomEuskera: "Administrazio Zerbitzuak",
  abr: "SA-B",
  familia: "Administración y Gestión",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [10214, 13542, 14615, 14696, 15226, 12544, 12497, 13432, 13015, 14890, 14891, 14893, 14896, 13658, 13660], // CPFPB + IMFPB
  duracion: 2000
},

// COCINA Y RESTAURACIÓN - FP BÁSICA
{
  codcicl: 19000001,
  nom: "Cocina y Restauración",
  nomEuskera: "Sukaldaritza eta Jatetxea",
  abr: "CR-B",
  familia: "Hostelería y Turismo",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    14010, 14669, 13432, 12544, 15037, 13656, 14890, 14891, 14892, 14893, 14894, 14898, 13656, 15794, 13536 
  ],
  duracion: 2000
},

// ELECTRICIDAD Y ELECTRÓNICA - FP BÁSICA  
{
  codcicl: 16000001,
  nom: "Electricidad y Electrónica",
  nomEuskera: "Elektrizitatea eta Elektronika",
  abr: "EE-B",
  familia: "Electricidad y Electrónica",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    14010, 14069, 14088, 14702, 14747, 14810, 15037, 15041, 
    12053, 12229, 12372, 12497, 13432, 13456, 13542, 13622, 
    13023, 10137, 10248, 15112, 13540, 15069 // Maristak Zalla, Martutene LI, Adsis Gasteiz, Adsis Donostia
  ],
  duracion: 2000
},

// INFORMÁTICA Y COMUNICACIONES - FP BÁSICA
{
  codcicl: 23000001,
  nom: "Informática y Comunicaciones",
  nomEuskera: "Informatika eta Komunikazioak",
  abr: "IC-B",
  familia: "Informática y Comunicaciones",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    10248, 12053, 12497, 12648, 12982, 13432, 14069, 14279, 
    14421, 14810, 15041, 15305, 15307, 15392, 13540 // Martutene LI, Adsis Donostia (Basauri), Adsis Gasteiz
  ],
  duracion: 2000
},

// MANTENIMIENTO DE VIVIENDAS - FP BÁSICA
{
  codcicl: 24000002,
  nom: "Mantenimiento de Viviendas",
  nomEuskera: "Etxebizitzen Mantentze-lanak",
  abr: "MV-B",
  familia: "Instalación y Mantenimiento",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    14890, 14891, 14892, 15794, 15069
  ],
  duracion: 2000
},

// PELUQUERÍA Y ESTÉTICA - FP BÁSICA
{
  codcicl: 20000001,
  nom: "Peluquería y Estética",
  nomEuskera: "Ile-apainketa eta Estetika",
  abr: "PE-B",
  familia: "Imagen Personal",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    13432, 10138, 15037, 12372, // Meka, Mendizabala
    // CPFPB: Adsis Donostia/Basauri, Adsis Gasteiz, Meatzaldea
  ],
  duracion: 2000
},


// MANTENIMIENTO DE VEHÍCULOS - FP BÁSICA
{
  codcicl: 32000001,
  nom: "Mantenimiento de Vehículos",
  nomEuskera: "Ibilgailuen Mantentze-lanak",
  abr: "MV-B",
  familia: "Transporte y Mantenimiento de Vehículos",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    14010, 14069, 14702, 15041, 15305, 12053, 12229, 12372, 
    13015, 13023, 13456, 14279, 15307, 10137, 10248,
    12572 // CPEIPS Salesianos Donostia, CPFPB Adsis Gasteiz
  ],
  duracion: 2000
},

// CARPINTERÍA Y MUEBLE - FP BÁSICA
{
  codcicl: 25000001,
  nom: "Carpintería y Mueble",
  nomEuskera: "Arotz- eta Altzari-lanak",
  abr: "CM-B",
  familia: "Madera, Mueble y Corcho",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    12229,15069 // CPFPB: Adsis Getxo/Leioa
  ],
  duracion: 2000
},

// REFORMA Y MANTENIMIENTO DE EDIFICIOS - FP BÁSICA
{
  codcicl: 15000001,
  nom: "Reforma y Mantenimiento de Edificios",
  nomEuskera: "Eraikinen Erreforma eta Mantentzea",
  abr: "RME-B",
  familia: "Edificación y Obra Civil",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    15024, 15069 // CPFPB: Adsis Getxo/Leioa
  ],
  duracion: 2000
},

// AGRO-JARDINERÍA Y COMPOSICIONES FLORALES - FP BÁSICA
{
  codcicl: 11000001,
  nom: "Agro-Jardinería y Composiciones Florales",
  nomEuskera: "Nekazaritza, Lorezaintza eta Lore Konposizioak",
  abr: "AJ-B",
  familia: "Agraria",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    // CPFPB: Adsis Getxo/Leioa
    10137 // CPIFP Arratiako Zulaibar
  ],
  duracion: 2000
},

// ARTES GRÁFICAS - FP BÁSICA
{
  codcicl: 12000001,
  nom: "Artes Gráficas",
  nomEuskera: "Arte Grafikoak",
  abr: "AG-B",
  familia: "Artes Gráficas",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    14205, // Emilio Campuzano
    // CPFPB Adsis Donostia/Basauri
  ],
  duracion: 2000
},

// ACTIVIDADES MARÍTIMO PESQUERAS - FP BÁSICA
{
  codcicl: 26000001,
  nom: "Actividades Marítimo Pesqueras",
  nomEuskera: "Itsasoko eta Arrantzako Jarduerak",
  abr: "AMP-B",
  familia: "Marítimo Pesquera",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14205],
  duracion: 2000
},

// ACTIVIDADES DOMÉSTICAS Y LIMPIEZA DE EDIFICIOS - FP BÁSICA
{
  codcicl: 30000003,
  nom: "Actividades Domésticas y Limpieza de Edificios",
  nomEuskera: "Etxeko Lanak eta Eraikinen Garbiketa",
  abr: "AD-B",
  familia: "Servicios Socioculturales y a la Comunidad",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    10214, // CPEIPS Paula Montal, Ángeles Custodios
  ],
  duracion: 2000
},

// PANADERÍA, REPOSTERÍA Y CONFITERÍA - FP BÁSICA
{
  codcicl: 22000001,
  nom: "Actividades de Panadería-Pastelería",
  nomEuskera: "Okintza, Gozogintza eta Konfiteria",
  abr: "PRC-B",
  familia: "Industrias Alimentarias",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [
    14890, 15224, 15069 
  ],
  duracion: 2000
},

// OPERACIONES DE FABRICACIÓN DE PRODUCTOS FARMACÉUTICOS - FP BÁSICA
{
  codcicl: 34000001,
  nom: "Operaciones de Fabricación de Productos Farmacéuticos, Cosméticos y Afines",
  nomEuskera: "Produktuen Fabrikazioaren Eragiketak (Farmaceutikoak, Kosmetikoak)",
  abr: "OFPFCA-B",
  familia: "Química",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14279],
  duracion: 2000
},



  // ADMINISTRACIÓN Y GESTIÓN - GRADO SUPERIOR
  {
    codcicl: 10010,
    nom: 'Administración y Finanzas',
    nomEuskera: 'Administrazioa eta Finantzak',
    abr: 'AF',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10137, 10201, 10248, 12053, 12108, 12132, 12298, 12462, 12479, 12490,
      12497, 12581, 12742, 12746, 12982, 13020, 13022, 13023, 13432, 13556,
      13586, 14069, 14279, 14615, 14635, 14669, 14696, 14704, 14718, 14728,
      14775, 14797, 14810, 14888, 14950, 15112, 15630, 15666, 15763, 15854
    ],
    duracion: 2000
  },
  {
    codcicl: 10011,
    nom: 'Asistencia a la Dirección',
    nomEuskera: 'Zuzendaritzarako Laguntza',
    abr: 'AD',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [
      10137, 10201, 10248, 12462, 12490, 13020, 14088, 14669, 14888, 15112
    ],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO MEDIO
  {
    codcicl: 20001,
    nom: 'Instalaciones Eléctricas y Automáticas',
    nomEuskera: 'Instalazio Elektriko eta Automatikoak',
    abr: 'IEA',
    familia: 'Electricidad y Electrónica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10138, 14069, 14088, 14205, 14301, 14945, 14950, 15112, 15628, 15630
    ],
    duracion: 2000
  },
  {
    codcicl: 20002,
    nom: 'Instalaciones de Telecomunicaciones',
    nomEuskera: 'Telekomunikazio Instalazioak',
    abr: 'IT',
    familia: 'Electricidad y Electrónica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10138, 14069, 14205, 14301, 14950, 15112],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR
  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 160001,
    nom: 'Automatización y Robótica Industrial',
    nomEuskera: 'Automatizazioa eta Robotika Industriala',
    abr: 'ARI',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053, 13015, 13023, 10137, 14069, 14702, 12229, 15307],
    duracion: 2000
  },
  {
    codcicl: 20004,
    nom: 'Sistemas Electrotécnicos y Automatizados',
    nomEuskera: 'Sistema Elektroteknikoak eta Automatizatuak',
    abr: 'SEA',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10138, 14069, 14205, 14301, 14950, 15112],
    duracion: 2000
  },
  {
    codcicl: 20005,
    nom: 'Mantenimiento Electrónico',
    nomEuskera: 'Mantentze-lan Elektronikoak',
    abr: 'ME',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10138, 14069, 14950, 15112],
    duracion: 2000
  },

  // FABRICACIÓN MECÁNICA - GRADO MEDIO
  // FABRICACIÓN MECÁNICA - GRADO MEDIO (NUEVO)
  {
    codcicl: 180004,
    nom: 'Mecanizado',
    nomEuskera: 'Mekanizazioa',
    abr: 'ME',
    familia: 'Fabricación Mecánica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14702, 14899, 15041, 15305, 12053, 12229, 12372, 12497, 13015, 13023,
      13456, 14010, 14069, 14279, 15307, 10137, 10248
    ],
    duracion: 2000
  },
  {
    codcicl: 180005,
    nom: 'Soldadura y Calderería',
    nomEuskera: 'Soldadura eta Galdaragintza',
    abr: 'SC',
    familia: 'Fabricación Mecánica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14069, 14702, 12053, 12229, 13015, 14010, 15041, 14899, 13023],
    duracion: 2000
  },
  // FABRICACIÓN MECÁNICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 180001,
    nom: 'Programación de la Producción en Fabricación Mecánica',
    nomEuskera: 'Fabrikazio Mekanikoko Ekoizpena Programatzea',
    abr: 'PPFM',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14702, 14899, 15041, 15305, 12053, 12229, 12497, 13015, 13023, 13456,
      14010, 14069, 12372, 10137, 10248
    ],
    duracion: 2000
  },
  {
    codcicl: 180002,
    nom: 'Diseño en Fabricación Mecánica',
    nomEuskera: 'Fabrikazio Mekanikoko Diseinua',
    abr: 'DFM',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14702, 14899, 15305, 12053, 12229, 12497, 13023, 14010, 14069, 15307
    ],
    duracion: 2000
  },
  // FABRICACIÓN MECÁNICA - GRADO BÁSICO (NUEVO)
  {
    codcicl: 18000001,
    nom: 'Fabricación de Elementos Metálicos',
    nomEuskera: 'Metalezko Elementuen Fabrikazioa',
    abr: 'FEM',
    familia: 'Fabricación Mecánica',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14069, 14702, 14899, 15041, 12053, 12229, 12372, 12497, 13015, 13023,
      13432, 13456, 14010, 14279, 15037, 15307, 10137, 10248, 13536, 15069
    ],
    duracion: 2000
  },

  // INSTALACIÓN Y MANTENIMIENTO - GRADO BÁSICO
{
  codcicl: 24000001,
  nom: "Fabricación y Montaje",
  nomEuskera: "Fabrikazioa eta Muntaketa",
  abr: "FM",
  familia: "Instalación y Mantenimiento",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14069, 14702, 15037, 15041, 12229, 12372, 13015, 13023, 14010, 14899, 15307, 10137],
  duracion: 2000
},

// INSTALACIÓN Y MANTENIMIENTO - GRADO MEDIO
{
  codcicl: 240004,
  nom: "Mantenimiento Electromecánico",
  nomEuskera: "Mantentze-lan Elektromekanikoak",
  abr: "ME",
  familia: "Instalación y Mantenimiento",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14069, 14702, 15037, 15041, 15305, 12053, 12229, 12372, 12497, 13015, 13023, 13456, 14010, 14279, 14899, 15307, 10137, 10248],
  duracion: 2000
},

  // INSTALACIÓN Y MANTENIMIENTO - GRADO SUPERIOR
  {
    codcicl: 240001,
    nom: "Mantenimiento de Instalaciones Térmicas y de Fluidos",
    nomEuskera: "Instalazio Termikoen eta Fluidoen Mantentze-lanak",
    abr: "MITF",
    familia: "Instalación y Mantenimiento",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14702, 12053, 13015, 14069, 15307],
    duracion: 2000
  },
  {
    codcicl: 240002,
    nom: "Mecatrónica Industrial",
    nomEuskera: "Mekatronika Industriala",
    abr: "MI",
    familia: "Instalación y Mantenimiento",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14069, 14702, 15041, 15305, 12053, 12229, 12497, 13015, 13023, 13456, 14010, 14279, 14899, 15307, 10137, 10248],
    duracion: 2000
  },
  {
    codcicl: 240005,
    nom: "Instalaciones de Producción de Calor",
    nomEuskera: "Bero-Produkzioko Instalazioak",
    abr: "IPC",
    familia: "Instalación y Mantenimiento",
    grado: "Medio",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14702, 12229, 13015, 14069, 15307],
    duracion: 2000
  },

  {
    codcicl: 240003,
    nom: "Prevención de Riesgos Profesionales",
    nomEuskera: "Lanbide-arriskuen Prebentzioa",
    abr: "PRP",
    familia: "Instalación y Mantenimiento",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [15041, 15307, 10248],
    duracion: 2000
  },

  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO BÁSICO
{
  codcicl: 32000001,
  nom: "Mantenimiento de Vehículos",
  nomEuskera: "Ibilgailuen Mantentze-lanak",
  abr: "MV",
  familia: "Transporte y Mantenimiento de Vehículos",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14010, 14069, 14702, 15041, 15305, 12053, 12229, 12372, 13015, 13023, 13456, 14279, 15307, 10137, 10248],
  duracion: 2000
},

  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO MEDIO
  {
    codcicl: 320005,
    nom: "Electromecánica de Vehículos Automóviles",
    nomEuskera: "Automobilen Elektromekanika",
    abr: "EVA",
    familia: "Transporte y Mantenimiento de Vehículos",
    grado: "Medio",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14010, 14069, 14702, 15041, 15305, 12053, 12229, 12372, 13015, 13023, 13456, 14279, 15307, 10137, 10248], // Se añaden 14069, 15041 y 15307
    duracion: 2000
  },
  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO MEDIO (ACTUALIZADO)
{
  codcicl: 320004,
  nom: "Carrocería",
  nomEuskera: "Karrozeria",
  abr: "C",
  familia: "Transporte y Mantenimiento de Vehículos",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14010, 14702, 15305, 12053, 12229, 12372, 13015, 13023, 14069, 14279, 15307, 10137, 10248], // Se añaden 12053, 14069 y 15307
  duracion: 2000
},
{
  codcicl: 320006,
  nom: "Mantenimiento de Material Rodante Ferroviario",
  nomEuskera: "Trenbideko Material Mugikorraren Mantentze-lanak",
  abr: "MMRF",
  familia: "Transporte y Mantenimiento de Vehículos",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14069, 12497], // Se añade 12497
  duracion: 2000
},

  // TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS - GRADO SUPERIOR
  {
    codcicl: 320001,
    nom: "Automoción",
    nomEuskera: "Automozioa",
    abr: "A",
    familia: "Transporte y Mantenimiento de Vehículos",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14010, 14069, 14702, 15305, 12053, 12372, 13015, 13023, 14279, 15307, 10137, 10248], // Se añaden 14069, 15307 y 10248
    duracion: 2000
  },
  {
    codcicl: 320002,
    nom: "Mantenimiento Aeromecánico de Aviones con Motor de Turbina",
    nomEuskera: "Turbina Motorra duten Hegazkinen Mantentze Aeromekanikoa",
    abr: "MAAMT",
    familia: "Transporte y Mantenimiento de Vehículos",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14069],
    duracion: 2000
  },
  {
    codcicl: 320003,
    nom: "Mantenimiento de Sistemas Electrónicos y Aviónicos en Aeronaves",
    nomEuskera: "Hegazkinetako Sistema Elektroniko eta Avionikoen Mantentze-lanak",
    abr: "MSEAA",
    familia: "Transporte y Mantenimiento de Vehículos",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14069],
    duracion: 2000
  },
  // HOSTELERÍA Y TURISMO - GRADO BÁSICO (NUEVO)
  {
    codcicl: 19000001,
    nom: 'Cocina y Restauración',
    nomEuskera: 'Sukaldaritza eta Jatetxea',
    abr: 'CR',
    familia: 'Hostelería y Turismo',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14010, 14669, 13432, 12544, 15037, 13656, 15069],
    duracion: 2000
  },

  // HOSTELERÍA Y TURISMO - GRADO MEDIO
  {
    codcicl: 190006,
    nom: 'Cocina y Gastronomía',
    nomEuskera: 'Sukaldaritza eta Gastronomia',
    abr: 'CG',
    familia: 'Hostelería y Turismo',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14010, 14669, 14279, 13656],
    duracion: 2000
  },
  {
    codcicl: 190005,
    nom: 'Servicios en Restauración',
    nomEuskera: 'Jatetxe Zerbitzuak',
    abr: 'SR',
    familia: 'Hostelería y Turismo',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14010, 14669, 14279, 13656],
    duracion: 2000
  },

  // HOSTELERÍA Y TURISMO - GRADO SUPERIOR
  {
    codcicl: 190002,
    nom: 'Dirección de Cocina',
    nomEuskera: 'Sukaldaritza Zuzendaritza',
    abr: 'DC',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14010, 14669, 13656, 14279],
    duracion: 2000
  },
  {
    codcicl: 190003,
    nom: 'Dirección de Servicios de Restauración',
    nomEuskera: 'Jatetxe Zerbitzuen Zuzendaritza',
    abr: 'DSR',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14010, 14669, 14279],
    duracion: 2000
  },
  {
    codcicl: 190001,
    nom: 'Gestión de Alojamientos Turísticos',
    nomEuskera: 'Ostatu Turistikoen Kudeaketa',
    abr: 'GAT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10254, 12742, 14669],
    duracion: 2000
  },
  {
    codcicl: 190004,
    nom: 'Agencias de Viajes y Gestión de Eventos',
    nomEuskera: 'Bidaia Agentziak eta Ekitaldi Kudeaketa',
    abr: 'AVGE',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10254, 12742, 14669, 14279],
    duracion: 2000
  },
  {
    codcicl: 60007,
    nom: 'Guía, Información y Asistencias Turísticas',
    nomEuskera: 'Gida, Informazio eta Turismo Laguntzak',
    abr: 'GIAT',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU', 'EN'],
    centros: [10256, 12291, 13070],
    duracion: 2000
  },

  // IMAGEN PERSONAL - GRADO MEDIO
  {
    codcicl: 200004,
    nom: 'Peluquería y Cosmética Capilar',
    nomEuskera: 'Ile-apainketa eta Kosmetika Kapilarra',
    abr: 'PCC',
    familia: 'Imagen Personal',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13432, 10138, 15037, 12372],
    duracion: 2000
  },
  {
    codcicl: 200003,
    nom: 'Estética y Belleza',
    nomEuskera: 'Estetika eta Edertasuna',
    abr: 'EB',
    familia: 'Imagen Personal',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13432, 10138, 15037, 12372],
    duracion: 2000
  },

  // IMAGEN PERSONAL - GRADO SUPERIOR
  {
    codcicl: 70003,
    nom: 'Estética Integral y Bienestar',
    nomEuskera: 'Estetika Integral eta Ongizatea',
    abr: 'EIB',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12756, 14669],
    duracion: 2000
  },
  {
    codcicl: 200001,
    nom: 'Estilismo y Dirección de Peluquería',
    nomEuskera: 'Ile-apainketako Estilismoa eta Zuzendaritza',
    abr: 'EDP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13432, 10138],
    duracion: 2000
  },
  {
    codcicl: 70005,
    nom: 'Caracterización y Maquillaje Profesional',
    nomEuskera: 'Karakterizazioa eta Makillaje Profesionala',
    abr: 'CMP',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12756],
    duracion: 2000
  },
  {
    codcicl: 200002,
    nom: 'Asesoría de Imagen Personal y Corporativa',
    nomEuskera: 'Irudi Pertsonal eta Korporatiboaren Aholkularitza',
    abr: 'AIPC',
    familia: 'Imagen Personal',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13432, 10138, 15037],
    duracion: 2000
  },

  // INDUSTRIAS ALIMENTARIAS - GRADO MEDIO (ACTUALIZADO)
  {
    codcicl: 220003,
    nom: 'Panadería, Repostería y Confitería',
    nomEuskera: 'Okintza, Gozogintza eta Konfiteria',
    abr: 'PRC',
    familia: 'Industrias Alimentarias',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10254, 13456, 10137], // Se añade 10137
    duracion: 2000
  },

  // INDUSTRIAS ALIMENTARIAS - GRADO SUPERIOR (NUEVO)
  {
    codcicl: 220001,
    nom: 'Vitivinicultura',
    nomEuskera: 'Mahasigintza eta Ardogintza',
    abr: 'VV',
    familia: 'Industrias Alimentarias',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10108],
    duracion: 2000
  },

  // MADERA, MUEBLE Y CORCHO - GRADO BÁSICO (NUEVO)
{
  codcicl: 25000001,
  nom: "Carpintería y Mueble",
  nomEuskera: "Arotz- eta Altzari-lanak",
  abr: "CM",
  familia: "Madera, Mueble y Corcho",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [12229],
  duracion: 2000
},
// MADERA, MUEBLE Y CORCHO - GRADO SUPERIOR (NUEVO)
{
  codcicl: 250001,
  nom: "Diseño y Gestión de la Producción de Madera y Mueble",
  nomEuskera: "Zura eta Altzarien Ekoizpenaren Diseinua eta Kudeaketa",
  abr: "DGPM",
  familia: "Madera, Mueble y Corcho",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [12229],
  duracion: 2000
},
// MARÍTIMO PESQUERA - GRADO BÁSICO (NUEVO)
{
  codcicl: 26000001,
  nom: "Actividades Marítimo Pesqueras",
  nomEuskera: "Itsasoko eta Arrantzako Jarduerak",
  abr: "AMP",
  familia: "Marítimo Pesquera",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14205],
  duracion: 2000
},
// MARÍTIMO PESQUERA - GRADO MEDIO (NUEVO)
{
  codcicl: 260003,
  nom: "Mantenimiento y Control de la Maquinaria de Buques",
  nomEuskera: "Itsasontzien Makineriaren Mantentze-lanak eta Kontrola",
  abr: "MCMB",
  familia: "Marítimo Pesquera",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14205],
  duracion: 2000
},
// MARÍTIMO PESQUERA - GRADO SUPERIOR (NUEVO)
{
  codcicl: 260001,
  nom: "Transporte Marítimo y Pesca de Altura",
  nomEuskera: "Itsas Garraioa eta Goi Arrantza",
  abr: "TMPA",
  familia: "Marítimo Pesquera",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14205],
  duracion: 2000
},
// QUÍMICA - GRADO BÁSICO (NUEVO)
{
  codcicl: 34000001,
  nom: "Operaciones de Fabricación de Productos Farmacéuticos, Cosméticos y Afines",
  nomEuskera: "Produktuen Fabrikazioaren Eragiketak... (Farmaceutikoak, Kosmetikoak)",
  abr: "OFPFCA",
  familia: "Química",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14279],
  duracion: 2000
},


  // SANIDAD - GRADO MEDIO
  {
    codcicl: 80001,
    nom: 'Cuidados Auxiliares de Enfermería',
    nomEuskera: 'Erizaintzako Laguntza Lanak',
    abr: 'CAE',
    familia: 'Sanidad',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15628,13255,13556,14069,14088,12229,13432,14301,12108,10349,15623,12286,10134],
    duracion: 2000
  },
// SANIDAD - GRADO MEDIO (ACTUALIZADO)
{
  codcicl: 280004,
  nom: "Farmacia y Parafarmacia",
  nomEuskera: "Farmazia eta Parafarmazia",
  abr: "FP",
  familia: "Sanidad",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [12108,14339,14398,10134],
  duracion: 2000
},
{
  codcicl: 280005,
  nom: "Emergencias Sanitarias",
  nomEuskera: "Osasun Larrialdiak",
  abr: "ES",
  familia: "Sanidad",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [12229,14301,10134],
  duracion: 2000
},
  // SANIDAD - GRADO SUPERIOR
  {
    codcicl: 80003,
    nom: 'Laboratorio Clínico y Biomédico',
    nomEuskera: 'Laboratorio Kliniko eta Biomedikoa',
    abr: 'LCB',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10248, 12229, 14279, 14702, 13656], // Se elimina 12053, se añade 13656
    duracion: 2000
  },
  {
    codcicl: 80012,
    nom: 'Dietética',
    nomEuskera: 'Dietetika',
    abr: 'DIE',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14069,13432,12108,10134,14165,14633,12497,23656], 
    duracion: 2000
  },
  {
    codcicl: 80004,
    nom: 'Anatomía Patológica y Citodiagnóstico',
    nomEuskera: 'Anatomia Patologikoa eta Zitodiagnostikoa',
    abr: 'APCD',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10248, 14010, 14702, 12372, 14279], // Se añade 14279
    duracion: 2000
  },
  {
    codcicl: 80005,
    nom: 'Imagen para el Diagnóstico y Medicina Nuclear',
    nomEuskera: 'Diagnostikorako Irudia eta Mediku Nuklearra',
    abr: 'IDMN',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14669, 15774],
    duracion: 2000
  },
  {
    codcicl: 80006,
    nom: 'Radioterapia y Dosimetría',
    nomEuskera: 'Erradioterapia eta Dosimetria',
    abr: 'RD',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14669],
    duracion: 2000
  },
  {
    codcicl: 280007,
    nom: "Higiene Bucodental",
    nomEuskera: "Aho-Higienea",
    abr: "HB",
    familia: "Sanidad",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10248, 12372, 14279],
    duracion: 2000
  },
  {
    codcicl: 280008,
    nom: "Prótesis Dentales",
    nomEuskera: "Hortz-Protesiak",
    abr: "PD",
    familia: "Sanidad",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10248],
    duracion: 2000
  },
  {
    codcicl: 80009,
    nom: 'Audiología Protésica',
    nomEuskera: 'Audiologia Protesikoa',
    abr: 'AP',
    familia: 'Sanidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14669],
    duracion: 2000
  },

  // SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD - GRADO BÁSICO (ACTUALIZADO)
{
  codcicl: 30000001,
  nom: "Servicios Comerciales",
  nomEuskera: "Merkataritza Zerbitzuak",
  abr: "SC",
  familia: "Servicios Socioculturales y a la Comunidad",
  grado: "Básico",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14615, 14669, 15037, 12544, 13015, 13432, 13542], // Se añade 15037
  duracion: 2000
},

// SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD - GRADO MEDIO (ACTUALIZADO)
{
  codcicl: 300004,
  nom: "Atención a Personas en Situación de Dependencia",
  nomEuskera: "Mendekotasun Egoeran dauden Pertsonen Arreta",
  abr: "APSD",
  familia: "Servicios Socioculturales y a la Comunidad",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [10137, 10248, 12372, 13023, 14069, 14279, 14669, 14747, 15037, 15305, 15307, 15414], // Se añaden 15305 y 12372
  duracion: 2000
},
{
  codcicl: 300005,
  nom: "Promoción de Igualdad de Género",
  nomEuskera: "Generoko Berdintasuna Sustatzea",
  abr: "PIG",
  familia: "Servicios Socioculturales y a la Comunidad",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [12372],
  duracion: 2000
},

  // SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD - GRADO SUPERIOR
  {
    codcicl: 300002,
    nom: "Educación Infantil",
    nomEuskera: "Haur Hezkuntza",
    abr: "EI",
    familia: "Servicios Socioculturales y a la Comunidad",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10137, 10248, 12229, 13015, 13023, 13456, 14069, 14279, 14747, 15037, 15305, 15307, 15414], // Se añaden 10137, 13023 y 14279
    duracion: 2000
  },
  {
    codcicl: 300001,
    nom: "Integración Social",
    nomEuskera: "Gizarte Integrazioa",
    abr: "IS",
    familia: "Servicios Socioculturales y a la Comunidad",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10248, 12229, 13023, 14069, 14279, 14747, 15037, 15307, 15414], // Se añade 14279
    duracion: 2000
  },
  {
    codcicl: 300003,
    nom: "Promoción de Igualdad de Género",
    nomEuskera: "Generoko Berdintasuna Sustatzea",
    abr: "PIG",
    familia: "Servicios Socioculturales y a la Comunidad",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [10248, 13015, 15037, 15307],
    duracion: 2000
  },
  {
    codcicl: 300006,
    nom: "Mediación Comunicativa",
    nomEuskera: "Komunikazio Bitartekaritza",
    abr: "MC",
    familia: "Servicios Socioculturales y a la Comunidad",
    grado: "Superior",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [12372],
    duracion: 2000
  },
  {
    codcicl: 90003,
    nom: 'Animación Sociocultural y Turística',
    nomEuskera: 'Animazio Soziokultural eta Turistikoa',
    abr: 'ASCT',
    familia: 'Servicios Socioculturales y a la Comunidad',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12490, 13534, 14669],
    duracion: 2000
  },
  // EDIFICACIÓN Y OBRA CIVIL - GRADO MEDIO
  {
    codcicl: 150003,
    nom: 'Obras de Interior, Decoración y Rehabilitación',
    nomEuskera: 'Barne-lanak, Dekorazioa eta Birgaitze-lanak',
    abr: 'OIDR',
    familia: 'Edificación y Obra Civil',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15307],
    duracion: 2000
  },

  // EDIFICACIÓN Y OBRA CIVIL - GRADO BÁSICO
  {
    codcicl: 15000001,
    nom: 'Reforma y Mantenimiento de Edificios',
    nomEuskera: 'Eraikinen Erreforma eta Mantentzea',
    abr: 'RME',
    familia: 'Edificación y Obra Civil',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15024],
    duracion: 2000
  },

  // EDIFICACIÓN Y OBRA CIVIL - GRADO SUPERIOR
  {
    codcicl: 100001,
    nom: 'Proyectos de Edificación',
    nomEuskera: 'Eraikuntza Proiektuak',
    abr: 'PE',
    familia: 'Edificación y Obra Civil',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15307, 12053, 12229, 13023, 15414],
    duracion: 2000
  },
  {
    codcicl: 100002,
    nom: 'Proyectos de Obra Civil',
    nomEuskera: 'Obra Zibileko Proiektuak',
    abr: 'POC',
    familia: 'Edificación y Obra Civil',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12053, 12229, 15305, 15414],
    duracion: 2000
  },

  // ENERGÍA Y AGUA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 170001,
    nom: 'Eficiencia Energética y Energía Solar Térmica',
    nomEuskera: 'Energia Eraginkortasuna eta Eguzki Energia Termikoa',
    abr: 'EEEST',
    familia: 'Energía y Agua',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12229, 15307], // Se añadió 15307
    duracion: 2000
  },
  {
    codcicl: 170002,
    nom: 'Energías Renovables',
    nomEuskera: 'Energia Berriztagarriak',
    abr: 'ER',
    familia: 'Energía y Agua',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12229, 15307, 13023], // Se añadieron 15307 y 13023
    duracion: 2000
  },
  // ENERGÍA Y AGUA - GRADO MEDIO (NUEVO)
  {
    codcicl: 170003,
    nom: 'Redes y Estaciones de Tratamiento de Aguas',
    nomEuskera: 'Sareak eta Ur-Tratamendurako Estazioak',
    abr: 'RETA',
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
    abr: 'MVM',
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
    abr: 'AC',
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
    nom: 'Ebanistería',
    nomEuskera: 'Ebanisteria',
    abr: 'E',
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
    codcicl: 120004,
    nom: 'Amueblamiento',
    nomEuskera: 'Altzarigintza',
    abr: 'A',
    familia: 'Artes y Artesanías',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12053],
    duracion: 2000
  },
  {
    codcicl: 120005,
    nom: 'Modelismo de Indumentaria',
    nomEuskera: 'Jantzigintza Modelismoa',
    abr: 'MI',
    familia: 'Artes y Artesanías',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15112],
    duracion: 2000
  },
  // ARTES GRÁFICAS - GRADO BÁSICO
  {
    codcicl: 12000001,
    nom: 'Artes Gráficas',
    nomEuskera: 'Arte Grafikoak',
    abr: 'AG',
    familia: 'Artes Gráficas',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14205],
    duracion: 2000
  },

  // ARTES GRÁFICAS - GRADO MEDIO
  {
    codcicl: 120001,
    nom: 'Impresión Gráfica',
    nomEuskera: 'Inprimaketa Grafikoa',
    abr: 'IG',
    familia: 'Artes Gráficas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14205],
    duracion: 2000
  },
  {
    codcicl: 120002,
    nom: 'Postimpresión y Acabados Gráficos',
    nomEuskera: 'Postinprimaketa eta Akabera Grafikoak',
    abr: 'PAG',
    familia: 'Artes Gráficas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14205],
    duracion: 2000
  },
  // ARTES GRÁFICAS - GRADO SUPERIOR
  {
    codcicl: 120003, // CÓDIGO ACTUALIZADO
    nom: 'Diseño y Edición de Publicaciones Impresas y Multimedia',
    nomEuskera: 'Argitalpen Inprimatu eta Multimedia Diseinua eta Edizioa',
    abr: 'DEPIM',
    familia: 'Artes Gráficas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14205],
    duracion: 2000
  },
  {
    codcicl: 120004, // CÓDIGO ACTUALIZADO
    nom: 'Diseño y Gestión de la Producción Gráfica',
    nomEuskera: 'Ekoizpen Grafikoaren Diseinua eta Kudeaketa',
    abr: 'DGPG',
    familia: 'Artes Gráficas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14205, 10138, 15414],
    duracion: 2000
  },

  // IMAGEN Y SONIDO - GRADO SUPERIOR
  {
    codcicl: 130001,
    nom: 'Iluminación, Captación y Tratamiento de Imagen',
    nomEuskera: 'Argitze, Irudiaren Kaptura eta Tratamendua',
    abr: 'ICTI',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053],
    duracion: 2000
  },
  {
    codcicl: 210002,
    nom: 'Realización de Proyectos Audiovisuales y Espectáculos',
    nomEuskera: 'Ikus-entzunezkoen eta Ikuskizunen Proiektuen Errealizazioa',
    abr: 'RPAE',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053],
    duracion: 2000
  },
  {
    codcicl: 130002,
    nom: 'Sonido para Audiovisuales y Espectáculos',
    nomEuskera: 'Ikus-entzunezkoentzako eta Ikuskizunentzako Soinua',
    abr: 'SAE',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053],
    duracion: 2000
  },
  {
    codcicl: 130003,
    nom: 'Producción de Audiovisuales y Espectáculos',
    nomEuskera: 'Ikus-entzunezkoen eta Ikuskizunen Ekoizpena',
    abr: 'PAE',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053, 10248, 15414], // Centros correctos
    duracion: 2000
  },
  {
    codcicl: 130004,
    nom: 'Animaciones 3D, Juegos y Entornos Interactivos',
    nomEuskera: '3D Animazioak, Jokoak eta Ingurune Interaktiboak',
    abr: 'A3DJEI',
    familia: 'Imagen y Sonido',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12229, 12394],
    duracion: 2000
  },

  // IMAGEN Y SONIDO - GRADO MEDIO

  {
    codcicl: 210005,
    nom: 'Laboratorio de Imagen',
    nomEuskera: 'Irudi Laborategia',
    abr: 'LI',
    familia: 'Imagen y Sonido',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [12053],
    duracion: 2000
  },

  // ACTIVIDADES FÍSICAS Y DEPORTIVAS - GRADO MEDIO
  {
    codcicl: 140001,
    nom: 'Guía en el Medio Natural y de Tiempo Libre',
    nomEuskera: 'Natura Inguruneko eta Aisialdiko Gida',
    abr: 'GMNTL',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10138, 12229, 15307, 10254, 13015, 13023, 15305, 13656],
    duracion: 2000
  },

  // ACTIVIDADES FÍSICAS Y DEPORTIVAS - GRADO SUPERIOR
  {
    codcicl: 140002,
    nom: 'Enseñanza y Animación Sociodeportiva',
    nomEuskera: 'Gizarte eta Kirol Animazioko eta Irakaskuntza',
    abr: 'EASD',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10138, 14010, 14069, 12229, 15307, 12053, 14301, 13023, 12345, 14669,
      12372, 13656, 10221
    ],
    duracion: 2000
  },
  {
    codcicl: 140003,
    nom: 'Acondicionamiento Físico',
    nomEuskera: 'Gorputz Prestakuntza',
    abr: 'AF',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14010, 14669, 15305, 12229, 12053, 10254, 13015, 13023, 13656],
    duracion: 2000
  },
  {
    codcicl: 140004,
    nom: 'Acceso y Conservación en Instalaciones Deportivas',
    nomEuskera: 'Gorputz Prestakuntza',
    abr: 'ACID',
    familia: 'Actividades Físicas y Deportivas',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 14899],
    duracion: 2000
  },

  // AGRARIA - GRADO MEDIO
  {
    codcicl: 150001,
    nom: 'Producción Agroecológica',
    nomEuskera: 'Ekoizpen Agroekologikoa',
    abr: 'PA',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10108, 14949],
    duracion: 2000
  },
  // AGRARIA - GRADO SUPERIOR
  {
    codcicl: 110004,
    nom: 'Gestión Forestal y del Medio Natural',
    nomEuskera: 'Baso eta Ingurune Naturalaren Kudeaketa',
    abr: 'GFMN',
    familia: 'Agraria',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14949, 10108, 12040],
    duracion: 2000
  },
  {
    codcicl: 150002,
    nom: 'Jardinería y Floristería',
    nomEuskera: 'Lorezaintza eta Loredenda',
    abr: 'JF',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10108, 14949],
    duracion: 2000
  },

  // AGRARIA - GRADO SUPERIOR
  {
    codcicl: 150003,
    nom: 'Paisajismo y Medio Rural',
    nomEuskera: 'Paisajismoa eta Landa Ingurunea',
    abr: 'PMR',
    familia: 'Agraria',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10108, 14949],
    duracion: 2000
  },

  // MARÍTIMO-PESQUERA - GRADO MEDIO
  {
    codcicl: 160001,
    nom: 'Navegación y Pesca de Litoral',
    nomEuskera: 'Nabigazioa eta Itsasertzerako Arrantza',
    abr: 'NPL',
    familia: 'Marítimo Pesquera',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13533, 14601],
    duracion: 2000
  },
  {
    codcicl: 160002,
    nom: 'Mantenimiento y Control de la Maquinaria de Buques y Embarcaciones',
    nomEuskera: 'Ontzi eta Itsasontzien Makinen Mantentze-lanak eta Kontrola',
    abr: 'MCMBE',
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
    codcicl: 160003,
    nom: 'Transporte Marítimo y Pesca de Altura',
    nomEuskera: 'Itsas Garraioa eta Urruneko Arrantza',
    abr: 'TMPA',
    familia: 'Marítimo Pesquera',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13533, 14601],
    duracion: 2000
  },
  {
    codcicl: 160004,
    nom: 'Organización del Mantenimiento de Maquinaria de Buques y Embarcaciones',
    nomEuskera: 'Ontzi eta Itsasontzien Makinen Mantentze-lanen Antolaketa',
    abr: 'OMMBE',
    familia: 'Marítimo Pesquera',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13533, 14601],
    duracion: 2000
  },
  {
    codcicl: 160005,
    nom: 'Acuicultura',
    nomEuskera: 'Akuikultura',
    abr: 'ACU',
    familia: 'Marítimo Pesquera',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [13533, 14601],
    duracion: 2000
  },



// QUÍMICA - GRADO SUPERIOR (ACTUALIZADO)
{
  codcicl: 340001,
  nom: "Laboratorio de Análisis y Control de Calidad",
  nomEuskera: "Analisiaren eta Kalitate Kontrolaren Laborategia",
  abr: "LACC",
  familia: "Química",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14702, 14279, 13456, 14069, 10137], // Se añaden 13456 y 14069
  duracion: 2000
},
{
  codcicl: 340002,
  nom: "Química Industrial",
  nomEuskera: "Kimika Industriala",
  abr: "QI",
  familia: "Química",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14279],
  duracion: 2000
},

  // MODALIDAD DUAL - EJEMPLOS
  {
    codcicl: 10003001,
    nom: 'Desarrollo de Aplicaciones Multiplataforma (DUAL)',
    nomEuskera: 'Plataforma Anitzeko Aplikazioen Garapena (DUALA)',
    abr: 'DAM-D',
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
    abr: 'AF-D',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Dual',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10137, 14088, 14950],
    duracion: 2000
  },
  // ADMINISTRACIÓN Y GESTIÓN - GRADO BÁSICO
  {
    codcicl: 10007001,
    nom: 'Servicios Administrativos',
    nomEuskera: 'Administrazio Zerbitzuak',
    abr: 'SA',
    familia: 'Administración y Gestión',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14615, 14696, 16226, 12544, 12497, 13542, 13432, 13015, 15226],
    duracion: 2000
  },
  {
    codcicl: 30003001,
    nom: 'Programación de la Producción en Fabricación Mecánica (DUAL)',
    nomEuskera: 'Fabrikazio Mekanikoko Ekoizpenaren Programazioa (DUALA)',
    abr: 'PPFM-D',
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
    abr: 'CM',
    familia: 'Fabricación Mecánica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [14069, 14702, 12053, 12229, 13015, 13023], // CÓDIGOS CORREGIDOS
    duracion: 2000
  },
  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR (ACTUALIZADO)
  {
    codcicl: 160001,
    nom: 'Automatización y Robótica Industrial',
    nomEuskera: 'Automatizazioa eta Robotika Industriala',
    abr: 'ARI',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053, 13015, 13023, 10137, 14069, 14702, 12229, 15307],
    duracion: 2000
  },
  {
    codcicl: 160002,
    nom: 'Sistemas de Telecomunicaciones e Informáticos',
    nomEuskera: 'Telekomunikazio eta Sistema Informatikoak',
    abr: 'STI',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [15305, 12053, 13023, 12497, 10137, 14069, 14702, 15307, 10248],
    duracion: 2000
  },
  // ELECTRICIDAD Y ELECTRÓNICA - GRADO SUPERIOR
  {
    codcicl: 160003,
    nom: 'Mantenimiento Electrónico',
    nomEuskera: 'Mantentze Lan Elektronikoa',
    abr: 'ME',
    familia: 'Electricidad y Electrónica',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10248, 14702],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO MEDIO
  {
    codcicl: 160004,
    nom: 'Instalaciones de Telecomunicaciones',
    nomEuskera: 'Telekomunikazio Instalazioak',
    abr: 'IT',
    familia: 'Electricidad y Electrónica',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14010, 14069, 14702, 12053, 15037, 12497, 13456, 13023, 10137, 10248
    ],
    duracion: 2000
  },

  // ELECTRICIDAD Y ELECTRÓNICA - GRADO BÁSICO
  {
    codcicl: 16000001,
    nom: 'Electricidad y Electrónica',
    nomEuskera: 'Elektrizitatea eta Elektronika',
    abr: 'EE',
    familia: 'Electricidad y Electrónica',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      14010, 14069, 14088, 14702, 14747, 14810, 15037, 15041, 12053, 12229,
      12372, 12497, 13432, 13456, 13542, 13622, 13023, 10137, 10248, 15112
    ],
    duracion: 2000
  },

  // MODALIDAD A DISTANCIA - EJEMPLOS
  {
    codcicl: 10010002,
    nom: 'Administración y Finanzas (DISTANCIA)',
    nomEuskera: 'Administrazioa eta Finantzak (URRUTIRA)',
    abr: 'AF-DIST',
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
    codcicl: 23000001,
    nom: 'Informática y Comunicaciones',
    nomEuskera: 'Informatika eta Komunikazioak',
    abr: 'IC',
    familia: 'Informática y Comunicaciones',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [
      10248, 12053, 12497, 12648, 12982, 13432, 14069, 14279, 14421, 14810,
      15041, 15305, 15307, 15392
    ],
    duracion: 2000
  },
  {
    codcicl: 10004002,
    nom: 'Desarrollo de Aplicaciones Web (DISTANCIA)',
    nomEuskera: 'Web Aplikazioen Garapena (URRUTIRA)',
    abr: 'DAW-DIST',
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
    abr: 'EI-DIST',
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
    abr: 'GA-DIST',
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
    abr: 'AF-VESP',
    familia: 'Administración y Gestión',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Vespertino',
    idiomas: ['ES', 'EU'],
    centros: [10137, 15112],
    duracion: 2000
  },
  {
    codcicl: 10003002,
    nom: 'Desarrollo de Aplicaciones Multiplataforma (VESPERTINO)',
    nomEuskera: 'Plataforma Anitzeko Aplikazioen Garapena (ARRATSALDEKOA)',
    abr: 'DAM-VESP',
    familia: 'Informática y Comunicaciones',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Vespertino',
    idiomas: ['ES', 'EU'],
    centros: [10137, 15112],
    duracion: 2000
  },

  // TURNO NOCTURNO - EJEMPLOS
  {
    codcicl: 10012002,
    nom: 'Gestión Administrativa (NOCTURNO)',
    nomEuskera: 'Administrazio Kudeaketa (GAUEKOA)',
    abr: 'GA-NOCT',
    familia: 'Administración y Gestión',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Nocturno',
    idiomas: ['ES', 'EU'],
    centros: [10137],
    duracion: 2000
  },

  // CICLOS EN INGLÉS - EJEMPLOS
  {
    codcicl: 10004003,
    nom: 'Desarrollo de Aplicaciones Web (INGLÉS)',
    nomEuskera: 'Web Aplikazioen Garapena (INGELESEZ)',
    abr: 'DAW-EN',
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
    abr: 'CI-EN',
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
    abr: 'GAT-EN',
    familia: 'Hostelería y Turismo',
    grado: 'Superior',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['EN', 'ES', 'EU'],
    centros: [10256, 14340],
    duracion: 2000
  },
  {
    codcicl: 60005012,
    nom: 'Aprovechamientos Forestales',
    nomEuskera: 'Baso Ustiaketako Oinarrizkoa',
    abr: 'APFO',
    familia: 'Agraria',
    grado: 'Básico',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10745],
    duracion: 2000
  },
  {
    codcicl: 290003,
    nom: "Emergencias y Protección Civil",
    nomEuskera: "Larrialdiak eta Babes Zibila",
    abr: "EPC",
    familia: "Seguridad y Medio Ambiente",
    grado: "Medio",
    modalidad: "Presencial",
    turno: "Diurno",
    idiomas: ["ES", "EU"],
    centros: [14279],
    duracion: 2000
  },
  {
    codcicl: 60005014,
    nom: 'Aprovechamiento y Conservación del Medio Natural',
    nomEuskera: 'Natura Ingurunearen Ustiaketa eta Kontserbazioa',
    abr: 'APFO',
    familia: 'Agraria',
    grado: 'Medio',
    modalidad: 'Presencial',
    turno: 'Diurno',
    idiomas: ['ES', 'EU'],
    centros: [10745],
    duracion: 2000
  },
  // SEGURIDAD Y MEDIO AMBIENTE - GRADO SUPERIOR (ACTUALIZADO)
{
  codcicl: 290001,
  nom: "Educación y Control Ambiental",
  nomEuskera: "Ingurumen Hezkuntza eta Kontrola",
  abr: "ECA",
  familia: "Seguridad y Medio Ambiente",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14069, 12229, 14702, 15307], // Se añaden 14702 y 15307
  duracion: 2000
},
{
  codcicl: 290002,
  nom: "Coordinación de Emergencias y Protección Civil",
  nomEuskera: "Larrialdien eta Babes Zibilaren Koordinazioa",
  abr: "CEPC",
  familia: "Seguridad y Medio Ambiente",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [14279],
  duracion: 2000
},
// TEXTIL, CONFECCIÓN Y PIEL - GRADO MEDIO
{
  codcicl: 310003,
  nom: "Confección y Moda",
  nomEuskera: "Jantzigintza eta Moda",
  abr: "CM",
  familia: "Textil, Confección y Piel",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [13432],
  duracion: 2000
},
{
  codcicl: 310004,
  nom: "Calzado y Complementos de Moda",
  nomEuskera: "Oinetakoak eta Modako Osagarriak",
  abr: "CCM",
  familia: "Textil, Confección y Piel",
  grado: "Medio",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [15112],
  duracion: 2000
},
{
  codcicl: 310001,
  nom: "Patronaje y Moda",
  nomEuskera: "Patroigintza eta Moda",
  abr: "PM",
  familia: "Textil, Confección y Piel",
  grado: "Superior",
  modalidad: "Presencial",
  turno: "Diurno",
  idiomas: ["ES", "EU"],
  centros: [13432, 15112], // Se añade 15112
  duracion: 2000
},


]

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
  ...new Set(ciclos.map(c => c.familia))
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
