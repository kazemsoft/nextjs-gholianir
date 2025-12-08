import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPERIENCES_FILE = path.join(__dirname, '../content/experiences.json');
const OUTPUT_FILE = path.join(__dirname, '../generated-experiences.ts');

// Read and parse JSON file
const fileContent = fs.readFileSync(EXPERIENCES_FILE, 'utf-8');
const experiences = JSON.parse(fileContent);

// Sort by order (descending - higher numbers first)
experiences.sort((a, b) => (b.order || 0) - (a.order || 0));

// Generate TypeScript file
const tsContent = `// This file is auto-generated. Do not edit manually.
// Generated on: ${new Date().toISOString()}

import { ExperienceItem } from './types';

export const EXPERIENCE_DATA: ExperienceItem[] = ${JSON.stringify(
  experiences,
  null,
  2
)};
`;

fs.writeFileSync(OUTPUT_FILE, tsContent);

console.log(`✅ Generated ${experiences.length} experiences to ${OUTPUT_FILE}`);
