import { Stagehand } from "@browserbasehq/stagehand";
import { createStagehand, closeStagehand, getLocalhostUrl } from "../utils/stagehand-config";
import { TestLogger } from "../utils/logger";

/**
 * Test de ejemplo: Navegar a localhost y verificar título
 */
export async function testBasicNavigation(): Promise<boolean> {
  const logger = new TestLogger("Navegación básica a localhost");
  logger.startTest();

  let stagehand: Stagehand | null = null;

  try {
    // Inicializar Stagehand
    logger.info("Inicializando Stagehand...");
    stagehand = await createStagehand({ headless: false, verbose: 1 });
    logger.success("Stagehand inicializado correctamente");

    // Navegar a localhost
    const url = getLocalhostUrl();
    logger.info(`Navegando a ${url}...`);
    await stagehand.page.goto(url, { waitUntil: "domcontentloaded" });
    logger.success("Página cargada exitosamente");

    // Obtener el título de la página
    const title = await stagehand.page.title();
    logger.info(`Título de la página: "${title}"`);

    // Tomar screenshot
    await stagehand.page.screenshot({ path: "screenshots/basic-navigation.png" });
    logger.success("Screenshot guardado: screenshots/basic-navigation.png");

    // Esperar un poco para ver el resultado
    await new Promise(resolve => setTimeout(resolve, 2000));

    logger.endTest(true);
    return true;

  } catch (error) {
    logger.error("Error durante el test:", error);
    logger.endTest(false);
    return false;

  } finally {
    if (stagehand) {
      await closeStagehand(stagehand);
      logger.info("Stagehand cerrado");
    }
  }
}

// Ejecutar el test si se llama directamente
if (require.main === module) {
  testBasicNavigation()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Error fatal:", error);
      process.exit(1);
    });
}
