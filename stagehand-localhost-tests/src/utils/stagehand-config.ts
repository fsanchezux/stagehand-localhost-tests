import { Stagehand } from "@browserbasehq/stagehand";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

export interface StagehandConfig {
  headless?: boolean;
  verbose?: number;
  debugDom?: boolean;
}

/**
 * Crea una instancia de Stagehand con configuración personalizada
 */
export async function createStagehand(config?: StagehandConfig): Promise<Stagehand> {
  const defaultConfig: StagehandConfig = {
    headless: process.env.HEADLESS === "true",
    verbose: parseInt(process.env.VERBOSE || "1"),
    debugDom: false,
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Asegurar que verbose es 0, 1 o 2
  const verboseLevel = Math.min(2, Math.max(0, finalConfig.verbose || 1)) as 0 | 1 | 2;

  const stagehand = new Stagehand({
    env: "LOCAL" as any,
    headless: finalConfig.headless,
    verbose: verboseLevel,
    debugDom: finalConfig.debugDom,
  });

  await stagehand.init();
  return stagehand;
}

/**
 * Obtiene la URL de localhost desde las variables de entorno
 */
export function getLocalhostUrl(path: string = ""): string {
  const baseUrl = process.env.LOCALHOST_URL || "http://localhost:3000";
  return path ? `${baseUrl}${path}` : baseUrl;
}

/**
 * Cierra la instancia de Stagehand
 */
export async function closeStagehand(stagehand: Stagehand): Promise<void> {
  await stagehand.close();
}