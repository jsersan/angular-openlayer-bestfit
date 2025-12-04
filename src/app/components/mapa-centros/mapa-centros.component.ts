// mapa-centros.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import { transformExtent, transform } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import * as proj4x from 'proj4'

import { TranslateService } from '@ngx-translate/core'

const proj4 = (proj4x as any).default || proj4x

import { institutos } from '../../../assets/data/institutos'
import ciclosAsignacion from '../../../assets/data/asignacion'
import {
  Asignacion,
  familiasProfesionales
} from '../../../assets/data/asignacion'

interface Tab {
  id: string
  label: string
}

interface CiclosPorGrado {
  basicos: Asignacion[]
  medios: Asignacion[]
  superiores: Asignacion[]
}

interface Tab {
  id: string
  label: string
}

interface CiclosPorGrado {
  basicos: Asignacion[]
  medios: Asignacion[]
  superiores: Asignacion[]
}

@Component({
  selector: 'app-mapa-centros',
  templateUrl: './mapa-centros.component.html',
  styleUrls: ['./mapa-centros.component.scss']
})
export class MapaCentrosComponent implements OnInit, AfterViewInit {
  private isPanning = false // Bandera para prevenir múltiples panes simultáneos
  private panAttempts = 0 // Contador para prevenir bucles
  private readonly MAX_PAN_ATTEMPTS = 1 // Máximo 1 intento de pan por clic
  currentLang = 'es'
  traduccionesListas = false
  map!: Map
  pinsLayer!: VectorLayer<any>
  provincias: string[] = []
  municipios: string[] = []
  tiposCentro: { value: string; label: string }[] = []
  familiaSeleccionada = ''
  cicloSeleccionado = ''
  tipoCentroSeleccionado = ''
  gradoSeleccionado = ''
  provinciaSeleccionada = ''
  municipioSeleccionado = ''
  municipioEnabled = false
  tooltipVisible = false
  popupVisible: boolean = false
  // Propiedades para el modal de advertencia
  mostrarModalAdvertencia = false
  mensajeModalAdvertencia = ''

  selectedCentro: any = null // Usa el tipo correcto si lo tienes tipado

  familiasEsDict: Record<string, string> = {}

  tooltipContent = ''
  tooltipX = 0
  tooltipY = 0
  popupContentHeight = 400
  lastPanTo: number[] | undefined = undefined

  // Control del popup con pestañas
  centroSeleccionado: any = {}
  tabActiva = 'contacto'
  ciclosCentro: CiclosPorGrado = { basicos: [], medios: [], superiores: [] }
  familiasCentro: string[] = []

  // Posición y clase del popup
  popupPosition = { x: 0, y: 0 }
  popupClass = 'popup-bottom'

  tabs: Tab[] = [
    { id: 'contacto', label: 'Información de Contacto' },
    { id: 'oferta', label: 'Oferta Educativa' },
    { id: 'basico', label: 'FP Básica' },
    { id: 'medio', label: 'Ciclos Grado Medio' },
    { id: 'superior', label: 'Ciclos Grado Superior' }
  ]

  private centrosMostradosAnteriores: Set<number> = new Set()

  familiasProfesionales = familiasProfesionales
  familiasFiltradas: string[] = []
  ciclosFiltrados: Asignacion[] = []

  gradosCiclo: { value: string; label: string }[] = [
    { value: 'Basico', label: 'Formación Profesional Básica' },
    { value: 'Medio', label: 'Grado Medio' },
    { value: 'Superior', label: 'Grado Superior' }
  ]

  euskadiExtent = transformExtent(
    [-3.4, 42.57, -1.5, 43.45],
    'EPSG:4326',
    'EPSG:3857'
  )

  // En el componente mapa-centros.component.ts
  // Busca la propiedad tipoCentroLabels (alrededor de la línea 104) y reemplázala por:

  tipoCentroLabels: Record<string, string> = {}

  // Busca la propiedad tipoCentroIcono (alrededor de la línea 116) y añade los iconos:

  tipoCentroIcono: Record<string, string> = {
    CIFP: 'assets/images/marker-cifp.png',
    CPEPS: 'assets/images/marker-cpeips.png',
    CPES: 'assets/images/marker-cpes.png',
    CPFPB: 'assets/images/marker-cpfpb.png',
    CPEIPS: 'assets/images/marker-cpeips.png', // AÑADIDO (usa el mismo que CPEPS)
    IES: 'assets/images/marker-ies.png',
    IMFPB: 'assets/images/marker-imfpb.png',
    'IMFPB ': 'assets/images/marker-imfpb.png' // AÑADIDO (variante, mismo icono)
  }

