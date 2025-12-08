# Content Management System - JSON-Based

## Overview

Your portfolio uses a JSON-based content management system. All content (experiences, skills, and projects) is stored in simple JSON files that are automatically processed during build.

## File Structure

```
/content/
├── experiences.json    # Work experience entries
├── skills.json         # Technical skills
├── projects.json       # Portfolio projects
└── README.md          # Quick reference

/scripts/
├── generate-experiences.js  # Parser for experiences
├── generate-skills.js       # Parser for skills
└── generate-projects.js     # Parser for projects

/public/images/experiences/  # Company logos
```

## Content Files

### 1. experiences.json

Manages your work history with full details.

**Format:**
```json
[
  {
    "id": "3",
    "role": "Programming Consultant",
    "company": "Sharif University of Technology",
    "type": "Full-time",
    "date": "Feb 2025 - Present",
    "location": "Tehran, Iran • Remote",
    "description": [
      "Developing an AI Platform.",
      "Working on cutting-edge AI solutions.",
      "Collaborating with researchers."
    ],
    "skills": ["Next.js", "React.js", "TypeScript", "Docker"],
    "image": "sharif-university.png",
    "order": 3
  }
]
```

**Fields:**
- `id` (string, required) - Unique identifier
- `role` (string, required) - Job title
- `company` (string, required) - Company name
- `type` (string, required) - "Full-time", "Part-time", "Contract", "Freelance"
- `date` (string, required) - Employment period (e.g., "Jan 2024 - Present")
- `location` (string, required) - Work location with type (e.g., "NYC • Remote")
- `description` (array, required) - List of achievements/responsibilities
- `skills` (array, required) - Technologies and skills used
- `image` (string, optional) - Logo filename (place in `/public/images/experiences/`)
- `order` (number, required) - Display order (higher numbers appear first)

**Ordering:** Higher `order` values appear first. To add a new experience, use a number higher than your current highest.

### 2. skills.json

Simple array of technical skills with proficiency levels.

**Format:**
```json
[
  { "name": "React.js", "level": "Advanced" },
  { "name": "Node.js", "level": "Intermediate" },
  { "name": "AWS", "level": "Basic" }
]
```

**Fields:**
- `name` (string, required) - Skill name
- `level` (string, required) - "Advanced", "Intermediate", or "Basic"

**Ordering:** Skills appear in the order listed in the array. Rearrange to change display order.

**Valid Levels:**
- `Advanced` - Expert level proficiency
- `Intermediate` - Solid working knowledge
- `Basic` - Foundational understanding

### 3. projects.json

Portfolio projects with descriptions and links.

**Format:**
```json
[
  {
    "id": "1",
    "title": "UCRS",
    "description": "A custom-designed corporate website built with Next.js, Tailwind CSS, and Shadcn UI",
    "link": "#"
  }
]
```

**Fields:**
- `id` (string, required) - Unique identifier
- `title` (string, required) - Project name
- `description` (string, required) - Brief description
- `link` (string, optional) - URL to live project (use "#" for placeholder)

**Ordering:** Projects appear in the order listed in the array.

## How to Edit Content

### Adding an Experience

1. Open `/content/experiences.json`
2. Find the current highest `order` number
3. Add a new entry with `order` + 1:

```json
{
  "id": "4",
  "role": "Senior Developer",
  "company": "Tech Corp",
  "type": "Full-time",
  "date": "Jan 2026 - Present",
  "location": "San Francisco, USA • Hybrid",
  "description": [
    "Led development of microservices architecture",
    "Mentored 5 junior developers",
    "Reduced deployment time by 60%"
  ],
  "skills": ["React.js", "Node.js", "Docker", "AWS"],
  "image": "techcorp.png",
  "order": 4
}
```

4. Save and run `npm run dev`

### Adding a Skill

1. Open `/content/skills.json`
2. Add to the array:

```json
{ "name": "TypeScript", "level": "Advanced" }
```

3. Save and run `npm run dev`

### Adding a Project

1. Open `/content/projects.json`
2. Add to the array:

```json
{
  "id": "5",
  "title": "My New Project",
  "description": "Description of the project and technologies used",
  "link": "https://project-url.com"
}
```

3. Save and run `npm run dev`

### Editing Existing Content

1. Open the appropriate JSON file
2. Find the entry by `id` or `name`
3. Modify the values
4. Save and rebuild

### Removing Content

1. Open the JSON file
2. Delete the entire object from the array
3. Save and rebuild

### Reordering Content

**Experiences:**
- Change the `order` field value
- Higher numbers = appears first
- No need to renumber all entries

**Skills & Projects:**
- Cut and paste the object to a new position in the array
- Order in array = display order

## Build Commands

```bash
# Generate all content
npm run generate

# Generate specific content
npm run generate:experiences
npm run generate:skills
npm run generate:projects

# Development server (auto-generates)
npm run dev

# Production build (auto-generates)
npm run build
```

## Generated Files

