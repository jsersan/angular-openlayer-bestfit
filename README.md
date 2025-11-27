# angular-openlayer-bestfit

Aplicación web desarrollada con Angular que permite buscar y visualizar en un mapa los centros de Formación Profesional (FP) de la Comunidad Autónoma Vasca (CAV) utilizando OpenLayers como motor cartográfico.[attached_file:1]

## Descripción general

Este proyecto muestra un visor de mapa interactivo integrado en una aplicación Angular, donde se representan los centros de FP de la CAV mediante capas geográficas configuradas con OpenLayers.[attached_file:1] La interfaz permite buscar, filtrar y centrar el mapa sobre los centros que mejor se ajustan a los criterios del usuario (best fit), facilitando la exploración de la oferta formativa en el territorio.[attached_file:1]

## Características principales

- Aplicación SPA creada con Angular CLI (versión 15.0.2) siguiendo la estructura estándar de módulos y componentes.[attached_file:1]  
- Integración de OpenLayers para mostrar mapas, capas vectoriales y controles de navegación.[attached_file:1]  
- Búsqueda de centros de FP de la CAV con representación geográfica sobre el mapa y ajuste automático de la vista a los resultados.[attached_file:1]  
- Uso de TypeScript, SCSS y HTML como tecnologías principales del frontend.[attached_file:1]  

## Requisitos previos

- Node.js y npm instalados en el sistema (versión compatible con Angular 15).[web:16]  
- Angular CLI instalado globalmente para ejecutar y compilar el proyecto:  
  `npm install -g @angular/cli`.[web:16]  

## Instalación

1. Clonar el repositorio:  

    git clone https://github.com/jsersan/angular-openlayer-bestfit.git

2. Entrar en el directorio del proyecto:

    cd angular-openlayer-bestfit

3. Instalar dependencias:

    npm install

4. - Iniciar el servidor de desarrollo:
  
    ng serve

5.- Nuestro mapa estará en:

    http://localhost:4200

- La aplicación se recargará automáticamente al modificar los archivos fuente del proyecto.[attached_file:1]  

## Scripts disponibles

- `ng serve`: Levanta el servidor de desarrollo en `localhost:4200`.[attached_file:1]  
- `ng build`: Genera la build de producción en el directorio `dist/`.[attached_file:1]  
- `ng test`: Ejecuta los tests unitarios con Karma.[attached_file:1]  
- `ng e2e`: Ejecuta las pruebas end-to-end (requiere configurar un framework de e2e compatible previamente).[attached_file:1]  

## Estructura del proyecto

- `src/app/`: Contiene los componentes y módulos de Angular, incluyendo el componente principal que integra el mapa de OpenLayers y la lógica de búsqueda.[attached_file:1]  
- `src/assets/`: Recursos estáticos que pueden incluir configuraciones, iconos o datos geoespaciales necesarios para el mapa.[attached_file:1]  
- Archivos de configuración principales: `angular.json`, `tsconfig.json`, `package.json`, donde se gestionan la configuración de Angular, TypeScript y las dependencias.[attached_file:1]  

## Tecnologías utilizadas

- Angular 15: Framework principal para la construcción de la SPA y gestión de componentes.[attached_file:1]  
- OpenLayers: Librería JavaScript para la visualización de mapas y capas geoespaciales en el navegador.[attached_file:1]  
- Lenguajes: TypeScript (~85 % del código), SCSS, HTML y JavaScript según estadísticas del repositorio.[attached_file:1]  

## Pruebas

- Las pruebas unitarias se ejecutan con `ng test` utilizando Karma como test runner, siguiendo la configuración generada por Angular CLI.[attached_file:1]  
- Las pruebas end-to-end se pueden configurar añadiendo un paquete de e2e (como Cypress o Protractor) y luego ejecutando `ng e2e`.[attached_file:1]  

## Despliegue

- Para generar una versión lista para producción, se debe ejecutar:  

ng build

lo que crea los artefactos en el directorio `dist/`.[attached_file:1]  
- El contenido de `dist/` puede desplegarse en cualquier servidor web estático (por ejemplo, Nginx, Apache o GitHub Pages) siguiendo las prácticas habituales de despliegue de aplicaciones Angular.[web:16]  

## Contribuir

- Se recomienda crear ramas específicas para nuevas funcionalidades o correcciones antes de abrir un pull request.[web:13]  
- Las contribuciones pueden incluir mejoras en la experiencia de usuario, nuevas opciones de filtrado de centros, optimización del rendimiento del mapa o documentación adicional.[web:13]  

## Licencia

- El repositorio no declara explícitamente una licencia en la información disponible; antes de reutilizar o modificar el código en otros proyectos, conviene revisar el propio repositorio para comprobar si se ha añadido una licencia en el futuro.
