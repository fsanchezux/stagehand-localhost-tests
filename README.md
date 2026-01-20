# Stagehand Localhost Tests

Proyecto para ejecutar tests automatizados con Stagehand contra aplicaciones en localhost.

## 🚀 Características

- ✅ Tests automatizados con IA usando Stagehand
- ✅ Navegación y verificación de páginas
- ✅ Interacción con formularios y elementos
- ✅ Screenshots automáticos
- ✅ Sistema de logging con colores

## 📋 Requisitos

- Node.js 18 o superior
- Una aplicación corriendo en localhost (por defecto en el puerto 3000)
- API key de Anthropic (para las funcionalidades de IA de Stagehand)

## 🔧 Instalación

1. Clona o copia este proyecto
2. Instala las dependencias:

```bash
npm install
```

3. Copia el archivo de ejemplo de variables de entorno y configúralo:

```bash
cp .env
```

4. Edita el archivo `.env` y añade tu API key de Anthropic:

```env
ANTHROPIC_API_KEY=tu_api_key_aquí
LOCALHOST_URL=http://localhost:3000
HEADLESS=false
VERBOSE=1
```

## 🏃 Uso

### Ejecutar todos los tests

```bash
npm test
```

### Ejecutar en modo desarrollo (con ts-node, sin compilar)

```bash
npm run dev
```

### Ejecutar un test individual

```bash
npm run build
node dist/tests/test-basic-navigation.js
```

O en desarrollo:

```bash
npx ts-node src/tests/test-basic-navigation.ts
```

### Compilar el proyecto

```bash
npm run build
```

### Limpiar archivos compilados

```bash
npm run clean
```

## 📁 Estructura del Proyecto

```
stagehand-localhost-tests/
├── src/
│   ├── tests/                          # Tests de Stagehand
│   │   ├── test-basic-navigation.ts    # Test de navegación básica
│   │   ├── test-form-interaction.ts    # Test de interacción con formularios
│   │   ├── test-data-extraction.ts     # Test de extracción de datos con IA
│   │   └── run-all.ts                  # Ejecutor de todos los tests
│   ├── utils/                          # Utilidades
│   │   ├── stagehand-config.ts         # Configuración de Stagehand
│   │   └── logger.ts                   # Sistema de logging
│   └── types/                          # Tipos TypeScript (opcional)
├── screenshots/                         # Screenshots generados por los tests
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🧪 Tests Incluidos

### 1. Navegación Básica (`test-basic-navigation.ts`)
- Navega a la URL de localhost
- Verifica que la página carga correctamente
- Obtiene el título de la página
- Toma un screenshot


## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | API key de Anthropic (requerida) | - |
| `LOCALHOST_URL` | URL base de tu aplicación | `http://localhost:3000` |
| `LOCALHOST_PORT` | Puerto de tu aplicación | `3000` |
| `HEADLESS` | Ejecutar browser en modo headless | `false` |
| `VERBOSE` | Nivel de verbosidad (0-2) | `1` |

### Personalizar Tests

Los tests están diseñados para ser fácilmente personalizables. Puedes:

1. **Cambiar la URL**: Modifica `LOCALHOST_URL` en `.env`
2. **Ajustar rutas**: Usa `getLocalhostUrl("/ruta")` en tus tests
3. **Modificar acciones**: Cambia las instrucciones de `act()` según tu aplicación
4. **Personalizar extracción**: Ajusta los schemas de `extract()` a tus necesidades

### Crear un Nuevo Test

```typescript
import { Stagehand } from "@browserbasehq/stagehand";
import { createStagehand, closeStagehand, getLocalhostUrl } from "../utils/stagehand-config";
import { TestLogger } from "../utils/logger";

export async function testMiNuevoTest(): Promise<boolean> {
  const logger = new TestLogger("Mi Nuevo Test");
  logger.startTest();

  let stagehand: Stagehand | null = null;

  try {
    stagehand = await createStagehand();
    logger.success("Stagehand inicializado");

    // Tu código de test aquí
    await stagehand.page.goto(getLocalhostUrl("/mi-ruta"));
    
    // ... más acciones ...

    logger.endTest(true);
    return true;

  } catch (error) {
    logger.error("Error:", error);
    logger.endTest(false);
    return false;

  } finally {
    if (stagehand) {
      await closeStagehand(stagehand);
    }
  }
}
```

## 📸 Screenshots

Los screenshots se guardan automáticamente en la carpeta `screenshots/` con nombres descriptivos:
- `basic-navigation.png`
- `form-interaction.png`
- `data-extraction.png`
- Y cualquiera que captures en tus tests personalizados

## 🐛 Troubleshooting

### Error: "Cannot find module '@browserbasehq/stagehand'"

Ejecuta `npm install` para instalar las dependencias.

### Error: "Missing environment variable: ANTHROPIC_API_KEY"

Asegúrate de haber creado el archivo `.env` y añadido tu API key.

### La aplicación no está en el puerto 3000

Cambia `LOCALHOST_URL` en tu archivo `.env` al puerto correcto.

### Los tests fallan porque no encuentran elementos

Los tests de ejemplo usan instrucciones genéricas. Ajusta las instrucciones de `act()` y `extract()` según los elementos reales de tu aplicación.

## 📚 Recursos

- [Documentación de Stagehand](https://github.com/browserbase/stagehand)
- [Documentación de Anthropic](https://docs.anthropic.com/)
- [Playwright API](https://playwright.dev/docs/api/class-playwright)

## 📝 Notas

- Los tests están diseñados para ejecutarse con el browser visible (`headless: false`) para que puedas ver qué está pasando
- Cada test toma screenshots para facilitar el debugging
- El sistema de logging usa colores para mejorar la legibilidad
- Los tests se ejecutan secuencialmente con pequeñas pausas entre ellos

## 🤝 Contribuir

Siéntete libre de añadir más tests o mejorar los existentes según las necesidades de tu aplicación.

## 📄 Licencia

MIT
