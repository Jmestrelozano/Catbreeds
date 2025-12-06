/**
 * Helper para leer variables de entorno del archivo .env.test en los tests
 * Este archivo se usa como mock de @env cuando se ejecutan los tests
 */
const fs = require('fs');
const path = require('path');

function loadEnvTest() {
  const envTestPath = path.join(__dirname, '.env.test');
  
  // Valores por defecto si no existe el archivo
  let envVars = {
    CAT_API_KEY: 'test-api-key',
    CAT_API_BASE_URL: 'https://api.test.com',
  };
  
  if (fs.existsSync(envTestPath)) {
    const envContent = fs.readFileSync(envTestPath, 'utf8');
    envVars = {};

    envContent.split('\n').forEach(line => {
      // Ignorar comentarios y líneas vacías
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return;
      }

      // Parsear KEY=VALUE
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex !== -1) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        const value = trimmedLine.substring(equalIndex + 1).trim();
        envVars[key] = value;
      }
    });
  }

  return envVars;
}

const envVars = loadEnvTest();

// Exportar las constantes individualmente para que coincidan con @env
module.exports = {
  CAT_API_KEY: envVars.CAT_API_KEY || 'test-api-key',
  CAT_API_BASE_URL: envVars.CAT_API_BASE_URL || 'https://api.test.com',
};
