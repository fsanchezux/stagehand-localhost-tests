/**
 * Utilidad para logging de tests
 */

export enum LogLevel {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  
  // Colores de texto
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

export class TestLogger {
  private testName: string;
  private startTime: number = 0;

  constructor(testName: string) {
    this.testName = testName;
  }

  startTest(): void {
    this.startTime = Date.now();
    console.log(`\n${colors.bright}${colors.cyan}========================================${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}Test: ${this.testName}${colors.reset}`);
    console.log(`${colors.cyan}========================================${colors.reset}\n`);
  }

  log(level: LogLevel, message: string, details?: any): void {
    const timestamp = new Date().toLocaleTimeString();
    let color = colors.white;
    let prefix = "";

    switch (level) {
      case LogLevel.INFO:
        color = colors.blue;
        prefix = "ℹ";
        break;
      case LogLevel.SUCCESS:
        color = colors.green;
        prefix = "✓";
        break;
      case LogLevel.WARNING:
        color = colors.yellow;
        prefix = "⚠";
        break;
      case LogLevel.ERROR:
        color = colors.red;
        prefix = "✗";
        break;
    }

    console.log(`${color}${prefix} [${timestamp}] ${message}${colors.reset}`);
    
    if (details) {
      console.log(`${colors.dim}${JSON.stringify(details, null, 2)}${colors.reset}`);
    }
  }

  info(message: string, details?: any): void {
    this.log(LogLevel.INFO, message, details);
  }

  success(message: string, details?: any): void {
    this.log(LogLevel.SUCCESS, message, details);
  }

  warning(message: string, details?: any): void {
    this.log(LogLevel.WARNING, message, details);
  }

  error(message: string, details?: any): void {
    this.log(LogLevel.ERROR, message, details);
  }

  endTest(success: boolean): void {
    const duration = Date.now() - this.startTime;
    const durationSeconds = (duration / 1000).toFixed(2);
    
    console.log(`\n${colors.cyan}========================================${colors.reset}`);
    
    if (success) {
      console.log(`${colors.green}${colors.bright}✓ Test completado exitosamente${colors.reset}`);
    } else {
      console.log(`${colors.red}${colors.bright}✗ Test falló${colors.reset}`);
    }
    
    console.log(`${colors.dim}Duración: ${durationSeconds}s${colors.reset}`);
    console.log(`${colors.cyan}========================================${colors.reset}\n`);
  }
}
