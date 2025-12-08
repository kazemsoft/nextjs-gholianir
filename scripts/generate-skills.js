import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_FILE = path.join(__dirname, '../content/skills.json');
const OUTPUT_FILE = path.join(__dirname, '../generated-skills.ts');

// Read and parse JSON file
const fileContent = fs.readFileSync(SKILLS_FILE, 'utf-8');
const skills = JSON.parse(fileContent);

// Validate levels
const validLevels = ['Advanced', 'Intermediate', 'Basic'];
skills.forEach(skill => {
  if (!validLevels.includes(skill.level)) {
    console.warn(`⚠️  Invalid level "${skill.level}" for skill "${skill.name}". Using "Intermediate" instead.`);
    skill.level = 'Intermediate';
  }
});

// Generate TypeScript file
const tsContent = `// This file is auto-generated. Do not edit manually.
// Generated on: ${new Date().toISOString()}

import { SkillItem } from './types';

export const SKILLS_DATA: SkillItem[] = ${JSON.stringify(skills, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, tsContent);

console.log(`✅ Generated ${skills.length} skills to ${OUTPUT_FILE}`);
