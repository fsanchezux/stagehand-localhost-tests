import { testBasicNavigation } from "./test-basic-navigation";



interface TestResult {
  name: string;
  success: boolean;
  duration: number;
}

/**
 * Ejecuta todos los tests disponibles
 */
async function runAllTests(): Promise<void> {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         STAGEHAND LOCALHOST TEST SUITE                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("\n");

  const results: TestResult[] = [];
  
  // Lista de tests a ejecutar
  const tests = [
    { name: "Navegación básica", fn: testBasicNavigation }     
  ];

  // Ejecutar cada test
  for (const test of tests) {
    const startTime = Date.now();
    
    try {
      const success = await test.fn();
      const duration = Date.now() - startTime;
      
      results.push({
        name: test.name,
        success,
        duration,
      });
      
      // Pequeña pausa entre tests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`\n❌ Error crítico en ${test.name}:`, error);
      
      results.push({
        name: test.name,
        success: false,
        duration,
      });
    }
  }

  // Mostrar resumen
  printSummary(results);
  
  // Exit code según resultados
  const allPassed = results.every(r => r.success);
  process.exit(allPassed ? 0 : 1);
}

/**
 * Imprime un resumen de los resultados
 */
function printSummary(results: TestResult[]): void {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                    RESUMEN DE TESTS                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("\n");

  const totalTests = results.length;
  const passedTests = results.filter(r => r.success).length;
  const failedTests = totalTests - passedTests;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  // Detalles de cada test
  results.forEach((result) => {
    const status = result.success ? "✅ PASS" : "❌ FAIL";
    const duration = (result.duration / 1000).toFixed(2);
    console.log(`${status} │ ${result.name.padEnd(40)} │ ${duration}s`);
  });

  console.log("\n" + "─".repeat(64) + "\n");

  // Estadísticas generales
  console.log(`Total de tests:    ${totalTests}`);
  console.log(`Tests exitosos:    ${passedTests} ✅`);
  console.log(`Tests fallidos:    ${failedTests} ❌`);
  console.log(`Tiempo total:      ${(totalDuration / 1000).toFixed(2)}s`);
  console.log(`Tasa de éxito:     ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  console.log("\n");

  if (failedTests === 0) {
    console.log("🎉 ¡Todos los tests pasaron exitosamente!");
  } else {
    console.log(`⚠️  ${failedTests} test(s) fallaron. Revisa los logs arriba para más detalles.`);
  }
  
  console.log("\n");
}

// Ejecutar tests
runAllTests().catch((error) => {
  console.error("\n❌ Error fatal en el test suite:", error);
  process.exit(1);
});
