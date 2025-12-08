# Content Management

This directory contains JSON files for managing your portfolio content.

## Files

- **experiences.json** - Work experience entries
- **skills.json** - Technical skills list
- **projects.json** - Portfolio projects

## Structure

### experiences.json

```json
[
  {
    "id": "1",
    "role": "Job Title",
    "company": "Company Name",
    "type": "Full-time | Part-time | Contract | Freelance",
    "date": "Start Date - End Date",
    "location": "City, Country • Remote/On-site/Hybrid",
    "description": [
      "Achievement or responsibility 1",
      "Achievement or responsibility 2",
      "Achievement or responsibility 3"
    ],
    "skills": ["Skill1", "Skill2", "Skill3"],
    "image": "company-logo.png",
    "order": 1
  }
]
```

**Fields:**
- `id` - Unique identifier (string)
- `role` - Job title
- `company` - Company name
- `type` - Employment type
- `date` - Employment period
- `location` - Work location
- `description` - Array of bullet points
- `skills` - Array of skills used
- `image` - Logo filename (optional, place in `/public/images/experiences/`)
- `order` - Display order (higher numbers appear first)

### skills.json

```json
[
  { "name": "Skill Name", "level": "Advanced" },
  { "name": "Another Skill", "level": "Intermediate" }
]
```

**Fields:**
- `name` - Skill name
- `level` - `Advanced`, `Intermediate`, or `Basic`

**Order:** Skills appear in the order listed in the array.

### projects.json

```json
[
  {
    "id": "1",
    "title": "Project Name",
    "description": "Project description",
    "link": "https://project-url.com"
  }
]
```

**Fields:**
- `id` - Unique identifier (string)
- `title` - Project name
- `description` - Brief description
- `link` - URL to live project (optional, use "#" for placeholder)

**Order:** Projects appear in the order listed in the array.

## Editing Content

### Adding an Experience

1. Open `experiences.json`
2. Add a new object to the array:
   ```json
   {
     "id": "4",
     "role": "New Position",
     "company": "New Company",
     "type": "Full-time",
     "date": "Jan 2025 - Present",
     "location": "Location • Remote",
     "description": ["Achievement 1", "Achievement 2"],
     "skills": ["Skill1", "Skill2"],
     "image": "logo.png",
     "order": 4
   }
   ```
3. Save the file
4. Run `npm run dev`

**Important:** Use a higher `order` number than existing experiences to appear first.

### Adding a Skill

1. Open `skills.json`
2. Add a new object:
   ```json
   { "name": "New Skill", "level": "Advanced" }
   ```
3. Save and run `npm run dev`

### Adding a Project

1. Open `projects.json`
2. Add a new object:
   ```json
   {
     "id": "5",
     "title": "New Project",
     "description": "Description here",
     "link": "https://example.com"
   }
   ```
3. Save and run `npm run dev`

## Build Commands

```bash
# Generate all content
npm run generate

# Generate specific content
npm run generate:experiences
npm run generate:skills
npm run generate:projects

# Development (auto-generates)
npm run dev

# Production build (auto-generates)
npm run build
```

## Tips

- **JSON Syntax**: Ensure proper JSON formatting (quotes, commas, brackets)
- **Validation**: Use a JSON validator if you get errors
- **Images**: Place company logos in `/public/images/experiences/`
- **Order**: For experiences, higher `order` = appears first
- **Arrays**: For skills and projects, order in array = display order

## Troubleshooting

**Syntax Error:**
- Check for missing commas between objects
- Ensure all strings use double quotes
- Verify brackets are properly closed

**Not Showing:**
- Run `npm run generate` manually to see errors
- Check JSON formatting
- Verify file is saved

**Wrong Order:**
- For experiences: Change `order` field (higher = first)
- For skills/projects: Rearrange in the array

---

**Quick Start:** Edit the JSON files and run `npm run dev`!
