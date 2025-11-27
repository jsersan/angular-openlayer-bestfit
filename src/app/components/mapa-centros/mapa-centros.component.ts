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
  private isPanning = false  // Bandera para prevenir múltiples panes simultáneos
  private panAttempts = 0  // Contador para prevenir bucles
  private readonly MAX_PAN_ATTEMPTS = 1  // Máximo 1 intento de pan por clic
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
    { value: 'Básico', label: 'Formación Profesional Básica' },
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

tipoCentroLabels: Record<string, string> = {
  CIFP: 'Centro Integrado de Formación Profesional',
  CIFPD: 'Centro Integrado de FP a Distancia',
  CPES: 'Centro Privado de Educación Secundaria',
  CPEPS: 'Centro Privado de Educación Infantil, Primaria y Secundaria',
  CPFPB: 'Centro Privado de Formación Profesional Básica',
  CPEIPS: 'Centro Privado de Educación Infantil, Primaria y Secundaria', // AÑADIDO
  CPIFP: 'Centro Público Integrado de Formación Profesional',              // AÑADIDO
  IES: 'Instituto de Educación Secundaria',
  IMFPB: 'Instituto Municipal de Formación Profesional Básica',
  'IMFPB ': 'Instituto de Formación Profesional de Nivel Medio y Básico'  // AÑADIDO (variante)
}

// Busca la propiedad tipoCentroIcono (alrededor de la línea 116) y añade los iconos:

