import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_FILE = path.join(__dirname, '../content/projects.json');
const OUTPUT_FILE = path.join(__dirname, '../generated-projects.ts');

// Read and parse JSON file
const fileContent = fs.readFileSync(PROJECTS_FILE, 'utf-8');
const projects = JSON.parse(fileContent);

// Generate TypeScript file
const tsContent = `// This file is auto-generated. Do not edit manually.
// Generated on: ${new Date().toISOString()}

import { ProjectItem } from './types';

export const PROJECTS_DATA: ProjectItem[] = ${JSON.stringify(
  projects,
  null,
  2
)};
`;

fs.writeFileSync(OUTPUT_FILE, tsContent);

console.log(`✅ Generated ${projects.length} projects to ${OUTPUT_FILE}`);
