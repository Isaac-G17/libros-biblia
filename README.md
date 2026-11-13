<div align="center">

# 📖 Libros de la Biblia

### Aprende y memoriza los libros de la Biblia de forma intuitiva y dinámica

Pensada para niños y adultos de cualquier iglesia · Sin registro · Accesible desde el celular

[![Angular](https://img.shields.io/badge/Angular-standalone%20%2B%20signals-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-estricto-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/CSS-tokens%20%2B%20temas-1572B6?logo=css3&logoColor=white)](#-stack-tecnológico)
[![Despliegue](https://img.shields.io/badge/Despliegue-GitHub%20Pages-222222?logo=github&logoColor=white)](#-despliegue)
[![Estado](https://img.shields.io/badge/Fase%201-MVP%20completo-brightgreen)](#-hoja-de-ruta)

</div>

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Primeros pasos](#-primeros-pasos)
- [Scripts disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Contenido y licencia de los datos](#-contenido-y-licencia-de-los-datos)
- [Convenciones de código](#-convenciones-de-código)
- [Hoja de ruta](#-hoja-de-ruta)

---

## 📖 Sobre el proyecto

**Libros de la Biblia** ayuda a niños y adultos de cualquier iglesia a aprender y memorizar los libros de la Biblia —su orden, divisiones, autores, capítulos y temas— mediante tarjetas de estudio y juegos cortos.

Se accede por enlace o código QR, sin necesidad de registro: la persona elige su modo (niños o adultos) y empieza a aprender en segundos.

## ✨ Características

**Dos modos de experiencia**, con temas visuales independientes:
- 🧒 **Modo niños**: colores vivos, botones grandes (56px), lenguaje simple, mascota y estrellas como recompensa.
- 🧑 **Modo adultos**: diseño sobrio, más datos (autor, capítulos), progreso con porcentajes.

**Cuatro actividades de aprendizaje**, organizadas por división del canon (Pentateuco, Históricos, Poéticos, Profetas, Evangelios, Cartas, etc.):

| Actividad | Qué hace |
|---|---|
| 📚 **Aprender** | Presenta los libros de una división en orden canónico, con testamento, autor, capítulos y tema |
| ✍️ **Practicar** | Preguntas de opción múltiple (testamento, división, autor, tema, "¿qué libro sigue?") con retroalimentación inmediata |
| 🔢 **Ordenar** | Coloca los libros de una división en su orden correcto, por toque o teclado |
| 🧩 **Emparejar** | Une cada libro con su división (niños) o su tema (adultos) |

**Progreso personal**: cada libro visto y cada acierto se guarda localmente (repetición espaciada estilo Leitner), sin que la persona tenga que crear una cuenta.

**Accesibilidad de base**: contraste AA, objetivos táctiles ≥44px (≥56px en niños), navegación por teclado, `aria-label` en íconos, respeto a `prefers-reduced-motion`, y ningún estado comunicado solo por color.

## 🛠️ Stack tecnológico

**Frontend** (`frontend/`)
- [Angular](https://angular.dev) (standalone components, `signals` y `computed`, control flow moderno `@if`/`@for`)
- TypeScript estricto
- CSS puro con variables de diseño (tokens) y dos temas (`modo-ninos` / `modo-adultos`)
- Pruebas con Jasmine/Karma (`ng test`)

**Persistencia**
- `localStorage` en la Fase 1, detrás de un repositorio abstracto (`ProgressRepository`) para poder migrar a una API REST sin reescribir componentes

**CI/CD**
- GitHub Actions: build automático y despliegue a GitHub Pages en cada push a `main`

**Backend (Fase 2, planeado)**
- Java 21 + Spring Boot, Maven, Spring Data JPA, Spring Security
- PostgreSQL
- API REST documentada con OpenAPI/Swagger
- JUnit 5 + Mockito

## 📁 Estructura del proyecto

```
libros-biblia/
├─ .github/workflows/      # Workflow de despliegue a GitHub Pages
├─ backend/                # Spring Boot (Fase 2, aún no implementado)
├─ frontend/                # Aplicación Angular (Fase 1 - MVP)
│  ├─ public/data/          # canon-66.es.json: libros, divisiones, autores, temas
│  └─ src/app/
│     ├─ models/            # book.model.ts · progress.model.ts · navegacion.model.ts
│     ├─ core/
│     │  ├─ guards/         # mode.guard.ts
│     │  ├─ persistence/    # ProgressRepository (puerto) + implementación localStorage
│     │  ├─ services/       # books · progress · learning-path · sound · theme · connectivity
│     │  └─ utils/           # leitner.ts · practice.ts · ordering.ts · matching.ts (+ specs)
│     ├─ shared/components/ # boton · tarjeta · barra-progreso · mensaje-estado · esqueleto
│     │                     # barra-navegacion · boton-volver · conmutador-modo · resultado-juego
│     └─ features/
│        ├─ bienvenida/      # Onboarding (elegir modo niños/adultos)
│        ├─ inicio/           # Pantalla de inicio con "Continuar donde quedaste"
│        ├─ aprender/         # Lista de divisiones + ficha de libro
│        ├─ jugar/              # Hub que agrupa los tres juegos
│        ├─ practicar/        # Quiz de opción múltiple
│        ├─ ordenar/           # Juego de ordenar por división
│        ├─ emparejar/        # Juego de emparejar
│        └─ progreso/          # Resumen de avance por división
└─ docker-compose.yml       # (Fase 2)
```

## 🚀 Primeros pasos

### Requisitos

- Node.js **22.x** o superior (requerido por la versión de Angular CLI del proyecto)
- npm

### Instalación

```bash
git clone https://github.com/tu-usuario/libros-biblia.git
cd libros-biblia/frontend
npm install
```

### Ejecutar en desarrollo

```bash
ng serve
```

Abre `http://localhost:4200`. La app carga el canon de libros desde `public/data/canon-66.es.json` y arranca en la pantalla de bienvenida si no hay progreso guardado.

## 📜 Scripts disponibles

Desde `frontend/`:

| Comando | Qué hace |
|---|---|
| `ng serve` | Levanta el servidor de desarrollo con recarga en caliente |
| `ng build` | Genera el build de producción en `dist/` |
| `ng test` | Corre las pruebas unitarias (Jasmine/Karma) |

## 🌐 Despliegue

El despliegue a **GitHub Pages** es automático: cada push a `main` dispara el workflow en `.github/workflows/deploy.yml`, que:

1. Instala dependencias (`npm ci`)
2. Compila con `ng build --base-href /libros-biblia/`
3. Copia `index.html` como `404.html` (para que las rutas de Angular funcionen al recargar en GitHub Pages)
4. Publica el resultado con `actions/deploy-pages`

Puedes seguir el progreso de cada despliegue en la pestaña **Actions** del repositorio.

## 📚 Contenido y licencia de los datos

El texto de referencia usado es **Reina-Valera 1909**, por ser de **dominio público**. La app no incluye versículos citados textualmente: los datos del canon (`canon-66.es.json`) son información factual sobre los libros —nombre, orden, división, autor tradicional, número de capítulos y un resumen de una frase redactado para el proyecto— no el texto bíblico en sí.

Los autores sin consenso amplio se marcan como **"(tradición)"** o **"Autor incierto"**, para mantener neutralidad entre denominaciones. El canon por defecto es el de 66 libros, pero el modelo de datos permite definir otros canones como archivos JSON independientes.

## 🧱 Convenciones de código

- **Arquitectura por capas** en el frontend: `core/` (servicios singleton, guards), `shared/` (componentes reutilizables), `models/` (tipos), `features/` (una carpeta por funcionalidad, con lazy loading)
- **Componentes standalone** con `ChangeDetectionStrategy.OnPush`, `input()`/`output()`, y archivos separados (`.ts` / `.html` / `.css` / `.spec.ts`) — sin `template:` ni `styles:` inline
- **Contenedores vs. presentación**: las páginas (`pages/`) inyectan servicios; los componentes de `components/` y `shared/` solo reciben `input()` y emiten `output()`
- **Lógica fuera de los componentes**: las reglas de negocio viven en servicios (`ProgressService`, `LearningPathService`) y en funciones puras y testeables (`leitner.ts`, `practice.ts`, `ordering.ts`, `matching.ts`)
- **Persistencia detrás de una interfaz** (`ProgressRepository`): migrar de `localStorage` a una API REST en la Fase 2 no debería requerir tocar ningún componente
- **Commits** siguiendo [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `refactor:`, `ci:`, `docs:`)

## 🗺️ Hoja de ruta

**✅ Fase 1 — MVP Angular (completada)**
- [x] Flujo de aprendizaje por divisiones
- [x] Juegos: Practicar, Ordenar, Emparejar
- [x] Modo niños y modo adultos
- [x] Progreso en `localStorage`
- [x] Despliegue automático a GitHub Pages

**⏳ En curso**
- [ ] PWA: manifest, service worker y uso sin conexión

**📌 Fase 2 — Backend Spring Boot**
- [ ] Login de maestros/líderes
- [ ] Grupos con código de acceso
- [ ] Seguimiento de progreso por grupo
- [ ] Retos y sincronización entre dispositivos

---

<div align="center">

Hecho con 📖 para ayudar a conocer mejor la Palabra, sin importar la denominación.

</div>