  ngOnInit (): void {
    proj4.defs(
      'EPSG:25830',
      '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    )
    register(proj4)

    // ✅ Escuchar cambios de idioma

    this.translate.getTranslation('es').subscribe(tradEs => {
      this.familiasEsDict = tradEs.familiasProfesionales as Record<
        string,
        string
      >
    })

    this.translate.onLangChange.subscribe(event => {
      console.log('🌐 Evento de cambio de idioma detectado:', event.lang)
      // El cambio ya se maneja en cambiarIdioma(), no duplicar aquí
    })

    // ✅ ESPERAR a que las traducciones estén completamente cargadas
    this.translate
      .get(['familiasProfesionales', 'tiposCentro', 'tabs', 'grados'])
      .subscribe({
        next: () => {
          console.log('✅ Todas las traducciones iniciales cargadas')

          // Cargar datos en orden correcto
          this.cargarEtiquetasTraducidas()
          this.cargarEtiquetasTiposCentro()
          this.cargarEtiquetasFamilias()

          // Esperar un poco más para garantizar que todo esté listo
          setTimeout(() => {
            this.cargarTodasLasFamiliasTraducidas() // ✅ Cambiar esta línea
            this.cargarListas()
          }, 150)
        },
        error: err => {
          console.error('❌ Error cargando traducciones iniciales:', err)
          // Intentar cargar de todas formas
          this.cargarListas()
          this.cargarFamiliasTraducidas()
        }
      })
  }

  ngAfterViewInit (): void {
    this.inicializarMapa()
  }
  /**
   * Muestra el modal de advertencia
   */
  mostrarAdvertencia (mensaje: string): void {
    this.mensajeModalAdvertencia = mensaje
    this.mostrarModalAdvertencia = true
  }

  /**
   * Cierra el modal de advertencia
   */
  cerrarModalAdvertencia (): void {
    this.mostrarModalAdvertencia = false
  }

  constructor (
    private snackBar: MatSnackBar,
    private translate: TranslateService // ✅ Inyectar servicio de traducción
  ) {
    // Configurar idioma por defecto
    this.translate.setDefaultLang('es')

    // Intentar detectar idioma del navegador
    const browserLang = this.translate.getBrowserLang()
    this.currentLang = browserLang?.match(/es|eu/) ? browserLang : 'es'
    this.translate.use(this.currentLang)
  }

  // 5️⃣ ACTUALIZAR cambiarIdioma() para recargar familias
  cambiarIdioma (lang: 'es' | 'eu'): void {
    console.log('🌍 Cambiando idioma a:', lang)

    this.currentLang = lang
    this.translate.use(lang)

    // ✅ FORZAR LIMPIEZA INMEDIATA
    this.familiasFiltradas = []
    this.familiaSeleccionada = ''

    // ✅ ESPERAR a que el cambio de idioma se complete ANTES de recargar datos
    this.translate.use(lang).subscribe({
      next: () => {
        console.log('✅ Idioma cambiado exitosamente a:', lang)

        // ✅ PASO 1: Cargar traducciones base
        this.translate
          .get(['familiasProfesionales', 'tiposCentro', 'tabs', 'grados'])
          .subscribe({
            next: () => {
              console.log('📚 Traducciones base cargadas')

              // ✅ PASO 2: Recargar etiquetas
              this.cargarEtiquetasTraducidas()
              this.cargarEtiquetasTiposCentro()
              this.cargarEtiquetasFamilias()

              // ✅ PASO 3: Esperar 3 ciclos de Angular antes de recargar familias
              setTimeout(() => {
                console.log('⏳ Primer timeout completado')

                setTimeout(() => {
                  console.log('⏳ Segundo timeout completado')

                  setTimeout(() => {
                    console.log(
                      '⏳ Tercer timeout completado - AHORA SÍ recargar familias'
                    )

                    // ✅ AHORA SÍ: Cargar familias traducidas
                    this.cargarFamiliasTraducidasForzado()

                    // Reconstruir tipos de centro
                    const tiposConFP = new Set<string>()
                    institutos.forEach(centro => {
                      if (centro.DGENRC && centro.DGENRC.trim() !== '') {
                        tiposConFP.add(centro.DGENRC)
                      }
                    })

                    const tiposUnicos = Array.from(tiposConFP).sort()
                    this.tiposCentro = tiposUnicos.map(codigo => ({
                      value: codigo,
                      label: this.tipoCentroLabels[codigo] || codigo
                    }))

                    // Recargar provincias
                    const campoProvincia = lang === 'eu' ? 'DTERRE' : 'DTERRC'
                    this.provincias = Array.from(
                      new Set(institutos.map(c => c[campoProvincia] as string))
                    ).sort()

                    // Ajustar provincia seleccionada
                    if (this.provinciaSeleccionada) {
                      const centroConProvincia = institutos.find(c => {
                        const provinciaAnterior =
                          lang === 'eu' ? c.DTERRC : c.DTERRE
                        return provinciaAnterior === this.provinciaSeleccionada
                      })

                      if (centroConProvincia) {
                        this.provinciaSeleccionada =
                          lang === 'eu'
                            ? centroConProvincia.DTERRE
                            : centroConProvincia.DTERRC
                        this.actualizarMunicipios()
                      } else {
                        this.provinciaSeleccionada = ''
                        this.municipioSeleccionado = ''
                        this.municipioEnabled = false
                      }
                    }
                  }, 300) // Tercer timeout: 300ms
                }, 200) // Segundo timeout: 200ms
              }, 150) // Primer timeout: 150ms
            },
            error: err => {
              console.error('❌ Error cargando traducciones base:', err)
            }
          })
      },
      error: err => {
        console.error('❌ Error al cambiar idioma:', err)
      }
    })
  }

  /**
   * ✅ VERSIÓN FORZADA que NO usa reintentos, sino que espera explícitamente
   */
  private cargarFamiliasTraducidasForzado (): void {
    console.log('🔥 FORZANDO carga de familias traducidas')
    console.log('🌍 Idioma actual:', this.currentLang)

    // ✅ Limpiar array primero
    this.familiasFiltradas = []

    // ✅ Obtener traducciones DIRECTAMENTE del servicio (sin caché)
    this.translate.getTranslation(this.currentLang).subscribe({
      next: translations => {
        const familias = translations.familiasProfesionales as Record<
          string,
          string
        >

        console.log('📦 Traducciones recibidas:', familias)
        console.log(
          '🔑 Primera familia:',
          Object.keys(familias)[0],
          '→',
          Object.values(familias)[0]
        )

        // ✅ Verificar que NO sean códigos
        const primeraClave = Object.keys(familias)[0]
        const primerValor = familias[primeraClave]

        if (
          primerValor === primeraClave ||
          primerValor.startsWith('familiasProfesionales.')
        ) {
          console.error('❌ Las traducciones AÚN NO están listas')

          // ✅ Último recurso: usar fallback
          this.usarFallbackFamilias()
          return
        }

        // ✅ Mapear códigos a nombres traducidos
        this.familiasFiltradas = Object.keys(familias)
          .map(codigo => {
            const nombre = familias[codigo]
            console.log(`  📌 ${codigo} → ${nombre}`)
            return nombre
          })
          .filter(
            nombre =>
              nombre &&
              nombre.trim() !== '' &&
              !nombre.startsWith('familiasProfesionales.')
          )
          .sort()

        console.log(
          '✅ Familias FORZADAS cargadas:',
          this.familiasFiltradas.length
        )
        console.log(
          '📋 Primeras 5 familias:',
          this.familiasFiltradas.slice(0, 5)
        )

        // ✅ VERIFICACIÓN FINAL
        if (
          this.familiasFiltradas.length === 0 ||
          this.familiasFiltradas[0].length <= 3
        ) {
          console.error('❌ Familias no válidas, usando fallback')
          this.usarFallbackFamilias()
        }
      },
      error: err => {
        console.error('❌ Error obteniendo traducciones:', err)
        this.usarFallbackFamilias()
      }
    })
  }

  // ✅ NUEVO MÉTODO para traducir la familia seleccionada al cambiar idioma
  private traducirFamiliaSeleccionada (nuevoIdioma: 'es' | 'eu'): void {
    const idiomaAnterior = nuevoIdioma === 'eu' ? 'es' : 'eu'

    // Obtener traducciones del idioma anterior
    this.translate.getTranslation(idiomaAnterior).subscribe(tradAnterior => {
      const familiasAnterior = tradAnterior.familiasProfesionales as Record<
        string,
        string
      >

      // Buscar la clave de la familia actual
      const clave = Object.keys(familiasAnterior).find(
        key => familiasAnterior[key] === this.familiaSeleccionada
      )

      if (clave) {
        // Traducir al nuevo idioma
        this.translate.getTranslation(nuevoIdioma).subscribe(tradNueva => {
          const familiasNuevas = tradNueva.familiasProfesionales as Record<
            string,
            string
          >
          this.familiaSeleccionada = familiasNuevas[clave]

          console.log(
            `🔄 Familia traducida: ${familiasAnterior[clave]} → ${familiasNuevas[clave]}`
          )

          // Actualizar ciclos con la familia traducida
          if (this.gradoSeleccionado) {
            this.actualizarCiclosPorFamiliaYGrado()
          }
        })
      }
    })
  }

  // Diccionario con las etiquetas traducidas de familias
  familiasLabels: Record<string, string> = {}

  // Llamar en ngOnInit y en cambiarIdioma
  private cargarEtiquetasFamilias (): void {
    this.translate.get('familiasProfesionales').subscribe({
      next: (dic: Record<string, string>) => {
        this.familiasLabels = dic || {}

        // Remapear familiasFiltradas según idioma actual
        if (this.familiasFiltradas && this.familiasFiltradas.length > 0) {
          this.familiasFiltradas = this.familiasFiltradas.map(nombreEs => {
            // Buscar la clave cuya traducción ES coincida con nombreEs
            const entrada = Object.entries(
              this.translate.instant('familiasProfesionales') as Record<
                string,
                string
              >
            ).find(([, valorEs]) => valorEs === nombreEs)
            const clave = entrada ? entrada[0] : null
            return clave ? this.familiasLabels[clave] || nombreEs : nombreEs
          })
        }
      },
      error: err => {
        console.error('Error cargando familiasProfesionales', err)
      }
    })
  }

  cargarEtiquetasTraducidas (): void {
    this.translate
      .get([
        'tabs.contacto',
        'tabs.oferta',
        'tabs.basico',
        'tabs.medio',
        'tabs.superior'
      ])
      .subscribe(translations => {
        this.tabs = [
          { id: 'contacto', label: translations['tabs.contacto'] },
          { id: 'oferta', label: translations['tabs.oferta'] },
          { id: 'basico', label: translations['tabs.basico'] },
          { id: 'medio', label: translations['tabs.medio'] },
          { id: 'superior', label: translations['tabs.superior'] }
        ]
      })

    this.translate
      .get(['grados.basico', 'grados.medio', 'grados.superior'])
      .subscribe(translations => {
        this.gradosCiclo = [
          { value: 'Básico', label: translations['grados.basico'] },
          { value: 'Medio', label: translations['grados.medio'] },
          { value: 'Superior', label: translations['grados.superior'] }
        ]
      })
  }

  // En mapa-centros.component.ts

  // 1️⃣ MODIFICAR el método irAInicio():

  irAInicio (): void {
    this.popupVisible = false
    this.selectedCentro = null
    this.centroSeleccionado = null
    this.isPanning = false
    this.panAttempts = 0

    // ✅ Limpiar filtros y reiniciar el mapa completamente
    this.limpiarFiltros()
    this.map.getView().fit(this.euskadiExtent, {
      duration: 400,
      padding: [30, 30, 30, 30],
      maxZoom: 9.25
    })
  }

  // ✅ CAMBIO 2: Modificar onSelectCentro para OCULTAR tooltip al hacer click
  onSelectCentro (centro: any, pixel: number[]): void {
    if (this.isPanning) {
      console.log('⚠️ Pan en progreso, ignorando clic')
      return
    }

    // ✅ OCULTAR TOOLTIP AL HACER CLICK
    this.tooltipVisible = false

    this.panAttempts = 0
    this.selectedCentro = centro
    this.centroSeleccionado = centro
    this.cargarCiclosCentro(centro.CCEN)
    this.tabActiva = 'contacto'

    this.mostrarPopupSeguro(pixel)
  }

  mostrarPopupSeguro (pixel: number[]): void {
    const popupWidth = 420
    const popupHeight = 600
    const minMargin = 50 // Margen mínimo desde los bordes

    const mapElement = this.map.getTargetElement() as HTMLElement
    const mapRect = mapElement.getBoundingClientRect()

    const [x, y] = pixel

    // Verificar si hay suficiente espacio en TODAS direcciones
    const espacioIzquierda = x - mapRect.left
    const espacioDerecha = mapRect.right - x
    const espacioArriba = y - mapRect.top
    const espacioAbajo = mapRect.bottom - y

    const necesitaEspacioHorizontal = popupWidth / 2 + minMargin
    const necesitaEspacioVertical = popupHeight / 2 + minMargin

    const tieneEspacioHorizontal =
      espacioIzquierda >= necesitaEspacioHorizontal &&
      espacioDerecha >= necesitaEspacioHorizontal

    const tieneEspacioVertical =
      espacioArriba >= necesitaEspacioVertical &&
      espacioAbajo >= necesitaEspacioVertical

    // Si NO hay espacio suficiente Y no hemos hecho pan todavía
    if (
      (!tieneEspacioHorizontal || !tieneEspacioVertical) &&
      this.panAttempts < this.MAX_PAN_ATTEMPTS
    ) {
      this.panAttempts++
      this.isPanning = true

      console.log('📍 Centrando pin en viewport para mostrar popup')

      // Obtener coordenada del pin
      const pinCoord = this.map.getCoordinateFromPixel(pixel)
      if (!pinCoord) {
        console.error('❌ Error obteniendo coordenada del pin')
        this.isPanning = false
        return
      }

      // Calcular centro del viewport (pixel ideal para el pin)
      const centerPixel: [number, number] = [
        mapRect.width / 2,
        mapRect.height / 2
      ]

      // Calcular qué coordenada debería estar en el centro
      const currentCenter = this.map.getView().getCenter()
      if (!currentCenter) {
        console.error('❌ Error obteniendo centro actual')
        this.isPanning = false
        return
      }

      // Calcular desplazamiento necesario
      const deltaPixelX = x - centerPixel[0]
      const deltaPixelY = y - centerPixel[1]

      const resolution = this.map.getView().getResolution() || 1

      const newCenter: [number, number] = [
        currentCenter[0] + deltaPixelX * resolution,
        currentCenter[1] - deltaPixelY * resolution // Y invertida en OpenLayers
      ]

      console.log(
        `🎯 Moviendo pin al centro: deltaX=${deltaPixelX.toFixed(
          0
        )}px, deltaY=${deltaPixelY.toFixed(0)}px`
      )

      // Animar hacia el nuevo centro
      this.map.getView().animate({ center: newCenter, duration: 350 }, () => {
        console.log('✅ Pin centrado')
        this.isPanning = false

        // Obtener nueva posición del pin (debería estar en el centro)
        const newPixel = this.map.getPixelFromCoordinate(pinCoord)
        if (newPixel) {
          this.mostrarPopupEnPosicion(newPixel)
        }
      })

      return
    }

    // Hay espacio suficiente, mostrar directamente
    this.mostrarPopupEnPosicion(pixel)
  }

  private mostrarPopupEnPosicion (pixel: number[]): void {
    const [x, y] = pixel

    const popupWidth = 420
    const popupHeight = 600
    const margin = 20
    const arrowSize = 30

    const mapElement = this.map.getTargetElement() as HTMLElement
    const mapRect = mapElement.getBoundingClientRect()

    const espacioArriba = y - mapRect.top
    const espacioAbajo = mapRect.bottom - y
    const espacioIzquierda = x - mapRect.left
    const espacioDerecha = mapRect.right - x

    let popupX: number
    let popupY: number
    let positionClass: string

    // Lógica de posicionamiento por prioridad
    if (espacioAbajo >= popupHeight + margin + arrowSize) {
      // Abajo (preferido)
      popupY = y + arrowSize + 10
      popupX = x - popupWidth / 2
      positionClass = 'popup-bottom'
      console.log('📍 Popup: ABAJO del pin')
    } else if (espacioArriba >= popupHeight + margin + arrowSize) {
      // Arriba
      popupY = y - popupHeight - arrowSize - 10
      popupX = x - popupWidth / 2
      positionClass = 'popup-top'
      console.log('📍 Popup: ARRIBA del pin')
    } else if (espacioDerecha >= popupWidth + margin + arrowSize) {
      // Derecha
      popupX = x + arrowSize + 10
      popupY = y - popupHeight / 2
      positionClass = 'popup-right'
      console.log('📍 Popup: DERECHA del pin')
    } else if (espacioIzquierda >= popupWidth + margin + arrowSize) {
      // Izquierda
      popupX = x - popupWidth - arrowSize - 10
      popupY = y - popupHeight / 2
      positionClass = 'popup-left'
      console.log('📍 Popup: IZQUIERDA del pin')
    } else {
      // Centrado (último recurso)
      popupY = Math.max(
        mapRect.top + margin,
        Math.min(y - popupHeight / 2, mapRect.bottom - popupHeight - margin)
      )
      popupX = x - popupWidth / 2
      positionClass = 'popup-bottom'
      console.log('📍 Popup: CENTRADO (último recurso)')
    }

    // Ajustar para no salirse
    const finalX = Math.max(
      mapRect.left + margin,
      Math.min(popupX, mapRect.right - popupWidth - margin)
    )
    const finalY = Math.max(
      mapRect.top + margin,
      Math.min(popupY, mapRect.bottom - popupHeight - margin)
    )

    // Aplicar
    this.popupPosition = { x: finalX, y: finalY }
    this.popupClass = positionClass
    this.popupVisible = true

    console.log(
      `✅ Popup mostrado en (${finalX.toFixed(0)}, ${finalY.toFixed(0)})`
    )
  }

  // 4️⃣ NUEVO MÉTODO separado SOLO para posicionar (sin lógica de pan):

  /**
   * Navega a la pestaña correspondiente según el tipo de ciclo
   */
  irAPestanaPorGrado (tipo: 'basicos' | 'medios' | 'superiores'): void {
    // Solo cambiar de pestaña si hay ciclos de ese tipo
    if (this.getTotalCiclos(tipo) === 0) {
      return
    }

    // Mapeo de tipo a id de pestaña
    const mapeoTabs: Record<'basicos' | 'medios' | 'superiores', string> = {
      basicos: 'basico',
      medios: 'medio',
      superiores: 'superior'
    }

    this.cambiarTab(mapeoTabs[tipo])
  }

  // En mapa-centros.component.ts

  // Propiedad donde guardas las etiquetas cargadas desde es/eu.json

  // Llama a este método en ngOnInit()
  private cargarEtiquetasTiposCentro (): void {
    this.translate.get('tiposCentro').subscribe({
      next: (tipos: Record<string, string>) => {
        // Guardar el diccionario de claves -> etiqueta traducida
        this.tipoCentroLabels = tipos || {}

        // Si ya tienes this.tiposCentro calculado, actualizar sus labels
        if (this.tiposCentro && this.tiposCentro.length > 0) {
          this.tiposCentro = this.tiposCentro.map(t => ({
            ...t,
            label: this.tipoCentroLabels[t.value] || t.label || t.value
          }))
        }
      },
      error: err => {
        console.error('Error cargando tiposCentro desde traducciones', err)
        // Fallback: mantener labels actuales o el código
        if (this.tiposCentro && this.tiposCentro.length > 0) {
          this.tiposCentro = this.tiposCentro.map(t => ({
            ...t,
            label: t.label || t.value
          }))
        }
      }
    })
  }

  getImagenCentro (ccen: number): string {
    if (!ccen) return 'assets/images/default-centro.jpg'
    const codigo = String(ccen).padStart(6, '0')
    return `assets/images/img_${codigo}.jpg`
  }

  onImageError (event: any): void {
    event.target.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2VudHJvPC90ZXh0Pjwvc3ZnPg=='
  }

  cambiarTab (tabId: string): void {
    this.tabActiva = tabId
  }

  cerrarPopup (): void {
    this.popupVisible = false
    this.selectedCentro = null
    this.centroSeleccionado = null
    this.isPanning = false
    this.panAttempts = 0
    // NO tocar tooltipVisible - se maneja automáticamente con hover
  }

  getTotalCiclos (tipo: 'basicos' | 'medios' | 'superiores'): number {
    return this.ciclosCentro[tipo]?.length || 0
  }

  /**
   * Genera la URL del DCB en el portal IVAC-EEI
   * Estructura: https://ivac-eei.eus/es/familias-profesionales/{familia}/{prefijo}{ciclo}.html
   */

  abrirDCB (ciclo: Asignacion, event: Event): void {
    event.stopPropagation()
    const url = this.getDCBUrl(ciclo)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // ✅ 1. REEMPLAZAR el método cargarCiclosCentro en mapa-centros.component.ts

  cargarCiclosCentro (ccen: number): void {
    if (!ccen) {
      this.ciclosCentro = { basicos: [], medios: [], superiores: [] }
      this.familiasCentro = []
      return
    }

    const ciclosDelCentro = ciclosAsignacion.filter(ciclo =>
      ciclo.centros.includes(ccen)
    )

    // ✅ Función para normalizar (sin acentos, mayúsculas)
    const normalizar = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toUpperCase()

    // ✅ Filtrar con normalización
    this.ciclosCentro = {
      basicos: ciclosDelCentro.filter(c => normalizar(c.grado) === 'BASICO'),
      medios: ciclosDelCentro.filter(c => normalizar(c.grado) === 'MEDIO'),
      superiores: ciclosDelCentro.filter(
        c => normalizar(c.grado) === 'SUPERIOR'
      )
    }

    // 🔍 Debug para verificar
    console.log(`📊 Centro ${ccen}:`, {
      total: ciclosDelCentro.length,
      basicos: this.ciclosCentro.basicos.length,
      medios: this.ciclosCentro.medios.length,
      superiores: this.ciclosCentro.superiores.length,
      gradosOriginales: [...new Set(ciclosDelCentro.map(c => c.grado))]
    })

    const familiasSet = new Set(ciclosDelCentro.map(c => c.familia))
    this.familiasCentro = Array.from(familiasSet).sort()
  }

  // 1️⃣ MODIFICAR el método cargarListas()
  cargarListas (): void {
    const campoProvincia = this.currentLang === 'eu' ? 'DTERRE' : 'DTERRC'

    this.provincias = Array.from(
      new Set(institutos.map(c => c[campoProvincia] as string))
    ).sort()

    const centrosConCiclos = new Set<number>()
    ciclosAsignacion.forEach(ciclo => {
      ciclo.centros.forEach(ccen => centrosConCiclos.add(ccen))
    })

    const tiposConFP = new Set<string>()
    institutos.forEach(centro => {
      if (
        centrosConCiclos.has(centro.CCEN) &&
        centro.DGENRC &&
        centro.DGENRC.trim() !== ''
      ) {
        tiposConFP.add(centro.DGENRC)
      }
    })

    const tiposUnicos = Array.from(tiposConFP).sort()

    this.tiposCentro = tiposUnicos.map(codigo => ({
      value: codigo,
      label: this.tipoCentroLabels[codigo] || codigo
    }))

    this.ciclosFiltrados = []

    // ✅ CAMBIO CRÍTICO: Cargar familias traducidas desde el principio
    this.cargarFamiliasTraducidas()
  }

  resetearCompleto (): void {
    this.limpiarFiltros()
    this.map.getView().fit(this.euskadiExtent, {
      duration: 400,
      padding: [30, 30, 30, 30],
      maxZoom: 9.25
    })
  } // En mapa-centros.component.ts

  // ✅ CAMBIO 4: Modificar inicializarMapa para manejar el click correctamente
  inicializarMapa (): void {
    this.map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({ center: [0, 0], zoom: 2 })
    })

    this.map.getView().fit(this.euskadiExtent, {
      duration: 100,
      padding: [30, 30, 30, 30],
      maxZoom: 9.25
    })

    // ✅ Evento de click
    this.map.on('singleclick', evt => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, f => f as any)
      if (feature) {
        const props = feature.getProperties()
        if (!props || !props.CCEN) return

        // ✅ OCULTAR TOOLTIP AL HACER CLICK
        this.tooltipVisible = false

        this.onSelectCentro(props, evt.pixel)
      } else {
        if (this.popupVisible) {
          this.cerrarPopup()
        }
      }
    })

    // ✅ AGREGAR EVENTO pointermove (más confiable que mousemove)
    this.map.on('pointermove', evt => {
      const pixel = this.map.getEventPixel(evt.originalEvent)
      const feature = this.map.forEachFeatureAtPixel(pixel, f => f as any)

      if (feature) {
        const props = feature.getProperties()

        console.log('✅ Feature detectado:', props['CCEN'], props['name']) // DEBUG

        // Si hay popup abierto del mismo centro, no mostrar tooltip
        if (
          this.popupVisible &&
          this.centroSeleccionado &&
          props['CCEN'] === this.centroSeleccionado.CCEN
        ) {
          console.log('⚠️ Popup del mismo centro abierto, ocultando tooltip') // DEBUG
          this.tooltipVisible = false
          return
        }

        // ✅ ACTIVAR TOOLTIP
        this.tooltipVisible = true
        this.tooltipContent =
          props['tooltipNombre'] || props['name'] || 'Centro'

        console.log('🟢 TOOLTIP ACTIVADO:', {
          visible: this.tooltipVisible,
          content: this.tooltipContent
        }) // DEBUG

        const mouseEvt = evt.originalEvent as MouseEvent
        const tooltipWidth = 300
        const tooltipHeight = 40
        const margin = 20

        let x = mouseEvt.clientX + 12
        let y = mouseEvt.clientY - 14

        if (x + tooltipWidth > window.innerWidth - margin) {
          x = mouseEvt.clientX - tooltipWidth - 12
        }

        if (y + tooltipHeight > window.innerHeight - margin) {
          y = mouseEvt.clientY - tooltipHeight - 14
        }

        if (y < margin) y = margin
        if (x < margin) x = margin

        this.tooltipX = x
        this.tooltipY = y

        console.log('📍 Posición tooltip:', {
          x: this.tooltipX,
          y: this.tooltipY
        }) // DEBUG

        // Cambiar cursor a pointer
        ;(this.map.getTargetElement() as HTMLElement).style.cursor = 'pointer'
      } else {
        if (this.tooltipVisible) {
          console.log('🔴 Ocultando tooltip (sin feature)') // DEBUG
        }
        this.tooltipVisible = false
        ;(this.map.getTargetElement() as HTMLElement).style.cursor = ''
      }
    })

    this.pinsLayer = new VectorLayer({
      source: new VectorSource({ features: [] })
    })

    this.map.addLayer(this.pinsLayer)
  }

  // ✅ CAMBIO 1: Modificar onMapMouseMove para que SIEMPRE funcione
  onMapMouseMove (event: Event): void {
    console.log('🖱️ Mouse move detectado') // DEBUG

    if (!this.map) {
      console.log('❌ No hay mapa') // DEBUG
      return
    }

    const mouseEvt = event as MouseEvent
    const mapElement = this.map.getTargetElement() as HTMLElement

    if (!mapElement) {
      console.log('❌ No hay elemento de mapa') // DEBUG
      return
    }

    const bbox = mapElement.getBoundingClientRect()
    const pixel: [number, number] = [
      mouseEvt.clientX - bbox.left,
      mouseEvt.clientY - bbox.top
    ]

    console.log('📍 Pixel:', pixel) // DEBUG

    const feature = this.map.forEachFeatureAtPixel(
      pixel,
      f => f as Feature<any>
    )

    if (feature) {
      console.log('✅ Feature encontrado:', feature.getProperties()) // DEBUG

      const props = feature.getProperties()

      // Si hay popup abierto del mismo centro, no mostrar tooltip
      if (
        this.popupVisible &&
        this.centroSeleccionado &&
        props['CCEN'] === this.centroSeleccionado.CCEN
      ) {
        console.log('⚠️ Popup abierto del mismo centro') // DEBUG
        this.tooltipVisible = false
        return
      }

      // ✅ Mostrar tooltip
      this.tooltipVisible = true
      this.tooltipContent =
        props['tooltipNombre'] || props['name'] || 'Centro sin nombre'

      console.log('✅ Tooltip activado:', this.tooltipContent) // DEBUG

      const tooltipWidth = 300
      const tooltipHeight = 40
      const margin = 20

      let x = mouseEvt.clientX + 12
      let y = mouseEvt.clientY - 14

      if (x + tooltipWidth > window.innerWidth - margin) {
        x = mouseEvt.clientX - tooltipWidth - 12
      }

      if (y + tooltipHeight > window.innerHeight - margin) {
        y = mouseEvt.clientY - tooltipHeight - 14
      }

      if (y < margin) y = margin
      if (x < margin) x = margin

      this.tooltipX = x
      this.tooltipY = y

      console.log('📍 Tooltip en posición:', x, y) // DEBUG
    } else {
      console.log('⚠️ No hay feature') // DEBUG
      this.tooltipVisible = false
    }
  }

  actualizarMunicipios (): void {
    this.cerrarPopup()

    if (this.provinciaSeleccionada) {
      const centrosConCiclos = new Set<number>()
      ciclosAsignacion.forEach(ciclo => {
        ciclo.centros.forEach(ccen => centrosConCiclos.add(ccen))
      })

      const campoProvincia = this.currentLang === 'eu' ? 'DTERRE' : 'DTERRC'
      const campoMunicipio = this.currentLang === 'eu' ? 'DMUNIE' : 'DMUNIC'

      const municipiosSet = new Set<string>()

      institutos
        .filter(c => {
          if (c[campoProvincia] !== this.provinciaSeleccionada) return false
          if (!centrosConCiclos.has(c.CCEN)) return false

          if (this.tipoCentroSeleccionado) {
            if (this.tipoCentroSeleccionado === 'CIFP') {
              if (c.DGENRC !== 'CIFP' && c.DGENRC !== 'CIFPD') return false
            } else {
              if (c.DGENRC !== this.tipoCentroSeleccionado) return false
            }
          }
          return true
        })
        .forEach(c => municipiosSet.add(c[campoMunicipio] as string))

      this.municipios = Array.from(municipiosSet).sort()
      this.municipioEnabled = true
    } else {
      this.municipios = []
      this.municipioSeleccionado = ''
      this.municipioEnabled = false
    }

    // ✅ NUEVO: Actualizar familias basadas en centros disponibles
    this.actualizarFamiliasDisponibles()

    this.actualizarMapa('provincia')
  }

  actualizarFamilias (): void {
    this.cerrarPopup()

    // ✅ Actualizar familias disponibles según filtros actuales
    this.actualizarFamiliasDisponibles()

    this.actualizarMapa('municipio')
  }

  // 4️⃣ MODIFICAR actualizarCiclos() para manejar la traducción inversa
  // ============================================
  // TAMBIÉN ACTUALIZAR actualizarCiclos()
  // ============================================

  // 4️⃣ MODIFICAR actualizarCiclos() para manejar la traducción inversa
  actualizarCiclos (): void {
    this.cerrarPopup()

    if (this.familiaSeleccionada) {
      const codigoFamilia = this.obtenerCodigoFamilia(this.familiaSeleccionada)
      const gradoEnEspanol = this.traducirGradoAEspanol(this.gradoSeleccionado)

      // ✅ Obtener centros válidos según filtros actuales
      const centrosValidos = this.obtenerCentrosValidos()

      this.ciclosFiltrados = ciclosAsignacion.filter(ciclo => {
        // Filtrar por código de familia
        if (ciclo.familiaCodigo !== codigoFamilia) return false

        // Filtrar por grado si está seleccionado
        if (gradoEnEspanol && ciclo.grado !== gradoEnEspanol) return false

        // ✅ Verificar que el ciclo esté en al menos un centro válido
        const estaEnCentroValido = ciclo.centros.some(ccen =>
          centrosValidos.has(ccen)
        )

        return estaEnCentroValido
      })

      console.log(
        `🔍 Ciclos filtrados: Familia="${codigoFamilia}", Grado="${gradoEnEspanol}", En centros válidos: ${this.ciclosFiltrados.length}`
      )
    } else {
      this.ciclosFiltrados = []
    }

    this.cicloSeleccionado = ''
    this.actualizarMapa('familia')
  }

  /**
   * ✅ NUEVO: Obtiene el conjunto de centros válidos según filtros actuales
   */
  private obtenerCentrosValidos (): Set<number> {
    const campoProvincia = this.currentLang === 'eu' ? 'DTERRE' : 'DTERRC'
    const campoMunicipio = this.currentLang === 'eu' ? 'DMUNIE' : 'DMUNIC'
    const normaliza = (x: string) => (x || '').trim().toUpperCase()

    const centrosValidos = new Set<number>()

    institutos.forEach(centro => {
      // Filtrar por provincia
      if (
        this.provinciaSeleccionada &&
        centro[campoProvincia] !== this.provinciaSeleccionada
      ) {
        return
      }

      // Filtrar por municipio
      if (
        this.municipioSeleccionado &&
        normaliza(centro[campoMunicipio] as string) !==
          normaliza(this.municipioSeleccionado)
      ) {
        return
      }

      // Filtrar por tipo de centro
      if (this.tipoCentroSeleccionado) {
        if (this.tipoCentroSeleccionado === 'CIFP') {
          if (centro.DGENRC !== 'CIFP' && centro.DGENRC !== 'CIFPD') {
            return
          }
        } else {
          if (centro.DGENRC !== this.tipoCentroSeleccionado) {
            return
          }
        }
      }

      centrosValidos.add(centro.CCEN)
    })

    return centrosValidos
  }

  /**
   * ✅ NUEVO: Actualiza las familias disponibles según los filtros actuales
   */
  /**
   * ✅ NUEVO: Actualiza las familias disponibles según los filtros actuales
   * GARANTIZA que siempre se muestren nombres traducidos, NUNCA códigos
   */
  private actualizarFamiliasDisponibles (): void {
    console.log('🔄 Actualizando familias disponibles...')

    // Si no hay filtros de ubicación/tipo, mostrar todas las familias
    if (
      !this.provinciaSeleccionada &&
      !this.municipioSeleccionado &&
      !this.tipoCentroSeleccionado
    ) {
      console.log('📚 Sin filtros de ubicación, cargando todas las familias')
      this.cargarTodasLasFamiliasTraducidas()
      return
    }

    const centrosValidos = this.obtenerCentrosValidos()

    // Obtener CÓDIGOS de familias que tengan ciclos en los centros válidos
    const codigosFamiliasDisponibles = new Set<string>()

    ciclosAsignacion.forEach(ciclo => {
      // Si el ciclo está en algún centro válido, agregar su CÓDIGO de familia
      if (ciclo.centros.some(ccen => centrosValidos.has(ccen))) {
        codigosFamiliasDisponibles.add(ciclo.familiaCodigo) // ✅ USAR CÓDIGO
      }
    })

    const codigosArray = Array.from(codigosFamiliasDisponibles).sort()

    console.log(`📚 Códigos de familias disponibles:`, codigosArray)

    // ✅ TRADUCIR códigos a nombres del idioma actual
    this.translate.get('familiasProfesionales').subscribe({
      next: (familiasTraducidas: Record<string, string>) => {
        // ✅ Mapear códigos a nombres traducidos
        this.familiasFiltradas = codigosArray
          .map(codigo => familiasTraducidas[codigo])
          .filter(
            nombre =>
              nombre &&
              nombre.trim() !== '' &&
              !nombre.startsWith('familiasProfesionales.') &&
              nombre.length > 3 // ✅ Evitar códigos verificando longitud
          )
          .sort()

        console.log(
          `✅ Familias traducidas disponibles (${this.currentLang}):`,
          this.familiasFiltradas.length
        )
        console.log(
          '📋 Primeras 3 familias:',
          this.familiasFiltradas.slice(0, 3)
        )

        // ✅ VERIFICACIÓN: Si hay códigos en lugar de nombres, usar fallback
        if (
          this.familiasFiltradas.length === 0 ||
          this.familiasFiltradas.some(f => f.length <= 3)
        ) {
          console.warn('⚠️ Familias no válidas, usando fallback')
          this.usarFallbackFamilias()
        }
      },
      error: err => {
        console.error('❌ Error traduciendo familias:', err)
        this.usarFallbackFamilias()
      }
    })
  }

  /**
   * ✅ NUEVO: Carga TODAS las familias traducidas (sin filtrar por centros)
   */
  private cargarTodasLasFamiliasTraducidas (): void {
    console.log('🌍 Cargando TODAS las familias traducidas')

    // ✅ Obtener TODOS los códigos de familias desde asignacion.ts
    const todosCodigos = Array.from(
      new Set(ciclosAsignacion.map(c => c.familiaCodigo))
    ).sort()

    console.log('🔑 Total de códigos de familias:', todosCodigos.length)

    // ✅ Traducir códigos a nombres
    this.translate.get('familiasProfesionales').subscribe({
      next: (familiasTraducidas: Record<string, string>) => {
        this.familiasFiltradas = todosCodigos
          .map(codigo => familiasTraducidas[codigo])
          .filter(
            nombre =>
              nombre &&
              nombre.trim() !== '' &&
              !nombre.startsWith('familiasProfesionales.') &&
              nombre.length > 3 // ✅ Evitar códigos
          )
          .sort()

        console.log(
          `✅ TODAS las familias cargadas (${this.currentLang}):`,
          this.familiasFiltradas.length
        )

        // ✅ VERIFICACIÓN: Si falló, usar fallback
        if (this.familiasFiltradas.length === 0) {
          console.error('❌ No se pudieron cargar familias, usando fallback')
          this.usarFallbackFamilias()
        }
      },
      error: err => {
        console.error('❌ Error cargando todas las familias:', err)
        this.usarFallbackFamilias()
      }
    })
  }

  // ============================================
  // REEMPLAZAR actualizarMapa() - VERSIÓN CORREGIDA
  // ============================================

  actualizarMapa (
    origen:
      | 'provincia'
      | 'municipio'
      | 'tipo'
      | 'grado'
      | 'familia'
      | 'ciclo' = 'ciclo'
  ): void {
    if (!this.map) return

    console.log(`🗺️ actualizarMapa() llamado desde: ${origen}`)

    const campoProvincia = this.currentLang === 'eu' ? 'DTERRE' : 'DTERRC'
    const campoMunicipio = this.currentLang === 'eu' ? 'DMUNIE' : 'DMUNIC'

    const hayFiltros = !!(
      this.provinciaSeleccionada ||
      this.municipioSeleccionado ||
      this.tipoCentroSeleccionado ||
      this.gradoSeleccionado ||
      this.cicloSeleccionado ||
      this.familiaSeleccionada
    )

    // ✅ OBTENER CENTROS QUE TIENEN AL MENOS UN CICLO DE FP
    const centrosConCiclosFP = new Set<number>()
    ciclosAsignacion.forEach(ciclo => {
      ciclo.centros.forEach(ccen => centrosConCiclosFP.add(ccen))
    })

    console.log(`📚 Total de centros con ciclos FP: ${centrosConCiclosFP.size}`)

    if (!hayFiltros) {
      console.log('🧹 No hay filtros activos, limpiando mapa...')
      this.centrosMostradosAnteriores.clear()
      if (this.pinsLayer) this.map.removeLayer(this.pinsLayer)
      this.pinsLayer = new VectorLayer({
        source: new VectorSource({ features: [] })
      })
      this.map.addLayer(this.pinsLayer)
      this.map.getView().fit(this.euskadiExtent, {
        duration: 400,
        padding: [30, 30, 30, 30],
        maxZoom: 9.25
      })
      return
    }

    const normaliza = (x: string) => (x || '').trim().toUpperCase()

    let ciclosRelevantes: Asignacion[] = [...ciclosAsignacion]

    // ✅ Determinar si hay filtros de ciclos específicos
    const hayFiltrosCiclos = !!(
      this.familiaSeleccionada ||
      this.gradoSeleccionado ||
      this.cicloSeleccionado
    )

    console.log(`🎯 Hay filtros de ciclos: ${hayFiltrosCiclos}`)

    // ✅ CRÍTICO: Traducir grado al español ANTES de filtrar
    let gradoEnEspanol = ''
    if (this.gradoSeleccionado) {
      gradoEnEspanol = this.traducirGradoAEspanol(this.gradoSeleccionado)
      ciclosRelevantes = ciclosRelevantes.filter(
        c => c.grado === gradoEnEspanol
      )
      console.log(
        `🎓 Filtrado por grado "${gradoEnEspanol}" (original: "${this.gradoSeleccionado}"): ${ciclosRelevantes.length} ciclos`
      )
    }

    // ✅ CRÍTICO: Traducir familia al español ANTES de filtrar
    if (this.familiaSeleccionada) {
      const codigoFamilia = this.obtenerCodigoFamilia(this.familiaSeleccionada)
      ciclosRelevantes = ciclosRelevantes.filter(
        c => c.familiaCodigo === codigoFamilia
      )
      console.log(
        `👨‍💼 Filtrado por familia código "${codigoFamilia}": ${ciclosRelevantes.length} ciclos`
      )
    }

    // Filtrar por ciclo específico si está seleccionado
    if (this.cicloSeleccionado) {
      const cicloEspecifico = ciclosAsignacion.find(
        c => c.codcicl === Number(this.cicloSeleccionado)
      )

      if (cicloEspecifico) {
        if (gradoEnEspanol && cicloEspecifico.grado !== gradoEnEspanol) {
          this.snackBar.open(
            `El ciclo "${cicloEspecifico.nom}" es de ${cicloEspecifico.grado}, no de ${gradoEnEspanol}`,
            'Cerrar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-error']
            }
          )
          ciclosRelevantes = []
        } else {
          ciclosRelevantes = [cicloEspecifico]
          console.log(
            `🎯 Filtrado por ciclo específico: ${cicloEspecifico.nom}`
          )
        }
      } else {
        ciclosRelevantes = []
      }
    }

    // ✅ NUEVO: Verificar ANTES si hay filtros de familia/grado/ciclo pero NO hay ciclos
    if (hayFiltrosCiclos && ciclosRelevantes.length === 0) {
      console.log(
        '⚠️ No hay ciclos que coincidan con los filtros de familia/grado/ciclo'
      )

      // Limpiar mapa
      this.centrosMostradosAnteriores.clear()
      if (this.pinsLayer) this.map.removeLayer(this.pinsLayer)
      this.pinsLayer = new VectorLayer({
        source: new VectorSource({ features: [] })
      })
      this.map.addLayer(this.pinsLayer)

      // Construir mensaje
      let mensaje =
        'No se encontraron centros que cumplan con los filtros seleccionados:'
      const filtrosActivos = []

      if (this.provinciaSeleccionada)
        filtrosActivos.push(`Provincia: ${this.provinciaSeleccionada}`)
      if (this.municipioSeleccionado)
        filtrosActivos.push(`Municipio: ${this.municipioSeleccionado}`)
      if (this.tipoCentroSeleccionado) {
        const tipoLabel =
          this.tiposCentro.find(t => t.value === this.tipoCentroSeleccionado)
            ?.label || this.tipoCentroSeleccionado
        filtrosActivos.push(`Tipo: ${tipoLabel}`)
      }
      if (this.gradoSeleccionado)
        filtrosActivos.push(`Grado: ${this.gradoSeleccionado}`)
      if (this.familiaSeleccionada)
        filtrosActivos.push(`Familia: ${this.familiaSeleccionada}`)
      if (this.cicloSeleccionado) {
        const ciclo = ciclosAsignacion.find(
          c => c.codcicl === Number(this.cicloSeleccionado)
        )
        if (ciclo) filtrosActivos.push(`Ciclo: ${ciclo.nom}`)
      }

      if (filtrosActivos.length > 0) {
        mensaje += '\n\n' + filtrosActivos.join('\n')
      }

      this.mostrarAdvertencia(mensaje)
      return
    }

    // Obtener centros válidos según los ciclos filtrados
    const centrosValidos = new Set<number>()
    ciclosRelevantes.forEach(ciclo => {
      ciclo.centros.forEach(ccen => centrosValidos.add(ccen))
    })

    console.log(`🏫 Centros con ciclos válidos: ${centrosValidos.size}`)

    // Filtrar centros según todos los criterios
    const centrosFiltrados = institutos.filter(centro => {
      // ✅ VERIFICACIÓN CRÍTICA: Solo mostrar centros que tengan ciclos de FP
      if (!centrosConCiclosFP.has(centro.CCEN)) {
        return false
      }

      // Filtro por provincia
      if (
        this.provinciaSeleccionada &&
        centro[campoProvincia] !== this.provinciaSeleccionada
      ) {
        return false
      }

      // Filtro por municipio
      if (
        this.municipioSeleccionado &&
        normaliza(centro[campoMunicipio] as string) !==
          normaliza(this.municipioSeleccionado)
      ) {
        return false
      }

      // Filtro por tipo de centro
      if (this.tipoCentroSeleccionado) {
        if (this.tipoCentroSeleccionado === 'CIFP') {
          if (centro.DGENRC !== 'CIFP' && centro.DGENRC !== 'CIFPD') {
            return false
          }
        } else {
          if (centro.DGENRC !== this.tipoCentroSeleccionado) {
            return false
          }
        }
      }

      // ✅ IMPORTANTE: Solo filtrar por centrosValidos si hay filtros de familia/grado/ciclo
      // Si solo hay filtros de ubicación/tipo, mostrar todos los centros con FP
      if (hayFiltrosCiclos && centrosValidos.size > 0) {
        if (!centrosValidos.has(centro.CCEN)) {
          return false
        }
      }

      return true
    })

    console.log(`✅ Centros finales tras filtrado: ${centrosFiltrados.length}`)
    console.log(`📍 Primeros 3 centros:`, centrosFiltrados.slice(0, 3).map(c => ({ CCEN: c.CCEN, NOM: c.NOM })))

    // Si NO hay centros, limpiar mapa y mostrar advertencia
    if (centrosFiltrados.length === 0) {
      console.log('⚠️ No se encontraron centros con los filtros aplicados')
      this.centrosMostradosAnteriores.clear()
      if (this.pinsLayer) this.map.removeLayer(this.pinsLayer)
      this.pinsLayer = new VectorLayer({
        source: new VectorSource({ features: [] })
      })
      this.map.addLayer(this.pinsLayer)

      this.cargarTodasLasFamiliasTraducidas()

      let mensaje =
        'No se encontraron centros que cumplan con los filtros seleccionados:'
      const filtrosActivos = []

      if (this.provinciaSeleccionada)
        filtrosActivos.push(`Provincia: ${this.provinciaSeleccionada}`)
      if (this.municipioSeleccionado)
        filtrosActivos.push(`Municipio: ${this.municipioSeleccionado}`)
      if (this.tipoCentroSeleccionado) {
        const tipoLabel =
          this.tiposCentro.find(t => t.value === this.tipoCentroSeleccionado)
            ?.label || this.tipoCentroSeleccionado
        filtrosActivos.push(`Tipo: ${tipoLabel}`)
      }
      if (this.gradoSeleccionado)
        filtrosActivos.push(`Grado: ${this.gradoSeleccionado}`)
      if (this.familiaSeleccionada)
        filtrosActivos.push(`Familia: ${this.familiaSeleccionada}`)
      if (this.cicloSeleccionado) {
        const ciclo = ciclosAsignacion.find(
          c => c.codcicl === Number(this.cicloSeleccionado)
        )
        if (ciclo) filtrosActivos.push(`Ciclo: ${ciclo.nom}`)
      }

      if (filtrosActivos.length > 0) {
        mensaje += '\n\n' + filtrosActivos.join('\n')
      }

      this.mostrarAdvertencia(mensaje)
      return
    }

    // Crear features para los pines
    const features: Feature<Point>[] = []

    centrosFiltrados.forEach(centro => {
      const x = centro.COOR_X
      const y = centro.COOR_Y

      if (!x || !y || isNaN(x) || isNaN(y)) {
        console.warn(`Centro ${centro.CCEN} sin coordenadas válidas:`, x, y)
        return
      }

      try {
        const coords = transform([x, y], 'EPSG:25830', 'EPSG:3857')
        const point = new Point(coords)
        const feature = new Feature<Point>({ geometry: point })

        const tipoGenerico = centro.DGENRC
        const iconoUrl =
          this.tipoCentroIcono[tipoGenerico] ||
          'assets/images/marker-default.png'

        feature.setStyle(
          new Style({
            image: new Icon({
              src: iconoUrl,
              scale: 0.15,
              anchor: [0.5, 1]
            })
          })
        )

        const tooltipNombre = `${centro.DGENRC || ''} ${
          centro.NOME || centro.NOM || ''
        } ${centro.DGENRE || ''}`

        feature.setProperties({
          CCEN: centro.CCEN,
          name: centro.NOM || 'Sin nombre',
          tooltipNombre: tooltipNombre,
          DTERRC: centro.DTERRC,
          DTERRE: centro.DTERRE,
          DMUNIC: centro.DMUNIC,
          DMUNIE: centro.DMUNIE,
          DGENRC: centro.DGENRC,
          NOME: centro.NOME || centro.NOM,
          NOM: centro.NOM,
          DGENRE: centro.DGENRE,
          DOMI: centro.DOMI,
          CPOS: centro.CPOS,
          TEL1: centro.TEL1,
          TFAX: centro.TFAX,
          EMAIL: centro.EMAIL,
          PAGINA: centro.PAGINA
        })

        features.push(feature)
        console.log(`✅ Pin creado para: ${centro.NOM} (${centro.CCEN})`)
      } catch (error) {
        console.error(
          `Error transformando coordenadas del centro ${centro.CCEN}:`,
          error
        )
      }
    })

    console.log(`📍 Pins creados con éxito: ${features.length}`)

    if (features.length === 0) {
      console.warn('⚠️ No se pudieron crear features válidos')
      return
    }

    // Actualizar capa de pines
    if (this.pinsLayer) this.map.removeLayer(this.pinsLayer)

    this.pinsLayer = new VectorLayer({
      source: new VectorSource({ features })
    })

    this.map.addLayer(this.pinsLayer)

    // Ajustar vista
    const vectorSource = this.pinsLayer.getSource()
    if (vectorSource && features.length > 0) {
      try {
        const extent = vectorSource.getExtent()
        if (extent && extent[0] !== Infinity && extent[2] !== -Infinity) {
          let maxZoom = 14
          let padding = [50, 50, 50, 50]

          if (features.length === 1) {
            maxZoom = 17
            padding = [100, 100, 100, 100]
          } else if (features.length === 2) {
            maxZoom = 16
            padding = [80, 80, 80, 80]
          } else if (features.length <= 5) {
            maxZoom = 15
            padding = [60, 60, 60, 60]
          }

          this.map.getView().fit(extent, {
            duration: 600,
            padding: padding,
            maxZoom: maxZoom
          })

          console.log(
            `🗺️ Vista ajustada a ${features.length} centros (zoom máx: ${maxZoom})`
          )
        }
      } catch (error) {
        console.error('Error al ajustar vista:', error)
      }
    }
  }
  
  // ============================================
  // VERIFICACIÓN ADICIONAL: cargarFamiliasTraducidas()
  // ============================================

  private cargarFamiliasTraducidas (intentos: number = 0): void {
    const MAX_INTENTOS = 5

    console.log(
      `🔍 Intentando cargar familias traducidas... (intento ${
        intentos + 1
      }/${MAX_INTENTOS})`
    )
    console.log('🌍 Idioma actual:', this.currentLang)

    this.translate.get('familiasProfesionales').subscribe({
      next: (familias: Record<string, string>) => {
        console.log('📦 Datos recibidos:', familias)
        console.log('🔑 Claves encontradas:', Object.keys(familias))
        console.log('📊 Total de familias:', Object.keys(familias).length)

        // Verificar que las traducciones están cargadas (no son claves)
        const traduccionesNoListas = Object.keys(familias).some(
          clave =>
            familias[clave] === clave ||
            familias[clave] === `familiasProfesionales.${clave}` ||
            !familias[clave] ||
            familias[clave].trim() === ''
        )

        if (traduccionesNoListas) {
          console.warn('⏳ Traducciones no listas, reintentando...')

          if (intentos < MAX_INTENTOS) {
            const delay = 100 * Math.pow(2, intentos)
            setTimeout(() => this.cargarFamiliasTraducidas(intentos + 1), delay)
            return
          } else {
            console.error('❌ Máximo de reintentos alcanzado, usando fallback')
            this.usarFallbackFamilias()
            return
          }
        }

        // ✅ Traducciones válidas, mapear a array
        this.familiasFiltradas = Object.keys(familias)
          .map(key => {
            const valor = familias[key]
            console.log(`  ${key} -> ${valor}`) // Debug detallado
            return valor
          })
          .filter(
            valor =>
              valor &&
              valor.trim() !== '' &&
              !valor.startsWith('familiasProfesionales.')
          )
          .sort()

        console.log(
          '✅ Familias cargadas correctamente:',
          this.familiasFiltradas.length
        )
        console.log('📋 Familias:', this.familiasFiltradas)

        // ✅ FORZAR DETECCIÓN DE CAMBIOS
        setTimeout(() => {
          console.log(
            '🔄 Verificando familias después de timeout:',
            this.familiasFiltradas.slice(0, 3)
          )
        }, 100)
      },
      error: err => {
        console.error('❌ Error cargando familias profesionales:', err)

        if (intentos < MAX_INTENTOS) {
          setTimeout(() => this.cargarFamiliasTraducidas(intentos + 1), 200)
        } else {
          this.usarFallbackFamilias()
        }
      }
    })
  }

  // ✅ NUEVO MÉTODO: Fallback cuando las traducciones fallan
  private usarFallbackFamilias (): void {
    console.log('🔄 Usando familias en español como fallback')

    this.familiasFiltradas = [
      'Actividades Físicas y Deportivas',
      'Administración y Gestión',
      'Agraria',
      'Artes Gráficas',
      'Artes y Artesanías',
      'Comercio y Marketing',
      'Edificación y Obra Civil',
      'Electricidad y Electrónica',
      'Energía y Agua',
      'Fabricación Mecánica',
      'Hostelería y Turismo',
      'Imagen Personal',
      'Imagen y Sonido',
      'Industrias Alimentarias',
      'Informática y Comunicaciones',
      'Instalación y Mantenimiento',
      'Madera, Mueble y Corcho',
      'Marítimo Pesquera',
      'Química',
      'Sanidad',
      'Seguridad y Medio Ambiente',
      'Servicios Socioculturales y a la Comunidad',
      'Textil, Confección y Piel',
      'Transporte y Mantenimiento de Vehículos'
    ].sort()
  }

  // ✅ Método para cuando cambia la FAMILIA
  onChangeFamilia (): void {
    console.log('👨‍💼 Cambio de familia a:', this.familiaSeleccionada)

    if (!this.familiaSeleccionada) {
      // Si se deselecciona la familia (vuelve a "Seleccione...")
      this.gradoSeleccionado = ''
      this.cicloSeleccionado = ''
      this.ciclosFiltrados = []
      this.actualizarMapa('familia')
    } else {
      // Si se selecciona una familia
      this.actualizarCiclosPorFamiliaYGrado()
    }
  }

  // ✅ Método para cuando cambia el GRADO
  onChangeGrado (): void {
    console.log('🎓 Cambio de grado a:', this.gradoSeleccionado)

    if (!this.gradoSeleccionado) {
      // Si se deselecciona el grado (vuelve a "Seleccione...")
      this.cicloSeleccionado = ''
      this.ciclosFiltrados = []

      // Si hay familia seleccionada, mostrar todos sus centros
      if (this.familiaSeleccionada) {
        this.actualizarCiclosPorFamiliaYGrado()
      } else {
        this.actualizarMapa('familia')
      }
    } else {
      // Si se selecciona un grado, actualizar ciclos y mapa
      this.actualizarCiclosPorFamiliaYGrado()
    }
  }

  /**
   * Fallback: busca el código en un mapa estático
   */
  private buscarCodigoEnMapaEstatico (nombreTraducido: string): string {
    const mapaEsDict = this.familiasEsDict || {}

    // Buscar la clave en el diccionario español
    const codigo = Object.keys(mapaEsDict).find(
      key => mapaEsDict[key] === nombreTraducido
    )

    if (codigo) {
      console.log(`✅ Fallback exitoso: "${nombreTraducido}" → "${codigo}"`)
      return codigo
    }

    console.error(`❌ No se encontró código para: "${nombreTraducido}"`)
    return ''
  }

  /**
   * Obtiene el código de familia (IFC, ADG, etc.) a partir del nombre traducido
   */
  private obtenerCodigoFamilia (nombreTraducido: string): string {
    if (!nombreTraducido) return ''

    console.log(`🔍 Buscando código para familia: "${nombreTraducido}"`)

    // Obtener las traducciones actuales
    const familiasDict = this.translate.instant(
      'familiasProfesionales'
    ) as Record<string, string>

    // Buscar la clave cuyo valor coincida con el nombre traducido
    const codigo = Object.keys(familiasDict).find(
      key => familiasDict[key] === nombreTraducido
    )

    if (codigo) {
      console.log(`✅ Código encontrado: "${nombreTraducido}" → "${codigo}"`)
      return codigo
    }

    // Fallback: buscar en el mapa estático
    console.warn(
      `⚠️ No se encontró código, usando fallback para "${nombreTraducido}"`
    )
    return this.buscarCodigoEnMapaEstatico(nombreTraducido)
  }

  // ✅ NUEVO MÉTODO que combina familia + grado para filtrar ciclos
  actualizarCiclosPorFamiliaYGrado (): void {
    this.cerrarPopup()

    if (!this.familiaSeleccionada && !this.gradoSeleccionado) {
      this.ciclosFiltrados = []
      this.cicloSeleccionado = ''
      this.actualizarMapa('familia')
      return
    }

    // ✅ Traducir al español ANTES de filtrar
    const familiaEnEspanol = this.traducirFamiliaAEspanol(
      this.familiaSeleccionada
    )
    const gradoEnEspanol = this.traducirGradoAEspanol(this.gradoSeleccionado)

    this.ciclosFiltrados = ciclosAsignacion.filter(ciclo => {
      let cumpleFamilia = true
      let cumpleGrado = true

      if (this.familiaSeleccionada) {
        const codigoFamilia = this.obtenerCodigoFamilia(
          this.familiaSeleccionada
        )
        cumpleFamilia = ciclo.familiaCodigo === codigoFamilia // ✅ USAR CÓDIGO
      }

      if (gradoEnEspanol) {
        cumpleGrado = ciclo.grado === gradoEnEspanol
      }

      return cumpleFamilia && cumpleGrado
    })

    console.log(
      `📊 Filtrado: Familia="${familiaEnEspanol}", Grado="${gradoEnEspanol}", Ciclos encontrados: ${this.ciclosFiltrados.length}`
    )

    this.actualizarMapa('familia')
    this.cicloSeleccionado = ''
  }

  limpiarFiltros (): void {
    this.cerrarPopup()

    this.provinciaSeleccionada = ''
    this.municipioSeleccionado = ''
    this.tipoCentroSeleccionado = ''
    this.gradoSeleccionado = ''
    this.familiaSeleccionada = ''
    this.cicloSeleccionado = ''
    this.municipios = []
    this.municipioEnabled = false
    this.ciclosFiltrados = []

    this.isPanning = false
    this.panAttempts = 0

    // ✅ RECARGAR TODAS LAS FAMILIAS TRADUCIDAS
    this.cargarTodasLasFamiliasTraducidas()

    this.actualizarMapa()
  }

  /**
   * Limpia los filtros y cierra el modal de advertencia
   */
  limpiarFiltrosDesdeModal (): void {
    this.cerrarModalAdvertencia()
    this.limpiarFiltros()
  }

  resetearVistaCompleta (): void {
    this.limpiarFiltros()
    this.map.getView().fit(this.euskadiExtent, {
      duration: 400,
      padding: [30, 30, 30, 30],
      maxZoom: 9.25
    })
  }

