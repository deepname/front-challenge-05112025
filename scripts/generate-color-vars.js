#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Function to parse SCSS variables from file
function parseScssVariables(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const variables = {};

  const lines = content.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('$') && trimmed.includes(':')) {
      const parts = trimmed.split(':');
      if (parts.length >= 2) {
        const varName = parts[0].substring(1); // remove $
        const varValue = parts[1].split(';')[0]?.trim();
        if (varValue && varName) {
          variables[varName] = varValue;
        }
      }
    }
  });

  return variables;
}

// Parse variables from SCSS file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const variablesPath = join(__dirname, '../assets/_variables.scss');
const colorVariables = parseScssVariables(variablesPath);

// Write to JSON file that can be imported in browser
const outputPath = join(__dirname, '../assets/color-variables.json');
writeFileSync(outputPath, JSON.stringify(colorVariables, null, 2));

console.log('✅ Color variables generated:', Object.keys(colorVariables).length, 'variables');
