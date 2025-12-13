getDCBUrl (ciclo: Asignacion): string {
    const lang = this.currentLang

    // ✅ MAPEO DE FAMILIAS PROFESIONALES (código → slug URL)
    const familiaToSlug: Record<string, { es: string; eu: string }> = {
      IFC: {
        es: 'informatica-y-comunicaciones-ifc',
        eu: 'informatika-eta-komunikazioak-ifc'
      },
      COM: {
        es: 'comercio-y-marketing-com',
        eu: 'merkataritza-eta-marketina-com'
      },
      ADG: {
        es: 'administracion-y-gestion-adg',
        eu: 'administrazioa-eta-kudeaketa-adg'
      },
      ELE: {
        es: 'electricidad-y-electronica-ele',
        eu: 'elektrizitatea-eta-elektronika-ele'
      },
      FME: {
        es: 'fabricacion-mecanica-fme',
        eu: 'fabrikazio-mekanikoa-fme'
      },
      IMA: {
        es: 'instalacion-y-mantenimiento-ima',
        eu: 'instalazioa-eta-mantentze-lanak-ima'
      },
      TMV: {
        es: 'transporte-y-mantenimiento-de-vehiculos-tmv',
        eu: 'garraioa-eta-ibilgailuen-mantentze-lanak-tmv'
      },
      HOT: {
        es: 'hosteleria-y-turismo-hot',
        eu: 'ostalaritza-eta-turismoa-hot'
      },
      IMP: {
        es: 'imagen-personal-imp',
        eu: 'irudi-pertsonala-imp'
      },
      INA: {
        es: 'industrias-alimentarias-ina',
        eu: 'elikagaien-industriak-ina'
      },
      MMC: {
        es: 'madera-mueble-y-corcho-mam',
        eu: 'zurgintzaa-altzargintza-eta-kortxoa-mam'
      },
      MAP: {
        es: 'maritimo-pesquera-map',
        eu: 'itsasoa-eta-arrantza-map'
      },
      SAN: {
        es: 'sanidad-san',
        eu: 'osasungintzaa-san'
      },
      SSC: {
        es: 'servicios-socioculturales-y-a-la-comunidad-ssc',
        eu: 'gizarte-eta-kultura-zerbitzuak-ssc'
      },
      EOC: {
        es: 'edificacion-y-obra-civil-eoc',
        eu: 'eraikuntza-eta-obra-zibila-eoc'
      },
      ENA: {
        es: 'energia-y-agua-ena',
        eu: 'energia-eta-ura-ena'
      },
      AAN: {
        es: 'artes-y-artesanias-art',
        eu: 'arteak-eta-artisautza-art'
      },
      ARG: {
        es: 'artes-graficas-arg',
        eu: 'arte-grafikoak-arg'
      },
      IMS: {
        es: 'imagen-y-sonido-ims',
        eu: 'irudia-eta-soinua-ims'
      },
      AFD: {
        es: 'actividades-fisicas-y-deportivas-afd',
        eu: 'jarduera-fisikoak-eta-kirolak-afd'
      },
      AGA: {
        es: 'agraria-aga',
        eu: 'nekazaritza-aga'
      },
      QUI: {
        es: 'quimica-qui',
        eu: 'kimika-qui'
      },
      SEA: {
        es: 'seguridad-y-medio-ambiente-sea',
        eu: 'segurtasuna-eta-ingurumena-sea'
      },
      TCP: {
        es: 'textil-confeccion-y-piel-tcp',
        eu: 'ehungintza-jantzigintza-eta-larrugintza-tcp'
      }
    }
    // Obtener slug de la familia
    const familiaSlug = familiaToSlug[ciclo.familiaCodigo]
    if (!familiaSlug) {
      console.error(`❌ Familia no encontrada: ${ciclo.familiaCodigo}`)
      return '#'
    }

    const codigoFamilia = lang === 'eu' ? familiaSlug.eu : familiaSlug.es

    // ✅ FUNCIÓN PARA NORMALIZAR SLUGS (eliminar acentos, espacios, etc.)
    const normalizarSlug = (str: string): string => {
      return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/[,()]/g, '') // Eliminar comas y paréntesis
        .replace(/-+/g, '-') // Múltiples guiones a uno solo
        .replace(/^-|-$/g, '') // Eliminar guiones al inicio o final
    }

    // ✅ MAPEO DE CICLOS BÁSICOS CON URLS ESPECÍFICAS (casos especiales)
    const ciclosBasicosEspeciales: Record<string, { es: string; eu: string }> =
      {
        // Acceso y Conservación en Instalaciones Deportivas
        'acceso-y-conservacion-en-instalaciones-deportivas': {
          es: 'profesional-basico-en-acceso-y-conservacion-en-instalaciones-deportivas-1.html',
          eu: 'kirol-instalazioen-irisgarritasuneko-eta-kontserbazioko-oinarrizko-profesionala-1.html'
        },
        'acceso-e-instalacion-en-instalaciones-deportivas': {
          es: 'profesional-basico-en-acceso-y-conservacion-en-instalaciones-deportivas-1.html',
          eu: 'kirol-instalazioen-irisgarritasuneko-eta-kontserbazioko-oinarrizko-profesionala-1.html'
        },
        'kirol-instalazioetan-sarbidea-eta-kontserbazioa': {
          es: 'profesional-basico-en-acceso-y-conservacion-en-instalaciones-deportivas-1.html',
          eu: 'kirol-instalazioen-irisgarritasuneko-eta-kontserbazioko-oinarrizko-profesionala-1.html'
        },
        // Artes Gráficas
        'artes-graficas': {
          es: 'titulo-profesional-basico-en-artes-graficas-.html',
          eu: 'arte-grafikoetako-oinarrizko-profesionala.html'
        },
        'arte-grafikoak-oinarrizko-profesionala': {
          es: 'titulo-profesional-basico-en-artes-graficas-.html',
          eu: 'arte-grafikoetako-oinarrizko-profesionala.html'
        },
        'arte-grafikoetako': {
          es: 'titulo-profesional-basico-en-artes-graficas-.html',
          eu: 'arte-grafikoetako-oinarrizko-profesionala.html'
        },
        // Electricidad y Electrónica
        'electricidad-y-electronica': {
          es: 'titulo-profesional-basico-en-electricidad-y-electronica-.html',
          eu: 'elektrizitateko-eta-elektronikako-oinarrizko-profesionala.html'
        },
        'instalazio-elektriko-eta-automatikoen-oinarrizko-profesionala': {
          es: 'titulo-profesional-basico-en-electricidad-y-electronica-.html',
          eu: 'elektrizitateko-eta-elektronikako-oinarrizko-profesionala.html'
        },
        'elektrizitateko-eta-elektronikako': {
          es: 'titulo-profesional-basico-en-electricidad-y-electronica-.html',
          eu: 'elektrizitateko-eta-elektronikako-oinarrizko-profesionala.html'
        },
        // Mantenimiento de Vehículos
        'mantenimiento-de-vehiculos-y-motores': {
          es: 'titulo-profesional-basico-en-mantenimiento-de-vehiculos.html',
          eu: 'ibilgailuen-mantentze-lanak-oinarrizko-lanbide-titulua.html'
        },
        'mantenimiento-de-vehiculos': {
          es: 'titulo-profesional-basico-en-mantenimiento-de-vehiculos.html',
          eu: 'ibilgailuen-mantentze-lanak-oinarrizko-lanbide-titulua.html'
        },
        // Cocina y Restauración
        'cocina-y-restauracion': {
          es: 'titulo-profesional-basico-en-cocina-y-restauracion-.html',
          eu: 'sukaldaritzako-eta-jatetxe-arloko-oinarrizko-profesionala.html'
        },
        'sukaldaritza-eta-gastronomiako': {
          es: 'titulo-profesional-basico-en-cocina-y-restauracion-.html',
          eu: 'sukaldaritzako-eta-jatetxe-arloko-oinarrizko-profesionala.html'
        },
        // Panadería y Pastelería
        'actividades-de-panaderia-pasteleria': {
          es: 'titulo-profesional-basico-en-actividades-de-panaderia-y-pasteleria-1.html',
          eu: 'okintzako-eta-pastelgintzako-jardueretako-oinarrizko-profesionala-1.html'
        },
        'actividades-de-panaderia-y-pasteleria': {
          es: 'titulo-profesional-basico-en-actividades-de-panaderia-y-pasteleria-1.html',
          eu: 'okintzako-eta-pastelgintzako-jardueretako-oinarrizko-profesionala-1.html'
        },
        'okintza-gozogintza-eta-konfiteriako-oinarrizko-profesionala': {
          es: 'titulo-profesional-basico-en-actividades-de-panaderia-y-pasteleria-1.html',
          eu: 'okintzako-eta-pastelgintzako-jardueretako-oinarrizko-profesionala-1.html'
        },
        'okintzako-eta-pastelgintzako-jardueretako': {
          es: 'titulo-profesional-basico-en-actividades-de-panaderia-y-pasteleria-1.html',
          eu: 'okintzako-eta-pastelgintzako-jardueretako-oinarrizko-profesionala.html'
        },
        // Carpintería y Mueble
        'carpinteria-y-mueble': {
          es: 'titulo-profesional-basico-en-carpinteria-y-mueble.html',
          eu: 'arotzeriako-eta-altzarigintzako-oinarrizko-profesionala.html'
        },
        'arotz-eta-altzari-lanetako': {
          es: 'titulo-profesional-basico-en-carpinteria-y-mueble.html',
          eu: 'arotzeriako-eta-altzarigintzako-oinarrizko-profesionala.html'
        },
        // Fabricación y Montaje
        'fabricacion-y-montaje': {
          es: 'titulo-profesional-basico-en-fabricacion-y-montaje.html',
          eu: 'fabrikazio-eta-muntaketako-oinarrizko-profesionala.html'
        },
        'fabrikazioa-eta-muntaketako': {
          es: 'titulo-profesional-basico-en-fabricacion-y-montaje.html',
          eu: 'fabrikazio-eta-muntaketako-oinarrizko-profesionala.html'
        },
        // Fabricación de Elementos Metálicos
        'fabricacion-de-elementos-metalicos': {
          es: 'titulo-profesional-basico-en-fabricacion-de-elementos-metalicos.html',
          eu: 'elementu-metalikoen-fabrikazioko-oinarrizko-profesionala-1.html'
        },
        'metalezko-elementuen-fabrikazioa': {
          es: 'titulo-profesional-basico-en-fabricacion-de-elementos-metalicos.html',
          eu: 'elementu-metalikoen-fabrikazioko-oinarrizko-profesionala-1.html'
        },
        // Reforma y Mantenimiento de Edificios
        'reforma-y-mantenimiento-de-edificios': {
          es: 'titulo-profesional-basico-en-reforma-y-mantenimiento-de-edificios.html',
          eu: 'eraikinak-eraberritu-eta-mantentzeko-oinarrizko-profesionala.html'
        },
        'eraikinen-erreforma-eta-mantentzea': {
          es: 'titulo-profesional-basico-en-reforma-y-mantenimiento-de-edificios.html',
          eu: 'eraikinak-eraberritu-eta-mantentzeko-oinarrizko-profesionala.html'
        },
        // Peluquería y Estética
        'peluqueria-y-estetica': {
          es: 'titulo-profesional-basico-en-peluqueria-y-estetica.html',
          eu: 'ile-apainketako-eta-estetikako-oinarrizko-profesionala.html'
        },
        'ile-apainketa-eta-estetikako': {
          es: 'titulo-profesional-basico-en-peluqueria-y-estetica.html',
          eu: 'ile-apainketako-eta-estetikako-oinarrizko-profesionala.html'
        },
        // Actividades Marítimo Pesqueras
        'actividades-maritimo-pesqueras': {
          es: 'titulo-profesional-basico-en-actividades-maritimo-pesqueras.html',
          eu: 'itsas-eta-arrantza-jardueretako-oinarrizko-profesionala.html'
        },
        'itsasoko-eta-arrantzako-jarduerak': {
          es: 'titulo-profesional-basico-en-actividades-maritimo-pesqueras.html',
          eu: 'itsas-eta-arrantza-jardueretako-oinarrizko-profesionala.html'
        },
        // Agro-jardinería y Composiciones Florales
        'agro-jardineria-y-composiciones-florales': {
          es: 'titulo-profesional-basico-en-agro-jardineria-y-composiciones-florales-.html',
          eu: 'nekazaritza-lorezaintza-eta-lore-konposizioetako-oinarrizko-profesionala.html'
        },
        'nekazaritza-lorezaintza-eta-lore-konposizioen': {
          es: 'titulo-profesional-basico-en-agro-jardineria-y-composiciones-florales-.html',
          eu: 'nekazaritza-lorezaintza-eta-lore-konposizioetako-oinarrizko-profesionala.html'
        },
        // Aprovechamientos Forestales
        'aprovechamientos-forestales': {
          es: 'titulo-profesional-basico-en-aprovechamientos-forestales-.html',
          eu: 'baso-aprobetxamenduetako-oinarrizko-profesionala.html'
        },
        'baso-aprobetxamendu-lanetako': {
          es: 'titulo-profesional-basico-en-aprovechamientos-forestales-.html',
          eu: 'baso-aprobetxamenduetako-oinarrizko-profesionala.html'
        },
        'baso-aprobetxamenduetako': {
          es: 'titulo-profesional-basico-en-aprovechamientos-forestales-.html',
          eu: 'baso-aprobetxamenduetako-oinarrizko-profesionala.html'
        },
        // Actividades Agropecuarias
        'actividades-agropecuarias': {
          es: 'titulo-profesional-basico-en-actividades-agropecuarias-.html',
          eu: 'nekazaritza-eta-abeltzaintza-jardueretako-oinarrizko-profesionala.html'
        },
        'nekazaritza-eta-abeltzaintza-jardueretako': {
          es: 'titulo-profesional-basico-en-actividades-agropecuarias-.html',
          eu: 'nekazaritza-eta-abeltzaintza-jardueretako-oinarrizko-profesionala.html'
        },
        // Mantenimiento de Viviendas
        'mantenimiento-de-viviendas': {
          es: 'titulo-profesional-basico-en-mantenimiento-de-viviendas.html',
          eu: 'etxebizitzen-mantentze-lanetako-oinarrizko-profesionala.html'
        },
        'etxebizitzen-mantentze-lanetako': {
          es: 'titulo-profesional-basico-en-mantenimiento-de-viviendas.html',
          eu: 'etxebizitzen-mantentze-lanetako-oinarrizko-profesionala.html'
        },
        // Instalaciones Electrotécnicas y Mecánicas
        'instalaciones-electrotecnicas-y-mecanicas': {
          es: 'titulo-profesional-basico-en-instalaciones-electrotecnicas-y-mecanicas.html',
          eu: 'instalazio-elektroteknikoetako-eta-mekanikako-oinarrizko-profesionala-1.html'
        },
        'instalazio-elektroteknikoak-eta-mekanikoak': {
          es: 'titulo-profesional-basico-en-instalaciones-electrotecnicas-y-mecanicas.html',
          eu: 'instalazio-elektroteknikoetako-eta-mekanikako-oinarrizko-profesionala-1.html'
        },
        'instalazio-elektroteknikoetako-eta-mekanikako': {
          es: 'titulo-profesional-basico-en-instalaciones-electrotecnicas-y-mecanicas.html',
          eu: 'instalazio-elektroteknikoetako-eta-mekanikako-oinarrizko-profesionala.html'
        },
        // Reparación de Artículos Textiles y de Piel
        'reparacion-de-articulos-textiles-y-de-piel': {
          es: 'titulo-profesional-basico-en-reparacion-de-articulos-textiles-y-de-piel.html',
          eu: 'ehunezko-eta-larruzko-artikuluen-konponketako-oinarrizko-profesionala.html'
        },
        'ehungintza-eta-larru-artikuluen-konponketa': {
          es: 'titulo-profesional-basico-en-reparacion-de-articulos-textiles-y-de-piel.html',
          eu: 'ehunezko-eta-larruzko-artikuluen-konponketako-oinarrizko-profesionala.html'
        },
        'ehunezko-eta-larruzko-artikuluen-konponketako': {
          es: 'titulo-profesional-basico-en-reparacion-de-articulos-textiles-y-de-piel.html',
          eu: 'ehunezko-eta-larruzko-artikuluen-konponketako-oinarrizko-profesionala.html'
        },
        // Operaciones de Fabricación de Productos Farmacéuticos, Cosméticos y Afines
        'operaciones-de-fabricacion-de-productos-farmaceuticos-cosmeticos-y-afines':
          {
            es: 'titulo-profesional-basico-en-operaciones-de-fabricacion-de-productos-farmaceuticos-cosmeticos-y-afines.html',
            eu: 'produktu-farmazeutiko-kosmetiko-eta-antzekoak-fabrikatzeko-eragiketako-oinarrizko-profesionala.html'
          },
        'produktu-farmazeutiko-kosmetiko-eta-antzekoak-fabrikatzeko-eragiketako':
          {
            es: 'titulo-profesional-basico-en-operaciones-de-fabricacion-de-productos-farmaceuticos-cosmeticos-y-afines.html',
            eu: 'produktu-farmazeutiko-kosmetiko-eta-antzekoak-fabrikatzeko-eragiketako-oinarrizko-profesionala.html'
          }
      }

    // ✅ MAPEO DE CICLOS GRADO MEDIO CON URLS ESPECÍFICAS (casos especiales)
    const ciclosMedioEspeciales: Record<string, { es: string; eu: string }> = {
      // Farmacia y Parafarmacia
      'farmacia-y-parafarmacia': {
        es: 'tecnico-en-farmacia-y-parafarmacia.html',
        eu: 'farmaziako-eta-parafarmaziako-teknikaria.html'
      },
      'farmazia-eta-parafarmazia': {
        es: 'tecnico-en-farmacia-y-parafarmacia.html',
        eu: 'farmaziako-eta-parafarmaziako-teknikaria.html'
      },
      'farmaziako-eta-parafarmaziako': {
        es: 'tecnico-en-farmacia-y-parafarmacia.html',
        eu: 'farmaziako-eta-parafarmaziako-teknikaria.html'
      },
      // Jardinería y Floristería
      'jardineria-y-floristeria': {
        es: 'tecnico-en-jardineria-y-floristeria-.html',
        eu: 'lorezaintzako-eta-loregintzako-teknikaria.html'
      },
      'lorezaintza-eta-loredenda': {
        es: 'tecnico-en-jardineria-y-floristeria-.html',
        eu: 'lorezaintzako-eta-loregintzako-teknikaria.html'
      },
      // Post Impresión y Acabados Gráficos
      'postimpresion-y-acabados-graficos': {
        es: 'tecnico-en-post-impresion-y-acabados-graficos.html',
        eu: 'postinprimaketa-eta-akabera-grafikoko-teknikaria.html'
      },
      'post-impresion-y-acabados-graficos': {
        es: 'tecnico-en-post-impresion-y-acabados-graficos.html',
        eu: 'postinprimaketa-eta-akabera-grafikoko-teknikaria.html'
      },
      'postinprimaketa-eta-akabera-grafikoen': {
        es: 'tecnico-en-post-impresion-y-acabados-graficos.html',
        eu: 'postinprimaketa-eta-akabera-grafikoko-teknikaria.html'
      },
      // Preimpresión Digital
      'preimpresion-digital': {
        es: 'tecnico-en-preimpresion-digital.html',
        eu: 'aurreinprimaketa-digitaleko-teknikaria.html'
      },
      'aurreinprimaketa-digitaleko': {
        es: 'tecnico-en-preimpresion-digital.html',
        eu: 'aurreinprimaketa-digitaleko-teknikaria.html'
      },
      // Carpintería y Mueble (antes Ebanistería)
      ebanisteria: {
        es: 'tecnico-en-carpinteria-y-mueble.html',
        eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
      },
      // Carpintería y Mueble (Erdi maila)
      'carpinteria-y-mueble': {
        es: 'tecnico-en-carpinteria-y-mueble.html',
        eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
      },
      'arotzeriako-eta-altzarigintzako': {
        es: 'tecnico-en-carpinteria-y-mueble.html',
        eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
      },
      'arotz-eta-altzari-lanetako': {
        es: 'tecnico-en-carpinteria-y-mueble.html',
        eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
      },

      // Instalación y Amueblamiento
      'instalacion-y-amueblamiento': {
        es: 'tecnico-en-instalacion-y-amueblamiento.html',
        eu: 'instalazioko-eta-altzari-hornikuntzako-teknikaria.html'
      },
      'instalazioko-eta-altzari-hornikuntzako': {
        es: 'tecnico-en-instalacion-y-amueblamiento.html',
        eu: 'instalazioko-eta-altzari-hornikuntzako-teknikaria.html'
      },
      // Actividades Comerciales
      'actividades-comerciales': {
        es: 'tecnico-en-actividades-comerciales-.html',
        eu: 'merkataritza-jardueren-teknikaria.html'
      },
      // Comercialización de Productos Alimentarios
      'comercializacion-de-productos-alimentarios': {
        es: 'tecnico-en-comercializacion-de-productos-alimentarios.html',
        eu: 'elikagaiak-merkaturatzeko-teknikaria-1.html'
      },
      'elikagaiak-merkaturatzeko': {
        es: 'tecnico-en-comercializacion-de-productos-alimentarios.html',
        eu: 'elikagaiak-merkaturatzeko-teknikaria-1.html'
      },
      // Sistemas Microinformáticos y Redes
      'sistemas-microinformaticos-y-redes': {
        es: 'tecnico-en-sistemas-microinformaticos-y-redes.html',
        eu: 'mikroinformatika-sistemetako-eta-sareetako-teknikaria.html'
      },
      'sistema-mikroinformatikoak-eta-sareak': {
        es: 'tecnico-en-sistemas-microinformaticos-y-redes.html',
        eu: 'mikroinformatika-sistemetako-eta-sareetako-teknikaria.html'
      },
      // Instalaciones Eléctricas y Automáticas
      'instalaciones-electricas-y-automaticas': {
        es: 'tecnico-en-instalaciones-electricas-y-automaticas-.html',
        eu: 'hozteko-eta-girotzeko-instalazioetako-teknikaria.html'
      },
      'instalazio-elektriko-eta-automatikoen': {
        es: 'tecnico-en-instalaciones-electricas-y-automaticas-.html',
        eu: 'hozteko-eta-girotzeko-instalazioetako-teknikaria.html'
      },
      // Instalaciones de Telecomunicaciones
      'instalaciones-de-telecomunicaciones': {
        es: 'tecnico-en-instalaciones-de-telecomunicaciones-.html',
        eu: 'telekomunikazio-instalazioetako-teknikaria.html'
      },
      'telekomunikazio-instalazioen': {
        es: 'tecnico-en-instalaciones-de-telecomunicaciones-.html',
        eu: 'telekomunikazio-instalazioetako-teknikaria.html'
      },
      // Instalaciones de Producción de Calor
      'instalaciones-de-produccion-de-calor': {
        es: 'tecnico-en-instalaciones-de-produccion-de-calor-.html',
        eu: 'beroa-sortzeko-instalazioetako-teknikaria.html'
      },
      'bero-produkzioko-instalazioen': {
        es: 'tecnico-en-instalaciones-de-produccion-de-calor-.html',
        eu: 'beroa-sortzeko-instalazioetako-teknikaria.html'
      },
      // Cuidados Auxiliares de Enfermería (Grado Medio - LOGSE)
      'cuidados-auxiliares-de-enfermeria': {
        es: 'tecnico-en-cuidados-auxiliares-de-enfermeria-logse.html',
        eu: 'erizaintzako-zaintza-osagarrietako-teknikaria-logse.html'
      },
      'erizaintzako-laguntza-lanetako': {
        es: 'tecnico-en-cuidados-auxiliares-de-enfermeria-logse.html',
        eu: 'erizaintzako-zaintza-osagarrietako-teknikaria-logse.html'
      },
      // Producción Agroecológica
      'produccion-agroecologica': {
        es: 'tecnico-en-produccion-agroecologica.html',
        eu: 'nekazaritza-ekologikoko-teknikaria.html'
      },
      'ekoizpen-agroekologikoko': {
        es: 'tecnico-en-produccion-agroecologica.html',
        eu: 'nekazaritza-ekologikoko-teknikaria.html'
      },
      'nekazaritza-ekologikoko': {
        es: 'tecnico-en-produccion-agroecologica.html',
        eu: 'nekazaritza-ekologikoko-teknikaria.html'
      },
      // Producción Agropecuaria
      'produccion-agropecuaria': {
        es: 'tecnico-en-produccion-agropecuaria.html',
        eu: 'nekazaritzako-eta-abeltzaintzako-produkzioko-teknikaria.html'
      },
      'nekazaritzako-eta-abeltzaintzako-produkzioko': {
        es: 'tecnico-en-produccion-agropecuaria.html',
        eu: 'nekazaritzako-eta-abeltzaintzako-produkzioko-teknikaria.html'
      },
      // Aprovechamiento y Conservación del Medio Natural
      'aprovechamiento-y-conservacion-del-medio-natural': {
        es: 'tecnico-en-aprovechamiento-y-conservacion-del-medio-natural.html',
        eu: 'natura-ingurunea-ustiatzeko-eta-kontserbatzeko-teknikaria.html'
      },
      'natura-ingurunea-ustiatzeko-eta-kontserbatzeko': {
        es: 'tecnico-en-aprovechamiento-y-conservacion-del-medio-natural.html',
        eu: 'natura-ingurunea-ustiatzeko-eta-kontserbatzeko-teknikaria.html'
      },
      // Obras de Interior, Decoración y Rehabilitación
      'obras-de-interior-decoracion-y-rehabilitacion': {
        es: 'tecnico-en-obras-de-interior-decoracion-y-rehabilitacion.html',
        eu: 'barnealde-dekorazio-eta-birgaitze-obretako-teknikaria.html'
      },
      'barne-lanak-dekorazioa-eta-birgaitze-lanetako': {
        es: 'tecnico-en-obras-de-interior-decoracion-y-rehabilitacion.html',
        eu: 'barnealde-dekorazio-eta-birgaitze-obretako-teknikaria.html'
      },
      // Guía en el Medio Natural y de Tiempo Libre
      'guia-en-el-medio-natural-y-de-tiempo-libre': {
        es: 'tecnico-en-guia-en-el-medio-natural-y-de-tiempo-libre.html',
        eu: 'natura-inguruneko-eta-astialdiko-gidaritzako-teknikaria.html'
      },
      'natura-inguruneko-eta-aisialdiko-gidako': {
        es: 'tecnico-en-guia-en-el-medio-natural-y-de-tiempo-libre.html',
        eu: 'natura-inguruneko-eta-astialdiko-gidaritzako-teknikaria.html'
      },
      // Redes y Estaciones de Tratamiento de Aguas
      'redes-y-estaciones-de-tratamiento-de-aguas': {
        es: 'tecnico-en-redes-y-estaciones-de-tratamiento-de-aguas.html',
        eu: 'uren-tratamendurako-sare-eta-araztegietako-teknikaria.html'
      },
      'sareak-eta-ur-tratamendurako-estazioen': {
        es: 'tecnico-en-redes-y-estaciones-de-tratamiento-de-aguas.html',
        eu: 'uren-tratamendurako-sare-eta-araztegietako-teknikaria.html'
      },
      // Soldadura y Calderería
      'soldadura-y-caldereria': {
        es: 'tecnico-en-soldadura-y-caldereria.html',
        eu: 'soldadurako-eta-galdaragintzako-teknikaria.html'
      },
      'soldadura-eta-galdaragintza': {
        es: 'tecnico-en-soldadura-y-caldereria.html',
        eu: 'soldadurako-eta-galdaragintzako-teknikaria.html'
      },
      // Cocina y Gastronomía
      'cocina-y-gastronomia': {
        es: 'tecnico-en-cocina-y-gastronomia.html',
        eu: 'sukaldaritzako-eta-gastronomiako-teknikaria.html'
      },
      'sukaldaritza-eta-gastronomiako': {
        es: 'tecnico-en-cocina-y-gastronomia.html',
        eu: 'sukaldaritzako-eta-gastronomiako-teknikaria.html'
      },
      // Servicios de Restauración
      'servicios-de-restauracion': {
        es: 'tecnico-en-servicios-de-restauracion.html',
        eu: 'jatetxe-arloko-zerbitzuetako-teknikaria.html'
      },
      // Peluquería y Cosmética Capilar
      'peluqueria-y-cosmetica-capilar': {
        es: 'tecnico-en-peluqueria-y-cosmetica-capilar.html',
        eu: 'ile-apainketako-eta-kosmetikako-teknikaria.html'
      },
      'ile-apainketa-eta-kosmetika-kapilarreko': {
        es: 'tecnico-en-peluqueria-y-cosmetica-capilar.html',
        eu: 'ile-apainketako-eta-kosmetikako-teknikaria.html'
      },
      // Estética y Belleza
      'estetica-y-belleza': {
        es: 'tecnico-en-estetica-y-belleza.html',
        eu: 'estetikako-eta-edergintzako-teknikaria.html'
      },
      'estetika-eta-edertasuneko': {
        es: 'tecnico-en-estetica-y-belleza.html',
        eu: 'estetikako-eta-edergintzako-teknikaria.html'
      },
      // Panadería, Repostería y Confitería
      'panaderia-reposteria-y-confiteria': {
        es: 'tecnico-en-panaderia-reposteria-y-confiteria.html',
        eu: 'okintzako-gozogintzako-eta-konfiteriako-teknikaria.html'
      },
      'okintza-gozogintza-eta-konfiteriako': {
        es: 'tecnico-en-panaderia-reposteria-y-confiteria.html',
        eu: 'okintzako-gozogintzako-eta-konfiteriako-teknikaria.html'
      },
      // Mantenimiento Electromecánico
      'mantenimiento-electromecanico': {
        es: 'tecnico-en-mantenimiento-electromecanico.html',
        eu: 'mantentze-lan-elektromekanikoetako-teknikaria.html'
      },
      'mantentze-lan-elektromekanikoen': {
        es: 'tecnico-en-mantenimiento-electromecanico.html',
        eu: 'mantentze-lan-elektromekanikoetako-teknikaria.html'
      },
      // Mantenimiento y Control de la Maquinaria de Buques y Embarcaciones
      'mantenimiento-y-control-de-la-maquinaria-de-buques-y-embarcaciones': {
        es: 'tecnico-en-mantenimiento-y-control-de-la-maquinaria-de-buques-y-embarcaciones.html',
        eu: 'ontzi-eta-itsasontzien-makineria-zaintzeko-eta-kontrolatzeko-teknikaria.html'
      },
      'ontzi-eta-itsasontzien-makineria-zaintzeko-eta-kontrolatzeko': {
        es: 'tecnico-en-mantenimiento-y-control-de-la-maquinaria-de-buques-y-embarcaciones.html',
        eu: 'ontzi-eta-itsasontzien-makineria-zaintzeko-eta-kontrolatzeko-teknikaria.html'
      },
      // ✅ AÑADIR esta variante que falta:
      'ontzi-eta-itsasontzien-makinen-mantentze-lanak-eta-kontrola': {
        es: 'tecnico-en-mantenimiento-y-control-de-la-maquinaria-de-buques-y-embarcaciones.html',
        eu: 'ontzi-eta-itsasontzien-makineria-zaintzeko-eta-kontrolatzeko-teknikaria.html'
      },
      'itsasontzien-makineriaren-mantentze-lanak-eta-kontrola': {
        es: 'tecnico-en-mantenimiento-y-control-de-la-maquinaria-de-buques-y-embarcaciones.html',
        eu: 'ontzi-eta-itsasontzien-makineria-zaintzeko-eta-kontrolatzeko-teknikaria.html'
      },
      // Navegación y Pesca de Litoral
      'navegacion-y-pesca-de-litoral': {
        es: 'tecnico-en-navegacion-y-pesca-de-litoral.html',
        eu: 'itsasertzeko-nabigazioko-eta-arrantzako-teknikaria.html'
      },
      'nabigazioa-eta-itsasertzerako-arrantzako': {
        es: 'tecnico-en-navegacion-y-pesca-de-litoral.html',
        eu: 'itsasertzeko-nabigazioko-eta-arrantzako-teknikaria.html'
      },
      // Confección y Moda
      'confeccion-y-moda': {
        es: 'tecnico-en-confeccion-y-moda.html',
        eu: 'jantzigintzako-eta-modako-teknikaria.html'
      },
      'jantzigintza-eta-modako': {
        es: 'tecnico-en-confeccion-y-moda.html',
        eu: 'jantzigintzako-eta-modako-teknikaria.html'
      },
      'jantzigintzako-eta-modako': {
        es: 'tecnico-en-confeccion-y-moda.html',
        eu: 'jantzigintzako-eta-modako-teknikaria.html'
      },

      // Calzado y Complementos de Moda
      'calzado-y-complementos-de-moda': {
        es: 'tecnico-en-calzado-y-complementos-de-moda.html',
        eu: 'oinetakoetako-eta-moda-osagarrietako-teknikaria.html'
      },
      'oinetakoak-eta-modako-osagarrien': {
        es: 'tecnico-en-calzado-y-complementos-de-moda.html',
        eu: 'oinetakoetako-eta-moda-osagarrietako-teknikaria.html'
      },
      'oinetakoetako-eta-moda-osagarrietako': {
        es: 'tecnico-en-calzado-y-complementos-de-moda.html',
        eu: 'oinetakoetako-eta-moda-osagarrietako-teknikaria.html'
      },
      // Planta Química (antes Operaciones de Laboratorio)
      'planta-quimica': {
        es: 'tecnico-en-planta-quimica.html',
        eu: 'kimika-instalazioko-teknikaria.html'
      },
      'operaciones-de-laboratorio': {
        es: 'tecnico-en-operaciones-de-laboratorio.html',
        eu: 'laborategiko-eragiketetako-teknikaria.html'
      },
      'lantegi-kimikoko': {
        es: 'tecnico-en-planta-quimica.html',
        eu: 'kimika-instalazioko-teknikaria.html'
      },
      'kimika-instalazioko': {
        es: 'tecnico-en-planta-quimica.html',
        eu: 'kimika-instalazioko-teknikaria.html'
      },
      'laborategiko-eragiketetako': {
        es: 'tecnico-en-operaciones-de-laboratorio.html',
        eu: 'laborategiko-eragiketetako-teknikaria.html'
      }
    }

    // ✅ MAPEO DE CICLOS GRADO SUPERIOR CON URLS ESPECÍFICAS (casos especiales)
    const ciclosSuperiorEspeciales: Record<string, { es: string; eu: string }> =
      {
        // Diseño y Amueblamiento (Goi Maila)
        'diseno-y-amueblamiento': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        'diseinuko-eta-altzari-hornikuntzako': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        // ✅ AÑADIR estas variantes del slug normalizado:
        'zura-eta-altzarien-ekoizpenaren-diseinua-eta-kudeaketa': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        'zura-eta-altzarien-ekoizpenaren-diseinua-eta-kudeaketako': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        'diseno-y-gestion-de-la-produccion-de-madera-y-mueble': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        'zura-eta-altzarien-ekoizpena-diseinatzeko-eta-kudeatzeko': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        // ✅ Variantes sin el sufijo "-goi-mailako-teknikaria"
        'diseinua-eta-altzariak-jartzea': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        'diseinuko-eta-altzari-jartzeko': {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
        },
        // Transporte y Logística
        'transporte-y-logistica': {
          es: 'tecnico-superior-en-transporte-y-logistica-.html',
          eu: 'garraioa-eta-logistika-goi-mailako-teknikaria.html'
        },
        // Desarrollo de Aplicaciones Multiplataforma
        'desarrollo-de-aplicaciones-multiplataforma': {
          es: 'tecnico-superior-en-desarrollo-de-aplicaciones-multiplataforma-.html',
          eu: 'multiplataforma-aplikazioen-garapena-goi-mailako-teknikaria.html'
        },
        // Prevención de Riesgos Profesionales (LOGSE)
        'prevencion-de-riesgos-profesionales': {
          es: 'tecnico-superior-en-prevencion-de-riesgos-profesionales-logse.html',
          eu: 'lanbide-arriskuen-prebentzioa-goi-mailako-teknikaria-logse.html'
        },
        // Organización del Mantenimiento de Maquinaria de Buques
        'mantenimiento-y-control-de-la-maquinaria-de-buques': {
          es: 'tecnico-superior-en-organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones.html',
          eu: 'itsasontzi-eta-ontzi-makinen-mantentze-lanen-antolamendua-goi-mailako-teknikaria.html'
        },
        'organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones':
          {
            es: 'tecnico-superior-en-organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones.html',
            eu: 'itsasontzi-eta-ontzi-makinen-mantentze-lanen-antolamendua-goi-mailako-teknikaria.html'
          },
        // Laboratorio de Análisis y Control de Calidad
        'laboratorio-de-analisis-y-control-de-calidad': {
          es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
          eu: 'analisiko-eta-kalitate-kontroleko-laborategiko-goi-mailako-teknikaria.html'
        },
        'laboratorio-de-analisis-y-de-control-de-calidad': {
          es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
          eu: 'analisiko-eta-kalitate-kontroleko-laborategiko-goi-mailako-teknikaria.html'
        },
        'analisirako-eta-kalitate-kontrolerako-laborategia': {
          es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
          eu: 'analisiko-eta-kalitate-kontroleko-laborategiko-goi-mailako-teknikaria.html'
        },
        'analisiko-eta-kalitate-kontroleko-laborategiko': {
          es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
          eu: 'analisiko-eta-kalitate-kontroleko-laborategiko-goi-mailako-teknikaria.html'
        },
        'analisiaren-eta-kalitate-kontrolaren-laborategiko': {
          es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
          eu: 'analisiko-eta-kalitate-kontroleko-laborategiko-goi-mailako-teknikaria.html'
        },
        // Dietética (LOGSE)
        dietetica: {
          es: 'tecnico-superior-en-dietetica-logse.html',
          eu: 'dietetika-goi-mailako-teknikaria-logse.html'
        },
        // Higiene Bucodental
        'higiene-bucodental': {
          es: 'tecnico-superior-en-higiene-bucodental-1.html',
          eu: 'ahoko-higienea-goi-mailako-teknikaria.html'
        },
        'higiene-buco-dental': {
          es: 'tecnico-superior-en-higiene-bucodental-1.html',
          eu: 'ahoko-higienea-goi-mailako-teknikaria.html'
        },
        // Animación Sociocultural y Turística
        'animacion-sociocultural-y-turistica': {
          es: 'tecnico-superior-animacion-sociocultural-y-turistica.html',
          eu: 'gizarte-kultur-animazioa-eta-turismoa-goi-mailako-teknikaria.html'
        },
        // Diseño y Producción de Calzado y Complementos
        'calzado-y-complementos-de-moda': {
          es: 'tecnico-superior-en-diseno-y-produccion-de-calzado-y-complementos.html',
          eu: 'oinetakoetako-eta-moda-osagarrietako-teknikaria.html'
        },
        'oinetakoak-eta-modako-osagarrien': {
          es: 'tecnico-superior-en-diseno-y-produccion-de-calzado-y-complementos.html',
          eu: 'oinetakoetako-eta-moda-osagarrietako-teknikaria.html'
        },
        'diseno-y-produccion-de-calzado-y-complementos': {
          es: 'tecnico-superior-en-diseno-y-produccion-de-calzado-y-complementos.html',
          eu: 'oinetakoetako-eta-moda-osagarrietako-teknikaria.html'
        },
        // Atención a Personas en Situación de Dependencia
        'atencion-a-personas-en-situacion-de-dependencia': {
          es: 'tecnico-en-atencion-a-personas-en-situacion-de-dependencia.html',
          eu: 'mendekotasun-egoeran-dauden-pertsonei-arreta-egiteko-teknikaria.html'
        },
        'mendekotasun-egoeran-dauden-pertsonen-arretako': {
          es: 'tecnico-en-atencion-a-personas-en-situacion-de-dependencia.html',
          eu: 'mendekotasun-egoeran-dauden-pertsonei-arreta-egiteko-teknikaria.html'
        },
        // Administración de Sistemas Informáticos en Red
        'administracion-de-sistemas-informaticos-en-red': {
          es: 'tecnico-superior-en-administracion-de-sistemas-informaticos-en-red.html',
          eu: 'sareko-sistema-informatikoen-administrazioko-goi-mailako-teknikaria.html'
        },
        'sareko-informatika-sistemen-administrazioa': {
          es: 'tecnico-superior-en-administracion-de-sistemas-informaticos-en-red.html',
          eu: 'sareko-sistema-informatikoen-administrazioko-goi-mailako-teknikaria.html'
        },
        // Mantenimiento Aeromecánico de Aviones con Motor de Turbina
        'mantenimiento-aeromecanico-de-aviones-con-motor-de-turbina': {
          es: 'tecnico-superior-en-mantenimiento-aeromecanico-de-aviones-con-motor-de-turbina.html',
          eu: 'turbina-motorreko-hegazkinen-mantentze-aeromekanikoko-goi-mailako-teknikaria.html'
        },
        'turbina-motorra-duten-hegazkinen-mantentze-aeromekanikoko': {
          es: 'tecnico-superior-en-mantenimiento-aeromecanico-de-aviones-con-motor-de-turbina.html',
          eu: 'turbina-motorreko-hegazkinen-mantentze-aeromekanikoko-goi-mailako-teknikaria.html'
        },
        // Mantenimiento de Sistemas Electrónicos y Aviónicos de Aeronaves
        'mantenimiento-de-sistemas-electronicos-y-avionicos-de-aeronaves': {
          es: 'tecnico-superior-en-mantenimiento-de-sistemas-electronicos-y-avionicos-de-aeronaves.html',
          eu: 'hegazkinen-sistema-elektroniko-eta-avionikoen-mantentze-lanetako-goi-mailako-teknikaria.html'
        },
        'hegazkinetako-sistema-elektroniko-eta-avionikoen-mantentze-lanetako': {
          es: 'tecnico-superior-en-mantenimiento-de-sistemas-electronicos-y-avionicos-de-aeronaves.html',
          eu: 'hegazkinen-sistema-elektroniko-eta-avionikoen-mantentze-lanetako-goi-mailako-teknikaria.html'
        },
        // Dietética (variante euskera adicional)
        dietetikako: {
          es: 'tecnico-superior-en-dietetica-logse.html',
          eu: 'dietetikako-goi-mailako-tenikaria-logse.html'
        },
        // Enseñanza y Animación Sociodeportiva
        'ensenanza-y-animacion-sociodeportiva': {
          es: 'tecnico-superior-en-ensenanza-y-animacion-sociodeportiva.html',
          eu: 'gizarte-eta-kirol-irakaskuntzako-eta-animazioko-goi-mailako-teknikaria.html'
        },
        'gizarte-eta-kirol-animazioko-eta-irakaskuntzako': {
          es: 'tecnico-superior-en-ensenanza-y-animacion-sociodeportiva.html',
          eu: 'gizarte-eta-kirol-irakaskuntzako-eta-animazioko-goi-mailako-teknikaria.html'
        },
        'gizarte-eta-kirol-irakaskuntza-eta-animazioko': {
          es: 'tecnico-superior-en-ensenanza-y-animacion-sociodeportiva.html',
          eu: 'gizarte-eta-kirol-irakaskuntzako-eta-animazioko-goi-mailako-teknikaria.html'
        },
        // Sistemas Electrotécnicos y Automatizados
        'sistemas-electrotecnicos-y-automatizados': {
          es: 'tecnico-superior-en-sistemas-electrotecnicos-y-automatizados.html',
          eu: 'sistema-elektrotekniko-eta-automatizatuetako-goi-mailako-teknikaria.html'
        },
        'sistema-elektroteknikoak-eta-automatizatuetako': {
          es: 'tecnico-superior-en-sistemas-electrotecnicos-y-automatizados.html',
          eu: 'sistema-elektrotekniko-eta-automatizatuetako-goi-mailako-teknikaria.html'
        },
        // Electromedicina Clínica
        'electromedicina-clinica': {
          es: 'tecnico-superior-en-electromedicina-clinica.html',
          eu: 'elektromedikuntza-klinikoko-goi-mailako-teknikaria.html'
        },
        'elektromedikuntza-klinikoko': {
          es: 'tecnico-superior-en-electromedicina-clinica.html',
          eu: 'elektromedikuntza-klinikoko-goi-mailako-teknikaria.html'
        },
        // Mantenimiento Electrónico
        'mantenimiento-electronico': {
          es: 'tecnico-superior-en-mantenimiento-electronico.html',
          eu: 'mantentze-lan-elektronikoetako-goi-mailako-teknikari-1.html'
        },
        'mantentze-lan-elektronikoen': {
          es: 'tecnico-superior-en-mantenimiento-electronico.html',
          eu: 'mantentze-lan-elektronikoetako-goi-mailako-teknikari-1.html'
        },
        // Programación de la Producción en Fabricación Mecánica
        'programacion-de-la-produccion-en-fabricacion-mecanica': {
          es: 'tecnico-superior-en-programacion-de-la-produccion-en-fabricacion-mecanica.html',
          eu: 'fabrikazio-mekanikoko-produkzioa-programatzeko-goi-mailako-teknikaria.html'
        },
        'fabrikazio-mekanikoko-ekoizpenaren-programazioko': {
          es: 'tecnico-superior-en-programacion-de-la-produccion-en-fabricacion-mecanica.html',
          eu: 'fabrikazio-mekanikoko-produkzioa-programatzeko-goi-mailako-teknikaria.html'
        },
        // Automatización y Robótica Industrial
        'automatizacion-y-robotica-industrial': {
          es: 'tecnico-superior-en-automatizacion-y-robotica-industrial.html',
          eu: 'automatizazioko-eta-robotika-industrialeko-goi-mailako-teknikaria.html'
        },
        'automatizaioa-eta-robotika-industriala': {
          es: 'tecnico-superior-en-automatizacion-y-robotica-industrial.html',
          eu: 'automatizazioko-eta-robotika-industrialeko-goi-mailako-teknikaria.html'
        },
        // Energías Renovables
        'energias-renovables': {
          es: 'tecnico-superior-en-energias-renovables.html',
          eu: 'energia-berriztagarrietako-goi-mailako-teknikaria.html'
        },
        'energia-berriztagarrien': {
          es: 'tecnico-superior-en-energias-renovables.html',
          eu: 'energia-berriztagarrietako-goi-mailako-teknikaria.html'
        },
        // Eficiencia Energética y Energía Solar Térmica
        'eficiencia-energetica-y-energia-solar-termica': {
          es: 'tecnico-superior-en-eficiencia-energetica-y-energia-solar-termica.html',
          eu: 'energia-eraginkortasuneko-eta-eguzki-energia-termikoko-goi-mailako-teknikaria.html'
        },
        'energia-eraginkortasuna-eta-eguzki-energia-termikoen': {
          es: 'tecnico-superior-en-eficiencia-energetica-y-energia-solar-termica.html',
          eu: 'energia-eraginkortasuneko-eta-eguzki-energia-termikoko-goi-mailako-teknikaria.html'
        },
        'energia-eraginkortasuneko-eta-eguzki-energia-termikoko': {
          es: 'tecnico-superior-en-eficiencia-energetica-y-energia-solar-termica.html',
          eu: 'energia-eraginkortasuneko-eta-eguzki-energia-termikoko-goi-mailako-teknikaria.html'
        },
        // Proyectos de Edificación
        'proyectos-de-edificacion': {
          es: 'tecnico-superior-en-proyectos-de-edificacion.html',
          eu: 'eraikuntza-proiektuetako-goi-mailako-teknikaria.html'
        },
        'eraikuntza-proiektuen': {
          es: 'tecnico-superior-en-proyectos-de-edificacion.html',
          eu: 'eraikuntza-proiektuetako-goi-mailako-teknikaria.html'
        },
        // Organización y Control de Obras de Construcción
        'organizacion-y-control-de-obras-de-construccion': {
          es: 'tecnico-superior-en-organizacion-y-control-de-obras-de-construccion.html',
          eu: 'eraikuntza-obrak-antolatzeko-eta-kontrolatzeko-goi-mailako-teknikaria.html'
        },
        'eraikuntza-obrak-antolatzeko-eta-kontrolatzeko': {
          es: 'tecnico-superior-en-organizacion-y-control-de-obras-de-construccion.html',
          eu: 'eraikuntza-obrak-antolatzeko-eta-kontrolatzeko-goi-mailako-teknikaria.html'
        },
        // Promoción de Igualdad de Género
        'promocion-de-igualdad-de-genero': {
          es: 'tecnico-superior-en-promocion-de-igualdad-de-genero.html',
          eu: 'genero-berdintasuna-sustatzeko-goi-mailako-teknikaria.html'
        },
        'generoko-berdintasuna-sustatzearen': {
          es: 'tecnico-superior-en-promocion-de-igualdad-de-genero.html',
          eu: 'genero-berdintasuna-sustatzeko-goi-mailako-teknikaria.html'
        },
        // Integración Social
        'integracion-social': {
          es: 'tecnico-superior-en-integracion-social.html',
          eu: 'gizarteratzeko-goi-mailako-teknikaria.html'
        },
        'gizarte-integrazioko': {
          es: 'tecnico-superior-en-integracion-social.html',
          eu: 'gizarteratzeko-goi-mailako-teknikaria.html'
        },
        // Estilismo y Dirección de Peluquería
        'estilismo-y-direccion-de-peluqueria': {
          es: 'tecnico-superior-en-estilismo-y-direccion-de-peluqueria.html',
          eu: 'ile-apainketako-estilismo-eta-zuzendaritzako-goi-mailako-teknikari-1.html'
        },
        'ile-apainketako-estilismoa-eta-zuzendaritzako': {
          es: 'tecnico-superior-en-estilismo-y-direccion-de-peluqueria.html',
          eu: 'ile-apainketako-estilismo-eta-zuzendaritzako-goi-mailako-teknikari-1.html'
        },
        // Asesoría de Imagen Personal y Corporativa
        'asesoria-de-imagen-personal-y-corporativa': {
          es: 'tecnico-superior-en-asesoria-de-imagen-personal-y-corporativa.html',
          eu: 'irudi-pertsonalaren-eta-korporatiboaren-aholkularitzako-goi-mailako-teknikaria.html'
        },
        'irudi-pertsonal-eta-korporatiboaren-aholkularitzako': {
          es: 'tecnico-superior-en-asesoria-de-imagen-personal-y-corporativa.html',
          eu: 'irudi-pertsonalaren-eta-korporatiboaren-aholkularitzako-goi-mailako-teknikaria.html'
        },
        // Mantenimiento de Instalaciones Térmicas y de Fluidos
        'mantenimiento-de-instalaciones-termicas-y-de-fluidos': {
          es: 'tecnico-superior-en-mantenimiento-de-instalaciones-termicas-y-de-fluidos.html',
          eu: 'instalazio-termiko-eta-fluidodunak-mantentzeko-goi-mailako-teknikaria.html'
        },
        'instalazio-termikoen-eta-fluidoen-mantentze-lanetako': {
          es: 'tecnico-superior-en-mantenimiento-de-instalaciones-termicas-y-de-fluidos.html',
          eu: 'instalazio-termiko-eta-fluidodunak-mantentzeko-goi-mailako-teknikaria.html'
        },
        // Prevención de Riesgos Profesionales (variante adicional euskera)
        'lanbide-arriskuen-prebentzioaren': {
          es: 'tecnico-superior-en-prevencion-de-riesgos-profesionales-logse.html',
          eu: 'arrisku-profesionalaren-prebentziorako-goi-mailako-teknikaria-logse.html'
        },
        // Educación y Control Ambiental
        'educacion-y-control-ambiental': {
          es: 'tecnico-superior-en-educacion-y-control-ambiental.html',
          eu: 'ingurumen-hezkuntzako-eta-kontroleko-goi-mailako-teknikaria.html'
        },
        'ingurumen-hezkuntza-eta-kontroleko': {
          es: 'tecnico-superior-en-educacion-y-control-ambiental.html',
          eu: 'ingurumen-hezkuntzako-eta-kontroleko-goi-mailako-teknikaria.html'
        },
        // Patronaje y Moda
        'patronaje-y-moda': {
          es: 'tecnico-superior-en-patronaje-y-moda.html',
          eu: 'patroigintzako-eta-modako-goi-mailako-teknikaria.html'
        },
        'patroigintza-eta-modako': {
          es: 'tecnico-superior-en-patronaje-y-moda.html',
          eu: 'patroigintzako-eta-modako-goi-mailako-teknikaria.html'
        },
        // Administración de Sistemas Informáticos en Red (variante adicional)
        'sareko-sistema-informatikoen-administrazioko': {
          es: 'tecnico-superior-en-administracion-de-sistemas-informaticos-en-red.html',
          eu: 'sareko-informatika-sistemen-administrazioko-goi-mailako-teknikaria.html'
        },
        // Sistemas de Telecomunicaciones e Informáticos
        'sistemas-de-telecomunicaciones-e-informaticos': {
          es: 'tecnico-superior-en-sistemas-de-telecomunicaciones-e-informaticos.html',
          eu: 'telekomunikazio-eta-informatika-sistemetako-goi-mailako-teknikaria.html'
        },
        'telekomunikazio-eta-sistema-informatikoen': {
          es: 'tecnico-superior-en-sistemas-de-telecomunicaciones-e-informaticos.html',
          eu: 'telekomunikazio-eta-informatika-sistemetako-goi-mailako-teknikaria.html'
        },
        // Acondicionamiento Físico
        'acondicionamiento-fisico': {
          es: 'tecnico-superior-en-acondicionamiento-fisico.html',
          eu: 'egokitzapen-fisikoko-goi-mailako-teknikaria.html'
        },
        'gorputz-prestakuntzako': {
          es: 'tecnico-superior-en-acondicionamiento-fisico.html',
          eu: 'egokitzapen-fisikoko-goi-mailako-teknikaria.html'
        },
        // Asistencia a la Dirección
        'asistencia-a-la-direccion': {
          es: 'tecnico-superior-en-asistencia-a-la-direccion.html',
          eu: 'administrazio-eta-finantzako-goi-mailako-teknikaria.html'
        },
        'zuzendaritzarako-laguntzako': {
          es: 'tecnico-superior-en-asistencia-a-la-direccion.html',
          eu: 'administrazio-eta-finantzako-goi-mailako-teknikaria.html'
        },
        // Gestión Forestal y del Medio Natural
        'gestion-forestal-y-del-medio-natural': {
          es: 'tecnico-superior-en-gestion-forestal-y-del-medio-natural.html',
          eu: 'basoa-eta-natura-ingurunea-kudeatzeko-goi-mailako-teknikaria.html'
        },
        'baso-eta-ingurune-naturalaren-kudeaketako': {
          es: 'tecnico-superior-en-gestion-forestal-y-del-medio-natural.html',
          eu: 'basoa-eta-natura-ingurunea-kudeatzeko-goi-mailako-teknikaria.html'
        },
        'basoa-eta-natura-ingurunea-kudeatzeko': {
          es: 'tecnico-superior-en-gestion-forestal-y-del-medio-natural.html',
          eu: 'basoa-eta-natura-ingurunea-kudeatzeko-goi-mailako-teknikaria.html'
        },
        // Paisajismo y Medio Rural
        'paisajismo-y-medio-rural': {
          es: 'tecnico-superior-en-paisajismo-y-medio-rural.html',
          eu: 'paisajismoko-eta-landa-inguruneko-goi-mailako-teknikaria.html'
        },
        'paisajismoa-eta-landa-inguruneko': {
          es: 'tecnico-superior-en-paisajismo-y-medio-rural.html',
          eu: 'paisajismoko-eta-landa-inguruneko-goi-mailako-teknikaria.html'
        },
        // Diseño y Edición de Publicaciones Impresas y Multimedia
        'diseno-y-edicion-de-publicaciones-impresas-y-multimedia': {
          es: 'tecnico-superior-en-diseno-y-edicion-de-publicaciones-impresas-y-multimedia.html',
          eu: 'argitalpen-inprimatuen-eta-multimedia-argitalpenen-diseinuko-eta-edizioko-goi-mailako-teknikaria.html'
        },
        'argitalpen-inprimatu-eta-multimedia-diseinua-eta-edizioko': {
          es: 'tecnico-superior-en-diseno-y-edicion-de-publicaciones-impresas-y-multimedia.html',
          eu: 'argitalpen-inprimatuen-eta-multimedia-argitalpenen-diseinuko-eta-edizioko-goi-mailako-teknikaria.html'
        },
        // Diseño y Gestión de la Producción Gráfica
        'diseno-y-gestion-de-la-produccion-grafica': {
          es: 'tecnico-superior-en-diseno-y-gestion-de-la-produccion-grafica.html',
          eu: 'produkzio-grafikoaren-diseinuko-eta-kudeaketako-goi-mailako-teknikaria.html'
        },
        'ekoizpen-grafikoaren-diseinua-eta-kudeaketako': {
          es: 'tecnico-superior-en-diseno-y-gestion-de-la-produccion-grafica.html',
          eu: 'produkzio-grafikoaren-diseinuko-eta-kudeaketako-goi-mailako-teknikaria.html'
        },
        // Ebanistería (Grado Medio - ya existe como Carpintería y Mueble)
        ebanisteriako: {
          es: 'tecnico-en-carpinteria-y-mueble.html',
          eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
        },
        // Amueblamiento (Grado Superior - ya existe como Diseño y Amueblamiento)
        altzarigintzako: {
          es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
          eu: 'diseinua-eta-altzariak-jartzea-goi-mailako-teknikaria.html'
        },
        // Gestión de Ventas y Espacios Comerciales
        'gestion-de-ventas-y-espacios-comerciales': {
          es: 'tecnico-superior-en-gestion-de-ventas-y-espacios-comerciales.html',
          eu: 'salmentak-eta-merkataritza-espazioak-kudeatzeko-goi-mailako-teknikaria.html'
        },
        'salmenten-eta-espazio-komertzialen-kudeaketako': {
          es: 'tecnico-superior-en-gestion-de-ventas-y-espacios-comerciales.html',
          eu: 'salmentak-eta-merkataritza-espazioak-kudeatzeko-goi-mailako-teknikaria.html'
        },
        // Marketing y Publicidad
        'marketing-y-publicidad': {
          es: 'tecnico-superior-en-marketing-y-publicidad.html',
          eu: 'marketin-eta-publizitateko-goi-mailako-teknikaria.html'
        },
        'marketina-eta-publizitatearen': {
          es: 'tecnico-superior-en-marketing-y-publicidad.html',
          eu: 'marketin-eta-publizitateko-goi-mailako-teknikaria.html'
        },
        // Transporte y Logística (variante adicional)
        'garraioa-eta-logistikako': {
          es: 'tecnico-superior-en-transporte-y-logistica-.html',
          eu: 'garraioko-eta-logistikako-goi-mailako-teknikaria.html'
        },
        // Proyectos de Obra Civil
        'proyectos-de-obra-civil': {
          es: 'tecnico-superior-en-proyectos-de-obra-civil.html',
          eu: 'obra-zibileko-proiektuetako-goi-mailako-teknikaria.html'
        },
        'obra-zibileko-proiektuen': {
          es: 'tecnico-superior-en-proyectos-de-obra-civil.html',
          eu: 'obra-zibileko-proiektuetako-goi-mailako-teknikaria.html'
        },
        // Gestión del Agua
        'gestion-del-agua': {
          es: 'tecnico-superior-en-gestion-del-agua.html',
          eu: 'uraren-kudeaketako-goi-mailako-teknikaria.html'
        },
        'uraren-kudeaketako': {
          es: 'tecnico-superior-en-gestion-del-agua.html',
          eu: 'uraren-kudeaketako-goi-mailako-teknikaria.html'
        },
        // Programación de la Producción en Fabricación Mecánica (variante adicional)
        'fabrikazio-mekanikoko-ekoizpena-programatzeko': {
          es: 'tecnico-superior-en-programacion-de-la-produccion-en-fabricacion-mecanica.html',
          eu: 'fabrikazio-mekanikoko-produkzioa-programatzeko-goi-mailako-teknikaria.html'
        },
        // Construcciones Metálicas
        'construcciones-metalicas': {
          es: 'tecnico-superior-en-construcciones-metalicas.html',
          eu: 'metal-eraikuntzetako-goi-mailako-teknikaria.html'
        },
        'metalezko-eraikuntzetako': {
          es: 'tecnico-superior-en-construcciones-metalicas.html',
          eu: 'metal-eraikuntzetako-goi-mailako-teknikaria.html'
        },
        // Dirección de Cocina
        'direccion-de-cocina': {
          es: 'tecnico-superior-en-direccion-de-cocina.html',
          eu: 'sukalde-zuzendaritzako-goi-mailako-teknikaria.html'
        },
        'sukaldaritza-zuzendaritzako': {
          es: 'tecnico-superior-en-direccion-de-cocina.html',
          eu: 'sukalde-zuzendaritzako-goi-mailako-teknikaria.html'
        },
        // Dirección de Servicios de Restauración
        'direccion-de-servicios-de-restauracion': {
          es: 'tecnico-superior-en-direccion-de-servicios-de-restauracion.html',
          eu: 'jatetxe-arloko-zerbitzuen-zuzendaritzako-goi-mailako-teknikaria.html'
        },
        'jatetxe-zerbitzuen-zuzendaritzako': {
          es: 'tecnico-superior-en-direccion-de-servicios-de-restauracion.html',
          eu: 'jatetxe-arloko-zerbitzuen-zuzendaritzako-goi-mailako-teknikaria.html'
        },
        // Gestión de Alojamientos Turísticos
        'gestion-de-alojamientos-turisticos': {
          es: 'tecnico-superior-en-gestion-de-alojamientos-turisticos.html',
          eu: 'turismo-ostatuak-kudeatzeko-goi-mailako-teknikaria.html'
        },
        'ostatu-turistikoen-kudeaketako': {
          es: 'tecnico-superior-en-gestion-de-alojamientos-turisticos.html',
          eu: 'turismo-ostatuak-kudeatzeko-goi-mailako-teknikaria.html'
        },
        // Guía, Información y Asistencias Turísticas
        'guia-informacion-y-asistencias-turisticas': {
          es: 'tecnico-superior-en-guia-informacion-y-asistencias-turisticas.html',
          eu: 'turismo-gidaritzako-informazioko-eta-laguntzako-goi-mailako-teknikari-1.html'
        },
        'gida-informazio-eta-turismo-laguntzako': {
          es: 'tecnico-superior-en-guia-informacion-y-asistencias-turisticas.html',
          eu: 'turismo-gidaritzako-informazioko-eta-laguntzako-goi-mailako-teknikari-1.html'
        },
        // Estética Integral y Bienestar
        'estetica-integral-y-bienestar': {
          es: 'tecnico-superior-en-estetica-integral-y-bienestar.html',
          eu: 'estetika-integral-eta-ongizateko-goi-mailako-teknikaria.html'
        },
        'estetika-integral-eta-ongizatearen': {
          es: 'tecnico-superior-en-estetica-integral-y-bienestar.html',
          eu: 'estetika-integral-eta-ongizateko-goi-mailako-teknikaria.html'
        },
        // Estilismo y Dirección de Peluquería (variante adicional)
        'ile-apainketa-eta-kosmetika-kapilarreko-goi-mailako': {
          es: 'tecnico-superior-en-estilismo-y-direccion-de-peluqueria.html',
          eu: 'ile-apainketako-estilismo-eta-zuzendaritzako-goi-mailako-teknikari-1.html'
        },
        // Caracterización y Maquillaje Profesional
        'caracterizacion-y-maquillaje-profesional': {
          es: 'tecnico-superior-en-caracterizacion-y-maquillaje-profesional.html',
          eu: 'karakterizazioko-eta-makillaje-profesionaleko-goi-mailako-teknikaria.html'
        },
        'karakterizazioa-eta-makillaje-profesionaleko': {
          es: 'tecnico-superior-en-caracterizacion-y-maquillaje-profesional.html',
          eu: 'karakterizazioko-eta-makillaje-profesionaleko-goi-mailako-teknikaria.html'
        },
        // Iluminación, Captación y Tratamiento de Imagen
        'iluminacion-captacion-y-tratamiento-de-imagen': {
          es: 'tecnico-superior-en-iluminacion-captacion-y-tratamiento-de-imagen.html',
          eu: 'irudia-argiztatzeko-hartzeko-eta-tratatzeko-goi-mailako-teknikaria.html'
        },
        'argitze-irudiaren-kaptura-eta-tratamenduaren': {
          es: 'tecnico-superior-en-iluminacion-captacion-y-tratamiento-de-imagen.html',
          eu: 'irudia-argiztatzeko-hartzeko-eta-tratatzeko-goi-mailako-teknikaria.html'
        },
        // Realización de Proyectos Audiovisuales y Espectáculos
        'realizacion-de-proyectos-audiovisuales-y-espectaculos': {
          es: 'tecnico-superior-en-realizacion-de-proyectos-audiovisuales-y-espectaculos.html',
          eu: 'ikus-entzunezko-proiektuen-eta-ikuskizunen-errealizazioko-goi-mailako-teknikaria.html'
        },
        'ikus-entzunezkoen-eta-ikuskizunen-proiektuen-errealizazioko': {
          es: 'tecnico-superior-en-realizacion-de-proyectos-audiovisuales-y-espectaculos.html',
          eu: 'ikus-entzunezko-proiektuen-eta-ikuskizunen-errealizazioko-goi-mailako-teknikaria.html'
        },
        // Sonido para Audiovisuales y Espectáculos
        'sonido-para-audiovisuales-y-espectaculos': {
          es: 'tecnico-superior-en-sonido-para-audiovisuales-y-espectaculos.html',
          eu: 'ikus-entzunezkoen-eta-ikuskizunen-produkzioko-goi-mailako-teknikaria.html'
        },
        'ikus-entzunezkoetarako-eta-ikuskizunetarako-soinuaren': {
          es: 'tecnico-superior-en-sonido-para-audiovisuales-y-espectaculos.html',
          eu: 'ikus-entzunezkoen-eta-ikuskizunen-produkzioko-goi-mailako-teknikaria.html'
        },
        // Producción de Audiovisuales y Espectáculos
        'produccion-de-audiovisuales-y-espectaculos': {
          es: 'tecnico-superior-en-produccion-de-audiovisuales-y-espectaculos.html',
          eu: 'ikus-entzunezkoen-eta-ikuskizunen-produkzioko-goi-mailako-teknikaria.html'
        },
        'ikus-entzunezkoen-eta-ikuskizunen-ekoizpeneko': {
          es: 'tecnico-superior-en-produccion-de-audiovisuales-y-espectaculos.html',
          eu: 'ikus-entzunezkoen-eta-ikuskizunen-produkzioko-goi-mailako-teknikaria.html'
        },
        // Animaciones 3D, Juegos y Entornos Interactivos
        'animaciones-3d-juegos-y-entornos-interactivos': {
          es: 'tecnico-superior-en-animaciones-3d-juegos-y-entornos-interactivos.html',
          eu: '3d-animazioetako-jokoetako-eta-ingurune-elkarreragileetako-goi-mailako-teknikaria.html'
        },
        '3d-animazioak-jokoak-eta-ingurune-interaktiboen': {
          es: 'tecnico-superior-en-animaciones-3d-juegos-y-entornos-interactivos.html',
          eu: '3d-animazioetako-jokoetako-eta-ingurune-elkarreragileetako-goi-mailako-teknikaria.html'
        },
        // Vestuario a Medida y de Espectáculos (antes Modelismo de Indumentaria)
        'modelismo-de-indumentaria': {
          es: 'tecnico-superior-en-vestuario-a-medida-y-de-espectaculos.html',
          eu: 'neurriko-jantzien-eta-ikuskizunetakoen-goi-mailako-teknikaria.html'
        },
        'vestuario-a-medida-y-de-espectaculos': {
          es: 'tecnico-superior-en-vestuario-a-medida-y-de-espectaculos.html',
          eu: 'neurriko-jantzien-eta-ikuskizunetakoen-goi-mailako-teknikaria.html'
        },
        'jantzigintza-modelismoko': {
          es: 'tecnico-superior-en-vestuario-a-medida-y-de-espectaculos.html',
          eu: 'neurriko-jantzien-eta-ikuskizunetakoen-goi-mailako-teknikaria.html'
        },
        'neurriko-jantzien-eta-ikuskizunetakoen': {
          es: 'tecnico-superior-en-vestuario-a-medida-y-de-espectaculos.html',
          eu: 'neurriko-jantzien-eta-ikuskizunetakoen-goi-mailako-teknikaria.html'
        },
        'neurriko-jantziak-eta-ikuskizunetakoak': {
          es: 'tecnico-superior-en-vestuario-a-medida-y-de-espectaculos.html',
          eu: 'neurriko-jantzien-eta-ikuskizunetakoen-goi-mailako-teknikaria.html'
        },
        'neurrira-eta-ikuskizunetarako-jantzietako': {
          es: 'tecnico-superior-en-vestuario-a-medida-y-de-espectaculos.html',
          eu: 'neurriko-jantzien-eta-ikuskizunetakoen-goi-mailako-teknikaria.html'
        },
        // Vitivinicultura
        vitivinicultura: {
          es: 'tecnico-superior-en-vitivinicultura.html',
          eu: 'mahastizaintzako-eta-ardogintzako-goi-mailako-teknikaria.html'
        },
        'mahasigintza-eta-ardogintza': {
          es: 'tecnico-superior-en-vitivinicultura.html',
          eu: 'mahastizaintzako-eta-ardogintzako-goi-mailako-teknikaria.html'
        },
        // Administración de Sistemas Informáticos en Red (actualización variante)
        'sareko-sistema-informatikoen-administrazioko-goi-mailako': {
          es: 'tecnico-superior-en-administracion-de-sistemas-informaticos-en-red.html',
          eu: 'sareko-informatika-sistemen-administrazioko-goi-mailako-teknikaria.html'
        },
        // Desarrollo de Aplicaciones Multiplataforma (variante adicional)
        'plataforma-anitzeko-aplikazioen-garapeneko': {
          es: 'tecnico-superior-en-desarrollo-de-aplicaciones-multiplataforma-.html',
          eu: 'plataforma-anitzeko-aplikazioak-garatzeko-goi-mailako-teknikaria.html'
        },
        // Organización del Mantenimiento de Maquinaria de Buques (variante adicional)
        'ontzi-eta-itsasontzien-makinen-mantentze-lanen-antolaketako': {
          es: 'tecnico-superior-en-organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones.html',
          eu: 'ontzi-eta-itsasontzien-makineria-zainketa-antolatzeko-goi-mailako-teknikaria.html'
        },
        // Laboratorio Clínico y Biomédico
        'laboratorio-clinico-y-biomedico': {
          es: 'tecnico-superior-en-laboratorio-clinico-y-biomedico.html',
          eu: 'laboratorio-kliniko-eta-biomedikoko-goi-mailako-teknikaria.html'
        },
        'laboratorio-kliniko-eta-biomedikoko': {
          es: 'tecnico-superior-en-laboratorio-clinico-y-biomedico.html',
          eu: 'laboratorio-kliniko-eta-biomedikoko-goi-mailako-teknikaria.html'
        },
        // Anatomía Patológica y Citodiagnóstico
        'anatomia-patologica-y-citodiagnostico': {
          es: 'tecnico-superior-en-anatomia-patologica-y-citodiagnostico.html',
          eu: 'anatomia-patologikoko-eta-zitodiagnosiko-goi-mailako-teknikaria.html'
        },
        'anatomia-patologikoa-eta-zitodiagnostikoko': {
          es: 'tecnico-superior-en-anatomia-patologica-y-citodiagnostico.html',
          eu: 'anatomia-patologikoko-eta-zitodiagnosiko-goi-mailako-teknikaria.html'
        },
        // Imagen para el Diagnóstico y Medicina Nuclear
        'imagen-para-el-diagnostico-y-medicina-nuclear': {
          es: 'tecnico-superior-en-imagen-para-el-diagnostico-y-medicina-nuclear.html',
          eu: 'diagnosi-irudiko-eta-medikuntza-nuklearreko-goi-mailako-teknikaria.html'
        },
        'diagnostikorako-irudia-eta-mediku-nuklearreko': {
          es: 'tecnico-superior-en-imagen-para-el-diagnostico-y-medicina-nuclear.html',
          eu: 'diagnosi-irudiko-eta-medikuntza-nuklearreko-goi-mailako-teknikaria.html'
        },
        // Radioterapia y Dosimetría
        'radioterapia-y-dosimetria': {
          es: 'tecnico-superior-en-radioterapia-y-dosimetria.html',
          eu: 'erradioterapiako-eta-dosimetriako-goi-mailako-teknikaria.html'
        },
        'erradioterapia-eta-dosimetriako': {
          es: 'tecnico-superior-en-radioterapia-y-dosimetria.html',
          eu: 'erradioterapiako-eta-dosimetriako-goi-mailako-teknikaria.html'
        },
        // Higiene Bucodental (variante adicional)
        'aho-higieneko': {
          es: 'tecnico-superior-en-higiene-bucodental-1.html',
          eu: 'ahoaren-eta-hortzen-higieneko-goi-mailako-teknikaria.html'
        },
        // Prótesis Dentales
        'protesis-dentales': {
          es: 'tecnico-superior-en-protesis-dentales.html',
          eu: 'hortz-protesien-goi-mailako-teknikaria.html'
        },
        'hortz-protesiako': {
          es: 'tecnico-superior-en-protesis-dentales.html',
          eu: 'hortz-protesien-goi-mailako-teknikaria.html'
        },
        // Audiología Protésica
        'audiologia-protesica': {
          es: 'tecnico-superior-en-audiologia-protesica.html',
          eu: 'protesi-audiologiako-goi-mailako-teknikaria.html'
        },
        'audiologia-protesikoko': {
          es: 'tecnico-superior-en-audiologia-protesica.html',
          eu: 'protesi-audiologiako-goi-mailako-teknikaria.html'
        },
        // Coordinación de Emergencias y Protección Civil
        'coordinacion-de-emergencias-y-proteccion-civil': {
          es: 'tecnico-superior-en-coordinacion-de-emergencias-y-proteccion-civil.html',
          eu: 'larrialdien-koordinazioko-eta-babes-zibileko-goi-mailako-teknikaria.html'
        },
        'larrialdien-eta-babes-zibilaren-koordinazioko': {
          es: 'tecnico-superior-en-coordinacion-de-emergencias-y-proteccion-civil.html',
          eu: 'larrialdien-koordinazioko-eta-babes-zibileko-goi-mailako-teknikaria.html'
        },
        // Animación Sociocultural y Turística (variante adicional)
        'animazio-soziokultural-eta-turistikoko': {
          es: 'tecnico-superior-animacion-sociocultural-y-turistica.html',
          eu: 'animazio-soziokulturaleko-eta-turistikoko-goi-mailako-teknikaria.html'
        },
        // Mantenimiento de Sistemas Electrónicos y Aviónicos en Aeronaves (variante adicional)
        'hegazkinen-sistema-elektroniko-eta-avionikoen-mantentze-lanetako-goi-mailako':
          {
            es: 'tecnico-superior-en-mantenimiento-de-sistemas-electronicos-y-avionicos-de-aeronaves.html',
            eu: 'aireontzien-sistema-elektronikoak-eta-abionikoak-mantentzeko-goi-mailako-teknikaria.html'
          },
        // Transporte Marítimo y Pesca de Altura
        'transporte-maritimo-y-pesca-de-altura': {
          es: 'tecnico-superior-en-transporte-maritimo-y-pesca-de-altura.html',
          eu: 'itsas-garraioko-eta-alturako-arrantzako-goi-mailako-teknikaria.html'
        },
        'itsas-garraioko-eta-alturako-arrantzako': {
          es: 'tecnico-superior-en-transporte-maritimo-y-pesca-de-altura.html',
          eu: 'itsas-garraioko-eta-alturako-arrantzako-goi-mailako-teknikaria.html'
        },
        // ✅ AÑADIR esta variante que falta:
        'itsas-garraioa-eta-urruneko-arrantzako': {
          es: 'tecnico-superior-en-transporte-maritimo-y-pesca-de-altura.html',
          eu: 'itsas-garraioko-eta-alturako-arrantzako-goi-mailako-teknikaria.html'
        },
        'itsas-garraioa-eta-urruneko-arrantza': {
          es: 'tecnico-superior-en-transporte-maritimo-y-pesca-de-altura.html',
          eu: 'itsas-garraioko-eta-alturako-arrantzako-goi-mailako-teknikaria.html'
        },
        // Fabricación de Productos Farmacéuticos, Biotecnológicos y Afines
        'fabricacion-de-productos-farmaceuticos-biotecnologicos-y-afines': {
          es: 'tecnico-superior-en-fabricacion-de-productos-farmaceuticos-biotecnologicos-y-afines-.html',
          eu: 'produktu-farmazeutikoak-bioteknologikoak-eta-antzekoak-fabrikatzeko-goi-mailako-teknikaria.html'
        },
        'produktu-farmazeutiko-bioteknologiko-eta-afinaren-fabrikazioa': {
          es: 'tecnico-superior-en-fabricacion-de-productos-farmaceuticos-biotecnologicos-y-afines-.html',
          eu: 'produktu-farmazeutikoak-bioteknologikoak-eta-antzekoak-fabrikatzeko-goi-mailako-teknikaria.html'
        },
        'produktu-farmazeutikoak-bioteknologikoak-eta-antzekoak-fabrikatzeko': {
          es: 'tecnico-superior-en-fabricacion-de-productos-farmaceuticos-biotecnologicos-y-afines-.html',
          eu: 'produktu-farmazeutikoak-bioteknologikoak-eta-antzekoak-fabrikatzeko-goi-mailako-teknikaria.html'
        },
        // Química Industrial
        'quimica-industrial': {
          es: 'tecnico-superior-en-quimica-industrial.html',
          eu: 'kimika-industrialeko-goi-mailako-teknikaria.html'
        },
        'kimika-eta-osasun-ingurumeneko': {
          es: 'tecnico-superior-en-quimica-industrial.html',
          eu: 'kimika-industrialeko-goi-mailako-teknikaria.html'
        },
        'kimika-industrialeko': {
          es: 'tecnico-superior-en-quimica-industrial.html',
          eu: 'kimika-industrialeko-goi-mailako-teknikaria.html'
        },
        // Documentación y Administración Sanitarias
        'documentacion-y-administracion-sanitarias': {
          es: 'tecnico-superior-en-documentacion-y-administracion-sanitarias.html',
          eu: 'osasun-dokumentazioko-eta-administrazioko-goi-mailako-teknikaria.html'
        },
        'documentacion-sanitaria': {
          es: 'tecnico-superior-en-documentacion-y-administracion-sanitarias.html',
          eu: 'osasun-dokumentazioko-eta-administrazioko-goi-mailako-teknikaria.html'
        },
        'osasun-dokumentazioa-eta-administrazioko': {
          es: 'tecnico-superior-en-documentacion-y-administracion-sanitarias.html',
          eu: 'osasun-dokumentazioko-eta-administrazioko-goi-mailako-teknikaria.html'
        },
        'osasun-dokumentazioko-eta-administrazioko': {
          es: 'tecnico-superior-en-documentacion-y-administracion-sanitarias.html',
          eu: 'osasun-dokumentazioko-eta-administrazioko-goi-mailako-teknikaria.html'
        },

        // Laboratorio Clínico y Biomédico - ACTUALIZAR el existente
        'laborategi-kliniko-eta-biomedikoko': {
          es: 'tecnico-superior-en-laboratorio-clinico-y-biomedico.html',
          eu: 'laborategi-kliniko-eta-biomedikoko-goi-mailako-teknikaria.html'
        },

        // Ortoprótesis y Productos de Apoyo
        'ortoprotesis-y-productos-de-apoyo': {
          es: 'tecnico-superior-en-ortoprotesis-y-productos-de-apoyo.html',
          eu: 'ortoprotesietako-eta-laguntza-produktuetako-goi-mailako-teknikaria.html'
        },
        'ortoprotesiak-eta-laguntza-produktuak': {
          es: 'tecnico-superior-en-ortoprotesis-y-productos-de-apoyo.html',
          eu: 'ortoprotesietako-eta-laguntza-produktuetako-goi-mailako-teknikaria.html'
        },
        'ortoprotesietako-eta-laguntza-produktuetako': {
          es: 'tecnico-superior-en-ortoprotesis-y-productos-de-apoyo.html',
          eu: 'ortoprotesietako-eta-laguntza-produktuetako-goi-mailako-teknikaria.html'
        }
      }

    // ✅ OBTENER SLUG DEL CICLO
    let slugCiclo: string
    let urlFinal: string

    if (lang === 'eu' && ciclo.slugEuskera) {
      // Si existe slugEuskera, usarlo directamente
      slugCiclo = ciclo.slugEuskera
    } else {
      // Generar slug desde el nombre
      const nombreCiclo = lang === 'eu' ? ciclo.nomEuskera : ciclo.nom

      // Normalizar nombre (eliminar modalidades especiales)
      const nombreNormalizado = nombreCiclo
        .replace(/\s*\(DISTANCIA\)\s*/gi, '')
        .replace(/\s*\(URRUTIRA\)\s*/gi, '')
        .replace(/\s*DISTANCIA\s*/gi, '')
        .replace(/\s*URRUTIRA\s*/gi, '')
        .replace(/\s*\(INGLÉS\)\s*/gi, '')
        .replace(/\s*\(INGELESA\)\s*/gi, '')
        .replace(/\s*INGLÉS\s*/gi, '')
        .replace(/\s*INGELESA\s*/gi, '')
        .replace(/\s*\(DUAL\)\s*/gi, '')
        .replace(/\s*DUAL\s*/gi, '')
        .replace(/\s*NOCTURNO\s*/gi, '')
        .replace(/\s*GAUEKO\s*/gi, '')
        .replace(/\s*VESPERTINO\s*/gi, '')
        .replace(/\s*ARRATSALDEKO\s*/gi, '')
        .trim()

      slugCiclo = normalizarSlug(nombreNormalizado)
    }

    // ✅ CONSTRUIR URL SEGÚN GRADO Y IDIOMA
    const rutaBase = lang === 'eu' ? 'lanbide-arloak' : 'familias-profesionales'
    const subruta = lang === 'eu' ? 'heziketa-zikloak' : 'ciclos-formativos'

    // ✅ VERIFICAR SI ES UN CICLO BÁSICO ESPECIAL
    if (ciclo.grado === 'Básico' && ciclosBasicosEspeciales[slugCiclo]) {
      const urlEspecifica = ciclosBasicosEspeciales[slugCiclo]
      urlFinal = lang === 'eu' ? urlEspecifica.eu : urlEspecifica.es
      return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`
    }

    // ✅ VERIFICAR SI ES UN CICLO GRADO MEDIO ESPECIAL
    if (ciclo.grado === 'Medio' && ciclosMedioEspeciales[slugCiclo]) {
      const urlEspecifica = ciclosMedioEspeciales[slugCiclo]
      urlFinal = lang === 'eu' ? urlEspecifica.eu : urlEspecifica.es
      return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`
    }

    // ✅ VERIFICAR SI ES UN CICLO GRADO SUPERIOR ESPECIAL
    if (ciclo.grado === 'Superior' && ciclosSuperiorEspeciales[slugCiclo]) {
      const urlEspecifica = ciclosSuperiorEspeciales[slugCiclo]
      urlFinal = lang === 'eu' ? urlEspecifica.eu : urlEspecifica.es
      return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`
    }

    // ✅ CASOS NORMALES (sin excepciones)
    if (lang === 'eu') {
      // EUSKERA
      if (ciclo.grado === 'Básico') {
        urlFinal = `${slugCiclo}-oinarrizko-profesionala.html`
      } else if (ciclo.grado === 'Medio') {
        urlFinal = `${slugCiclo}-teknikaria.html`
      } else if (ciclo.grado === 'Superior') {
        urlFinal = `${slugCiclo}-goi-mailako-teknikaria.html`
      } else {
        urlFinal = `${slugCiclo}.html`
      }
    } else {
      // ESPAÑOL
      let prefijo = ''
      if (ciclo.grado === 'Básico') {
        prefijo = 'titulo-profesional-basico-en-'
      } else if (ciclo.grado === 'Medio') {
        prefijo = 'tecnico-en-'
      } else if (ciclo.grado === 'Superior') {
        prefijo = 'tecnico-superior-en-'
      }
      urlFinal = `${prefijo}${slugCiclo}.html`
    }

    return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`
  }