/**
 * ✅ CORRECCIONES CLAVE APLICADAS:
 * 
 * 1. ESTRUCTURA DE URL CORRECTA:
 *    - ESPAÑOL: /es/familias-profesionales/{familia}/ciclos-formativos/{prefijo}{ciclo}.html
 *    - EUSKERA: /eu/lanbide-arloak/{familia}/heziketa-zikloak/{ciclo}{sufijo}.html
 * 
 * 2. PREFIJOS/SUFIJOS SEGÚN GRADO:
 *    - Básico ES: "titulo-profesional-basico-en-"
 *    - Básico EU: "-oinarrizko-profesionala"
 *    - Medio ES: "tecnico-en-"
 *    - Medio EU: "-teknikaria"
 *    - Superior ES: "tecnico-superior-en-"
 *    - Superior EU: "-goi-mailako-teknikaria"
 * 
 * 3. NORMALIZACIÓN DE SLUGS:
 *    - Eliminación de modalidades: (DISTANCIA), (DUAL), (INGLÉS)
 *    - Eliminación de turnos: VESPERTINO, NOCTURNO
 *    - Conversión a minúsculas sin acentos
 * 
 * 4. USO DE slugEuskera:
 *    - Si existe en asignacion.ts, se usa directamente
 *    - Si no existe, se genera desde nomEuskera
 */  