The scripts generate TypeScript files:
- `generated-experiences.ts`
- `generated-skills.ts`
- `generated-projects.ts`

**Important:**
- These are auto-generated (gitignored)
- Never edit them manually
- Regenerated on every build
- Type-safe and validated

## JSON Editing Tips

### Valid JSON Syntax

✅ **Correct:**
```json
{
  "name": "React.js",
  "level": "Advanced"
}
```

❌ **Wrong:**
```json
{
  name: 'React.js',    // Missing quotes
  level: "Advanced",   // Trailing comma
}
```

### Common Mistakes

1. **Missing Commas**
```json
[
  { "name": "Skill1" }   // ❌ Missing comma
  { "name": "Skill2" }
]
```

2. **Trailing Commas**
```json
{
  "name": "Skill",
  "level": "Advanced",  // ❌ No comma after last property
}
```

3. **Single Quotes**
```json
{ 'name': 'Skill' }  // ❌ Use double quotes
```

4. **Unquoted Keys**
```json
{ name: "Skill" }    // ❌ Keys must be quoted
```

### Best Practices

1. **Use a JSON Validator**: https://jsonlint.com/
2. **Use VSCode**: Auto-formats and validates JSON
3. **One Change at a Time**: Edit and test incrementally
4. **Keep Backups**: Save working versions before major edits
5. **Test Locally**: Run `npm run generate` to catch errors

## Example Workflows

### Adding Your Latest Job

1. Current highest `order`: 3
2. Open `experiences.json`
3. Add at the beginning of the array:

```json
[
  {
    "id": "4",
    "role": "New Position",
    "company": "New Company",
    "type": "Full-time",
    "date": "Dec 2025 - Present",
    "location": "Remote",
    "description": ["Achievement 1", "Achievement 2"],
    "skills": ["Skill1", "Skill2"],
    "order": 4
  },
  // ... existing entries
]
```

4. `npm run dev` - appears first on portfolio

### Updating Skill Proficiency

1. Open `skills.json`
2. Find the skill:

```json
// Before
{ "name": "Node.js", "level": "Intermediate" }

// After
{ "name": "Node.js", "level": "Advanced" }
```

3. Save and rebuild

### Reorganizing Skills by Category

```json
[
  // Frontend
  { "name": "React.js", "level": "Advanced" },
  { "name": "Next.js", "level": "Advanced" },
  { "name": "TypeScript", "level": "Advanced" },

  // Backend
  { "name": "Node.js", "level": "Intermediate" },
  { "name": "MongoDB", "level": "Advanced" },

  // DevOps
  { "name": "Docker", "level": "Intermediate" },
  { "name": "AWS", "level": "Basic" }
]
```

## Troubleshooting

### JSON Parse Error

**Error:** `SyntaxError: Unexpected token`

**Fix:**
1. Copy your JSON to https://jsonlint.com/
2. Fix the highlighted syntax errors
3. Save and try again

### Content Not Showing

**Check:**
1. JSON syntax is valid
2. File is saved
3. Run `npm run generate` manually to see errors
4. Check browser console for errors

### Wrong Order

**Experiences:**
- Check `order` field values
- Higher numbers appear first
- Update the value to change position

**Skills/Projects:**
- Order in array = display order
- Rearrange objects in the array

### Images Not Loading

**Check:**
1. Image exists in `/public/images/experiences/`
2. Filename matches exactly (case-sensitive)
3. `image` field has correct filename
4. Path is just filename, not full path

## Comparison: Before vs After

### Before (TypeScript constants)

```typescript
export const SKILLS_DATA: SkillItem[] = [
  { name: 'React.js', level: 'Advanced' },
  // ...
];
```

**Problems:**
- Required TypeScript knowledge
- Risk of syntax errors
- Difficult to manage
- Mixed with code

### After (JSON files)

```json
[
  { "name": "React.js", "level": "Advanced" }
]
```

**Benefits:**
- Simple, standard format
- Easy to edit in any editor
- Auto-validated
- Separated from code
- Can use GUI JSON editors

## Advantages of JSON

✅ **Universal Format**: Works with any editor or tool
✅ **Easy to Learn**: Simple key-value structure
✅ **Validation**: Built-in syntax checking
✅ **Portable**: Easy to import/export
✅ **No Build Knowledge**: Just edit and save
✅ **Version Control**: Clean diffs in Git
✅ **Tooling Support**: Many JSON editors and validators

## Quick Reference

| Task | File | Action |
|------|------|--------|
| Add experience | experiences.json | Add object with higher `order` |
| Add skill | skills.json | Add object to array |
| Add project | projects.json | Add object to array |
| Change order (exp) | experiences.json | Modify `order` field |
| Change order (skill) | skills.json | Move object in array |
| Remove content | Any JSON file | Delete object |
| Update content | Any JSON file | Edit field values |

## Dependencies

- **glob** - File pattern matching (for future expansion)
- No markdown parsers needed
- Native JSON parsing (Node.js built-in)

---

**Ready to edit?** Open `/content/*.json` files and run `npm run dev`!
