# 🎭 Playwright API Testing Framework

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

Framework profesional de automatización de pruebas para APIs REST construido con Playwright y Node.js. Incluye validación de esquemas JSON, manejo de errores, medición de tiempos de respuesta y pipeline CI/CD con GitHub Actions.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución de Pruebas](#-ejecución-de-pruebas)
- [Módulos de Pruebas](#-módulos-de-pruebas)
- [CI/CD](#-cicd)
- [Autor](#-autor)

---

## ✨ Características

- ✅ Pruebas de API REST completas (GET, POST, PUT, PATCH, DELETE)
- ✅ Page Object Model para APIs
- ✅ Fixtures personalizados reutilizables
- ✅ Pruebas parametrizadas
- ✅ Validación de esquemas JSON con AJV
- ✅ Manejo de errores y reintentos automáticos
- ✅ Medición de tiempos de respuesta
- ✅ Variables de entorno con dotenv
- ✅ Flujos end-to-end completos
- ✅ Pipeline CI/CD con GitHub Actions
- ✅ Reportes HTML, JSON y JUnit

---

## 🛠 Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | v25+ | Runtime |
| Playwright | Latest | Framework de pruebas |
| AJV | Latest | Validación de esquemas JSON |
| dotenv | Latest | Variables de entorno |
| GitHub Actions | - | CI/CD |

---

## 📁 Estructura del Proyecto
```
playwright-api-testing/
├── .github/
│   └── workflows/
│       └── api-tests.yml        # Pipeline CI/CD
├── tests/
│   ├── api/
│   │   ├── ejemplo-basico.spec.js   # Pruebas básicas
│   │   ├── users.spec.js            # CRUD de usuarios
│   │   ├── posts.spec.js            # CRUD de posts
│   │   ├── schemas.spec.js          # Validación de esquemas
│   │   ├── errores.spec.js          # Manejo de errores
│   │   └── ecommerce.spec.js        # Suite e-commerce
│   └── setup/
├── utils/
│   ├── UserApi.js               # Clase API usuarios
│   ├── PostApi.js               # Clase API posts
│   ├── AuthApi.js               # Clase autenticación
│   ├── ProductApi.js            # Clase API productos
│   ├── OrderApi.js              # Clase API órdenes
│   └── helpers.js               # Utilidades (reintentos, tiempos)
├── fixtures/
│   └── api.fixture.js           # Fixtures personalizados
├── data/
│   └── schemas.js               # Esquemas JSON para validación
├── config/
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore
├── playwright.config.js         # Configuración de Playwright
└── package.json
```

---

## ✅ Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- [Git](https://git-scm.com/)
- Cuenta en [GitHub](https://github.com/)

---

## 🚀 Instalación

**1. Clona el repositorio:**
```bash
git clone https://github.com/naranjo97/playwright-api-testing.git
```

**2. Instala las dependencias:**
```bash
npm install
```

**3. Instala los navegadores de Playwright:**
```bash
npx playwright install
```

**4. Configura las variables de entorno:**
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus valores.

---

## ⚙️ Configuración

Crea un archivo `.env` basado en `.env.example`:
```env
BASE_URL=https://jsonplaceholder.typicode.com
API_KEY=tu-clave-secreta
USER_ADMIN=admin@ejemplo.com
PASS_ADMIN=supersecreta
TIMEOUT=30000
```

---

## ▶️ Ejecución de Pruebas

**Ejecutar todas las pruebas:**
```bash
npx playwright test
```

**Ejecutar un módulo específico:**
```bash
npx playwright test tests/api/users.spec.js
npx playwright test tests/api/ecommerce.spec.js
```

**Ejecutar con reporte visual:**
```bash
npx playwright test --reporter=html
npx playwright show-report
```

**Ejecutar en modo debug:**
```bash
npx playwright test --debug
```

---

## 🧪 Módulos de Pruebas

### 📦 usuarios (`users.spec.js`) — 9 pruebas
| Prueba | Método | Descripción |
|--------|--------|-------------|
| GET - Obtener todos | GET | Lista completa de usuarios |
| GET - Por ID | GET | Usuario específico por ID |
| POST - Crear | POST | Crear nuevo usuario |
| PUT - Actualizar | PUT | Actualización completa |
| PATCH - Parcial | PATCH | Actualización parcial |
| DELETE - Eliminar | DELETE | Eliminar usuario |
| Parametrizadas x3 | GET | Verificar usuarios específicos |

### 📝 Posts (`posts.spec.js`) — 4 pruebas
| Prueba | Método | Descripción |
|--------|--------|-------------|
| GET - Todos los posts | GET | Lista completa |
| GET - Por ID | GET | Post específico |
| GET - Por usuario | GET | Posts filtrados por userId |
| Flujo CRUD completo | ALL | Crear, leer, actualizar, eliminar |

### 🔍 Esquemas (`schemas.spec.js`) — 4 pruebas
Validación de estructura JSON con AJV para usuarios y posts individuales y en lista.

### ⚠️ Errores (`errores.spec.js`) — 7 pruebas
Manejo de errores 404, validación de headers, tiempos de respuesta y reintentos automáticos.

### 🛒 E-commerce (`ecommerce.spec.js`) — 14 pruebas
Suite completa que simula una tienda online con autenticación, CRUD de productos, flujo de compra completo y validación de esquemas.

---

## 📊 Resultados
```
40 pruebas en total
40 passed ✅
 0 failed
Tiempo promedio: ~4 segundos
```

---

## 🔄 CI/CD

El proyecto incluye un pipeline de GitHub Actions que se ejecuta automáticamente en cada push a `main` o `develop` y en Pull Requests.

**El pipeline:**
1. Configura Node.js 18
2. Instala dependencias
3. Instala Playwright
4. Ejecuta todas las pruebas
5. Sube el reporte HTML como artefacto

Para configurar los secrets en GitHub:
```
Settings → Secrets and variables → Actions → New repository secret
```

Secrets necesarios:
- `BASE_URL`
- `API_KEY`
- `USER_ADMIN`
- `PASS_ADMIN`

---

## 👨‍💻 Autor

**Julio Naranjo**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/naranjo97)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/TU_USUARIO)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.