getDCBUrl(ciclo: Asignacion): string {
   const lang = this.currentLang;
 
   // ✅ MAPEO DE FAMILIAS PROFESIONALES (código → slug URL)
   const familiaToSlug: Record<string, { es: string; eu: string }> = {
     'IFC': {
       es: 'informatica-y-comunicaciones-ifc',
       eu: 'informatika-eta-komunikazioak-ifc'
     },
     'COM': {
       es: 'comercio-y-marketing-com',
       eu: 'merkataritza-eta-marketina-com'
     },
     'ADG': {
       es: 'administracion-y-gestion-adg',
       eu: 'administrazioa-eta-kudeaketa-adg'
     },
     'ELE': {
       es: 'electricidad-y-electronica-ele',
       eu: 'elektrizitatea-eta-elektronika-ele'
     },
     'FME': {
       es: 'fabricacion-mecanica-fme',
       eu: 'fabrikazio-mekanikoa-fme'
     },
     'IMA': {
       es: 'instalacion-y-mantenimiento-ima',
       eu: 'instalazioa-eta-mantentze-lanak-ima'
     },
     'TMV': {
       es: 'transporte-y-mantenimiento-de-vehiculos-tmv',
       eu: 'garraioa-eta-ibilgailuen-mantentze-lanak-tmv'
     },
     'HOT': {
       es: 'hosteleria-y-turismo-hot',
       eu: 'ostalaritza-eta-turismoa-hot'
     },
     'IMP': {
       es: 'imagen-personal-imp',
       eu: 'irudi-pertsonala-imp'
     },
     'INA': {
       es: 'industrias-alimentarias-ina',
       eu: 'elikagaien-industriak-ina'
     },
     'MMC': {
       es: 'madera-mueble-y-corcho-mam',
       eu: 'zurgintzaa-altzargintza-eta-kortxoa-mam'
     },
     'MAP': {
       es: 'maritimo-pesquera-map',
       eu: 'itsasoa-eta-arrantza-map'
     },
     'SAN': {
       es: 'sanidad-san',
       eu: 'osasungintzaa-san'
     },
     'SSC': {
       es: 'servicios-socioculturales-y-a-la-comunidad-ssc',
       eu: 'gizarte-eta-kultura-zerbitzuak-ssc'
     },
     'EOC': {
       es: 'edificacion-y-obra-civil-eoc',
       eu: 'eraikuntza-eta-obra-zibila-eoc'
     },
     'ENA': {
       es: 'energia-y-agua-ena',
       eu: 'energia-eta-ura-ena'
     },
     'AAN': {
       es: 'artes-y-artesanias-art',
       eu: 'arteak-eta-artisautza-art'
     },
     'ARG': {
       es: 'artes-graficas-arg',
       eu: 'arte-grafikoak-arg'
     },
     'IMS': {
       es: 'imagen-y-sonido-ims',
       eu: 'irudia-eta-soinua-ims'
     },
     'AFD': {
       es: 'actividades-fisicas-y-deportivas-afd',
       eu: 'jarduera-fisikoak-eta-kirolak-afd'
     },
     'AGA': {
       es: 'agraria-aga',
       eu: 'nekazaritza-aga'
     },
     'QUI': {
       es: 'quimica-qui',
       eu: 'kimika-qui'
     },
     'SEA': {
       es: 'seguridad-y-medio-ambiente-sea',
       eu: 'segurtasuna-eta-ingurumena-sea'
     },
     'TCP': {
       es: 'textil-confeccion-y-piel-tcp',
       eu: 'ehungintza-jantzigintza-eta-larrugintza-tcp'
     }
   };
 
   // Obtener slug de la familia
   const familiaSlug = familiaToSlug[ciclo.familiaCodigo];
   if (!familiaSlug) {
     console.error(`❌ Familia no encontrada: ${ciclo.familiaCodigo}`);
     return '#';
   }
 
   const codigoFamilia = lang === 'eu' ? familiaSlug.eu : familiaSlug.es;
 
   // ✅ FUNCIÓN PARA NORMALIZAR SLUGS (eliminar acentos, espacios, etc.)
   const normalizarSlug = (str: string): string => {
     return str
       .toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
       .replace(/\s+/g, '-') // Espacios a guiones
       .replace(/[,()]/g, '') // Eliminar comas y paréntesis
       .replace(/-+/g, '-') // Múltiples guiones a uno solo
       .replace(/^-|-$/g, ''); // Eliminar guiones al inicio o final
   };
 
   // ✅ MAPEO DE CICLOS BÁSICOS CON URLS ESPECÍFICAS (casos especiales)
   const ciclosBasicosEspeciales: Record<string, { es: string; eu: string }> = {
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
     // Electricidad y Electrónica
     'electricidad-y-electronica': {
       es: 'titulo-profesional-basico-en-electricidad-y-electronica-.html',
       eu: 'elektrizitatea-eta-elektronika-oinarrizko-lanbide-titulua.html'
     },
     'instalazio-elektriko-eta-automatikoen-oinarrizko-profesionala': {
       es: 'titulo-profesional-basico-en-electricidad-y-electronica-.html',
       eu: 'elektrizitatea-eta-elektronika-oinarrizko-lanbide-titulua.html'
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
     // Instalaciones Electrotécnicas y Mecánicas
     'instalaciones-electrotecnicas-y-mecanicas': {
       es: 'titulo-profesional-basico-en-instalaciones-electrotecnicas-y-mecanicas.html',
       eu: 'instalazio-elektroteknikoetako-eta-mekanikako-oinarrizko-profesionala-1.html'
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
     // Electricidad y Electrónica (variante adicional Básico)
     'elektrizitateko-eta-elektronikako': {
       es: 'titulo-profesional-basico-en-electricidad-y-electronica-.html',
       eu: 'elektrizitateko-eta-elektronikako-oinarrizko-profesionala.html'
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
     // Operaciones de Fabricación de Productos Farmacéuticos, Cosméticos y Afines
     'operaciones-de-fabricacion-de-productos-farmaceuticos-cosmeticos-y-afines': {
       es: 'titulo-profesional-basico-en-operaciones-de-fabricacion-de-productos-farmaceuticos-cosmeticos-y-afines.html',
       eu: 'farmaziako-eta-parafarmaziako-teknikaria.html'
     }
   };

   // ✅ MAPEO DE CICLOS GRADO MEDIO CON URLS ESPECÍFICAS (casos especiales)
   const ciclosMedioEspeciales: Record<string, { es: string; eu: string }> = {
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
     // Carpintería y Mueble (antes Ebanistería)
     'ebanisteria': {
       es: 'tecnico-en-carpinteria-y-mueble.html',
       eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
     },
     'carpinteria-y-mueble': {
       es: 'tecnico-en-carpinteria-y-mueble.html',
       eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
     },
     'arotz-eta-altzari-lanetako-oinarrizko-profesionala': {
       es: 'tecnico-en-carpinteria-y-mueble.html',
       eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
     },
     // Actividades Comerciales
     'actividades-comerciales': {
       es: 'tecnico-en-actividades-comerciales-.html',
       eu: 'merkataritza-jardueren-teknikaria.html'
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
     }
   };

   // ✅ MAPEO DE CICLOS GRADO SUPERIOR CON URLS ESPECÍFICAS (casos especiales)
   const ciclosSuperiorEspeciales: Record<string, { es: string; eu: string }> = {
     // Diseño y Amueblamiento (antes Amueblamiento)
     'amueblamiento': {
       es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
       eu: 'diseinua-eta-altzariak-jartzea-goi-mailako-teknikaria.html'
     },
     'diseno-y-amueblamiento': {
       es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
       eu: 'diseinua-eta-altzariak-jartzea-goi-mailako-teknikaria.html'
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
     'organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones': {
       es: 'tecnico-superior-en-organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones.html',
       eu: 'itsasontzi-eta-ontzi-makinen-mantentze-lanen-antolamendua-goi-mailako-teknikaria.html'
     },
     // Laboratorio de Análisis y Control de Calidad
     'laboratorio-de-analisis-y-control-de-calidad': {
       es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
       eu: 'analisirako-eta-kalitate-kontrolerako-laborategia-goi-mailako-teknikaria.html'
     },
     'laboratorio-de-analisis-y-de-control-de-calidad': {
       es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
       eu: 'analisirako-eta-kalitate-kontrolerako-laborategia-goi-mailako-teknikaria.html'
     },
     // Dietética (LOGSE)
     'dietetica': {
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
     'dietetikako': {
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
     // Sistemas Electrotécnicos y Automatizados
     'sistemas-electrotecnicos-y-automatizados': {
       es: 'tecnico-superior-en-sistemas-electrotecnicos-y-automatizados.html',
       eu: 'sistema-elektrotekniko-eta-automatizatuetako-goi-mailako-teknikaria.html'
     },
     'sistema-elektroteknikoak-eta-automatizatuetako': {
       es: 'tecnico-superior-en-sistemas-electrotecnicos-y-automatizados.html',
       eu: 'sistema-elektrotekniko-eta-automatizatuetako-goi-mailako-teknikaria.html'
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
     // Proyectos de Edificación
     'proyectos-de-edificacion': {
       es: 'tecnico-superior-en-proyectos-de-edificacion.html',
       eu: 'eraikuntza-proiektuetako-goi-mailako-teknikaria.html'
     },
     'eraikuntza-proiektuen': {
       es: 'tecnico-superior-en-proyectos-de-edificacion.html',
       eu: 'eraikuntza-proiektuetako-goi-mailako-teknikaria.html'
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
     'ebanisteriako': {
       es: 'tecnico-en-carpinteria-y-mueble.html',
       eu: 'arotzeriako-eta-altzarigintzako-teknikaria.html'
     },
     // Amueblamiento (Grado Superior - ya existe como Diseño y Amueblamiento)
     'altzarigintzako': {
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
     // Vitivinicultura
     'vitivinicultura': {
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
     // Diseño y Gestión de la Producción de Madera y Mueble
     'diseno-y-gestion-de-la-produccion-de-madera-y-mueble': {
       es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
       eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
     },
     'zura-eta-altzarien-ekoizpenaren-diseinua-eta-kudeaketa': {
       es: 'tecnico-superior-en-diseno-y-amueblamiento.html',
       eu: 'diseinuko-eta-altzari-hornikuntzako-goi-mailako-teknikaria.html'
     },
     // Organización del Mantenimiento de Maquinaria de Buques (variante adicional)
     'ontzi-eta-itsasontzien-makinen-mantentze-lanen-antolaketako': {
       es: 'tecnico-superior-en-organizacion-del-mantenimiento-de-maquinaria-de-buques-y-embarcaciones.html',
       eu: 'ontzi-eta-itsasontzien-makineria-zainketa-antolatzeko-goi-mailako-teknikaria.html'
     },
     // Laboratorio de Análisis y Control de Calidad (variante adicional)
     'analisiaren-eta-kalitate-kontrolaren-laborategiko': {
       es: 'tecnico-superior-en-laboratorio-de-analisis-y-de-control-de-calidad.html',
       eu: 'analisirako-eta-kalitate-kontrolerako-laborategia-goi-mailako-teknikaria.html'
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
     'hegazkinen-sistema-elektroniko-eta-avionikoen-mantentze-lanetako-goi-mailako': {
       es: 'tecnico-superior-en-mantenimiento-de-sistemas-electronicos-y-avionicos-de-aeronaves.html',
       eu: 'aireontzien-sistema-elektronikoak-eta-abionikoak-mantentzeko-goi-mailako-teknikaria.html'
     }
   };
 
   // ✅ OBTENER SLUG DEL CICLO
   let slugCiclo: string;
   let urlFinal: string;
 
   if (lang === 'eu' && ciclo.slugEuskera) {
     // Si existe slugEuskera, usarlo directamente
     slugCiclo = ciclo.slugEuskera;
   } else {
     // Generar slug desde el nombre
     const nombreCiclo = lang === 'eu' ? ciclo.nomEuskera : ciclo.nom;
     
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
       .trim();
 
     slugCiclo = normalizarSlug(nombreNormalizado);
   }
 
   // ✅ CONSTRUIR URL SEGÚN GRADO Y IDIOMA
   const rutaBase = lang === 'eu' ? 'lanbide-arloak' : 'familias-profesionales';
   const subruta = lang === 'eu' ? 'heziketa-zikloak' : 'ciclos-formativos';
 
   // ✅ VERIFICAR SI ES UN CICLO BÁSICO ESPECIAL
   if (ciclo.grado === 'Básico' && ciclosBasicosEspeciales[slugCiclo]) {
     const urlEspecifica = ciclosBasicosEspeciales[slugCiclo];
     urlFinal = lang === 'eu' ? urlEspecifica.eu : urlEspecifica.es;
     return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`;
   }

   // ✅ VERIFICAR SI ES UN CICLO GRADO MEDIO ESPECIAL
   if (ciclo.grado === 'Medio' && ciclosMedioEspeciales[slugCiclo]) {
     const urlEspecifica = ciclosMedioEspeciales[slugCiclo];
     urlFinal = lang === 'eu' ? urlEspecifica.eu : urlEspecifica.es;
     return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`;
   }

   // ✅ VERIFICAR SI ES UN CICLO GRADO SUPERIOR ESPECIAL
   if (ciclo.grado === 'Superior' && ciclosSuperiorEspeciales[slugCiclo]) {
     const urlEspecifica = ciclosSuperiorEspeciales[slugCiclo];
     urlFinal = lang === 'eu' ? urlEspecifica.eu : urlEspecifica.es;
     return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`;
   }
 
   // ✅ CASOS NORMALES (sin excepciones)
   if (lang === 'eu') {
     // EUSKERA
     if (ciclo.grado === 'Básico') {
       urlFinal = `${slugCiclo}-oinarrizko-profesionala.html`;
     } else if (ciclo.grado === 'Medio') {
       urlFinal = `${slugCiclo}-teknikaria.html`;
     } else if (ciclo.grado === 'Superior') {
       urlFinal = `${slugCiclo}-goi-mailako-teknikaria.html`;
     } else {
       urlFinal = `${slugCiclo}.html`;
     }
   } else {
     // ESPAÑOL
     let prefijo = '';
     if (ciclo.grado === 'Básico') {
       prefijo = 'titulo-profesional-basico-en-';
     } else if (ciclo.grado === 'Medio') {
       prefijo = 'tecnico-en-';
     } else if (ciclo.grado === 'Superior') {
       prefijo = 'tecnico-superior-en-';
     }
     urlFinal = `${prefijo}${slugCiclo}.html`;
   }
 
   return `https://ivac-eei.eus/${lang}/${rutaBase}/${codigoFamilia}/${subruta}/${urlFinal}`;
 }

  /**
   * Convierte un nombre de familia del idioma actual a español
   * VERSIÓN CORREGIDA - Maneja correctamente las traducciones
   */
  private traducirFamiliaAEspanol (familiaTraducida: string): string {
    if (!familiaTraducida) return ''

    console.log(
      `🔄 Traduciendo familia: "${familiaTraducida}" (idioma actual: ${this.currentLang})`
    )

    // Si ya está en español, devolverla directamente
    const familiasEnEspanol = [
      'Actividades Físicas y Deportivas',
      'Administración y Gestión',
      'Agraria',
      'Artes Gráficas',
      'Artes y Artesanías',
      'Comercio y Marketing',
      'Edificación y Obra Civil',
      'Electricidad y Electrónica',
      'Energía y Agua',
      'Fabricación Mecánica',
      'Hostelería y Turismo',
      'Imagen Personal',
      'Imagen y Sonido',
      'Industrias Alimentarias',
      'Informática y Comunicaciones',
      'Instalación y Mantenimiento',
      'Madera, Mueble y Corcho',
      'Marítimo Pesquera',
      'Química',
      'Sanidad',
      'Seguridad y Medio Ambiente',
      'Servicios Socioculturales y a la Comunidad',
      'Textil, Confección y Piel',
      'Transporte y Mantenimiento de Vehículos',
      'Vidrio y Cerámica'
    ]

    if (familiasEnEspanol.includes(familiaTraducida)) {
      console.log(`✅ Ya está en español: "${familiaTraducida}"`)
      return familiaTraducida
    }

    // Obtener traducciones actuales y españolas
    const familiaActualDict = this.translate.instant(
      'familiasProfesionales'
    ) as Record<string, string>
    const familiasEsDict = this.translate.instant(
      //He quitado un parámetro {}
      'familiasProfesionales',
      'es'
    ) as Record<string, string>

    console.log(
      '📚 Diccionario actual:',
      Object.keys(familiaActualDict).slice(0, 3)
    )
    console.log(
      '📚 Diccionario español:',
      Object.keys(familiasEsDict).slice(0, 3)
    )

    // ✅ VERIFICAR que las traducciones estén cargadas
    const traduccionesNoListas = Object.keys(familiaActualDict).some(
      key =>
        familiaActualDict[key] === key ||
        familiaActualDict[key].startsWith('familiasProfesionales.')
    )

    if (traduccionesNoListas) {
      console.warn('⚠️ Traducciones no listas, usando fallback')
      // Fallback: buscar directamente en asignacion.ts
      return this.buscarFamiliaEnAsignacion(familiaTraducida)
    }

    // Buscar la clave correspondiente a la familia traducida
    const claveSeleccionada = Object.keys(familiaActualDict).find(key => {
      const valorActual = familiaActualDict[key]
      const coincide = valorActual === familiaTraducida

      if (coincide) {
        console.log(`🔑 Clave encontrada: "${key}" para "${familiaTraducida}"`)
      }

      return coincide
    })

    // Si encontramos la clave, devolver el nombre en español
    if (claveSeleccionada && familiasEsDict[claveSeleccionada]) {
      const nombreEspanol = familiasEsDict[claveSeleccionada]
      console.log(
        `✅ Traducción exitosa: "${familiaTraducida}" → "${nombreEspanol}"`
      )
      return nombreEspanol
    }

    // Fallback final
    console.warn(
      `⚠️ No se encontró traducción para "${familiaTraducida}", usando fallback`
    )
    return this.buscarFamiliaEnAsignacion(familiaTraducida)
  }

  /**
   * Busca el nombre de familia en español directamente en asignacion.ts
   * Método fallback cuando las traducciones no están listas
   */
  private buscarFamiliaEnAsignacion (nombreTraducido: string): string {
    // Crear mapa de traducciones euskera -> español desde asignacion.ts
    const mapaEuskeraEspanol: Record<string, string> = {
      'Jarduera Fisiko eta Kirolak': 'Actividades Físicas y Deportivas',
      'Administrazioa eta Kudeaketa': 'Administración y Gestión',
      Nekazaritza: 'Agraria',
      'Arte Grafikoak': 'Artes Gráficas',
      'Arteak eta Artisautza': 'Artes y Artesanías',
      'Merkataritza eta Marketina': 'Comercio y Marketing',
      'Eraikuntza eta Obra Zibila': 'Edificación y Obra Civil',
      'Elektrizitatea eta Elektronika': 'Electricidad y Electrónica',
      'Energia eta Ura': 'Energía y Agua',
      'Fabrikazio Mekanikoa': 'Fabricación Mecánica',
      'Ostalaritza eta Turismoa': 'Hostelería y Turismo',
      'Irudi Pertsonala': 'Imagen Personal',
      'Irudia eta Soinua': 'Imagen y Sonido',
      'Elikagaien Industriak': 'Industrias Alimentarias',
      'Informatika eta Komunikazioak': 'Informática y Comunicaciones',
      'Instalazioa eta Mantentze Lanak': 'Instalación y Mantenimiento',
      'Zurgintzaa, Altzargintza eta Kortxoa': 'Madera, Mueble y Corcho',
      'Itsasoa eta Arrantza': 'Marítimo Pesquera',
      Kimika: 'Química',
      Osasungintzaa: 'Sanidad',
      'Segurtasuna eta Ingurumena': 'Seguridad y Medio Ambiente',
      'Gizarte eta Kultura Zerbitzuak':
        'Servicios Socioculturales y a la Comunidad',
      'Ehungintza, Jantzigintza eta Larrugintza': 'Textil, Confección y Piel',
      'Garraioa eta Ibilgailuen Mantentze Lanak':
        'Transporte y Mantenimiento de Vehículos',
      'Beira eta Zeramika': 'Vidrio y Cerámica'
    }

    const familiaEspanol = mapaEuskeraEspanol[nombreTraducido]

    if (familiaEspanol) {
      console.log(
        `✅ Fallback exitoso: "${nombreTraducido}" → "${familiaEspanol}"`
      )
      return familiaEspanol
    }

    // Si tampoco está en el mapa, devolver el original (probablemente ya esté en español)
    console.warn(
      `⚠️ Familia no encontrada en mapa fallback: "${nombreTraducido}"`
    )
    return nombreTraducido
  }

  /**
   * Convierte un nombre de grado del idioma actual a español
   * VERSIÓN MEJORADA con logs
   */
  private traducirGradoAEspanol (gradoTraducido: string): string {
    if (!gradoTraducido) return ''

    console.log(`🎓 Traduciendo grado: "${gradoTraducido}"`)

    // Mapeo de traducciones a valores en español (los de asignacion.ts)
    const mapeoGrados: Record<string, string> = {
      // Español
      'Formación Profesional Básica': 'Básico',
      'Grado Medio': 'Medio',
      'Grado Superior': 'Superior',
      // Euskera
      'Oinarrizko Lanbide Heziketa': 'Básico',
      'Erdi Maila': 'Medio',
      'Goi Maila': 'Superior'
    }

    // Si ya está en el formato correcto (Básico/Medio/Superior), devolverlo
    if (['Básico', 'Medio', 'Superior'].includes(gradoTraducido)) {
      console.log(`✅ Grado ya en formato correcto: "${gradoTraducido}"`)
      return gradoTraducido
    }

    // Buscar en el mapeo
    const gradoEspanol = mapeoGrados[gradoTraducido] || gradoTraducido
    console.log(`✅ Grado traducido: "${gradoTraducido}" → "${gradoEspanol}"`)

    return gradoEspanol
  }
}