tipoCentroIcono: Record<string, string> = {
  CIFP: 'assets/images/marker-cifp.png',
  CPEPS: 'assets/images/marker-cpeips.png',
  CPES: 'assets/images/marker-cpes.png',
  CPFPB: 'assets/images/marker-cpfpb.png',
  CPEIPS: 'assets/images/marker-cpeips.png',    // AÑADIDO (usa el mismo que CPEPS)
  CPIFP: 'assets/images/marker-cpifp.png',      // AÑADIDO (nuevo icono o usa marker-cifp.png)
  IES: 'assets/images/marker-ies.png',
  IMFPB: 'assets/images/marker-imfpb.png',
  'IMFPB ': 'assets/images/marker-imfpb.png'    // AÑADIDO (variante, mismo icono)
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

  constructor (private snackBar: MatSnackBar) {}

  ngOnInit (): void {
    proj4.defs(
      'EPSG:25830',
      '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    )
    register(proj4)
    this.cargarListas()
  }

  ngAfterViewInit (): void {
    this.inicializarMapa()
  }

// 5️⃣ ACTUALIZAR métodos de limpieza:

// En mapa-centros.component.ts

// 1️⃣ MODIFICAR el método irAInicio():
irAInicio(): void {
  this.popupVisible = false
  this.selectedCentro = null
  this.centroSeleccionado = null
  this.isPanning = false
  this.panAttempts = 0
  // ❌ ELIMINAR: this.limpiarFiltros()
  // ✅ Solo cerrar el popup, NO limpiar filtros ni hacer zoom
}

onSelectCentro(centro: any, pixel: number[]): void {
  if (this.isPanning) {
    console.log('⚠️ Pan en progreso, ignorando clic')
    return
  }

  this.panAttempts = 0
  this.selectedCentro = centro
  this.centroSeleccionado = centro
  this.cargarCiclosCentro(centro.CCEN)
  this.tabActiva = 'contacto'
  
  this.mostrarPopupSeguro(pixel)
}

mostrarPopupSeguro(pixel: number[]): void {
  const popupWidth = 420
  const popupHeight = 600
  const minMargin = 50  // Margen mínimo desde los bordes

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
  if ((!tieneEspacioHorizontal || !tieneEspacioVertical) && 
      this.panAttempts < this.MAX_PAN_ATTEMPTS) {
    
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
      currentCenter[0] + (deltaPixelX * resolution),
      currentCenter[1] - (deltaPixelY * resolution)  // Y invertida en OpenLayers
    ]

    console.log(`🎯 Moviendo pin al centro: deltaX=${deltaPixelX.toFixed(0)}px, deltaY=${deltaPixelY.toFixed(0)}px`)

    // Animar hacia el nuevo centro
    this.map.getView().animate(
      { center: newCenter, duration: 350 },
      () => {
        console.log('✅ Pin centrado')
        this.isPanning = false

        // Obtener nueva posición del pin (debería estar en el centro)
        const newPixel = this.map.getPixelFromCoordinate(pinCoord)
        if (newPixel) {
          this.mostrarPopupEnPosicion(newPixel)
        }
      }
    )

    return
  }

  // Hay espacio suficiente, mostrar directamente
  this.mostrarPopupEnPosicion(pixel)
}

private mostrarPopupEnPosicion(pixel: number[]): void {
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
  
  console.log(`✅ Popup mostrado en (${finalX.toFixed(0)}, ${finalY.toFixed(0)})`)
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

  cerrarPopup(): void {
    this.popupVisible = false
    this.tooltipVisible = false
    this.isPanning = false
    this.panAttempts = 0
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

  cargarCiclosCentro (ccen: number): void {
    if (!ccen) {
      this.ciclosCentro = { basicos: [], medios: [], superiores: [] }
      this.familiasCentro = []
      return
    }

    const ciclosDelCentro = ciclosAsignacion.filter(ciclo =>
      ciclo.centros.includes(ccen)
    )

    this.ciclosCentro = {
      basicos: ciclosDelCentro.filter(c => c.grado === 'Básico'),
      medios: ciclosDelCentro.filter(c => c.grado === 'Medio'),
      superiores: ciclosDelCentro.filter(c => c.grado === 'Superior')
    }

    const familiasSet = new Set(ciclosDelCentro.map(c => c.familia))
    this.familiasCentro = Array.from(familiasSet).sort()
  }

  cargarListas(): void {
    this.provincias = Array.from(new Set(institutos.map(c => c.DTERRC))).sort()
  
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
  
    // ✨ AÑADIR tipos adicionales manualmente (aparecerán aunque no haya centros)
    tiposConFP.add('CPEIPS')
    tiposConFP.add('CPIFP')
    // No añadas 'IMFPB ' con espacio, usa solo 'IMFPB'
  
    const tiposUnicos = Array.from(tiposConFP).sort()
  
    this.tiposCentro = tiposUnicos.map(codigo => ({
      value: codigo,
      label: this.tipoCentroLabels[codigo] || codigo
    }))
  
    console.log('📌 Tipos en combo:', this.tiposCentro)
  
    this.ciclosFiltrados = []
    this.familiasFiltradas = [...familiasProfesionales]
  }

  resetearCompleto(): void {
    this.limpiarFiltros()
    this.map.getView().fit(this.euskadiExtent, {
      duration: 400,
      padding: [30, 30, 30, 30],
      maxZoom: 9.25
    })
  }// En mapa-centros.component.ts

  inicializarMapa(): void {
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
  
    this.map.on('singleclick', evt => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, f => f as any)
      if (feature) {
        const props = feature.getProperties()
        if (!props || !props.CCEN) return
        this.onSelectCentro(props, evt.pixel)
      } else {
        // ✅ Solo cerrar popup, sin alterar el zoom
        this.cerrarPopup()
      }
    })
  
    this.pinsLayer = new VectorLayer({
      source: new VectorSource({ features: [] })
    })
  
    this.map.addLayer(this.pinsLayer)
  }

  onMapMouseMove (event: Event) {
    if (!this.map || this.popupVisible) return
    const mouseEvt = event as MouseEvent
    const bbox = (
      this.map.getTargetElement() as HTMLElement
    ).getBoundingClientRect()
    const pixel = [mouseEvt.clientX - bbox.left, mouseEvt.clientY - bbox.top]
    const feature = this.map.forEachFeatureAtPixel(
      pixel,
      f => f as Feature<any>
    )

    if (feature) {
      this.tooltipVisible = true
      const props = feature.getProperties()
      this.tooltipContent = props['tooltipNombre'] || props['name'] || 'Centro'

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
    } else {
      this.tooltipVisible = false
    }
  }

  actualizarMunicipios (): void {
    this.cerrarPopup()

    if (this.provinciaSeleccionada) {
      // Obtener todos los CCENs que tienen ciclos de FP
      const centrosConCiclos = new Set<number>()
      ciclosAsignacion.forEach(ciclo => {
        ciclo.centros.forEach(ccen => centrosConCiclos.add(ccen))
      })

      const municipiosSet = new Set<string>()
      institutos
        .filter(c => {
          // Filtrar por provincia
          if (c.DTERRC !== this.provinciaSeleccionada) return false

          // Verificar que el centro tenga ciclos de FP
          if (!centrosConCiclos.has(c.CCEN)) return false

          // Filtrar por tipo de centro si está seleccionado
          if (this.tipoCentroSeleccionado) {
            if (this.tipoCentroSeleccionado === 'CIFP') {
              if (c.DGENRC !== 'CIFP' && c.DGENRC !== 'CIFPD') return false
            } else {
              if (c.DGENRC !== this.tipoCentroSeleccionado) return false
            }
          }
          return true
        })
        .forEach(c => municipiosSet.add(c.DMUNIC))

      this.municipios = Array.from(municipiosSet).sort()
      this.municipioEnabled = true
    } else {
      this.municipios = []
      this.municipioSeleccionado = ''
      this.municipioEnabled = false
    }

    this.actualizarMapa('provincia')
  }

  actualizarFamilias (): void {
    this.cerrarPopup()
    this.actualizarMapa('municipio')
  }

  actualizarFamiliasPorGrado (): void {
    this.cerrarPopup()

    if (this.gradoSeleccionado) {
      const ciclosPorGrado = ciclosAsignacion.filter(ciclo => {
        return ciclo.grado === this.gradoSeleccionado
      })

      const familiasSet = new Set(ciclosPorGrado.map(c => c.familia))
      this.familiasFiltradas = Array.from(familiasSet).sort()

      if (
        this.familiaSeleccionada &&
        !this.familiasFiltradas.includes(this.familiaSeleccionada)
      ) {
        this.familiaSeleccionada = ''
        this.cicloSeleccionado = ''
        this.ciclosFiltrados = []
      } else if (this.familiaSeleccionada) {
        this.actualizarCiclos()
      }
    } else {
      this.familiasFiltradas = [...familiasProfesionales]
      if (this.familiaSeleccionada) {
        this.actualizarCiclos()
      }
    }

    this.actualizarMapa('grado')
  }

  actualizarCiclos (): void {
    this.cerrarPopup()

    if (this.familiaSeleccionada) {
      this.ciclosFiltrados = ciclosAsignacion.filter(ciclo => {
        let coincide = ciclo.familia === this.familiaSeleccionada

        if (this.gradoSeleccionado) {
          coincide = coincide && ciclo.grado === this.gradoSeleccionado
        }

        return coincide
      })
    } else {
      this.ciclosFiltrados = []
    }
    this.cicloSeleccionado = ''
    this.actualizarMapa('familia')
  }

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

    const hayFiltros = !!(
      this.provinciaSeleccionada ||
      this.municipioSeleccionado ||
      this.tipoCentroSeleccionado ||
      this.gradoSeleccionado ||
      this.cicloSeleccionado ||
      this.familiaSeleccionada
    )

    if (!hayFiltros) {
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

    if (this.gradoSeleccionado) {
      ciclosRelevantes = ciclosRelevantes.filter(
        c => c.grado === this.gradoSeleccionado
      )
    }

    if (this.familiaSeleccionada) {
      ciclosRelevantes = ciclosRelevantes.filter(
        c => c.familia === this.familiaSeleccionada
      )
    }

    if (this.cicloSeleccionado) {
      const cicloEspecifico = ciclosAsignacion.find(
        c => c.codcicl === Number(this.cicloSeleccionado)
      )

      if (cicloEspecifico) {
        if (
          this.gradoSeleccionado &&
          cicloEspecifico.grado !== this.gradoSeleccionado
        ) {
          this.snackBar.open(
            `El ciclo "${cicloEspecifico.nom}" es de ${cicloEspecifico.grado}, no de ${this.gradoSeleccionado}`,
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
        }
      } else {
        ciclosRelevantes = []
      }
    }

    const centrosValidos = new Set<number>()
    ciclosRelevantes.forEach(ciclo => {
      ciclo.centros.forEach(ccen => centrosValidos.add(ccen))
    })

    const centrosFiltrados = institutos.filter(centro => {
      if (
        this.provinciaSeleccionada &&
        centro.DTERRC !== this.provinciaSeleccionada
      ) {
        return false
      }

      if (
        this.municipioSeleccionado &&
        normaliza(centro.DMUNIC) !== normaliza(this.municipioSeleccionado)
      ) {
        return false
      }

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

      if (centrosValidos.size > 0 && !centrosValidos.has(centro.CCEN)) {
        return false
      }

      return true
    })

    console.log(
      '📍 Centros a pintar:',
      centrosFiltrados.map(c => ({
        codigo: c.CCEN,
        nombre: c.NOM,
        municipio: c.DMUNIC
      }))
    )
    console.log('Filtros activos:', {
      provincia: this.provinciaSeleccionada || 'Todas',
      municipio: this.municipioSeleccionado || 'Todos',
      tipo: this.tipoCentroSeleccionado || 'Todos',
      grado: this.gradoSeleccionado || 'Todos',
      familia: this.familiaSeleccionada || 'Todas',
      ciclo: this.cicloSeleccionado || 'Todos'
    })

    if (centrosFiltrados.length === 0) {
      this.centrosMostradosAnteriores.clear()
      if (this.pinsLayer) this.map.removeLayer(this.pinsLayer)
      this.pinsLayer = new VectorLayer({
        source: new VectorSource({ features: [] })
      })
      this.map.addLayer(this.pinsLayer)

      // Construir mensaje personalizado según filtros activos
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

    const centrosMostradosActuales = new Set(centrosFiltrados.map(c => c.CCEN))
    const noHayCambios =
      this.centrosMostradosAnteriores.size === centrosMostradosActuales.size &&
      Array.from(centrosMostradosActuales).every(ccen =>
        this.centrosMostradosAnteriores.has(ccen)
      )

    if (noHayCambios && origen !== 'ciclo') {
      return
    }

    this.centrosMostradosAnteriores = centrosMostradosActuales

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
        } ${centro.DGENRE || ''}`.trim()

        feature.setProperties({
          CCEN: centro.CCEN,
          name: centro.NOM || 'Sin nombre',
          tooltipNombre: tooltipNombre,
          DTERRC: centro.DTERRC,
          DMUNIC: centro.DMUNIC,
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
      } catch (error) {
        console.error(
          `Error transformando coordenadas del centro ${centro.CCEN}:`,
          error
        )
      }
    })

    // ✅ OPCIONAL: Confirmar cuántos pins se crearon realmente
    console.log(`✅ Pins creados con éxito: ${features.length}`)

    if (features.length === 0) {
      console.warn('No se pudieron crear features válidos')
      this.snackBar.open(
        'Los centros encontrados no tienen coordenadas válidas',
        'Cerrar',
        {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        }
      )
      return
    }

    if (this.pinsLayer) this.map.removeLayer(this.pinsLayer)

    this.pinsLayer = new VectorLayer({
      source: new VectorSource({ features })
    })

    this.map.addLayer(this.pinsLayer)

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
        }
      } catch (error) {
        console.error('Error al ajustar vista:', error)
      }
    }
  }
  limpiarFiltros(): void {
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
    this.familiasFiltradas = [...this.familiasProfesionales]
    
    this.isPanning = false
    this.panAttempts = 0
    
    this.actualizarMapa()
  }

  /**
   * Limpia los filtros y cierra el modal de advertencia
   */
  limpiarFiltrosDesdeModal (): void {
    this.cerrarModalAdvertencia()
    this.limpiarFiltros()
  }

  /**
   * Genera la URL del DCB en el portal IVAC-EEI
   * Estructura: https://ivac-eei.eus/es/familias-profesionales/{familia}/{prefijo}{ciclo}.html
   */
  getDCBUrl (ciclo: Asignacion): string {
    // Normalizar nombre del ciclo (eliminar sufijos especiales)
    const normalizarNombre = (nombre: string): string => {
      return nombre
        .replace(/\s*\(DISTANCIA\)\s*/gi, '')
        .replace(/\s*DISTANCIA\s*/gi, '')
        .replace(/\s*\(INGLÉS\)\s*/gi, '')
        .replace(/\s*INGLÉS\s*/gi, '')
        .replace(/\s*\(DUAL\)\s*/gi, '')
        .replace(/\s*DUAL\s*/gi, '')
        .replace(/\s*NOCTURNO\s*/gi, '')
        .replace(/\s*VESPERTINO\s*/gi, '')
        .trim()
        .toUpperCase()
    }

    // Mapeo COMPLETO de ciclos con sus URLs exactas del portal IVAC-EEI
    const urlsExactas: Record<string, { familia: string; slug: string }> = {
      // AGRARIA
      'JARDINERÍA Y FLORISTERÍA': {
        familia: 'agraria-aga',
        slug: 'tecnico-en-jardineria-y-floristeria-.html'
      },

      // HOSTELERÍA Y TURISMO
      'GESTIÓN DE ALOJAMIENTOS TURÍSTICOS': {
        familia: 'hosteleria-y-turismo-hot',
        slug: 'tecnico-superior-en-gestion-de-alojamientos-turisticos.html'
      },

      // ELECTRICIDAD Y ELECTRÓNICA
      'INSTALACIONES ELÉCTRICAS Y AUTOMÁTICAS': {
        familia: 'electricidad-y-electronica-ele',
        slug: 'tecnico-en-instalaciones-electricas-y-automaticas-.html'
      },
      'INSTALACIONES DE TELECOMUNICACIONES': {
        familia: 'electricidad-y-electronica-ele',
        slug: 'tecnico-en-instalaciones-de-telecomunicaciones-.html'
      },
      'AUTOMATIZACIÓN Y ROBÓTICA INDUSTRIAL': {
        familia: 'electricidad-y-electronica-ele',
        slug: 'tecnico-superior-en-automatizacion-y-robotica-industrial.html'
      },

      // COMERCIO Y MARKETING
      'ACTIVIDADES COMERCIALES': {
        familia: 'comercio-y-marketing-com',
        slug: 'tecnico-en-actividades-comerciales-.html'
      },
      'COMERCIO INTERNACIONAL': {
        familia: 'comercio-y-marketing-com',
        slug: 'tecnico-superior-en-comercio-internacional.html'
      },
      // IMPORTANTE: Transporte y Logística está en Comercio y Marketing, no en Transporte
      'TRANSPORTE Y LOGÍSTICA': {
        familia: 'comercio-y-marketing-com',
        slug: 'tecnico-superior-en-transporte-y-logistica-.html'
      },

      // ADMINISTRACIÓN Y GESTIÓN
      'GESTIÓN ADMINISTRATIVA': {
        familia: 'administracion-y-gestion-adg',
        slug: 'tecnico-en-gestion-administrativa.html'
      },
      'ADMINISTRACIÓN Y FINANZAS': {
        familia: 'administracion-y-gestion-adg',
        slug: 'tecnico-superior-en-administracion-y-finanzas.html'
      },

      // INFORMÁTICA Y COMUNICACIONES
      'DESARROLLO DE APLICACIONES MULTIPLATAFORMA': {
        familia: 'informatica-y-comunicaciones-ifc',
        slug: 'tecnico-superior-en-desarrollo-de-aplicaciones-multiplataforma-.html'
      },
      'DESARROLLO DE APLICACIONES WEB': {
        familia: 'informatica-y-comunicaciones-ifc',
        slug: 'tecnico-superior-en-desarrollo-de-aplicaciones-web.html'
      },
      'SISTEMAS MICROINFORMÁTICOS Y REDES': {
        familia: 'informatica-y-comunicaciones-ifc',
        slug: 'tecnico-en-sistemas-microinformaticos-y-redes.html'
      },
      'ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS EN RED': {
        familia: 'informatica-y-comunicaciones-ifc',
        slug: 'tecnico-superior-en-administracion-de-sistemas-informaticos-en-red.html'
      },

      // FABRICACIÓN MECÁNICA
      'PROGRAMACIÓN DE LA PRODUCCIÓN EN FABRICACIÓN MECÁNICA': {
        familia: 'fabricacion-mecanica-fme',
        slug: 'tecnico-superior-en-programacion-de-la-produccion-en-fabricacion-mecanica.html'
      },

      // SANIDAD
      'CUIDADOS AUXILIARES DE ENFERMERÍA': {
        familia: 'sanidad-san',
        slug: 'tecnico-en-cuidados-auxiliares-de-enfermeria-logse.html'
      },
      'HIGIENE BUCODENTAL': {
        familia: 'sanidad-san',
        slug: 'tecnico-superior-en-higiene-bucodental-1.html'
      },

      // SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD
      'ANIMACIÓN SOCIOCULTURAL Y TURÍSTICA': {
        familia: 'servicios-socioculturales-y-a-la-comunidad-ssc',
        slug: 'tecnico-superior-animacion-sociocultural-y-turistica.html'
      },

      // MARÍTIMO PESQUERA
      'NAVEGACIÓN Y PESCA DE LITORAL': {
        familia: 'maritimo-pesquera-map',
        slug: 'tecnico-en-navegacion-y-pesca-de-litoral.html'
      },

      // SEGURIDAD Y MEDIO AMBIENTE
      'EMERGENCIA Y PROTECCIÓN CIVIL': {
        familia: 'seguridad-y-medio-ambiente-sea',
        slug: 'tecnico-en-emergencias-y-proteccion-civil.html'
      },
      'EMERGENCIAS Y PROTECCIÓN CIVIL': {
        familia: 'seguridad-y-medio-ambiente-sea',
        slug: 'tecnico-en-emergencias-y-proteccion-civil.html'
      }
    }

    // Mapeo de familia profesional a código (para ciclos no mapeados)
    const familiaToCode: Record<string, string> = {
      'Administración y Gestión': 'administracion-y-gestion-adg',
      'Actividades Físicas y Deportivas':
        'actividades-fisicas-y-deportivas-afd',
      Agraria: 'agraria-aga',
      'Artes Gráficas': 'artes-graficas-arg',
      'Artes y Artesanías': 'artes-y-artesanias-art',
      'Comercio y Marketing': 'comercio-y-marketing-com',
      'Edificación y Obra Civil': 'edificacion-y-obra-civil-eoc',
      'Electricidad y Electrónica': 'electricidad-y-electronica-ele',
      'Energía y Agua': 'energia-y-agua-ena',
      'Fabricación Mecánica': 'fabricacion-mecanica-fme',
      'Hostelería y Turismo': 'hosteleria-y-turismo-hot',
      'Imagen Personal': 'imagen-personal-imp',
      'Imagen y Sonido': 'imagen-y-sonido-ims',
      'Industrias Alimentarias': 'industrias-alimentarias-ina',
      'Industrias Extractivas': 'industrias-extractivas-iex',
      'Informática y Comunicaciones': 'informatica-y-comunicaciones-ifc',
      'Instalación y Mantenimiento': 'instalacion-y-mantenimiento-ima',
      'Madera, Mueble y Corcho': 'madera-mueble-y-corcho-mam',
      'Marítimo Pesquera': 'maritimo-pesquera-map',
      Química: 'quimica-qui',
      Sanidad: 'sanidad-san',
      'Seguridad y Medio Ambiente': 'seguridad-y-medio-ambiente-sea',
      'Servicios Socioculturales y a la Comunidad':
        'servicios-socioculturales-y-a-la-comunidad-ssc',
      'Textil, Confección y Piel': 'textil-confeccion-y-piel-tcp',
      'Transporte y Mantenimiento de Vehículos':
        'transporte-y-mantenimiento-de-vehiculos-tmv',
      'Vidrio y Cerámica': 'vidrio-y-ceramica-vic'
    }

    // Normalizar el nombre del ciclo
    const nombreNormalizado = normalizarNombre(ciclo.nom)

    // Buscar en URLs exactas primero
    if (urlsExactas[nombreNormalizado]) {
      const urlExacta = urlsExactas[nombreNormalizado]
      const urlCompleta = `https://ivac-eei.eus/es/familias-profesionales/${urlExacta.familia}/ciclos-formativos/${urlExacta.slug}`
      console.log(`✓ URL exacta para "${nombreNormalizado}": ${urlCompleta}`)
      return urlCompleta
    }

    // Si no está en URLs exactas, construir automáticamente
    const codigoFamilia = familiaToCode[ciclo.familia]

    if (!codigoFamilia) {
      console.error(
        `❌ Familia profesional no encontrada: "${ciclo.familia}" para ciclo: "${ciclo.nom}"`
      )
      return '#'
    }

    // Determinar el prefijo según el grado
    let prefijo = ''
    if (ciclo.grado === 'Básico') {
      prefijo = 'titulo-profesional-basico-en-'
    } else if (ciclo.grado === 'Medio') {
      prefijo = 'tecnico-en-'
    } else if (ciclo.grado === 'Superior') {
      prefijo = 'tecnico-superior-en-'
    } else {
      console.error(
        `❌ Grado no reconocido: "${ciclo.grado}" para ciclo: "${ciclo.nom}"`
      )
      return '#'
    }

    // Normalización estándar del slug
    const slugCiclo = nombreNormalizado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/[,()]/g, '') // Eliminar comas y paréntesis
      .replace(/-+/g, '-') // Múltiples guiones a uno solo
      .replace(/^-|-$/g, '') // Eliminar guiones al inicio o final

    console.log(
      `ℹ️ Slug generado automáticamente para "${nombreNormalizado}": ${slugCiclo}`
    )

    // Construir la URL completa
    const urlCompleta = `https://ivac-eei.eus/es/familias-profesionales/${codigoFamilia}/ciclos-formativos/${prefijo}${slugCiclo}.html`

    console.log(`🔗 URL generada para "${ciclo.nom}": ${urlCompleta}`)

    return urlCompleta
  }

  resetearVistaCompleta(): void {
    this.limpiarFiltros()
    this.map.getView().fit(this.euskadiExtent, {
      duration: 400,
      padding: [30, 30, 30, 30],
      maxZoom: 9.25
    })
  }
}
